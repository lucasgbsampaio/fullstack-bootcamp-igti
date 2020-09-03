window.addEventListener('load', start);

var rangeRed = document.querySelector('#rangeRed');
var rangeGreen = document.querySelector('#rangeGreen');
var rangeBlue = document.querySelector('#rangeBlue');
var textRed = document.querySelector('#textRed');
var textGreen = document.querySelector('#textGreen');
var textBlue = document.querySelector('#textBlue');
var divColor = document.querySelector('#divColor');

function start() {
  function newValues() {
    divColor.style.backgroundColor =
      'rgb(' +
      rangeRed.value +
      ',' +
      rangeGreen.value +
      ',' +
      rangeBlue.value +
      ')';

    textRed.value = rangeRed.value;
    textGreen.value = rangeGreen.value;
    textBlue.value = rangeBlue.value;
  }

  rangeRed.addEventListener('change', newValues);
  rangeGreen.addEventListener('change', newValues);
  rangeBlue.addEventListener('change', newValues);
}