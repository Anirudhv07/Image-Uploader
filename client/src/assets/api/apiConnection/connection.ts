import  baseURL  from "../axiosUser";

interface signUpForm {
    name: string,
    email: string,
    password: string
}
interface logInForm {
    email: string,
    password: string
}


//API TO SIGN UP
export const signUp = async (values: signUpForm) => {
    const response = await baseURL.post('/signup', values)
      return response?.data
}

//API TO LOGIN
export const logIn = async (values: logInForm) => {
    const response = await baseURL.post('/login', values)
    return response?.data
}

//API TO UPLOAD IMAGE
export const uploadImage = async (image:any,email:string,uniqueCode:any)=>{
    const form = new FormData
        form.append('image', image)
        form.append('email', email)
        form.append('uniqueCode', uniqueCode)

    
    const response = await baseURL.post('/uploadImage', form)
    return response.data
    
}

//API TO CHECK UNIQUE CODE
export const checkCode = async (uniqueCode:number)=>{
    const response =await baseURL.post('/checkCode',{uniqueCode})
    return response.data
    
}

//API TO GET ALL FILE
export const getAllFiles=async()=>{
    const response= await baseURL.get('/allFiles')
    return response.data
    
}


//API TO GET MY UPLOADED FILE
export const getMyUploads=async(email:string)=>{
    
    const response= await baseURL.get('/my_uploads', {
        params: {
            email: email
        }
    })
    return response.data
    
}


//API TO VERIFY THE UNIQUE CODE
export const verifyTheCode=async(code:any,imgId:string)=>{
    const response=await baseURL.get('/verify_uniquecode',{   params: {
        code: code,
        imgId:imgId
    }})
    return response.data
}


//API TO DELETE IMAGE
export const deleteImage=async(imgId:string)=>{
    const response=await baseURL.put('/deleteImage',{imgId})
    return response.data
}