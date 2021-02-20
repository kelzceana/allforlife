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
  const {customerId, title, appointmentFor, description, symptomes,symptomesId, insurance,  therapy, age, sexuality, language, ethnicity, faith, country, typeOfPayment, maxPrice, minPrice, appointmentFrequency, timeRequirement, availabilityFrom, availabilityTo, postcreationtimezone} = jobPostObj;
  //console.log(symptomes, "hello")
  
  return db.query(`
  INSERT INTO job_postings (customer_id, title, appointmentFor, description, therapy, sexuality, age, language, ethnicity, faith, country, typeOfPayment, maxPrice, minPrice, appointmentFrequency, timeRequirement, availabilityFrom, availabilityTo, insurance,postCreationTimeZone)
  VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18,$19,$20)
  RETURNING id as job_posting_id;
  `, [customerId, title,appointmentFor, description, therapy, sexuality, age, language, ethnicity, faith, country, typeOfPayment, maxPrice, minPrice, appointmentFrequency, timeRequirement, availabilityFrom, availabilityTo, insurance,postcreationtimezone])
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
//function to get sympotomes from the database for a specific ID
const getSymptomesByID = (id, db) => {
  
  return db.query(`
    SELECT * FROM symptomes INNER JOIN symptomes_look_up ON  symptome_id=symptomes.id
    WHERE job_posting_id = $1
  `, [id])
    .then(res => {
      return res.rows;
    });
};
//function to get jobposting from the database for a specific ID
const getJobsPostingByID = (id, db) => {
  return db.query(`
  SELECT * FROM job_postings WHERE id = $1
`, [id])
  .then(res => {
    return res.rows;
  });
}
//get jobs posting with a specific options
const getJobsPosting = (options, db) => {
  
  const min=parseInt(options[3]);
  const max=parseInt(options[4]);

  const queryParams = [];
  let queryString = `SELECT * FROM job_postings `;
  
  
  /*if(options[2]==="0"){

  } else {
  let queryString = `SELECT job_postings.*  count(job_postings.id)
  FROM job_postings INNER JOIN job_offrings ON `;
  }
 */

  if (options[0]!=="null" && options[0]!=="Fixed Price") {
    queryParams.push(`${options[0]}`);
    queryString += ` WHERE typeOfPayment LIKE $${queryParams.length} `;
  }
  if (options[0]==="Fixed Price") {
    queryString += ` WHERE typeOfPayment not LIKE 'Hourly' `;
  }
  
  if(queryParams.length < 1 && options[0]==="Fixed Price" &&  options[4]!=="0") {
    queryString += ` and`;
  }
  if(queryParams.length < 1 && options[0]!=="Fixed Price" &&  options[4]!=="0") {
    queryString += ` where`;
  }
  if(queryParams.length >= 1  && options[4]!=="0"){
    queryString += ` and`;
  }


  if (options[4]!=="0") {
    queryParams.push(min);
    queryParams.push(max);
    queryString += `  minPrice >= $${queryParams.length-1}  and maxPrice <= $${queryParams.length} `;
  }

  if(options[5]==="DESC"){
    queryString += ` 
      ORDER BY  created_at DESC`;
  } else {
    queryString += ` 
      ORDER BY  created_at`;
  }

  console.log(queryString, queryParams);
  return db.query(queryString,queryParams)
  .then(res => {
    return res.rows;
  });
}

//function to get jobposting from the database for a specific customer ID
const getJobsPostingByCustomerID = (id, db) => {
  return db.query(`
  SELECT * FROM job_postings WHERE customer_id = $1 ORDER BY created_at DESC`, [id])
  .then(res => {
    return res.rows;
  });
}

module.exports = {
  createNewPost,
  getSymptomes,
  getSymptomesByID,
  getJobsPostingByID,
  getJobsPosting,
  getJobsPostingByCustomerID
};