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
    `INSERT INTO disease  
    (name) 
    VALUES 
    (?)`, 
    [
      req.name
    ]
  );

  let message = 'Error in creating disease';

  if (result.affectedRows) {
    message = 'Disease created successfully';
  }

  return {message};
}  

async function update(id, req){
  const result = await db.query(
    `UPDATE disease 
    SET name=?
    WHERE id=?`, 
    [
      req.name, id
    ]
  );

  let message = 'Error in updating disease';

  if (result.affectedRows) {
    message = 'Disease updated successfully';
  }

  return {message};
}


async function Deleted(id){
  const result = await db.query(
    `UPDATE disease 
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
