var ans = [2, 1, 2, 0, 1, 2, 2, 2, 1, 3, 3, 0, 2, 1, 0, 3, 3, 2, 2, 1, 1, 1, 2, 3, 3, 3, 2, 0, 3, 1, 2, 2, 2, 2, 3, 1, 2, 2];
var elements = document.querySelectorAll('form[data-radio-buttons-field-options-form="true"]');
[].forEach.call(elements, function (ele, index) {
  var a = ans[index];
  var opt = ele.children[a];
  var inp = opt.getElementsByTagName("input")[0];
  inp.click();
  console.log(index + " " + a);
});
