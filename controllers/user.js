const express = require('express');
const router = express.Router();
const service = require('../services/user');

/* GET cats. */
router.get('/', async function(req, res, next) {
  try {
    res.json(await service.getMultiple(req.query.page));
  } catch (err) {
    console.error(`Error while getting cats `, err.message);
    next(err);
  }
});


/* POST cats. */
router.post('/', async function(req, res, next) {
  try {
    console.log(req);
    res.json(await service.create(req.body));
  } catch (err) {
    console.error(`Error while create cats `, err.message);
    next(err);
  }
});

/* PUT cats. */
router.put('/:id', async function(req, res, next) {
  try {
    console.log(req);
    res.json(await service.update(req.params.id ,req.body));
  } catch (err) {
    console.error(`Error while update cats `, err.message);
    next(err);
  }
});


/* DELETE cats. */
router.delete('/:id', async function(req, res, next) {
  try {
    console.log(req);
    res.json(await service.Deleted(req.params.id));
  } catch (err) {
    console.error(`Error while update cats `, err.message);
    next(err);
  }
});

module.exports = router;