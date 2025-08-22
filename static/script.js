const file_input = document.getElementById("input");
const btn = document.getElementById("btn");
const display = document.getElementById("display");
let file;
let data;

file_input.addEventListener("change",() => {
  file = file_input.files[0];
  console.log(file);
  const reader = new FileReader();
  reader.readAsDataURL(file);
  
  reader.addEventListener('load', function(){
    dataURL = reader.result;
    console.log(JSON.stringify(dataURL))
  })
})

btn.addEventListener("click", async () => {
  
  //Sending the Data to python and receiving a response
  
  const process_data = await fetch("http://127.0.0.1:5000/process_data", {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(dataURL)
  })
  const processed_data = await process_data.json();
  display.innerText = processed_data
  
})