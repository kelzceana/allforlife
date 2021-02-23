//function to get messages by job proposal id
const getMessagesByJobProposalID = (id, db) => {
  return db.query(
    `
    SELECT  type, message
    FROM messages
    WHERE job_proposal_id = $1
    `, [id])
    .then(res => {
      return res.rows;
    });
};
//function to save data in database
const saveMessage = (messageObj, db) => {
  const {jobProposalID, customerID, providerID, type, message } = messageObj;
  return db.query(
    `
    INSERT INTO messages( job_proposal_id, customer_id, provider_id, type, message )
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *;
    `, [jobProposalID, customerID, providerID, type, message])
    .then(res => {
      return res.rows;
    });
};
module.exports = {
  getMessagesByJobProposalID,
  saveMessage
};