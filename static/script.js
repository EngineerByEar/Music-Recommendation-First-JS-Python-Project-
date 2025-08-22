const file_input = document.getElementById("input");
const btn = document.getElementById("btn");
const display = document.getElementById("display");
let file;
let data;
let formData;

file_input.addEventListener("change",() => {
  file = file_input.files[0];
  console.log(file.name, file.size)
  formData = new FormData();
  formData.append("music", file);
  
})

btn.addEventListener("click", async () => {
  
  //Sending the Data to python and receiving a response
  
  const process_data = await fetch("http://127.0.0.1:5000/process_data", {
    method: "POST",
    body: formData
  })
  const processed_data = await process_data.json();
  display.innerText = `Tempo: ${processed_data["tempo"]}`
})