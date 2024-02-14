import {
    Card,
    Input,
    Button,
    Typography,
  } from "@material-tailwind/react";
  import * as Yup from "yup"
  import { Link, useNavigate } from "react-router-dom";
  import { useFormik } from 'formik'
  import { signUp } from "../../api/apiConnection/connection";
  
  import { useDispatch } from "react-redux";
  import { setEmail, setName, setToken } from "../../redux/slice";
  import { toast } from "react-toastify";
  
  const SignUpForm = () => {
  
    const dispatch = useDispatch()
    const navigate = useNavigate()
  
  
    //formik validation
    const formik = useFormik({
      initialValues: {
        name: '',
        email: '',
        password: ''
      },
      validationSchema: Yup.object({
        name: Yup.string()
          .max(10, 'Name must be less than 10 character')
          .required('Required'),
        email: Yup.string()
          .email("Invalid Email address")
          .required('Required'),
        password: Yup.string()
          .min(8,'Password must be more than 8 character')
          .required('Required')
      }),
      onSubmit: async (values) => {
  
        const response = await signUp(values)
        if (response.status == 'success') {
          if (response?.token) {
  
            dispatch(setToken(response?.token))
            dispatch(setName(response?.user.name))
            dispatch(setEmail(response?.user.email))
            navigate('/')
            toast.success(response?.message)
          }
        }
  
      }
    })
    return (
      <Card color="transparent" shadow={false}  placeholder={undefined}>
        <div className="border border-gray-300 p-16 rounded-md w-fill  bg-white drop-shadow-xl"  >
          <Typography variant="h4" className="text-center" color="green"  placeholder={undefined}>
            Sign Up
          </Typography>
          <Typography color="gray" className="mt-1 text-center font-normal"  placeholder={undefined}>
            Enter your details
          </Typography>
          <form className="mt-2 mb-2 w-80 max-w-screen-lg sm:w-96" onSubmit={formik.handleSubmit}>
            <div className="mb-1 flex flex-col gap-2">
              <Typography variant="h6" color="blue-gray" className="-mb-3"  placeholder={undefined}>
                Name
              </Typography>
              <Input
                size="lg"
                placeholder="Enter your Name"
                id="name"
  
                className=" !border-t-blue-gray-200 focus:!border-green-500"
                labelProps={{
                  className: "before:content-none after:content-none",
                }} crossOrigin={undefined}
                {...formik.getFieldProps('name')} />
              <p className=" ml-2 text-sm text-red-800">
                {formik.touched.name && formik.errors.name ?
                  formik.errors.name : null}
              </p>
  
              <Typography variant="h6" color="blue-gray" className="-mb-3"  placeholder={undefined}>
                Email
              </Typography>
              <Input
                size="lg"
                placeholder="Enter your E-mail"
                id="email"
                className=" !border-t-blue-gray-200 focus:!border-green-500"
                labelProps={{
                  className: "before:content-none after:content-none",
                }} crossOrigin={undefined}
                {...formik.getFieldProps('email')} />
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
                id="password"
                placeholder="Enter your Password"
                className=" !border-t-blue-gray-200 focus:!border-green-500"
                labelProps={{
                  className: "before:content-none after:content-none",
                }} crossOrigin={undefined}
                {...formik.getFieldProps('password')} />
              <p className=" ml-2 text-sm text-red-800">
  
                {formik.touched.password && formik.errors.password ?
                  formik.errors.password : null}
              </p>
  
            </div>
  
            <Button className="mt-6  bg-green-500" type="submit" fullWidth  placeholder={undefined}>
              Sign Up
            </Button>
            <Typography color="gray" className="mt-4 text-center font-normal"  placeholder={undefined}>
              Already have an account?{" "}
              <Link to={'/'} className="font-medium  text-green-400">
                Log In
              </Link>
            </Typography>
          </form>
  
        </div>
      </Card>
    );
  }
  
  export default SignUpForm