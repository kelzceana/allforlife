//function to create a new job proposal

const createNewProposal = (jobProposalObj, db) => {
  
  //replace empty values with null
  for (const post in jobProposalObj) {
    //console.log(jobPostObj[post]);
    if (jobProposalObj[post] === "") {
      jobProposalObj[post] = null;
    }
  }
   
  const { providerId, jobPostingId, description,price ,availabilityDays,
    availabilityFrom, availabilityTo  } = jobProposalObj;

  return db.query(`
  INSERT INTO job_proposals (provider_id,job_posting_id,description,price,availability_days
      ,availabilityFrom ,availabilityTo)
  VALUES ($1, $2, $3, $4, $5, $6, $7)
  RETURNING *;
  `, [providerId, jobPostingId, description, price, availabilityDays,
    availabilityFrom, availabilityTo])
    .then(res => {
      return res.rows;
    })
    .catch(res => {
      return null;
    });
};
  

//get the number of proposales for specific customer
const getNumberOfProposalsByCustomerID = (id, db) => {
  return db.query(` SELECT count(job_proposals.id) FROM job_proposals INNER JOIN job_postings 
  ON job_posting_id = job_postings.id AND customer_id=$1 GROUP BY customer_id
  `,[id])
    .then(res => {
      return res.rows[0];
    })
    .catch(res => {
      return null;
    });
};

//function to all the information about proposal and provider
const getProposalsByCustomerID = (id, db) => {
  return db.query(`SELECT providers.first_name,last_name, profile_photo_url,degree,
  aboutMe,providers.location,providers.age, providers.ethnicity,providers.therapy, 
  job_proposals.* FROM job_proposals 
  INNER JOIN job_postings ON job_posting_id = job_postings.id 
  INNER JOIN providers ON provider_id = providers.id 
  AND customer_id=$1 ORDER BY created_at DESC;`,[id])
  .then(res => {
    console.log(res.rows[0]);
    return res.rows;
  })
  .catch(e => null);
}


  
module.exports = {
  createNewProposal,
  getNumberOfProposalsByCustomerID,
  getProposalsByCustomerID
};