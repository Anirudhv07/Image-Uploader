import express from 'express'
import controllers from '../controller/controller'
import { upload } from '../middleware/multer'
import userMiddleware from '../middleware/userTokeMiddleware'



const router=express.Router()

router.post('/api/signup',controllers.signUp)

router.post('/api/login',controllers.logIn)

router.post('/api/uploadImage',userMiddleware,upload,controllers.upload)

router.post('/api/checkCode',userMiddleware,controllers.checkCode)

router.get('/api/allFiles',userMiddleware,controllers.allFiles)

router.get('/api/my_uploads',userMiddleware,controllers.myUploads)

router.get('/api/verify_uniquecode',userMiddleware,controllers.verifyCode)

router.put('/api/deleteImage',userMiddleware,controllers.deleteImage)






export default router