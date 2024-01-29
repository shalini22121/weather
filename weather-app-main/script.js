const apikey = "a46766bb5c6661b115bd6c0e7c3683a8";

const weatherDataEl = document.getElementById("weather-data");

const cityInputEl = document.getElementById("city-input");

const formEl = document.querySelector("form");

formEl.addEventListener("submit", (e) => {
    e.preventDefault();
    const cityValue = cityInputEl.value;

    if (cityValue.trim() === "") {
        displayErrorMessage("Please enter a city");
    } else {
        getWeatherData(cityValue, apikey);
    }
});

async function getWeatherData(cityValue, apikey) {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${apikey}&units=metric`);

        if (!response.ok) {
            throw new Error("Network response failed");
        }

        const data = await response.json();

        const temperature = Math.round(data.main.temp);

        const description = data.weather[0].description;
        const icon = data.weather[0].icon;
        const iconUrl = `http://openweathermap.org/img/wn/${icon}@2x.png`;

        const feelsLike = Math.round(data.main.feels_like);
        const windSpeed = Math.round(data.wind.speed);
        const humidity = Math.round(data.main.humidity);
        const country = data.sys.country;
        const city = data.name;
        const date = data.dt;

        const details = [
            `Feels like: ${feelsLike}°C`,
            `Humidity: ${humidity}%`,
            `Wind: ${windSpeed}m/sec`,
        ];

        const dateObject = new Date(date * 1000);
        const month = (dateObject.getMonth() + 1).toString().padStart(2, '0'); // Month is 0-indexed
        const day = dateObject.getDate().toString().padStart(2, '0');
        const year = dateObject.getFullYear();
        const formattedDate = `${month}/${day}/${year}`;

        weatherDataEl.querySelector('.icon').innerHTML = `<img src="${iconUrl}" alt="Weather Icon" />`;

        weatherDataEl.querySelector('.description').textContent = `${description}`;
        weatherDataEl.querySelector('#temperature').textContent = `Temperature: ${temperature}°C`;
        weatherDataEl.querySelector('.details').innerHTML = details.map((detail) => `<div> ${detail}</div>`).join("");
        weatherDataEl.querySelector('.country').textContent = `${country}, `;
        weatherDataEl.querySelector('.city').textContent = `${city}, `;
        weatherDataEl.querySelector('.date').textContent = formattedDate;

    } catch (error) {
        console.error('An error occurred:', error);
        displayErrorMessage("An error occurred: " + error.message);
    }
}

function displayErrorMessage(message) {
    weatherDataEl.querySelector('.icon').innerHTML = "";
    weatherDataEl.querySelector('.description').textContent = message;
    weatherDataEl.querySelector('#temperature').textContent = "";
    weatherDataEl.querySelector('.details').innerHTML = "";
    weatherDataEl.querySelector('.country').textContent = "";
    weatherDataEl.querySelector('.city').textContent = "";
    weatherDataEl.querySelector('.date').textContent = "";
}
