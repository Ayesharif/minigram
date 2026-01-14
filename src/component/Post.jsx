import { Image, MessageCircle, ThumbsUp, Trash2, X } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import Button from './Button'
import { timeAgo } from '../../utils/time'
import { getAvatar } from '../../utils/getAvater'
import { useDispatch, useSelector } from 'react-redux'
import ViewComments from './ViewComments'
import AddComment from './AddComment'
import Loader from './Loader'
import { handleError, handleSuccess } from './loaster'
import { clearUserMessage } from '../features/slices/userSlice'
import { DeletePost, toggleLike } from '../features/actions/postAction'
import { ImageGallery } from './ImageGallary'
import { useNavigate } from 'react-router-dom'

export default function Post({width, post}) {

  const[type, setType]=useState(false)
  const[show, setShow]=useState(false)
  const dispatch=useDispatch();
  const navigate=useNavigate();

  // console.log(post);
  const {currentUser}=useSelector((state)=>state.auth)
  const {loading, status, message}=useSelector((state)=>state.user)


  return (

    <div className='w-full place-items-center'>
{/* {loading && <Loader/>} */}

    <div

className={`${width} bg-linear-to-r  from-purple-600 to-pink-700 text-white p-[2px] rounded-xl shadow-lg`}
    >
      <div className=' '>

        <div className=' flex flex-col gap-5 bg-white py-3 p-3 rounded-xl text-black  '>
          <div className='flex items-center gap-3  '>
            <div className='w-12 h-12 outline-2 rounded-full outline-white  '>
                 { post?.user?.profileImage?.image? (<img 
        className='object-cover w-full h-full rounded-full'
     src={post?.user?.profileImage?.image} 
     alt="" />):(
        <div className=' w-full h-full rounded-full flex justify-center items-center text-white
          bg-linear-to-r from-purple-600 to-pink-700 text-lg poppins-medium'>{getAvatar(post?.user?.username)}</div>
     )}
            </div>
            <div className='w-full relative'>
              <p
                     onClick={()=>{post?.user?._id == currentUser._id ? navigate('/profile'): navigate(`/profile/${post?.user?._id}`) }}
               className='poppins-medium cursor-pointer'>{post?.user?.username}</p>
              <p className='poppins-light'>{timeAgo(post?.createdAt)}</p>

{post.user._id == currentUser._id &&       
     <Trash2 className='absolute right-0 top-0' onClick={()=> dispatch(DeletePost(post?._id))} />}
     </div>

          </div>


          <div>
            <p>{post?.content}</p>
{/* 
<div className="w-full aspect-square overflow-hidden rounded-lg mt-3">
  <img className="w-full h-full object-cover"
    src="https://images.pexels.com/photos/1704488/pexels-photo-1704488.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
    alt=""
  />
</div> */}
{ post?.images?.length>0 &&
<ImageGallery images={post?.images}/>
}
  <div className='flex flex-col gap-2'>
  <div className='flex flex-row justify-between'>
    <div className='flex items-center p-2 gap-2'>
         <ThumbsUp className='text-blue-600'/>
      <p>{post?.likesCount}</p>
    </div>
    <div
    onClick={()=>setShow(true)}
    className='flex items-center p-2 gap-2'>
         <MessageCircle className='text-blue-600'/>
      <p>{post?.commentsCount}</p>
    </div>
  </div>
  <hr />
  <div className='flex flex-row  justify-between'>
    <div 
    onClick={()=> dispatch(toggleLike({postId:post._id}))}
    className={`flex items-center  gap-2 px-3 py-1 hover:bg-gray-200 cursor-pointer ${post?.isLikedByMe && "bg-blue-100" } rounded`}>
         <ThumbsUp className={`w-5 ${post?.isLikedByMe && "text-blue-600" }`}/> 
      <p>Like
      </p>
    </div>
    <div 
       onClick={()=>setType(true)}
     className='flex items-center  gap-2 px-3 py-1 hover:bg-gray-200 cursor-pointer'>
         <MessageCircle className='text-blue-600'/>
      <p>Comment</p>
    </div>

  </div>
  <AddComment type={type} setType={setType} postId={post?._id}/>

</div>

<div>

</div>

          </div>



        </div>
      </div>
    </div>
  
<ViewComments post={post} setShow={setShow} show={show}/>


                </div>
  )
}
