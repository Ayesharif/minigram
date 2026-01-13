import React, { useState } from 'react'
import Button from './Button'
import { Cross, Image, X } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux';
import { CreatePost } from '../features/actions/postAction';
import { getAvatar } from '../../utils/getAvater';

export default function CreatPost({width}) {
    const [show, setShow] = useState(false);
    const [images, setImages] = useState([]);
    const [content, setContent] = useState(false);
    const [previews, setPreviews] = useState([]);
    const {currentUser}=useSelector((state)=>state.auth)
    const dispatch=useDispatch()
    const {loading, status, message,}=useSelector((state)=>state.user)
    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        const newPreviews = files.map((file) => URL.createObjectURL(file));

        setImages((prev) => [...prev, ...files]);
        setPreviews((prev) => [...prev, ...newPreviews]);

    };

    // ✅ Remove selected image
    const removeImage = (index) => {
        setImages((prev) => prev.filter((_, i) => i !== index));
        setPreviews((prev) => prev.filter((_, i) => i !== index));

    };

    const submitPost=()=>{
        const data={
            content
        }
        if(images){
            data.images=images
        }
        console.log(data);
        
        const postData= new FormData();
        postData.append("content", content);
        if(images){
images.forEach((img) => postData.append("images", img));

        }

        dispatch(CreatePost(postData))
        setShow(false)
    }
    return (
        <div className='w-full md:place-items-center'>

        <div
            className={`${width} bg-linear-to-r  from-purple-600 to-pink-700 text-white p-[2px] rounded-xl shadow-lg relative`}
            >
            <div className='bg-white  rounded-xl text-black  p-2'>
                <div className='flex px-3 py-1 gap-5 items-center'>

                     <div className='w-12 h-12 outline-2 rounded-full outline-white  '>
                                    { currentUser?.profileImage?.image? (<img 
                           className=' w-full h-full object-cover rounded-full'
                        src={currentUser?.profileImage?.image} 
                        alt="" />):(
                           <div className=' w-full h-full rounded-full flex justify-center items-center text-white
                             bg-linear-to-r from-purple-600 to-pink-700 text-lg poppins-medium'>{getAvatar(currentUser?.username)}</div>
                        )}
                               </div>
                    <div 
                    onClick={()=>setShow(true)}
                    className=' w-full px-5 cursor-pointer poppins-medium py-3 bg-gray-100 rounded-full  border border-gray-300'
                    >Start a post</div>
                </div>

                <div className={`
                    ${show?"flex":"hidden"}
                    fixed inset-0 z-50 w-full flex items-center justify-center bg-black/50`}>
                    <div className='absolute flex flex-col gap-5 z-99  bg-gray-100 p-5 rounded md:w-150 w-[90%] '>
                        <div className='flex items-center gap-3 relative '>
                            <div className='w-12 h-12 outline-2 rounded-full outline-white  '>
                                    { currentUser?.profileImage?.image? (<img 
                           className='object-cover w-full h-full rounded-full'
                        src={currentUser?.profileImage?.image} 
                        alt="" />):(
                           <div className=' w-full h-full rounded-full flex justify-center items-center text-white
                             bg-linear-to-r from-purple-600 to-pink-700 text-lg poppins-medium'>{getAvatar(currentUser?.username)}</div>
                        )}
                               </div>
                            <p className='poppins-medium'>{currentUser.username}</p>
                            <X
                                                onClick={()=>setShow(false)}
                                                className='absolute right-2' />
                        </div>
                        <textarea
                            rows={1}
                            onChange={(e)=>setContent(e.target.value)}
                            className="w-full resize-none overflow-auto h-40 outline-0"
                            
                        />
                        <label className="cursor-pointer flex flex-row items-center gap-2">
                            <Image className="w-5 h-5 text-gray-500" />

                            <span className="text-sm text-gray-500">Add image</span>

                            <input
                                type="file"
                                name="images"
                                multiple
                                onChange={handleImageChange}
                                placeholder='none'
                                className="hidden"
                                accept="image/*"
                            />
                        </label>

                        {previews.length > 0 && (
                            <div>
                                <label className="block mb-1">Preview</label>
                                <div className="flex flex-wrap gap-4">
                                    {previews.map((src, index) => (
                                        <div
                                        key={index}
                                            className="w-[100px] h-[100px] relative border border-gray-300 rounded overflow-hidden"
                                            >
                                            <img
                                                src={src}
                                                alt={`Preview ${index}`}
                                                className="w-full h-full object-cover rounded"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => removeImage(index)}
                                                className="absolute top-1 right-1 bg-red-600 text-white rounded-full w-5 h-5 flex items-center justify-center"
                                            >
                                                ×
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                        <div>




                        </div>
                        <Button Action={submitPost} text={"Post"} ></Button>


                    </div>
                </div>
            </div>
        </div>
                                    </div>
    )
}
