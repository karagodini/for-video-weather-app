const apiKey = '8e1b65741c769ffdd9edc60ba431504f'
const locButton = document.querySelector('.loc-button')
const todayInfo = document.querySelector('.today-info')
const todayWeatherIcon = document.querySelector('.today-weather')
const todayTemp = document.querySelector('.weather-temp')
const daysList = document.querySelector('.days-list')


//Сопоставление кодов погодных условий с именами классов значков (в зависимости от ответа openweather api)
const weatherIconMap = {
    '01d': 'sun',
    '01n': 'moon',
    '02d': 'sun',
    '02n': 'moon',
    '03d': 'cloud',
    '03n': 'cloud',
    '04d': 'cloud',
    '04n': 'cloud',
    '09d': 'cloud-rain',
    '09n': 'cloud-rain',
    '10d': 'cloud-rain',
    '10n': 'cloud-rain',
    '11d': 'cloud-lightning',
    '11n': 'cloud-lightning',
    '13d': 'cloud-snow',
    '13n': 'cloud-snow',
    '50d': 'water',
    '50n': 'water'
}

function fetchWeatherData(location){
    //Создайте URL-адрес API с указанием местоположения и ключа api
    const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${location}&appid=${apiKey}&units=metric`

    //Извлекать данные о погоде из api
    /*fetch(apiUrl).then(response => response.json()).then(data => {
        //Обновите сегодняшнюю информацию
        const todayWeather = data.list[0].weather[0].description
        const todayTemperature = `${Math.round(data.list[0].main.temp)}°C`
        const todayWeatherIconCode = data.list[0].weather[0].icon

        todayInfo.querySelector('h2').textContent = new Date().toLocaleDateString('en', {weekday: 'long'})
        todayInfo.querySelector('span').textContent = new Date().toLocaleDateString('en', {day: 'numeric', month: 'long', year: 'numeric'})
        todayWeatherIcon.className = `bx bx-${weatherIconMap[todayWeatherIconCode]}`
        todayTemp.textContent = todayTemperature

        //Обновите описание местоположения и погоды в разделе "left-info"
        const locationElement = document.querySelector('.today-info > div > span')
        locationElement.textContent = `${data.city.name}, ${data.city.country}`

        const weatherDescriptionElement = document.querySelector('.today-weather > h3')
        weatherDescriptionElement.textContent = todayWeather

        //Обновите сегодняшнюю информацию в разделе "day-info"
        const todayPrecipitation = `${Math.round(data.list[0].pop * 100)}%`
        const todayHumidity = `${data.list[0].main.humidity}%`
        const todayWindSpeed = `${data.list[0].wind.speed}km/h`

        const dayInfoContainer = document.querySelector('.day-info')
        dayInfoContainer.innerHTML = `
            <div>
                <span class"title">ОСАДКИ</span>
                <span class="value">${todayPrecipitation}</span>
            </div>
            <div>
                <span class"title">ВЛАЖНОСТЬ</span>
                <span class="value">${todayHumidity}</span>
            </div>
            <div>
                <span class"title">СКОРОСТЬ ВЕТРА</span>
                <span class="value">${todayWindSpeed}</span>
            </div>
        `


        //Обновление погоды на следующие 4 дня
        const today = new Date()
        const nextDaysData = data.list.slice(1)
        const uniqueDays = new Set()
        let count = 0
        daysList.innerHTML = ''
        for(const dayData of nextDaysData){
            const forecastDate = new Date(dayData.dt_txt)
            const dayAbbreviation = forecastDate.toLocaleDateString('en', {weekday: 'short'})
            const dayTemp = `${Math.round(dayData.main.temp)}°C`
            const iconCode = dayData.weather[0].icon

            //Убедитесь, что этот день не повторяется и сегодня
            if(!uniqueDays.has(dayAbbreviation) && forecastDate.getDate() !== today.getDate()){
                uniqueDays.add(dayAbbreviation)
                daysList.innerHTML += `
                    <li>
                        <i class='bx bx-${weatherIconMap[iconCode]}'></i>
                        <span>${dayAbbreviation}</span>
                        <span class='day-temp'>${dayTemp}</span>
                    </li>
                `
                count++
            }

            //Прекратите через 4 отдельных дня
            if (count === 4) break
        }
    })*/
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            // Обновляем сегодняшнюю информацию
            const todayWeather = data.list[0].weather[0].description;
            const todayTemperature = `${Math.round(data.list[0].main.temp)}°C`;
            const todayWeatherIconCode = data.list[0].weather[0].icon;

            const todayInfo = document.querySelector('.today-info');
            const todayWeatherIcon = document.querySelector('.today-weather-icon');
            const todayTemp = document.querySelector('.today-temp');

            if (todayInfo && todayWeatherIcon && todayTemp) {
                todayInfo.querySelector('h2').textContent = new Date().toLocaleDateString('en', { weekday: 'long' });
                todayInfo.querySelector('span').textContent = new Date().toLocaleDateString('en', { day: 'numeric', month: 'long', year: 'numeric' });
                todayWeatherIcon.className = `bx bx-${weatherIconMap[todayWeatherIconCode]}`;
                todayTemp.textContent = todayTemperature;
            } else {
                console.error('Некоторые элементы today-info не найдены');
            }

            // Обновляем описание местоположения и погоды в left-info
            const locationElement = document.querySelector('.today-info > div > span');
            const weatherDescriptionElement = document.querySelector('.today-weather > h3');

            if (locationElement && weatherDescriptionElement) {
                locationElement.textContent = `${data.city.name}, ${data.city.country}`;
                weatherDescriptionElement.textContent = todayWeather;
            } else {
                console.error('Некоторые элементы left-info не найдены');
            }

            // Обновляем сегодняшнюю информацию в day-info
            const todayPrecipitation = `${Math.round(data.list[0].pop * 100)} %`;
            const todayHumidity = `${data.list[0].main.humidity} %`;
            const todayWindSpeed = `${data.list[0].wind.speed} km/h`;

            const dayInfoContainer = document.querySelector('.day-info');

            if (dayInfoContainer) {
                dayInfoContainer.innerHTML = `
                    <div>
                        <span class="title">ОСАДКИ</span>
                        <span class="value">${todayPrecipitation}</span>
                    </div>
                    <div>
                        <span class="title">ВЛАЖНОСТЬ</span>
                        <span class="value">${todayHumidity}</span>
                    </div>
                    <div>
                        <span class="title">СКОРОСТЬ ВЕТРА</span>
                        <span class="value">${todayWindSpeed}</span>
                    </div>
                `;
            } else {
                console.error('day-info элемент не найден');
            }

            // Обновляем погоду на следующие 4 дня
            const today = new Date();
            const nextDaysData = data.list.slice(1);
            const uniqueDays = new Set();
            let count = 0;
            const daysList = document.querySelector('.days-list');
            
            if (daysList) {
                daysList.innerHTML = '';
                for (const dayData of nextDaysData) {
                    const forecastDate = new Date(dayData.dt_txt);
                    const dayAbbreviation = forecastDate.toLocaleDateString('en', { weekday: 'short' });
                    const dayTemp = `${Math.round(dayData.main.temp)}°C`;
                    const iconCode = dayData.weather[0].icon;

                    // Убедитесь, что этот день не повторяется и не является сегодня
                    if (!uniqueDays.has(dayAbbreviation) && forecastDate.getDate() !== today.getDate()) {
                        uniqueDays.add(dayAbbreviation);
                        daysList.innerHTML += `
                            <li>
                                <i class='bx bx-${weatherIconMap[iconCode]}'></i>
                                <span>${dayAbbreviation}</span>
                                <span class='day-temp'>${dayTemp}</span>
                            </li>
                        `;
                        count++;
                    }

                    // Прекращаем через 4 отдельных дня
                    if (count === 4) break;
                }
            } else {
                console.error('days-list элемент не найден');
            }
        })
    .catch(error =>{
        alert(`Ошибка при получении данных о погоде: ${error}(Api Error)`)
    })
}

//Получение данных о погоде при загрузке документа для местоположения по умолчанию (Германия)
document.addEventListener('DOMContentLoaded', () => {
    const defaultLocation = 'Germany'
    fetchWeatherData(defaultLocation)
})

locButton.addEventListener('click', () => {
    const location = prompt('Enter location :')
    if (!location) return
    fetchWeatherData(location)
})