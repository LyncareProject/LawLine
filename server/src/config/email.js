const nodemailer = require('nodemailer');
const { EMAIL_SERVICE, EMAIL_USER, EMAIL_PASSWORD } = require('../common')

const smtpTransport = nodemailer.createTransport({
  service: EMAIL_SERVICE,   // 메일 보내는 곳
  prot: 465,
  host: "smtp.gmail.com",
  secure: false,  
  requireTLS: true ,
  auth: {
    user: EMAIL_USER,  // 보내는 메일의 주소
    pass: EMAIL_PASSWORD   // 보내는 메일의 비밀번호
  }
});

module.exports = smtpTransport;