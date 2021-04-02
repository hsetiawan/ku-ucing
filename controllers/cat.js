const express = require('express');
const router = express.Router();
const cats = require('../services/cat');

/* GET cats. */
router.get('/', async function(req, res, next) {
  try {
    res.json(await cats.getMultiple(req.query.page));
  } catch (err) {
    console.error(`Error while getting cats `, err.message);
    next(err);
  }
});


/* POST cats. */
router.post('/', async function(req, res, next) {
  try {
    console.log(req);
    res.json(await cats.create(req.body));
  } catch (err) {
    console.error(`Error while create cats `, err.message);
    next(err);
  }
});


module.exports = router;