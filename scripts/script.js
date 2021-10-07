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
const home = document.getElementById('weather');
const contact = document.getElementById('contact');
const searchLabel = document.getElementById('searchLabel');
const header = document.getElementById('header')
const directions = {
    "N": "North",
    "E": "East",
    "W": "West",
    "S": "South"
}

//Search bar for location
searchBar.addEventListener('keyup', () => {
    placeholderFix();
    if (home.classList.contains('active')) {
        getWeather(searchBar.value);
    } else {
        setTimeout(() => {
            getNews(searchBar.value);
        }, 100)
    }
});

news.addEventListener('click', () => {
    searchBar.value = ''
    placeholderFix();
    searchLabel.innerHTML = 'Search by Country code (us-gb-eg)'
});
home.addEventListener('click', () => {
    searchBar.value = ''
    placeholderFix();
    searchLabel.innerHTML = 'Search City or Zip Code'
})

//Input animation for the search bar
function placeholderFix() {
    if (searchBar.value == '' || searchBar.value == null) {
        animationSelector.classList.remove('span-animation');
    } else {
        animationSelector.classList.add('span-animation');
    }
}
//Navigation selector
const classes = ['weather-page', 'news-page', 'contact-page']
document.querySelectorAll('li.nav-item').forEach(el => {
    el.addEventListener('click', () => {
        document.body.classList.remove(...classes);
        document.body.classList.add(`${el.id}-page`);
        header.innerText = `${el.id}`;
    })
})
const navElements = [home, news, contact]
navElements.forEach(nav => {
    nav.addEventListener('click', () => {
        document.querySelectorAll('.active').forEach(notNav => {
            notNav.classList.remove('active');
        });
        nav.classList.add('active');
    });
});

//API to get user's location and set it to the Weather/News api links
let currentLocation = (async function getLocation() {
    let location = await fetch('https://ip-geolocation.whoisxmlapi.com/api/v1?apiKey=at_hEQr673QMXBK0jam9poHZzE0Sv6Qx');
    let response = await location.json();
    return response.city;
}())

//Main page content (Weather api call + data displaying)
async function getWeather(city) {
    let url = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=78d46ef554d74befba3122059210510&q=${city ? city : await currentLocation}&days=3&aqi=no&alerts=no`)
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

let x = {
    'Australia': 'au',
    'Brazil': 'br',
    'Canada': 'ca',
    'Switzerland': 'ch',
    'China': 'cn',
    'Germany': 'de',
    'Egypt': 'eg',
    'Spain': 'es',
    'France': 'fr',
    'United Kingdom': 'gb',
    'Greece': 'gr',
    'Hong Kong': 'hk',
    'Ireland': 'ie',
    'India': 'in',
    'Italy': 'it',
    'Japan': 'jp',
    'Netherlands': 'nl',
    'Norway': 'no',
    'Peru': 'pe',
    'Philippines': 'ph',
    'Pakistan': 'pk',
    'Portugal': 'pt',
    'Romania': 'ro',
    'Russian Federation': 'ru',
    'Sweden': 'se',
    'Singapore': 'sg',
    ' Taiwan, Province of China ': 'tw',
    'Ukraine': 'ua',
    'United States': 'us'
}

//News page (second page)
async function getNews(country) {
    //https://gnews.io/api/v4/search?q=example&country=${country?country:'us'}&token=113d984ca8886fd44b593a3bca50ccbd
    let newsUrl = await fetch(
        `https://api.newscatcherapi.com/v2/latest_headlines?countries=${country?country:'us'}&topic=news&page_size=18`, {
            method: "GET",
            headers: {
                'x-api-key': 'Ua6VFllK-YGUHaAf1rU_yLK3RIohjhSpjHToM36BYkc'
            }
        }
    );
    let newsResponse = await newsUrl.json();
    console.log(newsResponse);
    let newsBody = ``;
    let arrayLength = newsResponse.articles.length - (newsResponse.articles.length % 3);
    let desc;
    for (let i = 0; i < arrayLength; i++) {
        if (newsResponse.articles[i].summary) {
            desc = newsResponse.articles[i].summary.split(' ').length > 15 ? newsResponse.articles[i].summary.split(' ').splice(0, 15).join(' ') + '...' : (newsResponse.articles[i].summary);
        } else if (newsResponse.articles[i].excerpt) {
            desc = newsResponse.articles[i].excerpt.split(' ').length > 15 ? newsResponse.articles[i].excerpt.split(' ').splice(0, 15).join(' ') + '...' : newsResponse.articles[i].excerpt;
        } else {
            desc = '';
        }
        newsBody += `
        <div class="col-md-4" dir="auto">
        <a target="_blank" href="${newsResponse.articles[i].link}" class="position-relative d-inline-block">
        <i class="fas fa-external-link-alt position-absolute"></i>
        <img src="${newsResponse.articles[i].media ? newsResponse.articles[i].media : '../images/news-default.jpeg'}" onerror="this.src='../images/news-default.jpeg';" class="w-100 newsimg" alt="">
        </a>
        <h4 class="title text-white">
        ${newsResponse.articles[i].title.split(' ').length> 5 ? newsResponse.articles[i].title.split(' ').splice(0, 5).join(' ') + '...': newsResponse.articles[i].title}
        </h4>
        <p class="description">${desc}</p>
    </div>`;
    }
    document.getElementById('newsPageRow').innerHTML = newsBody;
}
getNews()