const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotEnv = require("dotenv");
const cors = require("cors");

dotEnv.config();

// //==============================
app.use(cors())
app.get("/", (req, res) => {
  res.send("server is up");
});

app.use(express.json())
app.use(express.urlencoded({extended:true}))
//===============================


mongoose
  .connect(process.env.DATABASE_URL)
  .then(() => console.log("connected to Db"))
  .catch((err) => console.error(err));
  
app.use("/posts", require("./routes/posts"));
app.listen(process.env.PORT, () => console.log("sever is up and running"));

