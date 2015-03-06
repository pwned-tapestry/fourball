module.exports = {
  environment: 'dev',
  mongoDb: {
    //Your Mongo labs db path
    //Example: mongodb://ds12345.mongolab.com:67890/fourball
    path: 'YOUR MONGOLABS DB PATH',
    user: 'YOUR MONGOLABS DB USERNAME',
    pass: 'YOUR MONGOLABS DB PASSWORD'
  },
  //Insert your twilio keys and ssid here
  twilioKeys: {
  accountSid : 'YOUR ACCOUNT ID',
  authToken : 'YOUR AUTH TOKEN'
  }
};
