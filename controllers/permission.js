const express = require('express');
const router = express.Router();
const permission = require('../services/permission');

/* GET. */
router.get('/', async function(req, res, next) {
  try {
    res.json(await permission.getMultiple(req.query.page));
  } catch (err) {
    console.error(`Error while getting permission `, err.message);
    next(err);
  }
});


/* POST. */
router.post('/', async function(req, res, next) {
  try {
    res.json(await permission.create(req.body));
  } catch (err) {
    console.error(`Error while create permission `, err.message);
    next(err);
  }
});

/* PUT. */
router.put('/:id', async function(req, res, next) {
  try {
    res.json(await permission.update(req.params.id ,req.body));
  } catch (err) {
    console.error(`Error while update permission `, err.message);
    next(err);
  }
});


/* DELETE. */
router.delete('/:id', async function(req, res, next) {
  try {
    res.json(await permission.Deleted(req.params.id));
  } catch (err) {
    console.error(`Error while update permission `, err.message);
    next(err);
  }
});

module.exports = router;