import { ArrowBigUp, EditIcon, Globe, LogOut, MapPin } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import Button from './Button';
import { useDispatch, useSelector } from 'react-redux';
import { getAvatar } from '../../utils/getAvater';
import { getProfile } from '../features/actions/userAction';
import FriendsList from './FriendsList';

export default function ProfileView({openFriends}) {

    const [divHight, setDivHight] = useState(true);
        const navigate=useNavigate()
        const dispatch=useDispatch()
    const {friends , myProfile}=useSelector((store)=>store.user);

    const profileImage=myProfile?.profileImage?.image
    const coverImage=myProfile?.coverImage?.image
    
    const viewFriends=friends.slice(0,2);
    useEffect(() => {
        
        const handleResize = () => {
            if (window.innerWidth > 786) {
                setDivHight(false);
    } else {
        setDivHight(true);
    }
};

handleResize(); // run once on mount

window.addEventListener("resize", handleResize);
return () => window.removeEventListener("resize", handleResize);
}, []);
useEffect(()=>{
    dispatch(getProfile())
    console.log(myProfile);

},[dispatch])
    return (
        <div className='shadow-2lg  '>

            <div

                className='w-full relative transition-all transform duration-1000 delay-300  bg-linear-to-r  from-purple-600 to-pink-700 text-white p-[2px] rounded-xl shadow-lg'
            >
                <div className='bg-gray-100  rounded-xl text-black '>

                    <div className='relative pb-5 transition-all transform duration-1000 delay-300'>
                        <div className='md:h-15 h-30 w-full bg-linear-to-r from-purple-600 to-pink-700 rounded-t-xl'>
                      { coverImage&&
        <img src={coverImage}
     className='rounded-t-xl h-full w-full object-cover'
     alt="" />}</div>
                        <div className='w-15 h-15 outline-2 rounded-full outline-white   absolute top-8 left-5'>
                            { profileImage? (<img 
        className='object-cover w-full h-full rounded-full'
     src={profileImage} 
     alt="" />):(
        <div className=' w-full  rounded-full flex justify-center items-center text-white
          bg-linear-to-r from-purple-600 to-pink-700 text-xl poppins-bold'>MA</div>
     )}
                        </div> 
<div
  className={`overflow-hidden transition-all duration-700 ease-in-out
  ${divHight ? "max-h-0 opacity-0 translate-y-5" : "max-h-[1000px] opacity-100 translate-y-0"}`}
>


                        <div className='flex flex-col gap-3 ml-5 mt-10  relative '>
                            <p className='poppins-bold'>{myProfile?.username}</p>
                            <p className=' text-sm mt-2'>{myProfile?.bio}</p>
                            <div className='flex items-center  gap-2'>
                                <MapPin className='w-5'/>
                            <p className=''> {myProfile.city}</p>
                            </div>
                            <div className='flex items-center  gap-2'>
                                <Globe className='w-5'/>
                            <p className=''> {myProfile.country}</p>
                            </div>
                           <Link to={'/profile'}>
                            <EditIcon className='absolute right-5 top-0'/>
                           </Link>
                        </div>

                        <div className='p-2 flex flex-col gap-5 mt-5 relative'>
                            <p className='font-semibold'>Friends</p>

                            <Button Action={openFriends} width={"w-fit absolute  right-2"} type={"button"} padding={"px-2"} className='absolute right-0 ' text={"See All"}/>
                                 <div className='grid grid-cols-2 gap-2'>
                            {viewFriends?.length>0? viewFriends.map((friend, key)=>(
                                <div
                                key={key}
                                onClick={()=> navigate(`/profile/${friend._id}`)} 
                                className='flex flex-col items-center bg-white p-3 cursor-pointer text-center rounded-lg shadow '>

                                    {
                                        friend?.profileImage?.image ?
                                            (<div className='w-15 h-15 rounded-full'>
                                                <img src={friend?.profileImage?.image} className='object-cover w-full h-full rounded-full' alt="" />
                                            </div>) :
                                            (<div 
                                                className='w-15 h-15 flex justify-center items-center border shadow-2xl  border-white rounded-full text-center 
                                                 bg-linear-to-r  from-purple-600 to-pink-700 text-white'>{getAvatar(friend.username)}</div>)
                                    }
                                    <p>{friend.username}</p>

                                </div>
                                )):
                            ("No friends found")}
                            </div>
                        </div>

                            </div>

                    </div>
 <div 
  onClick={()=> setDivHight(!divHight) 
    
  } 
  className='md:hidden absolute z-99 -bottom-5 left-[50%] 
  text-white rounded-full bg-linear-to-r from-purple-600 to-pink-700 p-2 cursor-pointer'>
  <ArrowBigUp className={`${divHight ? "rotate-180" : "rotate-0"} transition-transform duration-500`} />
</div>

                </div>
            </div>

        </div>
    )
}
