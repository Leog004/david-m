const ElasticEmail = require('@elasticemail/elasticemail-client');
const client = ElasticEmail.ApiClient.instance;
const apikey = client.authentications['apikey'];
apikey.apiKey = "8A2EB92B78664C1D0C02A68036BED2F3BD893EDFA93EFE91C7C8E31C63E0BE756D6826EE1185E911F3DF1244E71762E5";

const emailsApi = new ElasticEmail.EmailsApi();

async function sendEmail(name, email, message, subject) {
    return new Promise((resolve, reject) => {
        const emailData = {
            Recipients: {
                To: ["leog4za@gmail.com"]
            },
            Content: {
                Body: [
                    {
                        ContentType: "HTML",
                        Charset: "utf-8",
                        Content: "Name: " + name + "<br/>Email: " + email + "<br/>Subject: " + subject + "<br/>Message: " + message
                    },
                    {
                        ContentType: "PlainText",
                        Charset: "utf-8",
                        Content: "Name: " + name + "\nEmail: " + email + "\nSubject: " + subject + "\nMessage: " + message
                    }
                ],
                From: "leog4za@gmail.com",
                Subject: "New Contact from " + name + " - " + subject
            }
        };

        emailsApi.emailsTransactionalPost(emailData, (error, data, response) => {
            if (error) {
                reject(error);
            } else {
                resolve(data);
            }
        });
    });
}


module.exports = { sendEmail };