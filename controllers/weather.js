'use strict';

const sequelize = require('sequelize')
const axios = require('axios');
const models = require('../models');
const { get } = require('../routes');

class WeatherController {
    constructor(key) {
        this.apiKey = key;
    }

    searchByCity(city) {
        return new Promise((resolve, reject) => {
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${this.apiKey}&units=metric&lang=pt_br`;
            axios.get(url)
            .then(result => {
                this.addSearch(result.data)
                .then((weather) => resolve(weather))
                .catch((error) => reject(error));
            })
            .catch(() => reject('Error on try to get Weather'));
        });
    }

    addSearch(data) {
        return new Promise((resolve,reject) => {
            const registryData = {
                city: data.name,
                country: data.sys.country,
                temperature: data.main.temp, 
                description: data.weather[0].description,
                humidity: data.main.humidity,
                icon: data.weather[0].icon 
            };

            models.weathers
            .create(registryData)
            .then((weather) => resolve(weather))
            .catch(() => reject('Error on try to create weather'));
        });
    }

    summary() {
        return new Promise((resolve,reject) => {       
            models.weathers.findAll({
                attributes: [
                    'city',
                    [sequelize.fn('COUNT', 'id'), 'total']
                  ],
                  group: 'city',
                  order: sequelize.literal('COUNT(DISTINCT(id)) DESC'),
                  limit: 5
            })
            .then((weathers) => resolve(weathers))
            .catch((error) => console.log(error));
        });
    }

    searchList() {  
        return new Promise((resolve,reject) => {       
            models.weathers.findAll({
                attributes: ['city'],
                  group: 'id',
                  order: sequelize.literal('id DESC'),
                  limit: 10
            })
            .then((weathers) => resolve(weathers))
            .catch((error) => console.log(error));
        });
    }
}

module.exports = WeatherController;