import express from "express"
import router from "./routes/routes"
import connectDB from "./config/databaseConfig"
import cors from 'cors'


const app=express()
app.use(cors());
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static('./public'));
app.use('/uploads', express.static('uploads'));
connectDB()
app.use(router)


export default app