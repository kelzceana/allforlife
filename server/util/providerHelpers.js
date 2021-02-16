//function to get user with userName from the database
const getProviderWithUserName = (userName, db) => {
  return db.query(`
    SELECT * 
    FROM providers
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
const addProvider = (userData, db) => {
  const {prefix, firstName, lastName, userName, email, password, degree, aboutMe, therapy, age, ethnicity, location, profile_photo_url } = userData;
  return db.query(`
  INSERT INTO providers (prefix, first_name, last_name, userName, email, password, degree, aboutMe, therapy, age, ethnicity, location, profile_photo_url)
    VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
    RETURNING *;
    `, [prefix, firstName, lastName, userName, email, password, degree, aboutMe, therapy, age, ethnicity, location, profile_photo_url])
    .then(res => {
      return res.rows[0];
    })
    .catch(e => {
      return null;
    });
};

const checkId = (id, db) => {
  return db.query(
    `SELECT*FROM providers WHERE id=$1`,[id]
  ).then(res => {
    return res.rows[0];
  })
    .catch(e => null);
};

module.exports = {
  getProviderWithUserName,
  addProvider,
  checkId
};