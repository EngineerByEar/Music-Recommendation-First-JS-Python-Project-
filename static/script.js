/*
Gameplan 21.08.: 
    Create Input Forms
    Create JSON in JS
    Send to Python
    Display a response
*/
const btn = document.getElementById("btn");
const bpm_input = document.getElementById("BPM");
const display = document.getElementById("result");
let bpm;

bpm_input.addEventListener("change", function(){
    bpm = Number(bpm_input.value);
});

btn.addEventListener("click", async () => {

  const data = {
    bpm: bpm
  }

  const process = await fetch("http://127.0.0.1:5000/send", {
    method: "POST",
    headers:{"Content-Type": "application/json"},
    body: JSON.stringify(data)
  })
  result = await process.json()
  console.log(result);
display.innerText = result["tempo"];

}


);