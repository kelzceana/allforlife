const express = require('express');
const router = express.Router();

const { createNewProposal, getNumberOfProposalsByCustomerID } = require('../util/jobProposalsHelpers');

//api route
module.exports = (db) => {

  //api route for new job posting

  router.post('/', (req, res) => {
    const { providerId, jobPostingId, description,price ,availabilityDays,
      availabilityFrom, availabilityTo } = req.body;
    const jobProposalObj = {
      providerId,
      jobPostingId,
      description,
      price,
      availabilityDays,
      availabilityFrom,
      availabilityTo
    };
 
    createNewProposal(jobProposalObj, db)
      .then(response => {
        res.json(response);
      })
      .catch(e => res.json("jobproposal error"));
      
  });

  //route to get the number of proposals for a specific customer
  router.get('/customer/:id', (req, res) => {
    getNumberOfProposalsByCustomerID(req.params.id, db)
      .then(response => {
        response.json(response)
      })
      .catch(e => res.json("error"));
  });

  return router;
};