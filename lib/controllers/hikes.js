const Hike = require('../models/Hike');
const { Router } = require('express');

module.exports = Router()
  .post('/', (req, res, next) => {
    Hike
      .insert(req.body)
      .then(hike => res.send(hike))
      .catch(next);
  })
  .put('/:id', (req, res, next) => {
    Hike
      .updateById(req.params.id, req.body)
      .then(hike => res.send(hike))
      .catch(next);
  })
  .get('/', (req, res, next) => {
    Hike
      .find()
      .then(hikes => res.send(hikes))
      .catch(next);
  })
  .get('/:id', (req, res, next) => {
    Hike
      .findById(req.params.id)
      .then(hike => res.send(hike))
      .catch(next);
  })
  .delete('/:id', (req, res, next) => {
    Hike
      .deleteById(req.params.id)
      .then(hike => res.send(hike))
      .catch(next);
  });
