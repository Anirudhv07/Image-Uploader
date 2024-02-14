import http from 'http'
import app from "./app"
import { configKeys } from './config/configKey'
const PORT=configKeys.PORT


const server=http.createServer(app)


server.listen(PORT,()=>{
    console.log(`server connected to ${PORT}`);
    
})
