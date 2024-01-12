var ans = [4,
  2,
  4,
  1,
  1,
  2,
  3,
  1,
  4,
  4,
  4,
  1,
  1,
  4,
  3,
  4,
  4,
  2,
  4,
  2,
  4,
  4,
  3,
  3,
  1,
  2,
  1,
  4,
  2,
  3,
  3,
  1,
  4,
  4,
  1,
  1,
  2,
  3,
  1,
  2
];
var elements = document.querySelectorAll('form[data-radio-buttons-field-options-form="true"]');
[].forEach.call(elements, function (ele, index) {
  var a = ans[index];
  var opt = ele.children[a - 1];
  var inp = opt.getElementsByTagName("input");
  inp.click();
  console.log(index + " " + a);
});
