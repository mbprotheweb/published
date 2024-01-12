function setNativeValue(element, value) {
  let lastValue = element.value;
  element.value = value;
  let event = new Event("input", { target: element, bubbles: true });
  // React 15
  event.simulated = true;
  // React 16
  let tracker = element._valueTracker;
  if (tracker) {
    tracker.setValue(lastValue);
  }
  element.dispatchEvent(event);
}

var tans = [
  false,
  "2",
  "3",
  "1",
  "4",
  "5",
  "A",
  "C",
  "F",
  "E",
  "B",
  "D",
  "D",
  "C",
  "F",
  "E",
  "A",
  "B",
  "A",
  "C",
  "D",
  "E",
  "B"
];
var elements = document.querySelectorAll('textarea[data-field-native-placeholder="true"]');
[].forEach.call(elements, function (ele, index) {
  var ans = tans[index];
  if (ans == false) { }
  else {
    setNativeValue(ele, ans);
  }
});
function getElementIndex(element) {
  return Array.from(element.parentNode.children).indexOf(element);
}

var ans = [1, 0, 0, 1, 0, 0, 2, 6, 0, 2, 2, 1, 2, 0, 2, 2, 1, 1, 3, 3, 2, 2, 0, 1, 2, 3, 2, 0, 0, 2, 0, 3, 2, 1, 3, 3, 0, 2, 3, 0, 0, 0, 0, 2, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 1, 1, 0, 0, 0, 1, 3, 2, 3, 0, 1, 1, 0, 0, 3, 2, 3, 1, 3, 0, 1, 2, 0, 0, 3, 3, 2, 3, 0, 0, 1, 0, 1];
var belements = document.querySelectorAll('form[data-radio-buttons-field-options-form="true"]');
[].forEach.call(belements, function (ele, index) {
  var a = ans[index];
  var opt = ele.children[a];
  var inp = opt.getElementsByTagName("input")[0];
  inp.click();
  console.log(index + " " + a);
});
