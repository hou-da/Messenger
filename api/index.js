const express = require("express");
const app = express();
const cors = require('cors')
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const cookieParser = require('cookie-parser');
const morgan = require("morgan");
const multer = require("multer");
const userRoute = require("./routes/users");
const authRoute = require("./routes/auth");
const postRoute = require("./routes/posts");
const conversationRoute = require("./routes/conversations");
const messageRoute = require("./routes/messages");
const router = express.Router();
const path = require("path");
const bodyParser =require("body-parser")

dotenv.config();

mongoose.connect('mongodb://127.0.0.1:27017/test-email')
.then(() => {
    console.log('database connected')
    
}).catch(()=>{
    console.log('Something wrong !!!!!!!!!!');   
})
app.use("/images", express.static(path.join(__dirname, "public/images")));
app.use(express.urlencoded({ extended: true}));

//middleware
app.use(express.json());
app.use(cors())
app.use(helmet());
app.use(morgan('tiny'))
app.use(cookieParser());
app.use(
  bodyParser.json({
      parameterLimit:100000,
      limit:"50mb",
      extended:true
  })
)

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
});

const upload = multer({ storage: storage });
app.post("/api/upload", upload.single("file"), (req, res) => {
  try {
    return res.status(200).json("File uploded successfully");
  } catch (error) {
    console.error(error);
  }
});

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);
app.use("/api/conversations", conversationRoute);
app.use("/api/messages", messageRoute);

server = app.listen(8800, () => {
  console.log("Backend server is running!");
});
