const nodemailer = require("nodemailer")
const _ = require("lodash")
const bcrypt = require("bcrypt")
const User = require('../models/User')
//const User = require("../models/numb")



const sendEmail = async (email, subject, link) => {

        // mail send details
        const transporter = nodemailer.createTransport({
          host: process.env.HOST,
          service: 'gmail',
          port: 553,
          secure: true,
          auth: {
              user:  process.env.EMAIL,
             
              pass:  process.env.PASS,
          },
    tls: {
      rejectUnauthorized: false
  
    }
  })
  await transporter.sendMail({
    from: process.env.EMAIL,
    to: email,
    subject: 'Welcome to ISend, please verify your email!',

    link:link
   
  
   
});
 



}
module.exports = sendEmail;