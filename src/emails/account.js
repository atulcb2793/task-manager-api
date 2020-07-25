const sgMail = require('@sendgrid/mail')
const sendgridAPIKey = process.env.SENDGRID_API_KEY

sgMail.setApiKey(sendgridAPIKey)

sgMail.send({
    to: 'Kalyani.pawar0393@gmail.com',
    from: 'Kalyani.pawar0393@gmail.com',
    subject: 'this is test mail from node backend',
    text: 'I hope you are good'
})