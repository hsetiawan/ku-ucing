const db = require('./db');
const helper = require('../helper');
const config = require('../config');

async function getMultiple(page = 1){
  const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
    `SELECT id, name, disease_id
    FROM medication
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
    `INSERT INTO medication  
    (name, disease_id) 
    VALUES 
    (?, ?)`, 
    [
      req.name, req.disease_id
    ]
  );

  let message = 'Error in creating medication';

  if (result.affectedRows) {
    message = 'Medication created successfully';
  }

  return {message};
}  

async function update(id, req){
  const result = await db.query(
    `UPDATE medication 
    SET name=?, disease_id=?
    WHERE id=?`, 
    [
      req.name, req.disease_id,
      id
    ]
  );

  let message = 'Error in updating Medication';

  if (result.affectedRows) {
    message = 'Medication updated successfully';
  }

  return {message};
}


async function Deleted(id){
  const result = await db.query(
    `UPDATE medication 
    SET is_deleted = TRUE 
    WHERE id=?`, 
    [
      id
    ]
  );

  let message = 'Error in delete medication';

  if (result.affectedRows) {
    message = 'Medication deleted successfully';
  }

  return {message};
}


module.exports = {
  getMultiple,
  create,
  update,
  Deleted
}
