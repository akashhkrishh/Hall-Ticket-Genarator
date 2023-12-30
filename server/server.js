const express = require('express');
const app = express();
const mongoose  = require('mongoose');
const bodyParser = require('body-parser')
require('dotenv').config();
const cors = require('cors');
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }))
const multer = require('multer');
const { validAdmin } = require('./utils/middleware');
const upload = multer();


const port = process.env.PORT || 3656;
app.use(express.json());

app.use("/api/subject",require("./routes/SubjectRouter"));
app.use("/api/student",validAdmin,require("./routes/StudentRouter"));
app.use("/api/admin",require("./routes/AdminRouter"));
app.use("/api/open",require("./routes/OpenRouter"));

app.listen(port,()=>{
    console.log(`Server listening...\nhttp://localhost:${port}`)
});

mongoose.connect(process.env.MONGO_DB_URL)
    .then(()=>{console.log("Database Connected ...")})
    .catch((error)=>{console.error(error)});