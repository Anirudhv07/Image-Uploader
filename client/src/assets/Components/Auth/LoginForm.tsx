import {
    Card,
    Input,
    Button,
    Typography,
  } from "@material-tailwind/react";
import * as Yup from "yup"

import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logIn } from "../../api/apiConnection/connection";
import { setToken, setName, setEmail } from "../../redux/slice";
import { toast } from "react-toastify";
   
 const LoginForm=()=> {
    const dispatch=useDispatch()
    const navigate=useNavigate()
    
    //formik validation
    const formik=useFormik({
        initialValues:{
            email:'',
            password:''
        },
        validationSchema:Yup.object({
            email:Yup.string()
            .email("Invalid Email address")
            .required('Required'),
            password:Yup.string()
            .max(10,'Password must be less than 10 character')
            .required('Required')
        }),
        onSubmit:async(values)=>{
    
            const response=await logIn(values)
            if(response.status=='success'){
              
               if(response?.token){ 
                   dispatch(setToken(response?.token))
                   dispatch(setName(response?.user.name))
                   dispatch(setEmail(response?.user.email))

                    navigate('/')
                    toast.success(response?.message)
               }
            }else{
                toast.error(response?.message)
            }
            
        }
    })
    
    return (
       <Card   shadow={false}  placeholder={undefined}>
      <div className="border border-gray-300 p-16 rounded-md w-fill   bg-white drop-shadow-xl"  >


        <Typography variant="h4" className="text-center" color="green"  placeholder={undefined}>
        Log In
        </Typography>
        <Typography color="gray" className="mt-1 text-center font-normal"  placeholder={undefined}>
          Enter your details
        </Typography>
        <form className="mt-2 mb-2 w-80 max-w-screen-lg sm:w-96" onSubmit={formik.handleSubmit}>
          <div className="mb-1 flex flex-col gap-2">
           
            <Typography variant="h6" color="blue-gray" className="-mb-3"  placeholder={undefined}>
              Your Email
            </Typography>
            <Input
                        size="lg"
                        placeholder="name@mail.com"
                        className=" !border-t-blue-gray-200 focus:!border-green-500"

                        labelProps={{
                            className: "before:content-none after:content-none",
                        }} crossOrigin={undefined}        
                        {...formik.getFieldProps('email')}            />
                        <p className=" ml-2 text-sm text-red-800">
                        
                         {formik.touched.email && formik.errors.email ?
                    formik.errors.email : null}
                </p>

            <Typography variant="h6" color="blue-gray" className="-mb-3"  placeholder={undefined}>
              Password
            </Typography>
            <Input
                        type="password"
                        size="lg"
                        placeholder="********"
                        className=" !border-t-blue-gray-200 focus:!border-green-500"
                        labelProps={{
                            className: "before:content-none after:content-none",
                        }} crossOrigin={undefined}      
                        {...formik.getFieldProps('password')}             />
                        <p className=" ml-2 text-sm text-red-800">

                         {formik.touched.password && formik.errors.password ?
                    formik.errors.password : null}
                </p>

          </div>
         
          <Button className="mt-6  bg-green-500" type="submit" fullWidth  placeholder={undefined}>
            Log In
          </Button>
          <Typography color="gray" className="mt-4 text-center font-normal"  placeholder={undefined}>
            Don't have an account?{" "}
            <Link to={'/signup'} className="font-medium text-green-400">
              Sign Up
            </Link>
          </Typography>
        </form>

</div>
      </Card>
    );
  }

  export default LoginForm