const express = require('express');
const router = express.Router();
const medication = require('../services/medication');

/* GET. */
router.get('/', async function(req, res, next) {
  try {
    res.json(await medication.getMultiple(req.query.page));
  } catch (err) {
    console.error(`Error while getting Medication `, err.message);
    next(err);
  }
});


/* POST. */
router.post('/', async function(req, res, next) {
  try {
    res.json(await medication.create(req.body));
  } catch (err) {
    console.error(`Error while create medication `, err.message);
    next(err);
  }
});

/* PUT. */
router.put('/:id', async function(req, res, next) {
  try {
    res.json(await medication.update(req.params.id ,req.body));
  } catch (err) {
    console.error(`Error while update medication`, err.message);
    next(err);
  }
});


/* DELETE. */
router.delete('/:id', async function(req, res, next) {
  try {
    res.json(await medication.Deleted(req.params.id));
  } catch (err) {
    console.error(`Error while delete medication`, err.message);
    next(err);
  }
});

module.exports = router;