const jwt = require('jsonwebtoken')
const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
  
    firstName :{
      type :String,
      required: true,
      minlength: 3,
      maxlength: 50,
  },
  lastName :{
      type :String,
      required: true,
      minlength: 3,
      maxlength: 50,
  },

  email :{
      type: String,
      required: true,
      unique: true,
      lowercase:true,
      trim: true,
      minlength: 5,
      maxlength: 255,
      
  },

  password: {
      type: String,
      required: true,
      minlength: 6,
      maxlength: 1024,
  },
  phone_number : {
      type: Number,
      required:true,
      unique: true,
      min: 6,
  },
  date_Birth:{
    type: String,
  },
  activeEmail:{
    type: Boolean,
    default: false
  }, 
  activePhone:{
    type: Boolean,
    default: false

  },
  role :{

    type: String,
    enum: ['Admin', 'User'],
  
  },

  profilePicture: {
      type: String,
      default: "",
    },
    coverPicture: {
      type: String,
      default: "",
    },
    followers: {
      type: Array,
      default: [],
    },
    followings: {
      type: Array,
      default: [],
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    desc: {
      type: String,
      max: 50,
    },
    city: {
      type: String,
      max: 50,
    },
    from: {
      type: String,
      max: 50,
    },
    relationship: {
      type: Number,
      enum: [1, 2, 3],
    },
    tokens: [{
      token:{
        type: String,
        required: true
      }
    }]
  },
  { timestamps: true }
);

UserSchema.methods.generateAuthToken = async function () {
  const user = this
  const token = jwt.sign({ userId: user._id.toString() }, process.env.jwtPrivateKey,{expiresIn: '1h'})

  user.tokens = user.tokens.concat({ token })
  await user.save()

  return token
}


module.exports = mongoose.model("User", UserSchema);
