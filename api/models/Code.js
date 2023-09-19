const mongoose =require("mongoose")

const codeSchema = new mongoose.Schema({
    phone_number :{
        type: Number,
        required: true
    },
    code: {
        type: String,
        required: true
    },
    creatAt: {
        type: Date,
        defaulr: Date.now,
        index: {expires:300}
    }
    // After 5 minutes it decleted automatically from the database
}, {timestamps: true}
)
code = mongoose.model("code", codeSchema)
module.exports= code