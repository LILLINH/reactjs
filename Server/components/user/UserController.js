const mailer = require('nodemailer');
const userService = require('./UserService');


const transporter = mailer.createTransport({
    pool: true,
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, // use TLS
    auth: {
        user: 'linhbtps24804@fpt.edu.vn',
        pass: 'lhnndkzhzfeuxkwj'
    },
});
const login = async (email, password) => {
    return await userService.login(email, password);
}
const register = async (email, password, name) => {
    return await userService.register(email, password, name);
}
const sendMail = async (email, subject, content) => {
    try {
        const mailOptions = {
            from: 'Linh tung with luv <linhbtps24804@fpt.edu.vn>',
            to: email,
            subject: subject,
            html: content
        };
        return await transporter.sendMail(mailOptions);
    } catch (error) {
        console.log('error', error);

    } 
    return false;

}
module.exports = { login, register, sendMail };

//lhnndkzhzfeuxkwj