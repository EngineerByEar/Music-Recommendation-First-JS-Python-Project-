const fileInput = document.getElementById("file");
const file_name_display = document.getElementById("file_name");
const target_input = document.getElementById("target_query");
const name_check = document.getElementById("check_name");
const button = document.getElementById("button");
const preview = document.getElementById("preview");

let arrayOfArrays;
let data_uploaded = false;
let table_header = false;
let query_target;
let row_of_artist_name;

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

//Finding the row in the data set in which the artist name is saved
function find_artist_row(){
    let counter = 0;
    for (const row of arrayOfArrays[0]){
        if(row == "track_artist"){
            row_of_artist_name = counter;
        }else{
            counter ++;
        }
    }
}

// Daten display when button is clicked (If the typed name is in the dataset, the recorded tracks of that artist are displayed), Check: Was Data Uploaded?, Is the selected Name in the Data-Set? 
button.addEventListener("click", () => {
    preview.innerHTML="";
    let valid_name = false;
    find_artist_row();
    query_target = target_input.value;

    if(data_uploaded == false){
        name_check.innerText = "Data is missing";
    }
    for (const line of arrayOfArrays){
        //Wenn der Name mit line[Parameter] übereinstimmt werden die Daten ausgegeben
        if (query_target == line[row_of_artist_name]){            /*
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
            */

           display_as_table(line);
            valid_name = true;

        }
    }
    if(!valid_name && data_uploaded){
        name_check.innerText = `${target_input.value} not popular or not in Data Set`;
    }


})

//Find the row that contains the name of the track
function find_track_name_row(){
    let track_name_row;
    let counter = 0;
    for (const row of arrayOfArrays[0]){
        if(row == "track_name"){
            track_name_row = counter;
        }
        counter ++;
    }
    return track_name_row;
}

//Display data as HTML table
function display_as_table(data){

    const track_name_row = find_track_name_row(); 
    const table = document.createElement("table");
    const tr = document.createElement("tr");
    table.appendChild(tr);
    const td = document.createElement("td");
    td.textContent = data[track_name_row];
    console.log(data[track_name_row]);
    tr.appendChild(td);
    preview.appendChild(table);
}

