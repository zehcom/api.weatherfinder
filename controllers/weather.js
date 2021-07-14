'use strict';

const axios = require('axios');

class WeatherController {
    constructor(key) {
        this.apiKey = key;
    }

    searchByCity(city) {
        return new Promise((resolve, reject) => {
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${this.apiKey}`;
            axios.get(url)
            .then(result => {
                const data = result.data;
                resolve({
                    city: data.name,
                    country: data.sys.country,
                    temp: data.main.temp, 
                    description: data.weather.description,
                    humidity: data.main.humidity
                });
            })
            .catch(error => {
                reject('Error on try to get Weather');
            });
        });
    }
}

module.exports = WeatherController;