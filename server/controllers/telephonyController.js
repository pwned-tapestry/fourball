// Twilio Credentials 
var config = require('../config.js');
var accountSid = config.twilioKeys.accountSid;
var authToken = config.twilioKeys.authToken;
 
//require the Twilio module and create a REST client 
var client = require('twilio')(accountSid, authToken); 
var fromNum = "+16619276630";
var telephony = {};

telephony.sendMessage = function(toNum){
  console.log('fromNum : ', fromNum);
  console.log('toNum : ', toNum);
  
  client.messages.create({ 
    to: toNum, 
    from: fromNum, 
    body: "You are booked for *Party_Size* at *Course Name*, at *Time*.",   
  }, function(err, message) { 
    console.log(message.sid); 
  });
}


module.exports = telephony;