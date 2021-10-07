"use strict";
const dayOne = document.getElementById('firstDay');
const dayTwo = document.getElementById('secondDay');
const dayThree = document.getElementById('thirdDay');
const search = document.getElementById('searchBar');
const animationSelector = document.querySelector('label.span-animation-selector');
const weatherPage = document.getElementById('weatherPage');
const newsPage = document.getElementById('newsPage');
const active = document.querySelector('li.nav-item.active a');
const news = document.getElementById('news');
const home = document.getElementById('home');
const contact = document.getElementById('contact');
const directions = {
    "N": "North",
    "E": "East",
    "W": "West",
    "S": "South"
}

active.addEventListener('change', () => {
    activeChange()
})

function activeChange() {
    if (active.innerHTML.includes('Home')) {
        newsPage.classList.replace('d-block', 'd-none');
        contactPage.classList.replace('d-block', 'd-none')
        weatherPage.classList.replace('d-none', 'd-block');
    } else if (active.innerHTML.includes('News')) {
        contactPage.classList.replace('d-block', 'd-none')
        weatherPage.classList.replace('d-block', 'd-none');
        newsPage.classList.replace('d-none', 'd-block');
    } else if (active.innerHTML.includes('Contact')) {
        contactPage.classList.replace('d-none', 'd-block');
        weatherPage.classList.replace('d-block', 'd-none');
        newsPage.classList.replace('d-block', 'd-none');
    }
}

//Navigation selector
let navElements = [home, news, contact]

navElements.forEach(nav => {
    nav.addEventListener('click', () => {
        document.querySelectorAll('.active').forEach(notNav => {
            notNav.classList.remove('active');
            `${notNav}Page`.classList.replace('d-block', 'd-none');
        });
        nav.classList.add('active');
        `${nav}Page`.classList.replace('d-none', 'd-block');
    });
});

//API to get user's location and set it to the Weather/News api links
let currentLocation = (async function getLocation() {
    let location = await fetch('http://api.ipstack.com/check?access_key=4810164588e24eafb6856c7fbdb944be');
    let response = await location.json();
    return response.city;
}())

//Search bar for location
searchBar.addEventListener('keyup', () => {
    placeholderFix();
    getWeather(searchBar.value);
});

//Main page content (Weather api call + data displaying)
async function getWeather(city) {
    let url = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=78d46ef554d74befba3122059210510&q=${city ? city : await currentLocation}&days=3&aqi=no&alerts=no`)
    let response = await url.json()
    dayOne.innerHTML = `
<div class="header-first d-flex justify-content-between p-2">
    <span>${new Date(response.current.last_updated).toLocaleString("default", { weekday: "long" })}</span>
    <span>${new Date(response.current.last_updated).toLocaleString("en-GB",{day:'numeric',month:'long'})}</span>
</div>
<div class="body-first py-4 px-3">
    <p class="location">${response.location.name}, ${response.location.country}</p>
    <div class="currentweather d-flex justify-content-between">
        <span class="degree">${response.current.temp_c}°C</span>
        <span class="status-img"><img class="w-100" src="${response.current.condition.icon}" alt=""></span>
    </div>
    <div class="footer">
        <p class="status">${response.current.condition.text}</p>
        <span><i class="fas fa-umbrella"></i> <span>${response.current.humidity}%</span></span>
        <span><i class="fas fa-wind"></i> <span>${response.current.wind_kph} km/h</span></span>
        <span><i class="far fa-compass"></i> <span>${response.current.wind_dir.split("").map( char => directions[char] ).join(" ")}</span></span>
    </div>
</div>
        `;
    dayTwo.innerHTML = `
<div class="header-mid text-center rounded-0 py-2">
    <p class="mb-0">${new Date(response.forecast.forecastday[1].date).toLocaleString("default", { weekday: "long" })}</p>
</div>
<div class="body-mid pb-2 px-3 rounded-0">
        <span class="status-img-other mb-4 d-flex justify-content-center"><img src="${response.forecast.forecastday[1].day.condition.icon}" alt=""></span>
    <div class="currentweather d-flex align-items-center flex-column mb-3">
        <div class ="maxtemp text-white">${response.forecast.forecastday[1].day.maxtemp_c}°C</div>
        <div class ="mintemp">${response.forecast.forecastday[1].day.mintemp_c}°</div>
    </div>
    <div class="footer d-flex justify-content-center my-4">
        <p class="status">${response.forecast.forecastday[1].day.condition.text}</p>
    </div>
</div>`;
    dayThree.innerHTML = `
<div class="header-last text-center py-2">
    <p class="mb-0">${new Date(response.forecast.forecastday[2].date).toLocaleString("default", { weekday: "long" })}</p>
</div>
<div class="body-last pb-2 px-3 adjustments">
        <span class="status-img-other mb-4 d-flex justify-content-center"><img src="${response.forecast.forecastday[2].day.condition.icon}" alt=""></span>
    <div class="currentweather d-flex align-items-center flex-column mb-3">
        <div class ="maxtemp text-white">${response.forecast.forecastday[2].day.maxtemp_c}°C</div>
        <div class ="mintemp">${response.forecast.forecastday[2].day.mintemp_c}°</div>
    </div>
    <div class="footer d-flex justify-content-center my-4">
        <p class="status">${response.forecast.forecastday[2].day.condition.text}</p>
    </div>
</div>`;
}
getWeather();

//Input animation for the search bar
function placeholderFix() {
    if (searchBar.value == '' || searchBar.value == null) {
        animationSelector.classList.remove('span-animation');
    } else {
        animationSelector.classList.add('span-animation');
    }
}


async function getNews() {
    let newsUrl = await fetch(`https://newsapi.org/v2/everything?q=news+country=en&apiKey=a8f90813d0644452892ddd7cb923aff3`)
    let newsResponse = await newsUrl.json()
    console.log(newsResponse);
}
getNews()