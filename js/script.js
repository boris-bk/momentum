const time = document.querySelector('.time');
const day = document.querySelector('.date');
const greeting = document.querySelector('.greeting');
const slidePrev = document.querySelector('.slide-prev');
const slideNext = document.querySelector('.slide-next');

function getRandomNum(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //Максимум не включается, минимум включается
}
let randomBG = getRandomNum(1, 20);
slidePrev.addEventListener('click', () => {
    if (randomBG === 1) randomBG = 21;
    randomBG--;
});
slideNext.addEventListener('click', () => {
    if (randomBG === 20) randomBG = 0;
    randomBG++;
});

function showTime() {
    const date = new Date();
    const currentTime = date.toLocaleTimeString();
    const currentDay = date.toLocaleDateString();
    let timeOfDay = '';
    time.textContent = currentTime;
    day.textContent = currentDay;
    function showGreeting() {
        function getTimeOfDay() {
            const hours = date.getHours();
            if (hours < 6) {
                timeOfDay = 'night'
                return 'Дабранач';
            }
            if (hours > 5 && hours < 12) {
                timeOfDay = 'morning'
                return 'Добрай раніцы';
            }
            if (hours > 11 && hours < 18) {
                timeOfDay = 'afternoon'
                return 'Добры дзень';
            }
            if (hours > 17 && hours < 24) {
                timeOfDay = 'evening'
                return 'Добры вечар';
            }
        }
        const greetingText = getTimeOfDay();
        greeting.textContent = greetingText;
    }
    showGreeting()
    randomBG = randomBG.toString().padStart(2, "0");
    function setBg() {
       /* const img = new Image();
        img.src = // здесь ваш код
            img.onload = () => {
                document.body.style.backgroundImage = `url('https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${timeOfDay}/${randomBG}.jpg')`
            };*/
        document.body.style.backgroundImage = `url('https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${timeOfDay}/${randomBG}.jpg')`;
    }
    setBg()
    setTimeout(showTime, 1000);
}
showTime();


const name = document.querySelector('.name');
const city = document.querySelector('.city');
city.value = 'Ереван'
function setLocalStorage() {
    localStorage.setItem('name', name.value);
}
window.addEventListener('beforeunload', setLocalStorage)
function getLocalStorage() {
    if(localStorage.getItem('name')) {
        name.value = localStorage.getItem('name');
    }
}
window.addEventListener('load', getLocalStorage)
city.addEventListener("change", getWeather);
const weatherIcon = document.querySelector('.weather-icon');
const temperature = document.querySelector('.temperature');
const weatherDescription = document.querySelector('.weather-description');

weatherIcon.className = 'weather-icon owf';
async function getWeather() {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&lang=ru&appid=8c9b2a311778030ece2fdcf1d0276834&units=metric`;
    const res = await fetch(url);
    const data = await res.json();
    weatherIcon.classList.add(`owf-${data.weather[0].id}`);
    temperature.textContent = `${data.main.temp}°C`;
    weatherDescription.textContent = data.weather[0].description;
}
getWeather()

const quote = document.querySelector('.quote');
const author = document.querySelector('.author');
const changeQuote = document.querySelector('.change-quote');
changeQuote.addEventListener('click', getQuotes);
async function getQuotes() {
    const quotes = 'data.json';
    const res = await fetch(quotes);
    const data = await res.json();
    let randomQuote = getRandomNum(1, 4);
    quote.textContent = data[randomQuote].text;
    author.textContent = data[randomQuote].author;
}
getQuotes();

import playList from './playList.js';


for(let i = 0; i < playList.length; i++) {
    let ul = document.querySelector('.play-list');
    let li = document.createElement("li");
    ul.appendChild(li);
    li.setAttribute('id','proList');
    li.textContent = playList[i].title;
    li.classList.add('track-item');
}
let isPlay = false;
let playNum = 0;
const playPrev = document.querySelector('.play-prev');
const playNext = document.querySelector('.play-next');
const playBtn = document.querySelector('.play');
const audio = new Audio();
let pauseTime = 0;
function playAudio() {
    if(!isPlay) {
        isPlay = true;
        audio.src = playList[playNum].src
        audio.currentTime = pauseTime;
        audio.play();
        checkAudio();
        playBtn.classList.add('pause');
    }
    else {
        isPlay = false;
        playBtn.classList.remove('pause');
        audio.pause();
        pauseTime = audio.currentTime;
    }
    let li = document.querySelectorAll('.track-item');
    for (let y = 0; y < li.length; y++) {
        li[y].classList.remove('play-item');
    }
    li[playNum].classList.add('play-item');
}
function prevAudio () {
    if (playNum === 0) playNum = playList.length;
    playNum--;
    let pauseTime = 0;
    isPlay = false;
    playAudio()
}
function nextAudio () {
    if (playNum === playList.length-1) playNum = -1;
    playNum++
    let pauseTime = 0;
    isPlay = false;
    playAudio()
}
playPrev.addEventListener('click', prevAudio);
playNext.addEventListener('click', nextAudio);
playBtn.addEventListener('click', playAudio);
function checkAudio () {
    if (playList[playNum].long < audio.currentTime) nextAudio()
    setTimeout(checkAudio, 1000);
    console.log(playList[playNum].long + ' - ' + audio.currentTime)
}


