import { configKeys } from "../config/configKey";
import User from "../model/schema";
import File from "../model/fileSchema";
import jwt, { JwtPayload } from 'jsonwebtoken'
import fs from "fs"


//SIGN UP
export const signUpHelper = async (name: string, email: string, password: string) => {
    const user = {
        name,
        email,
        password
    }
    const newUser = new User(user)

    return await newUser.save()

}

//TO CHECK USER ALREADY EXISTED OR NOT
export const isExistingUser = async (email: string) => {
    const response = await User.findOne({ email: email })
    return response

}

//TO GENERATE JWT TOKEN
export const generateTokenHelper = (id: object) => {

    const token = jwt.sign({ id }, configKeys.JWT_SECRET_KEY, {
        expiresIn: '2d'
    })

    return token

}

//VERIFY JWT TOKEN
export const verifyToken=(token:string)=>{
    if(configKeys.JWT_SECRET_KEY){
        const verification=jwt.verify(token,configKeys.JWT_SECRET_KEY) as JwtPayload
        if(verification.exp!=undefined){
            const currentTimeInSecond=Math.floor(Date.now()/1000)
            if(verification.exp>=currentTimeInSecond){
                return true
            }else{
                return false
            }
        }else{
            return undefined
        }
        
    }
}

//UPLOAD HELPER
export const uploadHelper=async(fileName:any,email:string,uniqueCode:string)=>{

    const newUpload={
        fileName,
        email,
        uniqueCode
    }    
    const newImageUpload=new File(newUpload)
    return await newImageUpload.save()
}

//UNIQUE CODE HELPER
export const uniqueCodeHelper= async(uniqueCode:string)=>{
    const response= await File.findOne({uniqueCode:uniqueCode})
    if(response){
        return true
    }else{
        return false
    }
    
}


//GET ALL FILE HELPER
export const allFilesHelper= async()=>{
    const response= await File.find().sort({createdAt:-1})
    const filteredResponse = response.map(({ _id, fileName, email }) => ({ _id, fileName, email }));
    return filteredResponse
}


//GET MY UPLOAD HELPER
export const myUploadsHelper= async(email:any)=>{
    const response= await File.find({email:email}).sort({createdAt:-1})   
    return response
}

//VERIFY UNIQUE CODE HELPER
export const verifyCodeHelper= async(code:any,imgId:any)=>{
    const response= await File.findOne({_id:imgId})
    if(response?.uniqueCode==code){
        return true
    }else{
        return false
    }
    
}


//DELETE IMAGE HELPER
export const deleteImageHelper= async(imgId:any)=>{
    const response = await File.findOneAndDelete({ _id: imgId });
    if(response){
        fs.unlinkSync(`public/uploads/${response.fileName}`)
    }
    
        return response
}

