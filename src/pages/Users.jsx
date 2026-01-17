import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllUser, toggleFollower } from '../features/actions/userAction';
import { getAvatar } from '../../utils/getAvater';
import { EditIcon, Globe, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import Button from '../component/Button';
import SearchBar from '../component/SearchBar';

export default function Users() {
    const { users, loadind } = useSelector((state) => state.user);
    const [key, setKey]=useState("");
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getAllUser())
        console.log(users);

    }, [dispatch])

    const handleFollow =(id)=>{
        console.log(id);
        
        dispatch(toggleFollower(id))
    }
    
    const handleSearch=()=>{
        dispatch(getAllUser(key))

    }
    return (
        <div className='flex flex-col justify-center'>
        <div className='flex items-center mt-5 justify-center'>
           

            <SearchBar setKey={setKey} width={"w-[50%] "} padding={" py-2"} handleSearch={handleSearch}/>
           </div>
            <div className='p-5 md:w-[95%] w-[80%] grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-10  mt-10'>
                {users?.length>0? users.map((user, key) => (<div key={key} className='sm:w-full  bg-linear-to-r from-purple-600 to-pink-700 text-white p-[2px] rounded-xl shadow-lg'>
                    <div className='bg-white py-3 p-3 rounded-xl text-black'>
                        <div className='relative pb-5 transition-all transform duration-1000 delay-300'>
                            <div className='md:h-15 h-30 w-full bg-linear-to-r from-purple-600 to-pink-700 rounded-t-xl'>
                                {user?.coverImage?.image &&
                                    <img src={user?.coverImage?.image}
                                        className='rounded-t-xl h-full w-full object-cover'
                                        alt="" />}</div>
                            <div className='w-25 h-25 outline-2 rounded-full outline-white   absolute md:top-8 top-20 left-5'>
                                {user?.profileImage?.image ? (<img
                                    className='object-cover w-full h-full rounded-full'
                                    src={user?.profileImage?.image}
                                    alt="" />) : (
                                    <div className=' w-full h-full  rounded-full flex justify-center items-center text-white
          bg-linear-to-r from-purple-600 to-pink-700 text-xl poppins-bold'>{getAvatar(user?.username)}</div>
                                )}
                            </div>



                            <div className='flex flex-col gap-3 ml-5 mt-20  relative '>
                                <p className='poppins-bold'>{user?.username}</p>
                                <div className='flex items-center justify-around'>

                                    <div className='flex items-center  gap-2'>
                                        <MapPin className='w-5' />
                                        <p className=''> {user?.city}</p>
                                    </div>
                                    <div className='flex items-center  gap-2'>
                                        <Globe className='w-5' />
                                        <p className=''> {user?.country}</p>
                                    </div>
                                </div>
                            </div>

                        </div>
                                  <Button width={"w-full"} Action={()=>handleFollow(user._id)} text={"Follow"}></Button>
                    </div>
                </div>)):(
                    <p className='text-center absolute left-[45%]'>No user available</p>
                )}
            </div>
        </div>
    )
}
