const db = require('./db');
const helper = require('../helper');
const config = require('../config');

async function getMultiple(page = 1){
  const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
    `SELECT id, name
    FROM disease
    WHERE IS_DELETED = FALSE
    LIMIT ?,?`, 
    [offset, config.listPerPage]
  );
  const data = helper.emptyOrRows(rows);
  const meta = {page};

  return {
    data,
    meta
  }
}

async function create(req){

  const result = await db.query(
    `INSERT INTO cat_disease  
    (disease_id, cat_id) 
    VALUES 
    (?, ?)`, 
    [
      req.disease_id, req.cat_id
    ]
  );

  let message = 'Error in creating cat disease';

  if (result.affectedRows) {
    message = 'Cat disease created successfully';
  }

  return {message};
}  

async function update(id, req){
  const result = await db.query(
    `UPDATE cat_disease 
    SET disease_id=?, cat_id=?
    WHERE id=?`, 
    [
      req.disease_id, req.cat_id
    ]
  );

  let message = 'Error in updating cat-disease';

  if (result.affectedRows) {
    message = 'Cat-disease updated successfully';
  }

  return {message};
}


async function Deleted(id){
  const result = await db.query(
    `UPDATE cat_disease 
    SET is_deleted = TRUE 
    WHERE id=?`, 
    [
      id
    ]
  );

  let message = 'Error in delete disease';

  if (result.affectedRows) {
    message = 'Disease Deleted successfully';
  }

  return {message};
}


module.exports = {
  getMultiple,
  create,
  update,
  Deleted
}
