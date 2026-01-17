import React from 'react'
import Button from './Button'
import { SearchIcon } from 'lucide-react'

export default function SearchBar({width, padding, setKey, handleSearch}) {

  return (
    <div className={` ${width} bg-linear-to-r from-purple-700 to-pink-600 text-black p-0.5 rounded-full`}>
<div className={`${padding} bg-white p-2 rounded-full flex  `}>
    <input type="search" onChange={(e)=>setKey(e.target.value)} className='w-full text-lg px-3 rounded-full outline-0' placeholder='Search users' />
    <Button padding={"p-1"} width={"w-20"} text={<SearchIcon className='w-8'/>  } Action={handleSearch}/>
    </div>      
    </div>
  )
}
