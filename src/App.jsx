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
import { clearUserMessage } from './features/slices/userSlice'
import { handleError, handleSuccess } from './component/loaster'
import Users from './pages/Users'
import ResetPassword from './pages/ResetPassword'
import { clearPostMessage } from './features/slices/postSlice'
import { clearAuthMessage } from './features/slices/authSlice'

function App() {

  const dispatch = useDispatch();

const { authChecked } = useSelector((state) => state.auth);

useEffect(() => {
  if (!authChecked) {
    dispatch(checkUser());
  }
}, [dispatch, authChecked]);


const {
  loading: postLoading,
  status: postStatus,
  message: postMessage
} = useSelector((state) => state.post);

const {
  loading: userLoading,
  status: userStatus,
  message: userMessage
} = useSelector((state) => state.user);

const {
  loading: authLoading,
  status: authStatus,
  message: authMessage
} = useSelector((state) => state.auth);

useEffect(() => {
  // Post messages
  if (postStatus === 1) handleSuccess(postMessage);
  if (postStatus === 0) handleError(postMessage);

  // User messages
  if (userStatus === 1) handleSuccess(userMessage);
  if (userStatus === 0) handleError(userMessage);

  // Auth messages

  if (authStatus === 0) handleError(authMessage);

  if (postMessage) dispatch(clearPostMessage());
  if (userMessage) dispatch(clearUserMessage());
  if (authMessage) dispatch(clearAuthMessage());

}, [
  postStatus, postMessage,
  userStatus, userMessage,
  authStatus, authMessage,
  dispatch
]);

  return (
    <>
    {userLoading&& <Loader/>}
    {postLoading&& <Loader/>}
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
  <Route path='/resetpassword/:otp/:email' element={<ResetPassword/>} />
</Routes>
    </>
  )
}

export default App
