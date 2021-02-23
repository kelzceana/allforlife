const express = require('express');
const router = express.Router();
const { getMessagesByJobProposalID, saveMessage } = require('../util/messageHelpers');
//api routes
module.exports = (db) => {
  //api route for getting message with jobproposal id
  router.get('/:id', (req, res) => {
    const jobProposalID = req.params.id;
    getMessagesByJobProposalID(jobProposalID, db)
      .then(response => {
        res.status(200).send(response);
      })
      .catch(e => res.send("error"));
  });
  //api route to post messages to the db
  router.post('/', (req, res) => {
    console.log(req.body)
    const { jobProposalID, customerID, providerID, type, message } = req.body;
    const messageObj = {
      jobProposalID,
      customerID,
      providerID,
      type,
      message
    };
    saveMessage(messageObj, db)
      .then(response => {
        res.status(200).send(response);
      })
      .catch(e => res.send("error"));
  });
  return router;
};