'use strict';

const express = require('express');
const router = express.Router();
const config = require('../config.json');
const WeatherController = require('../controllers/weather');

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

module.exports = router;
