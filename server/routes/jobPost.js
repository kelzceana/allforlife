const express = require('express');
const router = express.Router();

const { createNewPost, getSymptomes} = require('../util/jobPostHelpers');

//api route
module.exports = (db) => {

  //api route for new job posting

  router.post('/', (req, res) => {
    console.log(req.body, "maybe")
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

  return router;
};