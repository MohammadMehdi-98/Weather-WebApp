// Get DOM elements
const cityInput = document.getElementById("cityInput");
const addInput = document.getElementById("add");
const cityOutput = document.getElementById("cityoutput");
const descriptionOutput = document.getElementById("description");
const tempOutput = document.getElementById("temp");
const windOutput = document.getElementById("wind");
const humidityOutput = document.getElementById("humidity");
const coordinatesOutput = document.getElementById("coordinates");

// API Key
const apiKey = "cdada2018bb31a8c64daefe5248771ca";

async function weatherInfo() {
    try {
        let response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityInput.value}&appid=${apiKey}`);
        let weatherResult = await response.json();
        
        console.log(weatherResult); // Log the entire response to see what's returned

        // Call getInfo with the weatherResult
        getInfo(weatherResult);
    } catch (error) {
        console.error("Error fetching weather data:", error);
    }
}
function getInfo(data) {
    // Check if the response contains the expected properties
    if (!data || data.cod !== 200) {
        cityOutput.innerHTML = "City not found";
        descriptionOutput.innerHTML = "";
        tempOutput.innerHTML = "";
        windOutput.innerHTML = "";
        return;
    }

    let cityName = data.name || "Unknown city";
    let weather = (data.weather && data.weather.length > 0) ? data.weather[0].description : "No description available";
    let temp = (data.main && data.main.temp) ? (data.main.temp - 273.15).toFixed(2) : "N/A";
    let wind = (data.wind && data.wind.speed) ? data.wind.speed : "N/A";
    let humidity = (data.main && data.main.humidity) ? data.main.humidity : "N/A";
    let coordinates = `${data.coord.lat}, ${data.coord.lon}`;

    // cityOutput.innerHTML = cityName;
    // descriptionOutput.innerHTML = weather;
    // tempOutput.innerHTML = temp;
    // windOutput.innerHTML = wind;
    cityOutput.innerHTML=`${cityName} :اسم شهر`;
    descriptionOutput.innerHTML=`${weather} :وضعیت هوا`;
    tempOutput.innerHTML=`${temp}°C :دما`;
    windOutput.innerHTML=`${wind} m/s :سرعت باد`;
    humidityOutput.innerHTML=`${humidity}% :رطوبت هوا`;
    coordinatesOutput.innerHTML=`${coordinates} :مختصات جغرافیایی`;
}


addInput.addEventListener("click",weatherInfo);