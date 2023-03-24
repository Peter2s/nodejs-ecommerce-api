const mongoose = require("mongoose");
const DBConnection = ()=>{
  mongoose
  .connect(process.env.DB_URL)
  .then((conn) => console.log(`Data Base connected ${conn.connection.host}`))
}
module.exports =DBConnection;