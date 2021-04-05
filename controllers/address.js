const express = require('express');
const router = express.Router();
const address = require('../services/address');

/* GET. */
router.get('/', async function(req, res, next) {
  try {
    res.json(await address.getMultiple(req.query.page));
  } catch (err) {
    console.error(`Error while getting address `, err.message);
    next(err);
  }
});


/* POST. */
router.post('/', async function(req, res, next) {
  try {
    res.json(await address.create(req.body));
  } catch (err) {
    console.error(`Error while create address `, err.message);
    next(err);
  }
});

/* PUT. */
router.put('/:id', async function(req, res, next) {
  try {
    res.json(await address.update(req.params.id ,req.body));
  } catch (err) {
    console.error(`Error while update address `, err.message);
    next(err);
  }
});


/* DELETE. */
router.delete('/:id', async function(req, res, next) {
  try {
    res.json(await address.Deleted(req.params.id));
  } catch (err) {
    console.error(`Error while update address `, err.message);
    next(err);
  }
});

module.exports = router;