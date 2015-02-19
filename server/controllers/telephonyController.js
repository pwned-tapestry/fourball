// Twilio Credentials 
var config = require('../config.js');
var accountSid = config.twilioKeys.accountSid;
var authToken = config.twilioKeys.authToken;
 
//require the Twilio module and create a REST client 
var client = require('twilio')(accountSid, authToken); 
var fromNum = "+16619276630";
var telephony = {};

telephony.sendMessage = function(data){
  console.log('fromNum : ', data.userName);
  console.log('toNum : ', data.userNumber);
  
  client.messages.create({ 
    to: '+1'+data.userNumber, 
    from: fromNum, 
    body: "Hello "+ data.userName +"! You are booked for *Party_Size* at *Course Name*, at *Time*.",   
  }, function(err, message) { 
    console.log(message.sid); 
  });
}

module.exports = telephony;