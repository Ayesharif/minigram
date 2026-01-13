import React, { useEffect, useState } from 'react'
import { getAvatar } from '../../utils/getAvater'
import { useDispatch, useSelector } from 'react-redux'
import Button from './Button'
import { addComment, updateComment } from '../features/actions/postAction'

export default function AddComment({type, getComment, setType, postId}) {
    const dispatch=useDispatch()
  const {currentUser}=useSelector((state)=>state.auth)
  const[Comment,setComment]=useState("");
  useEffect(()=>{
    setComment(getComment?.text)
  },[])
//   console.log(getComment);
  
const manageComment=()=>{
   if(getComment){

       const comment={
           commentId:getComment._id,
           text:Comment,
           postId,
        }
        
        console.log(comment);
dispatch(updateComment(comment))

setType(false)
setComment("")

}else{
    const comment={
        
        text:Comment,
        postId,
    }
    
    console.log(comment);
    dispatch(addComment(comment))

    setType(false)
    }

}



  
    return (
  <div className={`
    ${type? "flex":"hidden"}
     w-full items-center gap-2`}>

  <div className='w-10 h-10 outline-2 rounded-full outline-white  '>
                 { currentUser.profileImage? (<img 
        className='object-cover w-full h-full rounded-full'
        src={currentUser.profileImage.image} 
        alt="" />):(
          <div className=' w-full h-full rounded-full flex justify-center items-center text-white
          bg-linear-to-r from-purple-600 to-pink-700 text-lg poppins-medium'>{getAvatar(currentUser.username)}</div>
        )}
            </div>
            <div className= 'w-[90%] flex flex-col outline outline-gray-300 rounded-xl gap-5 py-2 px-2'>
<input type="text" name='text' value={Comment|| ""} onChange={(e)=> setComment(e.target.value)} className='w-full outline-0 ' />
<Button
Action={manageComment}
text={"Comment"}  padding={" px-3"}></Button>
            </div>

        </div>
  )
}
