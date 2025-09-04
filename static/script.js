let get_recommendation_btn;
let energy_input;
let danceability_input;
let valence_input;
let display;
let extend_button;
let extended_display;
let select_genre;
let checkout_button;

setTimeout(function(){
get_recommendation_btn = document.getElementById("get_recommendation_btn");

energy_input = document.getElementById("energy_input");

danceability_input = document.getElementById("danceability_input");

valence_input = document.getElementById("valence_input");

display = document.getElementById("result");
extend_button = document.getElementById("more_info_btn");
extended_display = document.getElementById("more_info");

select_genre = document.getElementById("genre_select");
checkout_button = document.getElementById("check_out_track_btn");

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
        genre_list.push(genre);
        const option = document.createElement("option");
        option.innerText = genre;
        select_genre.appendChild(option);
    }
    select_genre.value = "random";

    console.log(genre_list)
})

//Get Recommendation and Display Basic Data
get_recommendation_btn.addEventListener("click", async function(){
    extended_display.innerHTML ="";
    extended_display.style.display = "none"
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
    
    display.style.display = "flex";
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
            extended_display.style.display = "flex";
            extended_display.innerHTML += `${column}: ${response[column]} <br>`
        }
        extended_info = true;
        extend_button.innerText = "Less Information";
    }else{
        extended_display.innerHTML = "";
        extended_info = false;
        extend_button.innerText = "More Information";
        extended_display.style.display = "none";
    };


})










}, 100);

