'use strict';

const {sendEmail} = require('../emailer');
// destructure variables from .env
const {ALERT_FROM_EMAIL, ALERT_TO_EMAIL} = process.env;

const errorHandlingMiddleware = () => (err, req, res, next) => {
  if (err instanceof FooError || err instanceof BarError){
    // check for errors that should send an email alert
    let emailData = {
      from: ALERT_FROM_EMAIL,
      to: ALERT_TO_EMAIL,
      subject: `ALERT: a ${err.name} occurred.`,
      text: `MESSAGE: ${err.message}. \n STACK-TRACE: ${err.stack}.`
    };
    sendEmail(emailData);
  } else {
    // log that some other error occurred
    console.log(`Just a ${err.name}, nothing to see here.`);
  }
}

module.exports = {errorHandlingMiddleware};