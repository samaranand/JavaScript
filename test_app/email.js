const nodemailer = require('nodemailer');
const transport = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'pkskd445@gmail.com',
        pass: 'samar12345',
    },
});
const mailOptions = {
    from: 'pkskd445@gmail.com',
    to: 'samaranand5581@gmail.com',
    subject: 'hello world!',
    html: 'hello world!',
};
transport.sendMail(mailOptions, (error, info) => {
    if (error) {
        console.log(error);
    }
    console.log(`Message sent: ${info.response}`);
});