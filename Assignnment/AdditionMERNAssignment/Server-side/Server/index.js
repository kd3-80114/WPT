const express=require('express');
const app=express();
const cors=require('cors');
const appwithdetailsofempsRoutes=require('./Routes/products.js')

app.use(cors());
app.use(express.json());
app.use("/products",appwithdetailsofempsRoutes);
app.listen(5000,()=>console.log("Server Started Listen at 5000"));