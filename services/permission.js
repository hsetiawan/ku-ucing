const db = require('./db');
const helper = require('../helper');
const config = require('../config');

async function getMultiple(page = 1){
  const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
    `SELECT id, name
    FROM permission
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
    `INSERT INTO permission  
    (name) 
    VALUES 
    (?)`, 
    [
      req.name
    ]
  );

  let message = 'Error in creating permission';

  if (result.affectedRows) {
    message = 'Permission created successfully';
  }

  return {message};
}  

async function update(id, req){
  const result = await db.query(
    `UPDATE permission 
    SET name=?
    WHERE id=?`, 
    [
      req.name, id
    ]
  );

  let message = 'Error in updating permission';

  if (result.affectedRows) {
    message = 'Permission updated successfully';
  }

  return {message};
}


async function Deleted(id){
  const result = await db.query(
    `UPDATE permission 
    SET is_deleted = TRUE 
    WHERE id=?`, 
    [
      id
    ]
  );

  let message = 'Error in delete permission';

  if (result.affectedRows) {
    message = 'Permission Deleted successfully';
  }

  return {message};
}


module.exports = {
  getMultiple,
  create,
  update,
  Deleted
}
