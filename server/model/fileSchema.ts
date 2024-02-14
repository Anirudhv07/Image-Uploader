import { Schema,model } from "mongoose";

const fileSchema=new Schema(
    {
        fileName:{
            type:String,
            required:true
        },
        email:{
            type:String,
            required:true
        },
       uniqueCode:{
        type:String,
        required:true
       }
        
    },
    {
        timestamps:true
    }
)

const File = model('File',fileSchema,'files')

export default File