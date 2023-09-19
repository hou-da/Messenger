

require('dotenv').config();
const sid='AC8e68fdc3f62e5290c7c8b96639ef305e'

const auth_token='6a456dc87f3bd87ea70cb2866ce8fa3d'
const otpGenerator = require("otp-generator")
const bcrypt = require("bcrypt")
const User = require('../models/User')
const Code =require("../models/Code")

const sendSMS = async(phone_number)=>{
    try{
        if(!phone_number) throw new Error ('entre your phone Number')
        let user = await User.findOne({phone_number: req.body.phone_number})
        if (!user) return res.status(400).send({message: 'phone not exist Used!'})
        const accountSid=process.env.TWILIO_ACCOUNT_SID;
        const  authToken=process.env.TWILIO_AUTH_TOKEN;
        const client = require('twilio')(accountSid, authToken);
        var random = Math.floor(100000 + Math.random() * 900000);
        const code = new Code({phone_number: req.body.phone_number,code: random})
        
        client.messages
                .create({
                    body: `Your ISend verification code is: ${random}`,
                    from: process.env.TWILIO_PHONE_NUMBER,
                    to: phone_number,
                })
                .then((message) => {
                    console.log(message);
                 })
                 const result = await code.save()
        //return res.status(200).json({message:"Your message has ben sent successfully!"})
    } catch(error){
       console.log(error)
    }

}
module.exports = sendSMS;
/*verifySMS = async(req, res)=>{
    try {

        const {phone_number,code}= req.body
        
        if(!phone_number) throw new Error ('entre your phone Number')
        let user = await User.findOne({phone_number: req.body.phone_number})
        if (!user) return res.status(400).send({message: 'phone not exist Used!'})
        const accountSid = process.env.TWILIO_ACCOUNT_SID;
        const authToken = process.env.TWILIO_AUTH_TOKEN;
        const client = require('twilio')(accountSid, authToken);
        
        client.verify.v2.services('LHESARIBV8kKRgifcTzAnztXrp_A032sbfxqcTAW')
                        .verifications
                        .create({to: phone_number, code: code})
                        .then(verification => console.log(verification.status));
        const updatedUser = await User.findByIdAndUpdate(user._id, {
          $set: { activePhone: true },})
          //await OTP.save()

         res.status(200).json({ message: 'OTP verified. User is now verified.' });
       
     } catch (error) {
       res.status(400).json({ error: error.message });
     }
};*/