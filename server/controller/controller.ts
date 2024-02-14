import { Request, Response } from "express";
import fs, { promises as fsPromises } from "fs"
import bcrypt from 'bcryptjs'
import { allFilesHelper, deleteImageHelper, generateTokenHelper, isExistingUser, myUploadsHelper, signUpHelper, uniqueCodeHelper, uploadHelper, verifyCodeHelper } from "../helpers/helpers";



const controllers = {

  //SIGN UP 
signUp: async (req:Request, res:Response) => {
  try {
    const { name, email, password } = req.body;
    
    const isEmailExist = await isExistingUser(email);

    if (isEmailExist == null) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      const response = await signUpHelper(name, email, hashedPassword);
      const jwtToken = generateTokenHelper(response._id);
      const userData = {
        status: 'success',
        message: 'Registration Successful',
        user: response,
        token: jwtToken
      };

      res.json(userData);
    } else {
      const userData = {
        status: 'failed',
        message: 'User already Exist',
        user: {},
        token: ''
      };
      res.json(userData);
    }
  } catch (error) {
    console.error('Error during signup:', error);
    res.status(500).json({
      status: 'error',
      message: 'An error occurred during registration'
    });
  }
},


  //LOG IN
  logIn: async (req: Request, res: Response) => {
    try{
        const { email, password } = req.body


        const isEmailExist = await isExistingUser(email)
    
        if (isEmailExist != null) {
    
    
          const salt = await bcrypt.genSalt(10)
          const comparePassword = await bcrypt.compare(password, isEmailExist.password)
          if (comparePassword == true) {
    
            const jwtToken = generateTokenHelper(isEmailExist._id)
            const userData = {
              status: 'success',
              message: 'Login Successful',
              user: isEmailExist,
              token: jwtToken
            }
    
            res.json(userData)
          } else {
            const userData = {
              status: 'failed',
              message: 'Password Is Incorrect',
              user: {},
              token: ''
            }
    
            res.json(userData)
          }
    
    
    
        } else {
          const userData = {
            status: 'failed',
            message: "User Doesn't Exist",
            user: {},
            token: ''
          }
          res.json(userData)
    
        }
      } catch(err){
        console.log('Error occured during login',err);
        res.status(500).json({
            status: 'error',
            message: 'An error occurred during login'
          });
      }
    }
    ,

    //UPLOAD IMAGE
    upload:async(req:Request,res:Response)=>{
        try{

           const fileName=req.file?.filename
           const email=req.body.email
           const uniqueCode=req.body.uniqueCode

           

           const response=await uploadHelper(fileName,email,uniqueCode)
           res.json(response)
           

            
        }catch(err){
        console.log('Error occured during Upload',err);
        res.status(500).json({
            status: 'error',
            message: 'An error occurred during Uploading Image'
          });
      }
    },

    //CHECK UNIQUE CODE
    checkCode:async(req:Request,res:Response)=>{
        try{

            const {uniqueCode}=req.body
            const response=await uniqueCodeHelper(uniqueCode)
            
            res.json(response)
            

        }catch(err){
        console.log('Error occured during Checking Unique Code',err);
        res.status(500).json({
            status: 'error',
            message: 'An error occurred during Checking Unique Code'
          })
    }

    },

    //GET ALL FILES
    allFiles:async(req:Request,res:Response)=>{
        try{
            const response= await allFilesHelper()
            res.json(response)
            

        }catch(err){
            console.log('Error occured during getting All files',err);
            res.status(500).json({
                status: 'error',
                message: 'An error occurred during getting All files'
              })
        }
    },


    //GET MY UPLOADS
    myUploads:async(req:Request,res:Response)=>{
        try{
            
            const {email}=req.query
            const response= await myUploadsHelper(email)
            res.json(response)
        }
        catch(err){
            console.log('Error occured during getting My files',err);
            res.status(500).json({
                status: 'error',
                message: 'An error occurred during getting My files'
              })
        }
    },

    //VERIFY UNIQUE CODE
    verifyCode:async(req:Request,res:Response)=>{
        try{
            
            const {code,imgId}=req.query
            const response= await verifyCodeHelper(code,imgId)
            if(response==true){
                res.json({
                    status:true,
                    message:'Unique code is Correct'})
            }else{
                res.json({
                    status:false,
                    message:'Unique code is Wrong'})
            }
        }
        catch(err){
            console.log('Error occured during Verifying unique code',err);
            res.status(500).json({
                status: 'error',
                message: 'An error occurred during Verifying unique code'
              })
        }
    },

    //DELETE UNIQUE CODE
    deleteImage:async(req:Request,res:Response)=>{
        try{
            
            const {imgId}=req.body
            const response= await deleteImageHelper(imgId)
            res.json(response)
    
        }
        catch(err){
            console.log('Error occured during Deleting the Image',err);
            res.status(500).json({
                status: 'error',
                message: 'An error occurred during Deleting the Image'
              })
        }
    }


}

export default controllers;