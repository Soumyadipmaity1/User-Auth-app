import mongoose from "mongoose";

export default async function Connect() {
  try {
 mongoose.connect(process.env.MONGO_URI!   );
 const connection = mongoose.connection;
   
 connection.once('connected', () => {
    console.log("Database connected successfully");
 });  
    connection.on('error', (err) => {
        console.log("Error connecting to database" + err);
        process.exit();
    });
} catch (error) {
    console.log("Error connecting to database", error);
  }
}