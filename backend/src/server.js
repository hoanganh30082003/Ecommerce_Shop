const express=require('express');
const connectDB=require('../config/db');
const userService = require('./routes/userRoutes')
const cors = require('cors');
const app=express();
connectDB();
app.use(cors());
app.use(express.json()); 
app.use("/user",userService)
const PORT=process.env.PORT||9999
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

