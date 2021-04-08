const express = require('express');
const router = express.Router();
const auth = require("../middleware/auth");
const { createNewProposal, getNumberOfProposalsByCustomerID, getProposalsByPrososalID, getProposalsByCustomerID, getProposalsForProvider } = require('../util/jobProposalsHelpers');

//api route
module.exports = (db) => {

  //api route for new job postixng

  router.post('/',auth, (req, res) => {
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
      .then(response => res.status(200).json(response))
      .catch(e => res.status(400).json("jobproposal error"));
      
  });

  //route to get the number of proposals for a specific customer
  router.get('/customer/:id', auth, (req, res) => {
    getNumberOfProposalsByCustomerID(req.params.id, db)
      .then(response => res.status(200).json(response))
      .catch(e => res.status(400).json("error"));
  });

  //route to get the proposal and provider information for a specific customer
  router.get('/customerlist/:id',auth, (req, res) => {
    getProposalsByCustomerID(req.params.id, db)
      .then(response => res.status(200).json(response))
      .catch(e => res.status(400).json({mesage:"Error"}));
  });

  //route to get the proposal and provider info for a specific customer and proposal id
  router.get('/proposalitem/:userId/:proposalId',auth,(req,res) =>{
    getProposalsByPrososalID(req.params.userId,req.params.proposalId,db)
      .then(response => res.status(200).json(response))
      .catch(e => res.status(400).json({message:"Error"}));

  });
  //route to check if the provider has a proposal for a specific job posting
  router.get('/look/:providerId/:jobPostingId', auth,(req,res) => {
    getProposalsForProvider(req.params.providerId,req.params.jobPostingId,db)
      .then(response =>res.status(200).json(response))
      .catch(e => res.status(400).json({message:"Error"}));
  });

  return router;
};