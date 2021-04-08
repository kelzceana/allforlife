const express = require('express');
const router = express.Router();
const auth = require("../middleware/auth");

const { createNewPost, getSymptomes, getJobsPosting,getSymptomesByID,getJobsPostingByID, getJobsPostingByCustomerID, dealAccept } = require('../util/jobPostHelpers');

//api route
module.exports = (db) => {

  //api route for new job posting

  router.post('/', auth, (req, res) => {
    const { customerId, title, appointmentFor, description, symptomes, symptomesId, insurance, therapy, sexuality, age, language, ethnicity, faith, country,typeOfPayment, maxPrice, minPrice, appointmentFrequency, timeRequirement, availabilityFrom, availabilityTo, timeZones} = req.body.jobPostData;
    const jobPostObj = {
      customerId: customerId,
      title,
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
      country,
      typeOfPayment:typeOfPayment,
      minPrice:minPrice,
      maxPrice:maxPrice,
      appointmentFrequency:appointmentFrequency,
      timeRequirement:timeRequirement,
      availabilityTo:availabilityTo,
      availabilityFrom:availabilityFrom,
      postcreationtimezone:timeZones
    };

    createNewPost(jobPostObj, db)
      .then(response => {
        res.status(200).send({response: response,
          message:"saved data"});
        return;
      })
      .catch(e => res.status(400).send("jobpost error"));
  });

  //api route to retreive symptomes
  router.get('/symptomes', auth, (req, res) => {
    getSymptomes(db)
      .then(response => {
        res.status(200).send(response);
      })
      .catch(e => res.status(400).send(e));
  });
  //api route to retreive symptomes for one job posting
  router.get('/symptomes/:id', auth,(req, res) => {
    getSymptomesByID(req.params.id, db)
      .then(response => res.status(200).json(response))
      .catch(e => res.status(400).json(e));
  });
  // api get jobposting that has an id
  router.get('/:id', auth, (req, res) => {
    getJobsPostingByID(req.params.id, db)
      .then(response => {
        res.json(response);
      })
      .catch(e => res.json({e}));
  });
  //api route to get job posting
  router.get('/', auth, (req, res) => {

    const options = req.query.filter;

    getJobsPosting(options, db)
      .then(response => {
        res.status(200).json(response);
      })
      .catch(e => res.status(400).json({e}));
  });

  // api to retreive jobposting for a specific customer
  router.get('/customer/:id', auth, (req, res) => {
    getJobsPostingByCustomerID(req.params.id, db)
      .then(response => {
        res.status(200).json(response);
      })
      .catch(e => res.status(400).json({e}));
  });

  //api to update is_accepted to true
  router.post('/accepted/:id', auth,(req, res) => {
    dealAccept(req.params.id, db)
      .then(response => res.status(200).json(response))
      .catch(e => res.status(400).json({e}));
  });

  return router;
};