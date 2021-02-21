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
  const minPrice=parseInt(options[3]);
  const maxPrice=parseInt(options[4]);
  const minNumberOfProposals=parseInt(options[1]);
  const maxNumberOfProposals=parseInt(options[2]);
  const queryParams = [];
  let queryString ="";
  // check if number of proposals is included in the filter
  if(options[2] === "0"){
  queryString = `SELECT * FROM job_postings WHERE is_accepted='false' `;
  } else{
  queryString = `select job_postings.* ,count(*) from job_postings 
  left join job_proposals on job_postings.id=job_posting_id WHERE job_postings.is_accepted='false' `;
  }
  if (options[0]!=="null") {
  queryParams.push(`${options[0]}`);
  queryString += ` and typeOfPayment LIKE $${queryParams.length} `;
  }
  if (options[4]!=="0") {
  queryParams.push(minPrice);
  queryParams.push(maxPrice);
  queryString += ` and minPrice >= $${queryParams.length-1} and maxPrice <= $${queryParams.length} `;
  }
  // check if number of proposals is included in the filter
  if(options[2] !== "0"){
  queryParams.push(minNumberOfProposals);
  queryParams.push(maxNumberOfProposals);
  queryString += `group by job_postings.id 
  HAVING count(*) >= $${queryParams.length-1} and count(*) <= $${queryParams.length}`;
  }
  if(options[5]==="DESC"){
  queryString += ` 
  ORDER BY created_at DESC`;
  } else {
  queryString += ` 
  ORDER BY created_at`;
  }
  
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

//function to change is_accepted to true on accepting the deal
const dealAccept = (id, db) => {
  return db.query(`UPDATE job_postings  SET is_accepted = true WHERE id = $1`,[id])
}

module.exports = {
  createNewPost,
  getSymptomes,
  getSymptomesByID,
  getJobsPostingByID,
  getJobsPosting,
  getJobsPostingByCustomerID,
  dealAccept
};