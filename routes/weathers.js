'use strict';

const express = require('express');
const sequelize = require('sequelize');
const router = express.Router();
const config = require('../config/config.json')[process.env.NODE_ENV || 'development'];
const WeatherController = require('../controllers/weather');
const database = require('../models/index');

const controller = new WeatherController(config.openWeatherApiKey);

router.get('/search', function(req, res) {  
  const city = req.query.city;

  if (!city) {
    return res.status(400).json({ message: 'Param \'city\' must be informed' });
  }

  controller.searchByCity(city)
    .then(data => res.json(data))
    .catch(error => res.status(500).json({ message: error }));
});

router.get('/summary', function(req, res) {
  controller.summary()
  .then (rows => {
    res.json(rows)
  })
  .catch(error => {
    console.log('Error on try to retrive list')
  })
});

router.get('/last-search', function(req, res) {
  controller.searchList()
  .then (rows => res.json(rows))
  .catch(error => console.log('Error on try to retrive last search'))
});

module.exports = router;
