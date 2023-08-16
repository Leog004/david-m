const ElasticEmail = require('@elasticemail/elasticemail-client');
const client = ElasticEmail.ApiClient.instance;
const apikey = client.authentications['apikey'];
apikey.apiKey = process.env.ELASTIC_API;

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