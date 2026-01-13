import { HomeIcon, MenuSquare, UsersIcon } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import NavBar from '../component/NavBar';
import Post from '../component/Post';
import Profile from './Profile';
import ProfileView from '../component/ProfileView';
import CreatPost from '../component/CreatPost';
import Loader from '../component/Loader';
import { GetPost } from '../features/actions/postAction';
import { useDispatch, useSelector } from 'react-redux';
import FriendsList from '../component/FriendsList';

export default function Home() {
     const dispatch=useDispatch()
    const {feed:posts, message, status, loading}=useSelector((store)=>store.post);
    // console.log(posts);
    const [showFriends, setShowFriends] = useState(false);
    // const {IsLogin , currentUser}=useSelector((store)=>store.auth);
    useEffect(()=>{
dispatch(GetPost())
    },[dispatch, GetPost])
  return (
    <div className='w-full h-full bg-gray-100'>
                            <FriendsList  setShow={setShowFriends} show={showFriends} />
<div className=' grid md:grid-cols-[300px_1fr]  md:gap-4 gap-10 px-5 py-10 transition-all transform duration-1000 delay-300'>
  <div className=' transition-all transform duration-1000 delay-300'>
<ProfileView openFriends={() => setShowFriends(true)}/>
  </div>
  <div className='w-full h-full flex flex-col gap-5'>

    <CreatPost width={"lg:w-[60%] md:w-[80%]"}/>
   
{posts.length>0 ?( posts.map((post, key)=>(
  
  <Post post={post} key={key} width={"lg:w-[60%] md:w-[80%] w-full"}/>
))):
(<p className='text-center mt-40'>

  No posts available
</p>
  )
}
  </div>
</div>

    </div>
  );
}
    