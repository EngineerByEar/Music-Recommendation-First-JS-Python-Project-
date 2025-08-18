const site_namer = document.getElementById("site_namer");
const name_site_btn = document.getElementById("lock_in");
const title = document.getElementById("title");

let button = document.getElementById("btn");

const value1 = document.getElementById("value1");
const value2 = document.getElementById("value2");

const result = document.getElementById("results");

const image = document.getElementById("image");

const radio_selection = document.getElementById("radio_selection");
const radio_cat = document.getElementById("Cat_Fact");
const radio_dog = document.getElementById("Dog_Pic");

const fact_display = document.getElementById("fact_display");

let DataURL;

name_site_btn.addEventListener("click", function(){
    let site_name = site_namer.value;
    title.innerText = site_name;
    site_namer.style.display = "none";
    name_site_btn.style.display = "none";
})

async function getFact(DataURL){
        let response = await fetch(DataURL);
        data = await response.json();
        fact = data.fact
        console.log(fact)
    }

 function displayFact(){
    fact_display.innerText = fact
}

async function getImage(DataURL){
        let response = await fetch(DataURL);
        data = await response.json();
        return data.message
    }

function displayImage(imageURL){
    image.src = imageURL
    image.style.display = "flex"
}

async function input_selection(){

        let checkedRadio = radio_selection.querySelector('input[type="checkbox"]:checked');
        console.log(checkedRadio.id)
        if (checkedRadio.id == "Cat_Fact"){
            DataURL = "https://catfact.ninja/fact";
            let fact = await getFact(DataURL);
            displayFact();
        }else if(checkedRadio.id == "Dog_Pic")
        {
            DataURL = "https://dog.ceo/api/breeds/image/random";
            let imageURL = await getImage(DataURL);
            console.log('Blub: ' + imageURL)
            displayImage(imageURL);
        }
}    

button.addEventListener("click", function(){
    input_selection();
})

radio_cat.addEventListener("click", function(){
    if(radio_dog.checked == true){
        radio_dog.checked = false;
    }
})


radio_dog.addEventListener("click", function(){
    if(radio_cat.checked == true){
        radio_cat.checked = false;
    }
})