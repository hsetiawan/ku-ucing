const db = require('./db');
const helper = require('../helper');
const config = require('../config');

async function getMultiple(page = 1){
  const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
    `SELECT id, name, gender, age, color, user_id
    FROM cat
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
  console.log(req);

  const result = await db.query(
    `INSERT INTO cat  
    (name, gender, age, color, user_id) 
    VALUES 
    (?, ?, ?, ?, ?)`, 
    [
      req.name, req.gender,
      req.age, req.color,
      req.user_id
    ]
  );

  let message = 'Error in creating cat';

  if (result.affectedRows) {
    message = 'Cat created successfully';
  }

  return {message};
}

async function update(id, req){
  const result = await db.query(
    `UPDATE cat 
    SET name=?, gender=?, age=?, 
    color=?, user_id=? 
    WHERE id=?`, 
    [
      req.name, req.gender,
      req.age, req.color,
      req.user_id, id
    ]
  );

  let message = 'Error in updating cat';

  if (result.affectedRows) {
    message = 'Cat updated successfully';
  }

  return {message};
}


async function Deleted(id){
  const result = await db.query(
    `UPDATE cat 
    SET is_deleted = TRUE 
    WHERE id=?`, 
    [
      id
    ]
  );

  let message = 'Error in delete cat';

  if (result.affectedRows) {
    message = 'Cat Deleted successfully';
  }

  return {message};
}


module.exports = {
  getMultiple,
  create,
  update,
  Deleted
}
