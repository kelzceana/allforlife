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
      return res.rows;
    })
    .catch(res => {
      return null;
    });
};

  
module.exports = {
  createNewProposal,
  getNumberOfProposalsByCustomerID
};