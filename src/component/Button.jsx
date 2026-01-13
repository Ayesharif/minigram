import React from 'react'

export default function Button({Action, text, type, padding ,width}) {
  return (
<button
                                type={type}
                                onClick={Action}
                                className={`${width} bg-linear-to-r   from-purple-600 to-pink-700 text-white p-[2px] rounded-full
                                 font-semibold transition transform hover:scale-[1.02] shadow-lg`}
                            >
                                <div className={`
                                 ${padding}
                                  bg-white  w-full flex justify-center rounded-full text-black hover:bg-transparent hover:text-white transition transform duration-100 `}>

                                {text}
                                </div>
                            </button>
  )
}
