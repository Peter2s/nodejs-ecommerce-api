const express = require("express");
const app = express();
require("dotenv").config();
var mongoose = require("mongoose");

mongoose
  .connect(process.env.DB_URL)
  .then((conn) => console.log(`Data Base connected ${conn.connection.host}`))
  .catch((error) => console.error(`Data Base error ${error}`));

const morgan = require("morgan");
app.use(morgan("dev"));

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`app listen to ${PORT}`);
});
app.get('/' , (req , res)=>{

   res.send('hello from simple server :)')

})