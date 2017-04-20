'use strict';

const {sendEmail} = require('../emailer');
// destructure variables from .env
const {ALERT_FROM_EMAIL, ALERT_TO_EMAIL} = process.env;

const errorHandlingMiddleware = () => (err, req, res, next) => {
  if (err.name === 'BizzError'){
    // Do nothing with a BizzError, just print to the console
    console.log(`Just a ${err.name}, nothing to see here.`);
  } else {
    // FooError and BarErrors get their error data send as an email
    let emailData = {
      from: ALERT_FROM_EMAIL,
      to: ALERT_TO_EMAIL,
      subject: `ALERT: a ${err.name} occurred.`,
      text: `MESSAGE: ${err.message}. \n STACK-TRACE: ${err.stack}.`
    }
    sendEmail(emailData);
  }
}

module.exports = {errorHandlingMiddleware};