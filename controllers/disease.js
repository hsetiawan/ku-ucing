const express = require('express');
const router = express.Router();
const disease = require('../services/disease');

/* GET. */
router.get('/', async function(req, res, next) {
  try {
    res.json(await disease.getMultiple(req.query.page));
  } catch (err) {
    console.error(`Error while getting disease `, err.message);
    next(err);
  }
});


/* POST. */
router.post('/', async function(req, res, next) {
  try {
    res.json(await disease.create(req.body));
  } catch (err) {
    console.error(`Error while create disease `, err.message);
    next(err);
  }
});

/* PUT. */
router.put('/:id', async function(req, res, next) {
  try {
    res.json(await disease.update(req.params.id ,req.body));
  } catch (err) {
    console.error(`Error while update disease `, err.message);
    next(err);
  }
});


/* DELETE. */
router.delete('/:id', async function(req, res, next) {
  try {
    res.json(await disease.Deleted(req.params.id));
  } catch (err) {
    console.error(`Error while update disease `, err.message);
    next(err);
  }
});

module.exports = router;