const express = require('express');
const { sellItem } = require('../controller/soldController');
const routes = express.Router();

routes.post('/', sellItem);

module.exports = routes;
