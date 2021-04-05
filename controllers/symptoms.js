const express = require('express');
const router = express.Router();
const symptoms = require('../services/symptoms');

/* GET. */
router.get('/', async function(req, res, next) {
  try {
    res.json(await symptoms.getMultiple(req.query.page));
  } catch (err) {
    console.error(`Error while getting symptoms `, err.message);
    next(err);
  }
});


/* POST. */
router.post('/', async function(req, res, next) {
  try {
    res.json(await symptoms.create(req.body));
  } catch (err) {
    console.error(`Error while create symptoms `, err.message);
    next(err);
  }
});

/* PUT. */
router.put('/:id', async function(req, res, next) {
  try {
    res.json(await symptoms.update(req.params.id ,req.body));
  } catch (err) {
    console.error(`Error while update symptoms`, err.message);
    next(err);
  }
});


/* DELETE. */
router.delete('/:id', async function(req, res, next) {
  try {
    res.json(await symptoms.Deleted(req.params.id));
  } catch (err) {
    console.error(`Error while update symptoms`, err.message);
    next(err);
  }
});

module.exports = router;