//function to get user with userName from the database
const getUserWithUserName = (userName, db) => {
  return db.query(`
    SELECT * 
    FROM customers
    WHERE userName = $1;
  `, [userName])
    .then(res => {
      return res.rows[0];
    })
    .catch(e => {
      return null;
    });
};

//function to add a new user to the database
const addUser = (userData, db) => {
  const {prefix, firstName, lastName, userName, email, password } = userData;
  return db.query(`
  INSERT INTO customers (prefix, first_name, last_name, userName, email, password)
    VALUES($1, $2, $3, $4, $5, $6)
    RETURNING *;
    `, [prefix, firstName, lastName, userName, email, password])
    .then(res => {
      return res.rows[0];
    })
    .catch(e => {
      return null;
    });
};
module.exports = {
  getUserWithUserName,
  addUser
};