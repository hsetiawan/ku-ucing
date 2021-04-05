const db = require('./db');
const helper = require('../helper');
const config = require('../config');

async function getMultiple(page = 1){
  const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
    `SELECT id, name, email, phoneNumber, gender
    FROM user
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
    `INSERT INTO user  
    (name, email, phoneNumber, gender, password,  permission_id) 
    VALUES 
    (?, ?, ?, ?, ?, ?)`, 
    [
      req.name, req.email,
      req.phoneNumber, req.gender, 
      req.password, req.permission_id
    ]
  );

  let message = 'Error in creating User';

  if (result.affectedRows) {
    message = 'User created successfully';
  }

  return {message};
}

async function update(id, req){
  const result = await db.query(
    `UPDATE user 
    SET name=?, email=?, phoneNumber=?, gender=?,  
    permission_id=?
    WHERE id=?`, 
    [
      req.name, req.email,
      req.phoneNumber, req.gender,
      req.permission_id, id
    ]
  );

  let message = 'Error in updating user';

  if (result.affectedRows) {
    message = 'User updated successfully';
  }

  return {message};
}


async function Deleted(id){
  const result = await db.query(
    `UPDATE user 
    SET is_deleted = TRUE 
    WHERE id=?`, 
    [
      id
    ]
  );

  let message = 'Error in delete user';

  if (result.affectedRows) {
    message = 'User deleted successfully';
  }

  return {message};
}


module.exports = {
  getMultiple,
  create,
  update,
  Deleted
}
