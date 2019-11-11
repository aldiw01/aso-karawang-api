"use strict";
const nodemailer = require("nodemailer");
const user = process.env.APP_EMAIL_USER;
const pass = process.env.APP_EMAIL_PASSWORD;

const footer = "<em><strong>ATTENTION:</strong><br/>This electronic mail and/or any files transmitted within may contain confidential or copyright information. If you are not the intended recipient, you must not keep, forward, copy, use, or rely on this electronic mail, and any such action that unauthorized and prohibited. Also, you should check this electronic mail and any attachments for the presence of virus(es). We accepts no liability for any damages caused by any viruses transmitted by this electronic mail.</em>"

// async..await is not allowed in global scope, must use a wrapper
module.exports = {
  sendVerification: function (target, username, token) {

    // Generate test SMTP service account from ethereal.email
    // Only needed if you don't have a real mail account for testing
    // let account = await nodemailer.createTestAccount();

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      requireTLS: true, // use TLS
      auth: {
        user: user,
        pass: pass
      },
      tls: {
        // do not fail on invalid certs
        rejectUnauthorized: false
      }
    });

    // setup email data with unicode symbols
    let message = {
      from: process.env.APP_EMAIL_NAME + ' <' + process.env.APP_EMAIL_USER + '>', // sender address
      to: target, // list of receivers
      subject: "[Safe-t] User Verification", // Subject line
      html: "Hello <strong>" + username + "</strong><br/>Anda telah mendaftarkan email <strong>" + target + "</strong> untuk akun Safe-t. Silahkan klik tautan berikut untuk memverifikasi akun anda.<br/>" + process.env.APP_URL_LOGIN + token + "<br/><br/>Sincerely,<br/>Safe-t team<br/><br/>" + footer // html body
    };

    // send mail with defined transport object
    transporter.sendMail(message, (error, info) => {
      if (error) {
        console.log('Error occurred');
        console.log(error.message);
        return;
      }

      console.log('Message sent successfully!');
    });

    // Preview only available when sending through an Ethereal account
    //console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
  },
  sendResetPassword: function (target, username, token, res) {
    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      requireTLS: true, // use TLS
      auth: {
        user: user,
        pass: pass
      },
      tls: {
        rejectUnauthorized: false
      }
    });

    // setup email data with unicode symbols
    let message = {
      from: process.env.APP_EMAIL_NAME + ' <' + process.env.APP_EMAIL_USER + '>', // sender address
      to: target, // list of receivers
      subject: "[Safe-t] Reset Password", // Subject line
      html: "Hello <strong>" + username + "</strong><br/>Anda telah mengirimkan permintaan reset password untuk akun Safe-t (<strong>" + target + "</strong>). Silahkan klik tautan berikut untuk mereset password akun anda.<br/>" + process.env.APP_URL_RESET_PASSWORD + token + "<br/><br/>Tautan diatas dapat digunakan selama 3 jam, untuk mendapatkan tautan lainnya silahkan kunjungi " + process.env.APP_URL_LOGIN + "<br/><br/>Sincerely,<br/>Safe-t team<br/><br/>" + footer
    };

    // send mail with defined transport object
    transporter.sendMail(message, (error, info) => {
      if (error) {
        console.log('Error occurred');
        console.log(error.message);
        res.send({
          message: error.message,
          success: false
        });
        return;
      }
      console.log('Message sent successfully!');
      res.send({
        message: "Please check your email to reset your password.",
        success: false
      });
    });
  }
}
