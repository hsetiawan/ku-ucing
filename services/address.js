const db = require('./db');
const helper = require('../helper');
const config = require('../config');

async function getMultiple(page = 1){
  const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
    `SELECT id, street, district, sub_district, city, province, pos_code
    FROM address
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
    `INSERT INTO address  
    (street, district, sub_district, city, province, pos_code) 
    VALUES 
    (?, ?, ?, ?, ?, ?)`, 
    [
      req.street, req.district,
      req.sub_district, req.city, 
      req.province, req.pos_code
    ]
  );

  let message = 'Error in creating address';

  if (result.affectedRows) {
    message = 'Address created successfully';
  }

  return {message};
}  

async function update(id, req){
  const result = await db.query(
    `UPDATE address 
    SET street=?,
    district=?,
    sub_district=?,
    city=?,
    province=?,
    pos_code=?
    WHERE id=?`, 
    [
      req.street, req.district,
      req.sub_district, req.city,
      req.province, req.pos_code,
      id
    ]
  );

  let message = 'Error in updating address';

  if (result.affectedRows) {
    message = 'Address updated successfully';
  }

  return {message};
}


async function Deleted(id){
  const result = await db.query(
    `UPDATE address 
    SET is_deleted = TRUE 
    WHERE id=?`, 
    [
      id
    ]
  );

  let message = 'Error in delete address';

  if (result.affectedRows) {
    message = 'Address deleted successfully';
  }

  return {message};
}


module.exports = {
  getMultiple,
  create,
  update,
  Deleted
}
