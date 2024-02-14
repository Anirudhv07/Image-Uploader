import axios from 'axios'
import { BASEURL } from './baseURL'

const baseURL= axios.create({
    baseURL:BASEURL
})

baseURL.interceptors.request.use(
    (config)=>{
        const token = localStorage.getItem("token")
        if(token){
            config.headers["Authorization"]=`Bearer ${token}`
        }else{
            delete config.headers["Authorization"]
        }
        return config
    },
    (error)=>{
        console.log("Interceptor encounted an error");
        return Promise.reject(error)
        
    }
)

export default baseURL