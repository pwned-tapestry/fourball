// Twilio Credentials 
var config = require('../config.js');
var accountSid = config.twilioKeys.accountSid;
var authToken = config.twilioKeys.authToken;
 
//require the Twilio module and create a REST client 
var client = require('twilio')(accountSid, authToken); 
var fromNum = "+16619276630";
var telephony = {};

telephony.sendMessage = function(data){
  var msgContent = "Hello "+ data.userName +"! You are booked for *Party_Size* at *Course Name*, at *Time*.";

  if (config.environment === 'dev') {
    console.log('msgContent: ', msgContent);
    console.log('from : ', data.userName);
    console.log('toNum : ', data.userNumber);
  }

  client.messages.create({ 
    to: '+1'+data.userNumber, 
    from: fromNum, 
    body: msgContent,   
  }, function(err, message) { 
    if(err){
      console.log(err);
    }else{
      console.log(message.sid); 
    }
  });
}

telephony.sendInviteLinks = function(data) {
  console.log("sendInviteLinks called with data:", data);
  for (var i = 0; i < data.cells.length; i++){
    var msgContent = "Wayne has invited you to play golf! Click on this link to confirm: \
    http://10.6.32.201:1337/api/teetimes/"+ data.teetimeId + "/" + data.cells[i];
    client.messages.create({to: '+1'+data.cells[i], from: fromNum, body: msgContent}, function(err, message) {
      if (err) {
        console.log(err);
      } else {
        console.log(message.sid);
      }
    });
  }
};

module.exports = telephony;