const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require("twilio")(accountSid, authToken);

exports.handler = async (event) => {
  const parsedEvent = JSON.parse(event.body);
  console.log("two", parsedEvent);
  const ptpReminder = `Hello Salem, how are you doing today? 
                  
                  My name is Jane from BFREE, and I am here to remind you of your 2000 outstanding balance with Branch.
                  
                  I understand that times are hard, so let me show you how to pay your balance little by little.
                  
                  Please tap "yes" to proceed with this chat.`;
  // TODO implement

  let messageType;
  if (parsedEvent.type === "ptp_reminder") {
    messageType = ptpReminder;
  }
  if (parsedEvent.type === "first_contact") {
    messageType = "firstContact";
  }

  const promise = new Promise(function(resolve, reject) {
    client.messages
    .create({
      from: "whatsapp:+2348149307300",
      body: messageType,
      to: `whatsapp:+${parsedEvent.to}`,
    })
    .then((message) => {
      console.log(JSON.stringify(message));
      resolve( {
        "isBase64Encoded": false,
        "statusCode": 200, 
        "body": JSON.stringify(message)
    })
    })
    .catch((e) => {
      console.log(e);
      reject(e);
    });
    })
  return promise
};
