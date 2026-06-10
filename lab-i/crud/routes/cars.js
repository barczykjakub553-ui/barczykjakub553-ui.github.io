var express = require('express');
var router = express.Router();
var Car = require('../models/car');

/* GET cars listing. */
router.get('/', function(req, res, next) {
  const cars = Car.findAll();
  res.render('cars/index', { title: 'Cars List', cars: cars });
});

/* GET create car form. */
router.get('/create', function(req, res, next) {
  res.render('cars/create', { title: 'Create New Car', car: null });
});

/* POST create car. */
router.post('/create', function(req, res, next) {
  const { subject, content, carModel } = req.body;
  const car = new Car({ subject, content, carModel });
  car.save();
  res.redirect('/cars');
});

/* GET show car details. */
router.get('/:id', function(req, res, next) {
  const car = Car.find(req.params.id);
  if (!car) {
    return res.status(404).render('error', { message: 'Car not found', error: { status: 404 } });
  }
  res.render('cars/show', { title: car.subject, car: car });
});

/* GET edit car form. */
router.get('/:id/edit', function(req, res, next) {
  const car = Car.find(req.params.id);
  if (!car) {
    return res.status(404).render('error', { message: 'Car not found', error: { status: 404 } });
  }
  res.render('cars/edit', { title: 'Edit Car', car: car });
});

/* POST edit car. */
router.post('/:id/edit', function(req, res, next) {
  const car = Car.find(req.params.id);
  if (!car) {
    return res.status(404).render('error', { message: 'Car not found', error: { status: 404 } });
  }
  const { subject, content, carModel } = req.body;
  car.subject = subject;
  car.content = content;
  car.carModel = carModel;
  car.save();
  res.redirect('/cars');
});

/* POST delete car. */
router.post('/:id/delete', function(req, res, next) {
  Car.delete(req.params.id);
  res.redirect('/cars');
});

module.exports = router;
