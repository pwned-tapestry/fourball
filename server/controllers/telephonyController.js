// Twilio Credentials 
var accountSid = 'AC3c365c4dcab72f00d030ede9555b6d3f'; 
var authToken = '18e6fd655f4541b9a84245c418df58d6'; 
 
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