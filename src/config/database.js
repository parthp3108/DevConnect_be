// const mongoose=require('mongoose');

// //3HmovJHbg7UyQ2DI
// const connectDB=async()=>{
// await mongoose.connect(process.env.DB_CONNECTION_SECRET)
    

// }
// module.exports=connectDB;

const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    // console.log("DB_CONNECTION_SECRET:", process.env.DB_CONNECTION_SECRET );

    await mongoose.connect('mongodb+srv://parthpancholi31:3HmovJHbg7UyQ2DI@cluster0.rgzog.mongodb.net/LinkdIn', {
    
    });

    console.log("Connected to MongoDB");
  } catch (err) {
    console.error("Failed to connect to MongoDB:", err.message);
    throw err;
  }
};

module.exports = connectDB;




   

