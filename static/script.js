const file_input = document.getElementById("file_input");
const button = document.getElementById("btn");
const display = document.getElementById("display");
let file;

file_input.addEventListener("change", () => {
  //select uploaded file
  file =file_input.files[0];
  console.log(file.name);
  //Use FormData() to transmit file to python and avoiding base64 encoding
  form_data = new FormData();
  form_data.append("music", file);
})

button.addEventListener("click", async () => {
  console.log("Sending to analysis")
  //send it to the /analyze Port of the Flask Server
  const analyze = await fetch("http://127.0.0.1:5000/analyze", {
    //Method Post also needs to be defined in Flask
    method: "POST",
    //Form Data transmissions don´t need a Header like JSON transmissions
    body: form_data
  })
  //await the json return from FLask
  const result = await analyze.json();
  display.innerText = result;
})