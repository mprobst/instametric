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
  return `${value.toFixed(1)} ${unit}`;
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

function metrifyAll() {
  for (let node of document.querySelectorAll('.item-size, .icDropdownItem span, .icQtyDropdown button strong')) {
    let text = node.textContent;
    let m = text.match(/^\s*~?\s*(\d*(?:\.\d+)?)?\s*([\w ]+)\s*$/);
    if (!m) continue;
    let u = UNITS[m[2]];
    if (!u) continue;
    node.textContent = metrify(m[1] || '1', u.unit, u.factor);
    node.setAttribute('title', text);
  }
}

setInterval(metrifyAll, 1);
