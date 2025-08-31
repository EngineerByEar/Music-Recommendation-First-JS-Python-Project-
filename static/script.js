const button = document.getElementById("btn");

const energy_input = document.getElementById("energy_input");
const energy_value = document.getElementById("energy_value");

const danceability_input = document.getElementById("danceability_input");
const danceability_value = document.getElementById("danceability_value");

const valence_input = document.getElementById("valence_input");
const valence_value = document.getElementById("valence_value");

const display = document.getElementById("display");
const extend_button = document.getElementById("extend_display");
const extended_display = document.getElementById("extended_display");

const select_genre = document.getElementById("genre");
const checkout_button = document.getElementById("checkout_button");

let extended_info = false;

let genre_list = [];
let response = ""; 

//Request possible Genres from Data-Set and create Genre selection <option> elements
document.addEventListener("DOMContentLoaded", async function(){
    const request = await fetch("/get_genres", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        }
    });
    const genres = await request.json();
    for (const genre of genres.sort()){
        genre_list += genre;
        const option = document.createElement("option");
        option.innerText = genre;
        select_genre.appendChild(option);
    }
    select_genre.value = "random";

    energy_value.innerText = energy_input.value
    danceability_value.innerText = danceability_input.value
    valence_value.innerText = valence_input.value

})

energy_input.addEventListener("change", function(){
    energy_value.innerText = energy_input.value
})
danceability_input.addEventListener("change", function(){
    danceability_value.innerText = danceability_input.value
    
})
valence_input.addEventListener("change", function(){
    valence_value.innerText = valence_input.value
    
})
//Get Recommendation and Display Basic Data
button.addEventListener("click", async function(){
    extended_display.innerHTML ="";
    extend_button.innerText="More Information";
    extended_info = false;


    const energy = energy_input.value;
    const danceability = danceability_input.value;
    const valence = valence_input.value;
    const genre = select_genre.value;
    let params = {};

    //Params with random genre
    if (genre == "random"){
        params = {
        energy: energy,
        danceability: danceability,
        valence: valence,
        playlist_genre: "random"
        }
    }else{
        params = {
        energy: energy,
        danceability: danceability,
        valence: valence,
        playlist_genre: genre
        }
    }

    const get_recommendation = await fetch("/get_recommendation", {
        method: "POST",
        headers:{
        'Content-Type': 'application/json'
        },
        body: JSON.stringify(params)
    })
    response = await get_recommendation.json();
    console.log(response);
    
    display.innerHTML = `
    Artist: ${response.track_artist} <br>
    Track: ${response.track_name} <br>
    Genre: ${response.playlist_genre} <br>

    --Values-- <br>
    Energy: ${response.energy} <br>
    Danceability: ${response.danceability} <br>
    Valence: ${response.valence} <br>
    `;

    checkout_button.style.display = "flex";
        
    extend_button.style.display = "flex";
    
})

checkout_button.addEventListener("click", function(){
    console.log("Blub");
    window.open(`https://open.spotify.com/intl-de/track/${response.track_id}`)
})
//Show more/less Info
extend_button.addEventListener("click", function(){
    if (extended_info == false){
        for (let column in response){
            extended_display.innerHTML += `${column}: ${response[column]} <br>`
        }
        extended_info = true;
        extend_button.innerText = "Less Information";
    }else{
        extended_display.innerHTML = "";
        extended_info = false;
        extend_button.innerText = "More Information";
    };


})