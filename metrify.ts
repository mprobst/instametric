function metrify(text: string, unit: string, factor: number) {
  let value = parseFloat(text) * factor;
  if (value < 1) {
    // => milli
    value *= 1000;
    unit = 'm' + unit;
  } else if (value > 1000) {
    // => kilo
    value /= 1000;
    unit = 'k' + unit;
  }
  if (value < 10) {
    return `${value.toFixed(1)} ${unit}`;
  } else if (value > 100) {
    // Round to max two digits + 0 to make the number a bit more human readable.
    value = Math.round(value / 10) * 10;
  } else if (value > 10) {
    // Round for 2 digits before the decimal point.
    value = Math.round(value);
  }
  // Value should not have a fraction, but toFixed(0) avoids floating point math issues.
  return `${value.toFixed(0)} ${unit}`;
}

interface Unit {
  unit: string;
  factor: number;
}

const UNITS: {[k: string]: Unit} = {
  'oz': {unit: 'g', factor: 28.3495},
  'lb': {unit: 'g', factor: 453.592},
  'lbs': {unit: 'g', factor: 453.592},
  'fl oz': {unit: 'l', factor: 0.0295735},
  'quart': {unit: 'l', factor: 0.946353},
  'qt': {unit: 'l', factor: 0.946353},
  'pt': {unit: 'l', factor: 0.473176},
  'gal': {unit: 'l', factor: 3.78541},
  'gl': {unit: 'l', factor: 3.78541},
};

const PREFIX = `(~\\s+|\\d+ x\\s+)?`;
const VALUE = `(\\d*(?:\\.\\d+)?)?`;
const UNIT_RE = '(' + Object.keys(UNITS).join('|') + ')';
const RE = new RegExp(`^\\s*${PREFIX}${VALUE}\\s*${UNIT_RE}\\s*$`);

const SELECTORS = `
    .item-size:not(.metrified),
    .item-quantity-amount:not(.metrified),
    .item-quantity-small:not(.metrified),
    .item-size-info:not(.metrified),

    .icDropdownItem span:not(.metrified),
    .icQtyDropdown button strong:not(.metrified)
    `;

// Shim export handling for running in Chrome.
if (typeof this.exports === 'undefined') this.exports = {};

export function metrifyText(text: string): string|undefined {
  let m = text.match(RE);
  if (!m) return;
  let [, prefix, value, unit] = m;
  let u = UNITS[unit];
  if (!u) return;
  return (prefix || '') + metrify(value || '1', u.unit, u.factor);
}

function metrifyAll() {
  let nodes = document.querySelectorAll(SELECTORS);
  for (let i = 0; i < nodes.length; i++) {
    let node = nodes[i];
    node.classList.add('metrified');  // No need to check again if it doesn't match.
    let nodeText = node.textContent;
    if (!nodeText) continue;
    let metrified = metrifyText(nodeText);
    if (!metrified) continue;
    node.textContent = metrified;
    node.setAttribute('title', nodeText);
  }
}

// Shim document/main execution for running in Node.
if (typeof document !== 'undefined') setInterval(metrifyAll, 1000);
