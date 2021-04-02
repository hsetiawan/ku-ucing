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

module.exports = router;