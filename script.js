const fileInput = document.getElementById("file");
const file_name_display = document.getElementById("file_name");
const information_display = document.getElementById("information_display");
const target_input = document.getElementById("target_query");
const name_check = document.getElementById("check_name");
const button = document.getElementById("button");

let arrayOfArrays;
let data_uploaded = false;
let query_target;

// Datenausgabe (Wenn Name richtig ist werden alle features ausgegeben), Check: Daten Hochgeladen, Name im Datenset vorhanden. 
button.addEventListener("click", () => {
    let valid_name = false;
    query_target = target_input.value;
    console.log(arrayOfArrays);

    if(data_uploaded == false){
        name_check.innerText = "Data is missing";
    }

    for (const line of arrayOfArrays){
        //Wenn der Name mit line[Parameter] übereinstimmt werden die Daten ausgegeben
        if (query_target == line[7]){

            function prepare_information(){
                let counter = 0;
                let text;
                 for (const element of arrayOfArrays[0]){
                    if (text == undefined){
                        text = `${element}: ${line[counter]} `
                    }else{
                        text += `${element}: ${line[counter]} `
                    }
                    counter ++;
                 }
                 return text
            
            } 
            const text = prepare_information();
            name_check.innerText = `Requested Information: ${text}`;
            valid_name = true;

        }
    }
    if(!valid_name && data_uploaded){
        name_check.innerText = `${target_input.value} not found`;
    }


})

//Input File uploader & File Reader

fileInput.addEventListener("change", () => {

    data_uploaded = true;
    file_name_display.innerText = "Name of File: " + fileInput.files[0].name;

    const fr = new FileReader();
    fr.readAsText(fileInput.files[0]);
    fr.addEventListener("load", () => {
        const file = fr.result;
        const lines = file.split("\r\n");
        arrayOfArrays = lines.map(line => line.split(","));
    })



})