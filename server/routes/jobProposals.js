const express = require('express');
const router = express.Router();

const { createNewProposal, getNumberOfProposalsByCustomerID, getProposalsByPrososalID, getProposalsByCustomerID } = require('../util/jobProposalsHelpers');

//api route
module.exports = (db) => {

  //api route for new job postixng

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
        res.json(response);
      })
      .catch(e => res.json("error"));
  });

  //route to get the proposal and provider information for a specific customer
  router.get('/customerlist/:id', (req, res) => {
    getProposalsByCustomerID(req.params.id, db)
      .then(response => res.status(200).json(response))
      .catch(e => res.status(400).json({mesage:"Error"}));
  });

  //route to get the proposal and provider info for a specific customer and proposal id
  router.get('/proposalitem/:userId/:proposalId',(req,res) =>{
    getProposalsByPrososalID(req.params.userId,req.params.proposalId,db)
      .then(response => res.status(200).json(response))
      .catch(e => res.status(400).json({message:"Error"}));

  });
  return router;
};