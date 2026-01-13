import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import ForgotPassword from './pages/forgotPassword'
import OtpVerification from './pages/otpVerification'
import Home from './pages/home'
import Profile from './pages/Profile'
import Layout from './layout/layout'
import ProtectedRoute from './component/protectedRoute'
import { useDispatch, useSelector } from 'react-redux'
import { checkUser } from './features/actions/authAction'
import Loader from './component/Loader'
import { clearMessage } from './features/slices/userSlice'
import { handleError, handleSuccess } from './component/loaster'
import Users from './pages/Users'

function App() {

  const dispatch = useDispatch();

const { authChecked } = useSelector((state) => state.auth);

useEffect(() => {
  if (!authChecked) {
    dispatch(checkUser());
  }
}, [dispatch, authChecked]);

  const {loading, status, message}=useSelector((state)=>state.user)
  const {loading: authLoading}=useSelector((state)=>state.auth)

  useEffect(()=>{
    if(status==1){
      handleSuccess(message)
    }
    if(status==0){
      handleError(message)
    }
    if(message !== null){
      clearMessage()
    }
  },[clearMessage,status, message])
  return (
    <>
    {loading&& <Loader/>}
    {authLoading&& <Loader/>}
<Routes>

  <Route element={<ProtectedRoute/>} >
  <Route path='/' element={<Layout/>} >
  <Route index element={<Home/>} />

  <Route path='/users' element={<Users />} />
  <Route path='/Profile' element={<Profile />} />
  <Route path='/Profile/:id' element={<Profile />} />
  </Route>
  </Route>
  <Route path='/login' element={<Login></Login>} />
  <Route path='/register' element={<Register/>} />
  <Route path='/forgotpassword' element={<ForgotPassword/>} />
  <Route path='/otpverify' element={<OtpVerification/>} />
</Routes>
    </>
  )
}

export default App
