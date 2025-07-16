document.addEventListener('DOMContentLoaded', function() {
  const navBtns = document.querySelectorAll('.nav-btn');
  const sections = document.querySelectorAll('.converter-section');
  const resetBtn = document.getElementById('reset-btn');
  const allResults = document.getElementById('all-results');

  // Navigation logic
  navBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      const target = btn.getAttribute('data-section');
      sections.forEach(sec => {
        sec.style.display = (sec.id === target) ? 'block' : 'none';
      });
    });
  });

  // Reset logic
  resetBtn.addEventListener('click', function() {
    document.getElementById('length-value').value = '';
    document.getElementById('weight-value').value = '';
    document.getElementById('temperature-value').value = '';
    document.getElementById('length-result').textContent = '';
    document.getElementById('weight-result').textContent = '';
    document.getElementById('temperature-result').textContent = '';
    allResults.textContent = '';
  });

  // Length conversion logic
  function convertLength(value, from, to) {
    const factors = {
      meter: 1,
      kilometer: 1000,
      centimeter: 0.01,
      mile: 1609.34,
      yard: 0.9144,
      foot: 0.3048
    };
    if (!(from in factors) || !(to in factors)) return null;
    const meters = value * factors[from];
    return meters / factors[to];
  }

  document.getElementById('convert-length').addEventListener('click', function() {
    const value = parseFloat(document.getElementById('length-value').value);
    const from = document.getElementById('length-from').value;
    const to = document.getElementById('length-to').value;
    if (isNaN(value)) {
      document.getElementById('length-result').textContent = 'Please enter a valid number.';
      return;
    }
    const result = convertLength(value, from, to);
    document.getElementById('length-result').textContent = `${result} ${to}`;
    allResults.textContent = `Length: ${value} ${from} = ${result} ${to}`;
  });

  // Weight conversion logic
  function convertWeight(value, from, to) {
    const factors = {
      kilogram: 1,
      gram: 0.001,
      pound: 0.453592,
      ounce: 0.0283495
    };
    if (!(from in factors) || !(to in factors)) return null;
    const kilograms = value * factors[from];
    return kilograms / factors[to];
  }

  document.getElementById('convert-weight').addEventListener('click', function() {
    const value = parseFloat(document.getElementById('weight-value').value);
    const from = document.getElementById('weight-from').value;
    const to = document.getElementById('weight-to').value;
    if (isNaN(value)) {
      document.getElementById('weight-result').textContent = 'Please enter a valid number.';
      return;
    }
    const result = convertWeight(value, from, to);
    document.getElementById('weight-result').textContent = `${result} ${to}`;
    allResults.textContent = `Weight: ${value} ${from} = ${result} ${to}`;
  });

  // Temperature conversion logic
  function convertTemperature(value, from, to) {
    let celsius;
    if (from === 'celsius') celsius = value;
    else if (from === 'fahrenheit') celsius = (value - 32) * 5/9;
    else if (from === 'kelvin') celsius = value - 273.15;
    else return null;

    let result;
    if (to === 'celsius') result = celsius;
    else if (to === 'fahrenheit') result = celsius * 9/5 + 32;
    else if (to === 'kelvin') result = celsius + 273.15;
    else return null;
    return result;
  }

  document.getElementById('convert-temperature').addEventListener('click', function() {
    const value = parseFloat(document.getElementById('temperature-value').value);
    const from = document.getElementById('temperature-from').value;
    const to = document.getElementById('temperature-to').value;
    if (isNaN(value)) {
      document.getElementById('temperature-result').textContent = 'Please enter a valid number.';
      return;
    }
    const result = convertTemperature(value, from, to);
    document.getElementById('temperature-result').textContent = `${result} ${to}`;
    allResults.textContent = `Temperature: ${value} ${from} = ${result} ${to}`;
  });
});
