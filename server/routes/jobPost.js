const express = require('express');
const router = express.Router();

const { createNewPost, getSymptomes,getJobsPosting,getSymptomesByID, getJobsPostingByCustomerID, getJobsPostingByID} = require('../util/jobPostHelpers');

//api route
module.exports = (db) => {

  //api route for new job posting

  router.post('/', (req, res) => {
    const { customerId, appointmentFor, description, symptomes, symptomesId, insurance, therapy, sexuality, age, language, ethnicity, faith, typeOfPayment, maxPrice, minPrice, appointmentFrequency, timeRequirement, availabilityFrom, availabilityTo } = req.body.jobPostData;
    const jobPostObj = {
      customerId: customerId,
      appointmentFor:appointmentFor,
      description:description,
      therapy:therapy,
      symptomes: symptomes,
      symptomesId:symptomesId,
      insurance: insurance,
      age:age ,
      sexuality:sexuality,
      language:language,
      ethnicity:ethnicity,
      faith:faith,
      country:'',
      typeOfPayment:typeOfPayment,
      minPrice:minPrice,
      maxPrice:maxPrice,
      appointmentFrequency:appointmentFrequency,
      timeRequirement:timeRequirement,
      availabilityTo:availabilityTo,
      availabilityFrom:availabilityFrom
    };

    createNewPost(jobPostObj, db)
      .then(response => {
        res.send({response: response,
          message:"saved data"});
        return;
      })
      .catch(e => res.send("jobpost error"));
  });


  //api route to retreive symptomes
  router.get('/symptomes', (req, res) => {
    getSymptomes(db)
      .then(response => {
        res.send(response);
      })
      .catch(e => res.send(e));
  });
 
  //api route to retreive symptomes for one job posting
  router.get('/symptomes/:id', (req, res) => {
    getSymptomesByID(req.params.id, db)
      .then(response => {
        res.json(response);
      })
      .catch(e => res.json(e));
  });

  // api get jobposting that has an id
  router.get('/:id', (req, res) => {
    console.log(req.params.id);
    getJobsPostingByID(req.params.id, db)
      .then(response => {
        res.json(response);
      })
      .catch(e => res.json({e}));
  });

  //api route to get job posting
  router.get('/', (req, res) => {
    const options = req.query.filter;
    getJobsPosting(options, db)
      .then(response => {
        res.json(response);
      })
      .catch(e => res.json({e}));
  });

  // api to retreive jobposting for a specific customer 
  router.get('/customer/:id', (req, res) => {
    console.log(req.params.id);
    getJobsPostingByCustomerID(req.params.id, db)
      .then(response => {
        res.json(response);
      })
      .catch(e => res.json({e}));
  });
  return router;
};