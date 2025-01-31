//Weather application


const weatherForm= document.querySelector(".weatherForm");
//Returns the first element withing document matching selector
const cityInput = document.querySelector(".cityInput");
const card = document.querySelector(".card");

const apiKey= "2d05bc88311f346d5cd30fba15589ecc";

weatherForm.addEventListener("submit", async event =>{

    event.preventDefault();

    const city= cityInput.value;

    if(city){
        //A city was entered
        try{
            const weatherData= await getWeatherData(city);
            displayWeatherInfo(weatherData);
        }
        catch(error){
            console.error(error);
            displayError(error);
        }

    }
    
    else{
        //no city was entered
        displayError("Please enter a city");
    }
});

async function getWeatherData(city){

    const apiUrl= `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

    const response = await fetch(apiUrl);

    console.log(response);

    if(!response.ok){
        throw new Error("Could not fetch weather data");
    }
    
    return await response.json();
    //returns an object in json like format
    //data is returned to event listener

}

function displayWeatherInfo(data){
    console.log(data);

    const {name: city, 
          main: {temp, humidity}, 
          weather:[{description, id}]} =data;
          //destructuring

    card.textContent="";
    card.style.display = "flex";

    const cityDisplay = document.createElement("h1");
    const tempDisplay = document.createElement("p");
    const humidityDisplay = document.createElement("p");
    const descDisplay = document.createElement("p");
    const weatherEmoji = document.createElement("p");

    cityDisplay.textContent = city;
    tempDisplay.textContent = `${(temp -273.15).toFixed(1)}°C`;
    humidityDisplay.textContent= `Humidity: ${humidity}%`;
    descDisplay.textContent= description;
    weatherEmoji.textContent= getWeatherEmoji(id);

    cityDisplay.classList.add("cityDisplay");
    tempDisplay.classList.add("tempDisplay");
    humidityDisplay.classList.add("humidityDisplay");
    descDisplay.classList.add("descDisplay");
    weatherEmoji.classList.add("weatherEmoji")

    card.appendChild(cityDisplay);
    card.appendChild(tempDisplay);
    card.appendChild(humidityDisplay);
    card.appendChild(descDisplay);
    card.appendChild(weatherEmoji);

}

function getWeatherEmoji(weatherId){
    //based on the weather Id provided by the API we can 
    //Assign the appropriate emojis
    //Check if the case is true using switch
    switch(true){
        case(weatherId >=200 && weatherId<300):
            return "⛈️"; //Thunderstorm
        case(weatherId >=300 && weatherId<400):
            return "🌦️"; //Rainy drizzle
        case(weatherId >=500 && weatherId<600):
            return "🌧️"; //Heavier rain
        case(weatherId >=600 && weatherId<700):
            return "❄️"; //Snow
        case(weatherId >=700 && weatherId<800):
            return "🌫️"; //Fog
        case(weatherId ===800):
            return "☀️"; //Sunny
        case(weatherId >=801 && weatherId<810):
            return "☁️"; //Cloudy
        default:
            return "?"; //undetermined
    }

}

function displayError(message){

    const errorDisplay= document.createElement("p");
    errorDisplay.textContent = message;
    errorDisplay.classList.add("errorDisplay");

    card.textContent = "";
    card.style.display ="flex" ;
    card.appendChild(errorDisplay);

}