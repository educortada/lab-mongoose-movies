'use strict';

const express = require('express');
const router = express.Router();
const Celebrity = require('../models/Celebrity');
const Movie = require('../models/Movie');

// Home
router.get('/', (req, res, next) => {
  res.render('index');
});

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
  // Values from those keys come from the new form
  const newCelebrity = { name, occupation, catchPhrase };
  try {
    // Save newCelebrity to DB
    await Celebrity.create(newCelebrity);
    res.redirect('/celebrities');
  } catch (error) {
    res.render('celebritie/new');
  }
});

// Celebrity detail
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

// Form to edit a celebrity (GET)
router.get('/celebrities/:id/edit', async (req, res, next) => {
  const { id } = req.params;
  try {
    const celebritie = await Celebrity.findById(id);
    res.render('celebrities/edit', celebritie);
  } catch (error) {
    next(error);
  }
});

// Send the data from the edit form to update and save the celebrity from the database (POST)
router.post('/celebrities/:id', async (req, res, next) => {
  const { id } = req.params;
  const { name, occupation, catchPhrase } = req.body;
  // Values from those keys come from the edit form
  const updatedCelebrity = { name, occupation, catchPhrase };
  // Why _id = undefined?¿
  try {
    // Update celebrity to DB
    await Celebrity.findByIdAndUpdate(id, updatedCelebrity);
    res.redirect('/celebrities');
  } catch (error) {
    next(error);
  }
});

// Movies
router.get('/movies', async (req, res, next) => {
  try {
    const moviesArray = await Movie.find();
    res.render('movies/index', { movies: moviesArray });
  } catch (error) {
    next(error);
  }
});

// Form to add new movie (GET)
router.get('/movies/new', (req, res, next) => {
  res.render('movies/new');
});

// Send the data from the form to create the movie and save to the database (POST)
router.post('/movies', async (req, res, next) => {
  const { title, genre, plot } = req.body;
  // Values from those keys come from the new form
  const newMovie = { title, genre, plot };
  try {
    // Save newCelebrity to DB
    await Movie.create(newMovie);
    res.redirect('/movies');
  } catch (error) {
    res.render('movies/new');
  }
});

// Movie detail
router.get('/movies/:id', async (req, res, next) => {
  const { id } = req.params;
  try {
    const movie = await Movie.findById(id);
    res.render('movies/show', movie);
  } catch (error) {
    next(error);
  }
});

// Delete movies
router.post('/movies/:id/delete', async (req, res, next) => {
  const { id } = req.params;
  try {
    await Movie.findByIdAndDelete(id);
    res.redirect('/movies');
  } catch (error) {
    next(error);
  }
});

// Form to edit a movie (GET)
router.get('/movies/:id/edit', async (req, res, next) => {
  const { id } = req.params;
  try {
    const movie = await Movie.findById(id);
    res.render('movies/edit', movie);
  } catch (error) {
    next(error);
  }
});

// Send the data from the edit form to update and save the movie from the database (POST)
router.post('/movies/:id', async (req, res, next) => {
  const { id } = req.params;
  const { title, genre, plot } = req.body;
  // Values from those keys come from the edit form
  const updatedMovie = { title, genre, plot };
  // Why _id = undefined?¿
  try {
    // Update movie to DB
    await Movie.findByIdAndUpdate(id, updatedMovie);
    res.redirect('/movies');
  } catch (error) {
    next(error);
  }
});

module.exports = router;
