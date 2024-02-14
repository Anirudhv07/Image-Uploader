import multer from 'multer'
import path from 'path'
import { Request, Response } from 'express'


//TO UPLOAD PDF TO SERVER
const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'./public/uploads')
    },
    filename:(req,file,cb)=>{
        const ext = path.extname(file.originalname)
        const filename = file.originalname.split(ext)[0]
        cb(null,filename+'_'+Date.now()+ext)
        
        
    }
})

//CHECK WHETHER THE INCOMMING FILE IS PDF OR NOT
const fileFilter=(req:Request,file:any,cb:any)=>{
    if(file.mimetype==='image/webp' || file.mimetype==="image/jpeg") cb(null,true)
    else cb({message:'Please select an Image'})

}


export const upload=multer({storage,fileFilter,limits:{ fieldSize: 5000 }}).single('image')