const db = require('./db');
const helper = require('../helper');
const config = require('../config');

async function getMultiple(page = 1){
  const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
    `SELECT id, disease_id, symptoms_id
    FROM diagnosis
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
    `INSERT INTO diagnosis  
    (disesae_id, symptoms_id) 
    VALUES 
    (?, ?)`, 
    [
      req.disease_id, req.symptoms_id
    ]
  );

  let message = 'Error in creating diagnosis';

  if (result.affectedRows) {
    message = 'Diagnosis created successfully';
  }

  return {message};
}  

async function update(id, req){
  const result = await db.query(
    `UPDATE diagnosis 
    SET disease_id=?,
    symptoms_id=?
    WHERE id=?`, 
    [
      req.disease_id, req.symptoms_id, id
    ]
  );

  let message = 'Error in updating diagnosis';

  if (result.affectedRows) {
    message = 'Diagnosis updated successfully';
  }

  return {message};
}


async function Deleted(id){
  const result = await db.query(
    `UPDATE diagnosis 
    SET is_deleted = TRUE 
    WHERE id=?`, 
    [
      id
    ]
  );

  let message = 'Error in delete diagnosis';

  if (result.affectedRows) {
    message = 'Diagnosis Deleted successfully';
  }

  return {message};
}


module.exports = {
  getMultiple,
  create,
  update,
  Deleted
}
