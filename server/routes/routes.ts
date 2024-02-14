import express from 'express'
import controllers from '../controller/controller'
import { upload } from '../middleware/multer'



const router=express.Router()

router.post('/api/signup',controllers.signUp)

router.post('/api/login',controllers.logIn)

router.post('/api/uploadImage',upload,controllers.upload)

router.post('/api/checkCode',controllers.checkCode)

router.get('/api/allFiles',controllers.allFiles)

router.get('/api/my_uploads',controllers.myUploads)

router.get('/api/verify_uniquecode',controllers.verifyCode)

router.put('/api/deleteImage',controllers.deleteImage)






export default router