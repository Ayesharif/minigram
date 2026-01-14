import { Mail } from 'lucide-react'
import React from 'react'
import Button from './Button'

export default function VerifyOtp({handleChange,setVerify, handleVerifyOtp}) {
  return (
   <div className="space-y-6">
                                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center">
                                    <Mail className="w-12 h-12 text-blue-600 mx-auto mb-2" />
                                    <p className="text-sm text-blue-800 font-semibold">
                                        OTP sent to your email
                                    </p>
                                    <p className="text-xs text-blue-600 mt-1">
                                        Please check your inbox and enter the code below
                                    </p>
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Enter OTP Code
                                    </label>
                                    <input
                                        type="number"
                                        name="otp"
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition text-center text-2xl tracking-widest font-bold"
                                        placeholder="000000"
                                        maxLength="6"
                                        required
                                    />
                                </div>

                                <Button
                                    type="submit"
                                    text={"Verify Account"}
                                    Action={handleVerifyOtp}
                                    padding={'py-1'}
                                    width={"w-full"}
                                    className='w-full bg-gradient-to-r from-green-600 to-teal-600 text-white py-3 rounded-lg font-semibold hover:from-green-700 hover:to-teal-700 transition transform hover:scale-[1.02] shadow-lg'
                                />


                                <button
                                    onClick={() => setVerify(false)}
                                    className='w-full text-gray-600 py-2 text-sm hover:text-gray-800 transition'
                                >
                                    ← Back to registration
                                </button>
                            </div>
  )
}
