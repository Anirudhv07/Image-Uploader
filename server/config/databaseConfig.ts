import mongoose, { connect } from "mongoose";

import { configKeys } from "./configKey";

const connectDB:Function=async()=>{
    const MONGO_URL:string=configKeys.MONGO_URL
    try{
        await mongoose.connect(MONGO_URL).then(()=>{
            console.log('Database Connected');
            
        })
    }catch(err){
        console.log(err,'Error occured');
        
    }
}

export default connectDB