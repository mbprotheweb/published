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
