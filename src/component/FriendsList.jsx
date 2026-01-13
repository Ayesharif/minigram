    import { Edit, Pen, Trash2, X } from 'lucide-react'
    import React, { useEffect, useState } from 'react'
    import { getAvatar } from '../../utils/getAvater'
    import { timeAgo } from '../../utils/time'
    import AddComment from './AddComment'
    import { useDispatch, useSelector } from 'react-redux'
    import { deleteComment } from '../features/actions/postAction'
    import { getProfile } from '../features/actions/userAction'
import SearchBar from './SearchBar'
import { useNavigate } from 'react-router-dom'

    export default function FriendsList({ setShow, show }) {
        const [updateComm, setUpdateComm] = useState({})
        const dispatch=useDispatch()
        const navigate=useNavigate()

        const [key, setKey] = useState("")
        const { friends } = useSelector((state) => state.user)
        const { currentUser } = useSelector((state) => state.auth)
const myfriends= friends.filter((friend)=>friend?.username.toLowerCase().includes(key.toLowerCase()));
    useEffect(()=>{
        console.log(key);
        
    dispatch(getProfile())
    },[dispatch, ])

        return (
            <div className={`
                        ${show ? "flex" : "hidden"}
                        fixed inset-0 z-50 w-full flex items-center justify-center bg-black/50`}>
                <div className='absolute flex flex-col gap-5 z-99  bg-gray-200 p-5 rounded md:w-150 w-[90%] '>
                <div className='relative flex flex-col gap-5'>
                    <div className='flex flex-row items-center justify-between gap-5'>

<SearchBar setKey={setKey} width={"w-full"} padding={"py-1"} />
                            <X
                                onClick={() => setShow(false)}
                                className='' />
                                </div>

    {     friends.length>0 ? myfriends.map((friend, key)=>          
         <div key={key} className='flex items-center gap-3 shadow-xl p-1 cursor-pointer rounded bg-white'
         onClick={()=>{setShow(false),friend._id ==currentUser._id ? navigate('/profile'): navigate(`/profile/${friend._id}`) }}
         >
                        <div className='w-12 h-12 outline-2 rounded-full outline-white  '>
                            {friend?.profileImage?.image ? (<img
                                className='object-cover w-full h-full rounded-full'
                                src={friend?.profileImage?.image}
                                alt="" />) : (
                                <div className=' w-full h-full rounded-full flex justify-center items-center text-white
            bg-linear-to-r from-purple-600 to-pink-700 text-lg poppins-medium'>{getAvatar(friend?.username)}</div>
                            )}
                        </div>
                        <p className='poppins-medium'>{friend?.username}</p>
                    </div>
                ):(
                                        <p className='text-center absolute left-[45%]'>No user available</p>
                )    
                }
                    </div>

                    {/* <div className='flex flex-col  gap-3 max-h-100 overflow-y-auto '>

                        {post?.comments?.length > 0 && post.comments.map((comment, key) => (
                            <div key={key} className='flex flex-col  gap-3  p-2 '>
                                <div className='flex items-center gap-3 relative '>
                                    <div className='w-10 h-10 outline-2 rounded-full outline-white  '>
                                        {comment?.user?.profileImage?.image ? (<img
                                            className='object-cover w-full h-full rounded-full'
                                            src={comment?.user?.profileImage?.image}
                                            alt="" />) : (
                                            <div className=' w-full h-full rounded-full flex justify-center items-center text-white
            bg-linear-to-r from-purple-600 to-pink-700 text-lg poppins-medium'>{getAvatar(comment?.user?.username)}</div>
                                        )}
                                    </div>
                                    <div>

                                        <p className='poppins-medium text-sm'>{comment?.user?.username}</p>
                                        <p className='poppins-light text-[10px]'>{timeAgo(comment?.createdAt)}</p>

                                    </div>
                                    {currentUser._id === comment.user._id && (
                                        <div>

                    <Pen className='absolute right-0 w-5' onClick={() => handleEditClick(comment)} />
                    <Trash2 className='absolute right-10 w-5' onClick={() => 
                        dispatch(deleteComment({commentId:comment._id, postId:post._id}))
                        // console.log(post._id)
                        
                        } />
                                        </div>
                    )}

                                </div>
                                <p className='outline outline-offset-2 outline-gray-300 rounded p-2'>{comment?.text}</p>
                                {editingCommentId === comment._id && (
                    <AddComment type={true} setType={setEditingCommentId} getComment={comment} postId={post._id} />
                )}
                            </div>
                        ))
                        }


                    </div> */}


                    <div>




                    </div>



                </div>
            </div>
        )
    }
