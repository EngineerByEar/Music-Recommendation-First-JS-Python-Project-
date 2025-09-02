const vibe_carousel_container = document.getElementById("vibe-carousel");
const genres = ['random', 'afrobeats', 'ambient', 'arabic', 'blues', 'brazilian', 'classical', 'country', 'electronic', 'folk', 'gaming', 'hip-hop', 'indian', 'indie', 'j-pop', 'jazz', 'k-pop', 'korean', 'latin', 'lofi', 'metal', 'pop', 'punk', 'r&b', 'reggae', 'rock', 'soul', 'turkish', 'world']
const genre_select = document.getElementById("genre_select");
const slider_parameters = ['energy', 'danceability', 'valence'];
let vibe_index = 2;

//Get Background Images for vibe carousel
async function get_bgimage(genre){
    const api_key = "52071390-151c3446f06ab092fe589eac8";
    const request = await fetch(`https://pixabay.com/api/?key=${api_key}&q=${genre}`);
    const data = await request.json();
    if(data.hits.length > 0){
        return data.hits[0].webformatURL;
    }else{
        return "/Images/afrobeat.webp"
    }



}
//Display Genre-Carousel
async function display_genres(vibe_index){
    vibe_carousel_container.innerHTML = "";
    if(vibe_index < 2){
        vibe_index = 2;
    }else if(vibe_index > genres.length -3){
        vibe_index = genres.length -3;
    }

    for(const genre of genres.slice(vibe_index-2, vibe_index+3)){
        const option = document.createElement("img");

            // const text = document.createElement("p");
            // text.innerText = genre;

        //option.appendChild(text);

        option.id = genre;
        option.style.width = "15vw";
        option.style.height = "30vh";
        option.style.backgroundColor = "white";
        option.style.objectFit = "cover";
        option.style.border = "solid";
        const image_url = await get_bgimage(genre)
        option.src = image_url;

        vibe_carousel_container.appendChild(option);
    }
    const selected_vibe = document.getElementById(genre_select.value);
    selected_vibe.style.border = "solid, yellow";

}
//Get Index of Element when clicked
function getIndex(selected_genre){
    counter = 0;
    for(const genre of genres){
        if(genres[counter] == selected_genre){
            console.log(`Selected Field: Genre: ${genres[counter]}, Index: ${counter}`)
            return counter
        }
        counter ++;
    }

}
//Load the selection field with all the genre options
function load_select(){
    for(const genre of genres){
        const option = document.createElement("option");
        option.innerText = genre;
        genre_select.appendChild(option)
    }
}
//Create sliders for parameters
function create_sliders(){
    for(const parameter of slider_parameters){
        const slider_title = document.createElement("p");
        slider_title.innerText = parameter
        slider_title.style.alignItems = "center";
        document.getElementById("sliders").appendChild(slider_title);


        const slider_div = document.createElement("div");
        slider_div.style.display = "flex";
        slider_div.style.flexDirection = "row";

        const slider = document.createElement("input");
        slider.id = `${parameter}_slider`
        slider.type = "range";
        slider.min = "0";
        slider.max = "1";
        slider.step = "0.1";
        slider.value = "0.5";
        slider_div.appendChild(slider);

        const slider_value_display = document.createElement("p");
        slider_value_display.innerText =  slider.value;
        slider_div.appendChild(slider_value_display);
        slider.addEventListener("change",()=>{
            slider_value_display.innerText =  slider.value;
            console.log('Blub');
        })

        document.getElementById("sliders").appendChild(slider_div);

    }
}
//
document.addEventListener("DOMContentLoaded", function(){
display_genres(vibe_index);
load_select(); 
create_sliders();
})

vibe_carousel_container.addEventListener("click", function(event){
    const clickedElement = event.target;
    vibe_index = getIndex(clickedElement.id);
    display_genres(vibe_index);
    genre_select.value = genres[vibe_index];
})

genre_select.addEventListener("change", function(){
    vibe_index = getIndex(genre_select.value);
    display_genres(vibe_index);
})

