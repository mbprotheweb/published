async function run(perm) {
  const url = 'https://api.appsheet.com/api/v2/apps/053a6f61-0807-431e-b455-19d6ad3780fa/tables/Jobs/Action';

  const data = `{
"Action": "Add",
"Properties": {
},
"Rows": [
{
"URL": "${perm}"
}
]
}`;

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'applicationAccessKey': 'V2-ZG5Wo-5dcB0-Qt54f-fs1Ak-GhdJ7-QtjAu-v4kw4-C5Q4E',
      'Content-Type': 'application/json',
    },
    body: data,
  });

  const text = await response.json();

  if (text.Rows.length > 0) {
    alert("Book added, Please sync to see changes");
  } else {

    alert("There was a error\n" + JSON.stringify(text));
  }
}

var a = document.getElementById("recordnum").href;
run(a);
