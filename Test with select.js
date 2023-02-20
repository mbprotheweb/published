function zipit(urls) {
  var zip = new JSZip();
  var count = 0;
  var zipFilename = "Yiddish24.zip";

  urls.forEach(function (url) {
    var filename = url[1];
    // loading a file and add it in a zip file
    JSZipUtils.getBinaryContent(url[0], function (err, data) {
      if (err) {
        throw err; // or handle the error
      }
      zip.file(filename + ".mp3", data, { binary: true });
      count++;
      if (count == urls.length) {
        zip.generateAsync({ type: "blob" }).then(function (content) {
          saveAs(content, zipFilename);
        });
      }
    });
  });
}
function dl(e) {
  var par = e.target.parentElement.parentElement.parentElement;
  var url = par.getAttribute("data-song-url");
  var name;
  try {
    name =
      par.parentElement.querySelector("h1").textContent +
      " - " +
      par.parentElement.querySelector("p").textContent;
  } catch (e) {
    name = par.getElementsByClassName("post-title")[0].innerHTML;
  }
  if (url == null) {
    url = e.target.parentElement.parentElement.getAttribute("data-song-url");
  }
  var ele = document.getElementById("lists");
  var li = document.createElement("li");
  li.classList.add("url-name");
  li.setAttribute("url", url);
  li.setAttribute("name", name);
  li.innerHTML = name;
  var all = document.querySelectorAll("[url='" + url + "']");
  if (all.length > 0) {
    all[0].remove();
    e.target.innerHTML = "Add To List";
    return;
  }
  ele.appendChild(li);
  e.target.innerHTML = "Remove From List";
}
function setit() {
  var all = document.getElementsByClassName("playing-panel");
  [].forEach.call(all, function (row) {
    if (row.getElementsByClassName("cutitout").length > 0) {
      return;
    }
    var oldurl = $(row).attr("data-song-url");
    var is = $("#lists").children("[url='" + oldurl + "']");
    var el = document.createElement("a");
    if (is.length > 0) {
      el.innerHTML = "Remove From List";
    } else {
      el.innerHTML = "Add To List";
    }
    el.classList.add("cutitout");
    el.addEventListener("click", dl);

    try {
      row.getElementsByClassName("play_button")[0].prepend(el);
    } catch (e) {
      try {
        row.getElementsByClassName("playBtn")[0].prepend(el);
      } catch (e) {
        return;
      }
    }
  });
}

function down() {
  var lists = document.getElementsByClassName("url-name");
  var arr = [];
  [].forEach.call(lists, function (list) {
    arr.push([list.getAttribute("url"), list.getAttribute("name")]);
  });
  zipit(arr);
  $(".cutitout").html("Add To List");
  $("#lists").empty();
}

document
  .getElementsByClassName("root")[0]
  .addEventListener("DOMSubtreeModified", function () {
    setit();
  });
var ele = document.createElement("ul");
ele.id = "lists";
var butt = document.createElement("a");
butt.innerHTML = "Download All";
butt.addEventListener("click", down);
var dim = document.createElement("div");
document.body.prepend(dim);
document.body.prepend(ele);
document.body.prepend(butt);
var s1 = document.createElement("script");
s1.src = "https://cdnjs.cloudflare.com/ajax/libs/jszip/3.10.0/jszip.min.js";
document.body.appendChild(s1);
var s2 = document.createElement("script");
s2.src =
  "https://cdnjs.cloudflare.com/ajax/libs/jszip-utils/0.1.0/jszip-utils.min.js";
document.body.appendChild(s2);
var s3 = document.createElement("script");
s3.src =
  "https://cdnjs.cloudflare.com/ajax/libs/FileSaver.js/2.0.5/FileSaver.min.js";
document.body.appendChild(s3);
setit();
