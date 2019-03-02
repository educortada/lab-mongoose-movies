'use strict';

const express = require('express');
const router = express.Router();
const Celebrity = require('../models/Celebrity');

// Home
router.get('/', (req, res, next) => {
  res.render('index');
});

module.exports = router;

// Celebrities
router.get('/celebrities', async (req, res, next) => {
  try {
    const celebritiesArray = await Celebrity.find();
    res.render('celebrities/index', { celebrities: celebritiesArray });
  } catch (error) {
    next(error);
  }
});
