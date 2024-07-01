const key = "4cb75f0a62904836a65104703243006";
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
    if (data.error) {
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
    weatherTemp.innerText = data.current.temp_c;
    weatherFeelsLike.innerText = data.current.feelslike_c;
    weatherFeelsLike = weatherFeelsLike + '%';
    weatherHumidity.innerText = data.current.humidity;
    weatherWind.innerText = data.current.wind_kph;
    weatherStatus.innerText = data.current.condition.text;
    let img = document.querySelectorAll("img");
    img[1].src = data.current.condition.icon;
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
        const URL = `http://api.weatherapi.com/v1/current.json?key=${key}&q=${city}`;
        errorShow.classList.add("hidden");
        console.log(city);
        getWeatherDetails(URL);
        outputSection.classList.remove("hidden");
    }

});
