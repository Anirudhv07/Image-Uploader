import { useState } from 'react'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import SignupPage from './assets/Pages/SignupPage'
import LoginPage from './assets/Pages/LoginPage'
import HomePage from './assets/Pages/HomePage'
import { useSelector } from 'react-redux';
import { ThemeProvider } from '@material-tailwind/react'
import MyUploads from './assets/Pages/MyUploads'

function App() {
  const reduxToken = useSelector((store: { user: { token: string } }) => store.user.token)
  return (
    <BrowserRouter>
   
    <ThemeProvider>
      <Routes>
        <Route path='/' element={reduxToken?<HomePage />:<LoginPage />} />
        <Route path='/signup' element={<SignupPage />} />
        <Route path='/my_uploads' element={<MyUploads />} />



      </Routes>
      </ThemeProvider>
    </BrowserRouter>
  )
}

export default App
