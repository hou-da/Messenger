const  sendSMS  = require("../controllers/sendSMS");
const sendEmail = require ("../controllers/sendEmail");
const Code = require('../models/Code')
const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const { userAuth } = require('../middleware/auth');

//REGISTER
router.post("/register", async (req, res) => {
 
try{
  const {firstName, lastName, phone_number, email, password,date_Birth, verify}= req.body
  if(firstName == ""|| lastName == "" || phone_number == "" || email =="" || password == "") {
      res.status(401)
      json({message: "Input empty"})
  }
  if (!/^[a-zA-Z]+$/.test(firstName)){
        res.status(401)
            .json({ message: "Invalid name entered"
    })
    }else if (!/^[a-zA-Z]+$/.test(lastName)){
        res.status(401)
            .json({message: "Invalid name entered"
    })

    } else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)){  
        res.status(401)
            .json({message: "Invalid email entered"})
    
    } else if (password.length<6){
        res.status(401)
            .json({message: "Password is too short!"
    })

    } else {

  let user = await User.findOne({email:req.body.email})
  if (user) return res.status(400).send({message: 'Email Already Used!'})

  const hashedPass = await bcrypt.hash(password, 10);

        user = new User({
                    firstName, 
                    lastName,
                    phone_number, 
                    email, 
                    date_Birth,
                    password: hashedPass,

                    });
        await user.save()
        const token = await user.generateAuthToken()
        // Send verification link to email
        if(verify === "Email"){
       const text = ` ${user.firstName} Thanks for registring on our site follow this link to verify your email address , ${process.env.HOST}/api/auth/verify/${user._id}/${token}`
          console.log(text) 
            sendEmail(user.email, text )

        }else if (verify ==="Phone") {
        // Send verification code to the phone
          sendSMS(user.phone_number)
        }
          res.status(200).json(user)
    }

}catch(err){
      res.status(500).json(err)
}

})

//verification link
router.get("/verify/:id/:token", async (req, res) => {
    try {
      const user = await User.findOne({ _id: req.params.id });
      if (!user) return res.status(400).send("Invalid link");
  
      const token = await Token.findOne({
        userId: user._id,
        token: req.params.token,
      });
      if (!token) return res.status(400).send("Invalid link");
  
      await User.updateOne({ _id: user._id, verified: true });
      await Token.findByIdAndRemove(token._id);
      const updatedUser = await User.findByIdAndUpdate(user._id, {
        $set: { activeEmail: true },
      });
     
      res.send("email verified sucessfully");
    } catch (error) {
      res.status(400).send("An error occured");
    }
  });

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//LOGIN
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email});
    const token = await user.generateAuthToken()
    if(!user) res.status(404).json({message:"email not found "})
    
    const isMatch = await bcrypt.compare(req.body.password, user.password);
            if(!isMatch){
                return res.status(400).json({
                    message: "Login not successful",
                  })
            }else{
                res.cookie('jwt',token);
               res.status(200).json(user)
            
            }
    } catch (err) {
        res.status(500)
            .json(err)
  }
});

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//Forget 

router.post("/forgetPass", async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user)
            return res.status(400).send("user with given email doesn't exist");

        let token = await Token.findOne({ userId: user._id });
        if (!token) {
            token = await new Token({
                userId: user._id,
                token: crypto.randomBytes(32).toString("hex"),
            }).save();
        }

        const link = `${process.env.BASE_URL}/password-reset/${user._id}/${token.token}`;
        await sendEmail(user.email, "Password reset", link);

        res.status(200).send("password reset link sent to your email account");
    } catch (error) {
        res.status(500).send("An error occured");
        console.log(error);
    }
});

router.post("/:userId/:token", async (req, res) => {
    try {

        const user = await User.findById(req.params.userId);
        if (!user) return res.status(400).send("invalid link or expired");

        const token = await Token.findOne({
            userId: user._id,
            token: req.params.token,
        });
        if (!token) return res.status(400).send("Invalid link or expired");

        user.password = req.body.password;
        await user.save();
        await token.delete();

        res.send("password reset sucessfully.");
    } catch (error) {
        res.send("An error occured");
        console.log(error);
    }
});

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////


module.exports = router;

