import  express  from 'express'
import  colors from 'colors';
import dotenv from 'dotenv';
import morgan from 'morgan';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js'
import cors from "cors"

//adding rest object 
const app =express();


// configure env
dotenv.config();

//database config

connectDB();
// middlewares
app.use(cors())
app.use (express.json())
app.use(morgan('dev'))
//routes
app.use("/api/v1/auth",authRoutes);



 app.get ("/",(req,res) =>{
    res.send(
        "<h1> WELCOME TO DUASAINY ECOMMERCE APP</h1>"
    );
});

//connecting port

const PORT = process.env.PORT ||4000;

//run listen 

app.listen (PORT,()=>{
    console.log(`server start on ${process.env.DEV_MODE} mode on port ${PORT}`.bgCyan.white);
})
