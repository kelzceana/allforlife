//function to create a new job post

const createNewPost = (jobPostObj, db) => {
  
  //replace empty values with null
  for (const post in jobPostObj) {
    //console.log(jobPostObj[post]);
    if (jobPostObj[post] === "") {
      jobPostObj[post] = null;
    }
  }
  console.log(jobPostObj, "jobbbbbbb");
  const {customerId, appointmentFor, description, symptomes,symptomesId, insurance,  therapy, age, sexuality, language, ethnicity, faith, typeOfPayment, maxPrice, minPrice, appointmentFrequency, timeRequirement, availabilityFrom, availabilityTo } = jobPostObj;
  //console.log(symptomes, "hello")
  
  return db.query(`
  INSERT INTO job_postings (customer_id, appointmentFor, description, therapy, sexuality, age, language, ethnicity, faith, typeOfPayment, maxPrice, minPrice, appointmentFrequency, timeRequirement, availabilityFrom, availabilityTo, insurance)
  VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17)
  RETURNING id as job_posting_id;
  `, [customerId, appointmentFor, description, therapy, sexuality, age, language, ethnicity, faith, typeOfPayment, maxPrice, minPrice, appointmentFrequency, timeRequirement, availabilityFrom, availabilityTo, insurance])
    .then(res => {
      const jobPostingId = res.rows[0].job_posting_id;
      //console.log(jobPostingId, "1st")
      symptomesId.forEach(symptome => {
        return db.query(`
          INSERT INTO symptomes_look_up(job_posting_id, symptome_id)
          VALUES(${jobPostingId}, $1)
          RETURNING *;
        `, [symptome])
          .then(res => {
            return res.rows[0];
          })
          .catch(res => {
            return null;
          });
      });
    });
};

//function to get sympotomes from the database
const getSymptomes = (db) => {
  
  return db.query(`
    SELECT * FROM symptomes
  `)
    .then(res => {
      return res.rows;
    });
};
module.exports = {
  createNewPost,
  getSymptomes
};