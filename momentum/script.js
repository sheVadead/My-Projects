let momentumObject = {
    classes: {
        time: document.querySelector('time'),
        greeting: document.querySelector('.greeting'),
        name: document.querySelector('.name'),
        focusQuestion: document.querySelector('.focus-question'),
        focus: document.querySelector('#focus'),
        day: document.querySelector('.day'),
        month: document.querySelector('.month'),
        wrapper: document.querySelector('.wrapper'),
        date: document.querySelector('.date'),
        searchTown: document.querySelector('.search-box'),
        city: document.querySelector('.city'),
        temp: document.querySelector('.temp'),
        weatherIcon: document.querySelector('.weather-icon'),
        weatherDesc: document.querySelector('.weather'),
        backgroundWrap: document.querySelector('.background-wrapper'),
        weatherPop: document.querySelector('.app-wrap'),
        wind: document.querySelector('.wind-speed'),
        humidityInfo: document.querySelector('.humidity-info'),
        textQuote: document.querySelector('.text'),
        author: document.querySelector('.author'),
        reloadBtn: document.querySelector('.btn'),
        qotd: document.querySelector('.quote-of-the-day'),
        focusQuestion: document.querySelector('.focus-question'),
        searchBox: document.querySelector('.search-box'),
        headerWeather: document.querySelector('header'),
        errorText: document.querySelector('.error-text')
    },
    addZero(n) {
        return (parseInt(n, 10) < 10 ? '0' : '') + n
    },
    startTime() {
        let data = new Date();
        let hours = data.getHours();
        let minutes = data.getMinutes();
        let sec = data.getSeconds();
        momentumObject.classes.time.innerHTML = `${hours}<span>:</span>${momentumObject.addZero(minutes)}<span>:</span>${momentumObject.addZero(sec)}`;
    },
    startDay() {
        let data = new Date()
        this.classes.month.innerHTML = data.toLocaleDateString("ru-RU", {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
        momentumObject.classes.date.innerHTML = data.toLocaleDateString("ru-RU", {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });

    },
    changeBackground() {
        let data = new Date();
        let hours = data.getHours();
        if (6 <= hours && hours <= 12) {
            momentumObject.classes.greeting.textContent = 'Good morning, ';
            momentumObject.classes.greeting.style.color = '#cad7e4';
            momentumObject.classes.focusQuestion.style.color = '#cad7e4';
            momentumObject.classes.name.style.color = 'bisque';
            momentumObject.classes.qotd.style.color = 'rgb(216 225 234)';
            document.body.style.backgroundImage = 'url("assets/images/02.jpg")';
            momentumObject.classes.time.style.color = 'rgb(8, 7, 5)'
            momentumObject.classes.searchBox.style.backgroundColor = 'rgb(29 111 149)';
            momentumObject.classes.focus.style.color = 'bisque';
            momentumObject.classes.textQuote.style.color = 'rgb(216 225 234)';
            momentumObject.classes.author.style.color = 'rgb(216 225 234)';
            momentumObject.classes.weatherPop.style.backgroundImage = "linear-gradient(to bottom, rgb(15 109 155), rgb(48 66 11))";
        } else if (12 < hours && hours <= 18) {
            momentumObject.classes.greeting.textContent = 'Good afternoon, ';
            document.body.style.backgroundImage = 'url("assets/images/afternoon.jpg")';
            momentumObject.classes.time.style.color = '#b6681e';
            momentumObject.classes.focus.style.color = '#b6681e';
            momentumObject.classes.weatherPop.style.backgroundImage = "linear-gradient(to bottom, rgba(163, 135, 73, 0.6), rgba(255, 163, 43, 0.76))"
            momentumObject.classes.textQuote.style.color = 'black';
            momentumObject.classes.qotd.style.color = 'chocolate';
        } else if (18 < hours) {
            momentumObject.classes.greeting.textContent = 'Good evening, ';
            document.body.style.backgroundImage = 'url("assets/images/evening.png")'
            momentumObject.classes.weatherPop.style.backgroundImage = "linear-gradient(to bottom, rgb(179 41 19 / 60%), rgb(214 126 126 / 43%))"
            momentumObject.classes.textQuote.style.color = 'white';
            momentumObject.classes.qotd.style.color = 'white'
            momentumObject.classes.author.style.color = 'white'
            momentumObject.classes.searchBox.style.backgroundColor = 'rgb(161 44 11)'

        } else  if(hours < 6 && 0 <= hours) {
            momentumObject.classes.greeting.textContent = 'Good night, '
            document.body.style.backgroundImage = 'url("assets/images/night.jpg")';
            momentumObject.classes.qotd.style.color = 'white';
            momentumObject.classes.author.style.color = 'white';
            momentumObject.classes.textQuote.style.color = 'white';
            momentumObject.classes.focusQuestion.style.color = '#cad7e4';
            momentumObject.classes.name.style.color = 'bisque';
            momentumObject.classes.greeting.style.color = 'white';
            momentumObject.classes.searchBox.style.backgroundColor = 'grey'
            momentumObject.classes.month.style.color = 'white';
        }
    },
    getWeatherData(city) {
        let promise = fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&lang=ru&appid=0e4043b05d572b6ae940f8ae8e46eac8&units=metric`);
        promise.then(response => response.json()).then(weatherData => {
            this.configureWeather(weatherData)
            this.setWeather(weatherData);
            this.focusHandler();
        }).catch(() => {
            momentumObject.classes.errorText.textContent = 'Такого города не существует!';
            momentumObject.classes.errorText.classList.add('error');
            momentumObject.classes.searchBox.classList.add('tremor');
            momentumObject.classes.searchBox.style.borderColor = 'red';
            this.hideError();
        })
    },
    findCity() {
        momentumObject.classes.searchTown.addEventListener('keypress', (e) => {
            if (e.keyCode == 13) {
                this.getWeatherData(momentumObject.classes.searchTown.value);
            }
        })
        momentumObject.classes.searchTown.addEventListener('focus', () => {
            momentumObject.classes.searchTown.placeholder = ''
        })
        momentumObject.classes.searchTown.addEventListener('blur', () => {
            momentumObject.classes.searchTown.placeholder = 'Search for a city...';
        })
    },
    configureWeather(weatherData) {
        console.log(weatherData)

        localStorage.setItem('city', `${weatherData.name}, ${weatherData.sys.country}`);
        localStorage.setItem('temp', `${weatherData.main.temp.toFixed(0)}<span>°c</span>`);
        localStorage.setItem('weather', weatherData.weather[0].description);
        localStorage.setItem('wind', weatherData.wind.speed + 'м/c');
        localStorage.setItem('humidityInfo', weatherData.main.humidity + '%');
        localStorage.setItem('date', momentumObject.classes.date.innerText);
        localStorage.setItem('icon', `owf-${weatherData.weather[0].id}`);



    },
    getQuote() {
        let url = "https://favqs.com/api/qotd";
        fetch(url).then(response => response.json()).then(quoteData => {
            momentumObject.classes.textQuote.textContent = ` \"${quoteData.quote.body}\"`;
            momentumObject.classes.author.textContent = quoteData.quote.author;

        })
        momentumObject.classes.qotd.addEventListener('click', this.getQuote);
    },
    getName(e) {
        if (localStorage.getItem('name') === null) {
            momentumObject.classes.name.textContent = '[Enter Name]';
        } else {
            momentumObject.classes.name.textContent = localStorage.getItem('name');
        }
    },
    getFocus(e) {
        if (localStorage.getItem('focus') === null) {
            momentumObject.classes.focus.textContent = '[What in focus today?]';
        } else {
            momentumObject.classes.focus.textContent = localStorage.getItem('focus');
        }
    },
    setName(e) {
        if (e.type === 'keypress') {
            // Make sure enter is pressed
            if (e.which == 13 || e.keyCode == 13) {
                localStorage.setItem('name', e.target.innerText);
                momentumObject.classes.name.blur();
            }
        } else {
            localStorage.setItem('name', e.target.innerText);
        }

    },
    setFocus(e) {

        if (e.type === 'keypress') {
            // Make sure enter is pressed
            if (e.which == 13 || e.keyCode == 13) {
                localStorage.setItem('focus', e.target.innerText);
                momentumObject.classes.focus.blur();
            }
        } else {
            localStorage.setItem('focus', e.target.innerText);
        }
    },
    setWeather(weatherData) {
        momentumObject.classes.weatherIcon.className = 'weather-icon owf';
        momentumObject.classes.city.textContent = `${weatherData.name}, ${weatherData.sys.country}`;
        momentumObject.classes.temp.innerHTML = `${weatherData.main.temp.toFixed(0)}<span>°c</span>`
        momentumObject.classes.weatherIcon.classList.add(`owf-${weatherData.weather[0].id}`);
        momentumObject.classes.weatherDesc.textContent = weatherData.weather[0].description;
        momentumObject.classes.wind.textContent = weatherData.wind.speed + 'м/c';
        momentumObject.classes.humidityInfo.textContent = weatherData.main.humidity + '%';
    },

    getLocalWeather() {
        if (localStorage.getItem('temp')) {
            momentumObject.classes.temp.innerHTML = localStorage.getItem('temp');
            momentumObject.classes.city.innerHTML = localStorage.getItem('city');
            momentumObject.classes.weatherDesc.innerHTML = localStorage.getItem('weather');
            momentumObject.classes.humidityInfo.innerHTML = localStorage.getItem('humidityInfo');
            momentumObject.classes.wind.innerHTML = localStorage.getItem('wind');
            momentumObject.classes.weatherIcon.classList.add(localStorage.getItem('icon'));

        }
    },
    setAll() {
        momentumObject.classes.name.addEventListener('keypress', this.setName);
        momentumObject.classes.name.addEventListener('blur', () => {
            momentumObject.classes.name.textContent = localStorage.getItem('name');
        });
        momentumObject.classes.focus.addEventListener('keypress', this.setFocus);
        momentumObject.classes.focus.addEventListener('blur', () => {
            momentumObject.classes.focus.textContent = localStorage.getItem('focus');
        });;

    },
    focusHandler() {
        momentumObject.classes.name.addEventListener('click', () => {

            momentumObject.classes.name.textContent = '';
        })
        momentumObject.classes.focus.addEventListener('click', () => {

            momentumObject.classes.focus.textContent = '';
        })

    },
    hideError() {
        setTimeout(() => {
            setTimeout(() => {
                momentumObject.classes.searchBox.classList.remove('tremor');
                momentumObject.classes.errorText.classList.remove('error');
                momentumObject.classes.searchBox.style.borderColor = '';
                momentumObject.classes.errorText.textContent = '';
            }, 2000)
        })
    },
    init() {
        let timerId = setInterval(this.startTime, 1000);
        this.startDay();
        this.changeBackground();
        this.findCity();
        this.getQuote();
        this.getName();
        this.getFocus();
        this.setAll();
        this.getLocalWeather();
        this.focusHandler();
    }
}

momentumObject.init()