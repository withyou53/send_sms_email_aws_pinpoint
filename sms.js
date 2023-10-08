/*
Purpose:
sms.js demonstrates how to send a transactional email message using Amazon Pinpoint.
*/
// snippet-start:[pinpoint.javascript.pinpoint_send_sms_message_V3]

// Import required AWS SDK clients and commands for Node.js
import { SendMessagesCommand } from "@aws-sdk/client-pinpoint";
import { pinClient } from "./libs/pinClient.js";

/* The type of SMS message that you want to send. If you plan to send
time-sensitive content, specify TRANSACTIONAL. If you plan to send
marketing-related content, specify PROMOTIONAL.*/
var messageType = "TRANSACTIONAL";

// The registered keyword associated with the originating short code.
var registeredKeyword = "myKeyword";

/**
 * 
 * @param {*} message     : The content of the SMS message.
 * @param {*} fromNumber
 *  The phone number or short code to send the message from. The phone number
    or short code that you specify has to be associated with your Amazon Pinpoint
    account. For best results, specify long codes in E.164 format
    e.g., +1XXXXXXXXXX
 * @param {*} toNumber 
    The recipient's phone number.  For best results, you should specify the phone number in E.164 format.
 * @param {*} senderId 
    The sender ID to use when sending the message. Support for sender ID
    varies by country or region. For more information, see https://docs.aws.amazon.com/pinpoint/latest/userguide/channels-sms-countries.html.
 * @param {*} projectId 
    The Amazon Pinpoint project/application ID to use when you send this message.
    Make sure that the SMS channel is enabled for the project or application
    that you choose.
 */
const sendTxSMS = async (
    message,
    fromNumber,
    toNumber,
    senderId,
    projectId
) => {
    // Specify the parameters to pass to the API.
    var params = {
        ApplicationId: projectId,
        MessageRequest: {
            Addresses: {
                [toNumber]: {
                    ChannelType: "SMS",
                },
            },
            MessageConfiguration: {
                SMSMessage: {
                    Body: message,
                    Keyword: registeredKeyword,
                    MessageType: messageType,
                    OriginationNumber: fromNumber,
                    SenderId: senderId,
                },
            },
        },
    };
    try {
        const data = await pinClient.send(new SendMessagesCommand(params));
        console.log(
            "Message sent! " +
                data["MessageResponse"]["Result"][destinationNumber][
                    "StatusMessage"
                ]
        );
        return data;
    } catch (error) {
        console.log(error);
    }
};

// snippet-end:[pinpoint.javascript.pinpoint_send_sms_message_V3]
// For unit tests only.
// module.exports = { run, params };
export default sendTxSMS;
