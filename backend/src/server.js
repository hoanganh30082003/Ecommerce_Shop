const express=require('express');
const connectDB=require('../config/db');
const userService = require('./routes/userRoutes')
const cors = require('cors');
const app=express();
const paymentRoutes = require('./routes/paymentRoutes');
const productRoutes = require('./routes/product');
const cartRoutes = require('./routes/cart');
connectDB();
app.use(cors());
app.use(express.json()); 
app.use("/user",userService)
app.use('/payment', paymentRoutes);
app.use('/product', productRoutes);
app.use('/cart', cartRoutes);
const PORT=process.env.PORT||9999
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

