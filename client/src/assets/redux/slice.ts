import {createSlice} from '@reduxjs/toolkit'

const getTokenLocal=()=>{
    const token = localStorage.getItem('token')
    if(token){
        return token
    }
}

const getUserNameLocal=()=>{
    const name= localStorage.getItem('name')
    if(name){
        return name
    }
}

const getUserEmailLocal=()=>{
    const email= localStorage.getItem('email')
    if(email){
        return email
    }
}
const initialState={
    token:getTokenLocal(),
    name:getUserNameLocal(),
    email:getUserEmailLocal()

}

const userSlice= createSlice({
    name:'user',
    initialState:initialState,
    reducers:{
        setToken:(state,action)=>{
            state.token=action.payload,
            localStorage.setItem('token',action.payload)
        },
        setName:(state,action)=>{
            state.name=action.payload,
            localStorage.setItem('name',action.payload)
        },
        setEmail:(state,action)=>{
            state.email=action.payload,
            localStorage.setItem('email',action.payload)
        },
        setLogOut:(state)=>{
            state.token='',
            state.name='',
            state.email='',
            localStorage.removeItem('token'),
            localStorage.removeItem('name'),
            localStorage.removeItem('email')

        }
    }
})

export const {setToken,setName,setEmail,setLogOut}=userSlice.actions
export default userSlice.reducer