async function run(perm) {
  const url = 'https://script.google.com/macros/s/AKfycbxvML-G-VG_WB5HLYS8joDK_50-1L1HTxdajcjSNOTDTJYqisnz7yVG9KRE1ggcsIs8/exec?URL=' + encodeURIComponent(perm);
  fetch(url);
}

var a = document.getElementById("recordnum")?.href;
if (!a) {
  alert("This page is not a valid book page");
} else {
  run(a);
}
