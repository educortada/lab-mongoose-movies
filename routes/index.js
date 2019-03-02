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

// Form to create a celebrity (GET)
router.get('/celebrities/new', (req, res, next) => {
  res.render('celebrities/new');
});

// Send the data from the form to create the celebrity and save to the database (POST)
router.post('/celebrities', async (req, res, next) => {
  const { name, occupation, catchPhrase } = req.body;
  // Values from those keys come from the form
  const newCelebrity = { name, occupation, catchPhrase };
  try {
    // Save newCelebrity to DB
    await Celebrity.create(newCelebrity);
    res.redirect('/celebrities');
  } catch (error) {
    res.render('celebritie/new');
  }
});

// Detail
router.get('/celebrities/:id', async (req, res, next) => {
  const { id } = req.params;
  try {
    const celebritie = await Celebrity.findById(id);
    res.render('celebrities/show', celebritie);
  } catch (error) {
    next(error);
  }
});

// Delete celebrity

router.post('/celebrities/:id/delete', async (req, res, next) => {
  const { id } = req.params;
  try {
    await Celebrity.findByIdAndDelete(id);
    res.redirect('/celebrities');
  } catch (error) {
    next(error);
  }
});
