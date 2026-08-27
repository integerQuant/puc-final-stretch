const { Plugin } = require("obsidian");

const SVG_NS = "http://www.w3.org/2000/svg";
const OPTIONS = new Map([
  ["unidade", "unit"],
  ["unit", "unit"],
  ["eixo", "axis"],
  ["axis", "axis"],
  ["legenda", "caption"],
  ["caption", "caption"],
  ["localidade", "locale"],
  ["locale", "locale"],
]);

let diagramSequence = 0;

function parseNumber(raw) {
  const compact = raw.trim().replace(/\s/g, "").replace(/^R\$/i, "");

  if (!compact) return Number.NaN;

  let normalized = compact;
  const comma = compact.lastIndexOf(",");
  const dot = compact.lastIndexOf(".");

  if (comma >= 0 && dot >= 0) {
    normalized = comma > dot
      ? compact.replace(/\./g, "").replace(",", ".")
      : compact.replace(/,/g, "");
  } else if (comma >= 0) {
    normalized = compact.replace(",", ".");
  } else if (/^[+-]?\d{1,3}(\.\d{3})+$/.test(compact)) {
    normalized = compact.replace(/\./g, "");
  }

  return Number(normalized);
}

function parseCashflow(source) {
  const config = {
    unit: "R$",
    axis: "períodos",
    caption: "",
    locale: "pt-BR",
  };
  const flows = [];
  const errors = [];

  source.split(/\r?\n/).forEach((rawLine, index) => {
    const line = rawLine.trim();
    if (!line || line.startsWith("#")) return;

    const option = line.match(/^([A-Za-zÀ-ÿ]+)\s*:\s*(.*)$/);
    if (option && OPTIONS.has(option[1].toLowerCase())) {
      config[OPTIONS.get(option[1].toLowerCase())] = option[2].trim();
      return;
    }

    const columns = line.split("|").map((column) => column.trim());
    if (columns.length < 2 || !columns[0] || !columns[1]) {
      errors.push(`linha ${index + 1}: use período | valor | descrição opcional`);
      return;
    }

    const value = parseNumber(columns[1]);
    if (!Number.isFinite(value)) {
      errors.push(`linha ${index + 1}: valor inválido “${columns[1]}”`);
      return;
    }

    const numericPeriod = parseNumber(columns[0]);
    flows.push({
      period: columns[0],
      numericPeriod: Number.isFinite(numericPeriod) ? numericPeriod : null,
      value,
      description: columns.slice(2).join(" | "),
    });
  });

  if (flows.length === 0) errors.push("nenhum fluxo válido foi informado");
  return { config, flows, errors };
}

function svgElement(document, tag, attributes = {}, text = "") {
  const element = document.createElementNS(SVG_NS, tag);
  Object.entries(attributes).forEach(([name, value]) => {
    element.setAttribute(name, String(value));
  });
  if (text) element.textContent = text;
  return element;
}

function formatValue(value, unit, locale) {
  let formatted;
  try {
    formatted = new Intl.NumberFormat(locale || "pt-BR", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    }).format(Math.abs(value));
  } catch (_error) {
    formatted = new Intl.NumberFormat("pt-BR", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    }).format(Math.abs(value));
  }

  if (!unit) return formatted;
  if (unit === "%") return `${formatted}%`;
  return `${unit}\u00a0${formatted}`;
}

function describeFlow(flow, config) {
  const direction = flow.value < 0 ? "saída" : flow.value > 0 ? "entrada" : "fluxo nulo";
  const detail = flow.description ? `, ${flow.description}` : "";
  return `Período ${flow.period}: ${direction} de ${formatValue(flow.value, config.unit, config.locale)}${detail}`;
}

function xPositions(flows, left, right) {
  const allNumeric = flows.every((flow) => flow.numericPeriod !== null);
  const numericValues = flows.map((flow) => flow.numericPeriod);
  const minimum = allNumeric ? Math.min(...numericValues) : 0;
  const maximum = allNumeric ? Math.max(...numericValues) : flows.length - 1;
  const span = maximum - minimum;

  return flows.map((flow, index) => {
    if (flows.length === 1) return (left + right) / 2;
    if (allNumeric && span > 0) {
      return left + ((flow.numericPeriod - minimum) / span) * (right - left);
    }
    return left + (index / (flows.length - 1)) * (right - left);
  });
}

function renderError(document, host, errors) {
  const error = document.createElement("div");
  error.className = "cashflow-diagram-error";

  const heading = document.createElement("strong");
  heading.textContent = "Não foi possível desenhar o fluxo de caixa.";
  error.appendChild(heading);

  const list = document.createElement("ul");
  errors.forEach((message) => {
    const item = document.createElement("li");
    item.textContent = message;
    list.appendChild(item);
  });
  error.appendChild(list);
  host.appendChild(error);
}

function renderCashflow(source, host) {
  const document = host.ownerDocument;
  const { config, flows, errors } = parseCashflow(source);
  host.replaceChildren();

  if (errors.length > 0) {
    renderError(document, host, errors);
    return;
  }

  const width = Math.max(640, flows.length * 125 + 150);
  const height = 330;
  const axisY = 165;
  const plotLeft = 72;
  const plotRight = width - 190;
  const axisStart = 42;
  const axisEnd = width - 135;
  const positions = xPositions(flows, plotLeft, plotRight);
  const maximumMagnitude = Math.max(...flows.map((flow) => Math.abs(flow.value)), 1);
  const markerId = `cashflow-arrow-${++diagramSequence}`;

  const figure = document.createElement("figure");
  figure.className = "cashflow-diagram";

  const scroll = document.createElement("div");
  scroll.className = "cashflow-diagram-scroll";
  figure.appendChild(scroll);

  const svg = svgElement(document, "svg", {
    viewBox: `0 0 ${width} ${height}`,
    role: "img",
    "aria-label": config.caption || "Diagrama de fluxo de caixa",
    preserveAspectRatio: "xMidYMid meet",
  });
  scroll.appendChild(svg);

  const title = svgElement(document, "title", {}, config.caption || "Diagrama de fluxo de caixa");
  svg.appendChild(title);

  const definitions = svgElement(document, "defs");
  const marker = svgElement(document, "marker", {
    id: markerId,
    viewBox: "0 0 10 10",
    refX: 8.5,
    refY: 5,
    markerWidth: 7,
    markerHeight: 7,
    orient: "auto-start-reverse",
  });
  marker.appendChild(svgElement(document, "path", {
    d: "M 0 0 L 10 5 L 0 10 z",
    class: "cashflow-diagram-arrowhead",
  }));
  definitions.appendChild(marker);
  svg.appendChild(definitions);

  svg.appendChild(svgElement(document, "line", {
    x1: axisStart,
    y1: axisY,
    x2: axisEnd,
    y2: axisY,
    class: "cashflow-diagram-axis",
    "marker-end": `url(#${markerId})`,
  }));

  svg.appendChild(svgElement(document, "text", {
    x: axisEnd + 8,
    y: axisY + 5,
    class: "cashflow-diagram-axis-label",
  }, config.axis));

  flows.forEach((flow, index) => {
    const x = positions[index];
    const magnitude = Math.abs(flow.value);
    const arrowLength = flow.value === 0 ? 0 : 28 + (magnitude / maximumMagnitude) * 62;
    const tipY = flow.value >= 0 ? axisY - arrowLength : axisY + arrowLength;
    const valueY = flow.value >= 0 ? tipY - 12 : tipY + 22;
    const descriptionY = flow.value >= 0 ? valueY - 17 : valueY + 17;
    const group = svgElement(document, "g", {
      class: `cashflow-diagram-flow cashflow-diagram-flow--${flow.value < 0 ? "out" : "in"}`,
    });

    group.appendChild(svgElement(document, "title", {}, describeFlow(flow, config)));
    group.appendChild(svgElement(document, "line", {
      x1: x,
      y1: axisY,
      x2: x,
      y2: tipY,
      class: "cashflow-diagram-flow-line",
      "marker-end": flow.value === 0 ? "" : `url(#${markerId})`,
    }));
    group.appendChild(svgElement(document, "line", {
      x1: x,
      y1: axisY - 5,
      x2: x,
      y2: axisY + 5,
      class: "cashflow-diagram-tick",
    }));
    group.appendChild(svgElement(document, "circle", {
      cx: x,
      cy: axisY,
      r: 3.2,
      class: "cashflow-diagram-node",
    }));
    group.appendChild(svgElement(document, "text", {
      x,
      y: axisY + 26,
      class: "cashflow-diagram-period",
      "text-anchor": "middle",
    }, flow.period));
    group.appendChild(svgElement(document, "text", {
      x,
      y: valueY,
      class: "cashflow-diagram-value",
      "text-anchor": "middle",
    }, formatValue(flow.value, config.unit, config.locale)));

    if (flow.description) {
      group.appendChild(svgElement(document, "text", {
        x,
        y: descriptionY,
        class: "cashflow-diagram-description",
        "text-anchor": "middle",
      }, flow.description));
    }

    svg.appendChild(group);
  });

  if (config.caption) {
    const caption = document.createElement("figcaption");
    caption.textContent = config.caption;
    figure.appendChild(caption);
  }

  host.appendChild(figure);
}

module.exports = class CashflowDiagramsPlugin extends Plugin {
  onload() {
    this.registerMarkdownCodeBlockProcessor("cashflow", (source, element) => {
      renderCashflow(source, element);
    });
  }
};
