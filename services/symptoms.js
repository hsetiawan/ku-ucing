const db = require('./db');
const helper = require('../helper');
const config = require('../config');

async function getMultiple(page = 1){
  const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
    `SELECT id, name
    FROM symptom
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
    `INSERT INTO symptom  
    (name) 
    VALUES 
    (?)`, 
    [
      req.name
    ]
  );

  let message = 'Error in creating symptoms';

  if (result.affectedRows) {
    message = 'Symptoms created successfully';
  }

  return {message};
}

async function update(id, req){
  const result = await db.query(
    `UPDATE symptom 
    SET name=?
    WHERE id=?`, 
    [
      req.name, id
    ]
  );

  let message = 'Error in updating symptoms';

  if (result.affectedRows) {
    message = 'Symptoms updated successfully';
  }

  return {message};
}


async function Deleted(id){
  const result = await db.query(
    `UPDATE symptom 
    SET is_deleted = TRUE 
    WHERE id=?`, 
    [
      id
    ]
  );

  let message = 'Error in delete symptoms';

  if (result.affectedRows) {
    message = 'Symptoms Deleted successfully';
  }

  return {message};
}


module.exports = {
  getMultiple,
  create,
  update,
  Deleted
}
