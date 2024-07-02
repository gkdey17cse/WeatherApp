const key = "8673a0d15b5f64a814e5a7829b22b5f0";
let submit = document.getElementById("submit");
let weatherTemp = document.getElementById("weatherTemp");
let weatherStatus = document.getElementById("weatherStatus");
let weatherHumidity = document.getElementById("weatherHumidity");
let weatherWind = document.getElementById("weatherWind");
let weatherFeelsLike = document.getElementById("weatherFeelsLike");


const getWeatherDetails = async (URL) => {
    let response = await fetch(URL);
    let data = await response.json();
    console.log(data);
    if (data.cod == 404) {
        showError();
    } else {
        showWeatherData(data);
    }
}

const showError = () => {
    let outputSection = document.getElementById("output-section");
    let errorShow = document.getElementById("errorShow");
    errorShow.classList.remove("hidden");
    outputSection.classList.add("hidden");
}

const showWeatherData = (data) => {
    let temp = data.main.temp;
    weatherTemp.innerText = Math.round((temp - 273) * 100) / 100;
    temp = data.main.feels_like;
    weatherFeelsLike.innerText = Math.round((temp - 273) * 100) / 100;
    weatherHumidity.innerText = data.main.humidity;
    temp = data.wind.speed;
    weatherWind.innerText = Math.round((temp / 0.621371) * 100) / 100
    weatherStatus.innerText = data.weather[0].main;
    let weatherImage = document.querySelector('img');

    switch (data.weather[0].main) {

        case 'Clouds': weatherImage.src = "./Clouds.png";
            break;
        case 'Clear': weatherImage.src = "./Clear.png";
            break;
        case 'Mist': weatherImage.src = "./Mist.png";
            break;
        case 'Rain': weatherImage.src = "./Rain.png";
            break;
        case 'Snow': weatherImage.src = "./Snow.png";
            break;
        default :
            weatherImage.src = "./Img1.png";
    }
}

submit.addEventListener('click', () => {
    let inputField = document.getElementById("inputCity");
    let errorShow = document.getElementById("errorShow");
    let outputSection = document.getElementById("output-section");
    let city = inputField.value;

    if (city === '') {
        errorShow.classList.remove("hidden");
        outputSection.classList.add("hidden");
    } else {
        const URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}`;
        errorShow.classList.add("hidden");
        console.log(city);
        getWeatherDetails(URL);
        outputSection.classList.remove("hidden");
    }

});
