import { HomeIcon, LogOutIcon, MenuSquare, User, UsersIcon } from 'lucide-react'
import React, { useEffect } from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom'
import { checkUser, logout } from '../features/actions/authAction';

export default function NavBar() {
    const [show, setShow]=useState(false);
    const dispatch=useDispatch()
    const navigate=useNavigate()
    const {IsLogin, message, status}=useSelector((store)=>store.auth);
        // useEffect(()=>{
        //     dispatch(checkUser())
        // },[dispatch, checkUser, IsLogin])

        //     useEffect(() => {


        //         if (!IsLogin ) {
                   
        //              handleError("Login Failed")
        //              navigate('/login')
        //         }
         
        //         if (status !== null) {
        //             dispatch(clearMessage());
        //         }
        //     }, [status,IsLogin, message, dispatch]);
  return (
    <nav className='w-full h-19 flex items-center justify-center bg-linear-to-r from-purple-600 to-pink-700 rounded-t-2xl transition-all duration-700'> 
        <div className='flex items-center justify-between relative md:w-[80%] w-full  transition-all duration-1000'>
        <div className=' sm:w-[40%] flex items-center '>


        <div className='w-17'>
            <img className='object-cover' src="logo.png" alt="logo" />
        </div>
            <span className='poppins-bold text-2xl text-white'>minigram</span>
</div>
<MenuSquare
  className="text-white w-10 sm:hidden cursor-pointer "
  onClick={() => setShow(!show)}
/>

<div
  className={`
    w-full
    sm:flex sm:flex-row
    flex-col
    sm:static absolute
    top-19
    justify-around
    bg-linear-to-r from-purple-600 to-pink-700
    sm:bg-none

    transition-all duration-500 ease-in-out
    overflow-hidden

    ${show
      ? "opacity-100 translate-y-0 max-h-60 pointer-events-auto"
      : "opacity-0 -translate-y-5 max-h-0 pointer-events-none"}

    sm:opacity-100
    sm:translate-y-0
    sm:max-h-full
    sm:pointer-events-auto sm:z-0
    z-99
    py-2
  `}
>



  <Link className='sm:w-fit w-full flex sm:p-0 p-1 sm:hover:bg-transparent text-white hover:text-black hover:bg-white ' to={'/'}>
  <HomeIcon />
  </Link>
  <Link className='sm:w-fit w-full flex sm:p-0 p-1 sm:hover:bg-transparent text-white hover:text-black hover:bg-white ' to={'/users'}>
  <UsersIcon />
  </Link>
  <Link className='sm:w-fit w-full flex sm:p-0 p-1 sm:hover:bg-transparent text-white hover:text-black hover:bg-white ' to={'/profile'}>
  <User/>
  </Link>
  <Link className='sm:w-fit w-full flex sm:p-0 p-1 sm:hover:bg-transparent text-white hover:text-black hover:bg-white ' >
  <LogOutIcon onClick={()=> dispatch(logout())} />
  </Link>

</div>

    </div>
 
    </nav>
  )
}
