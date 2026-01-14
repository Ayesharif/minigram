import { ArrowLeftCircle, MessageCircle, Mail, Lock, Shield, Users, Zap } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { clearAuthMessage } from '../features/slices/authSlice';
import VerifyOtp from '../component/VerifyOtp';
import { sendOtp, verifyOtp } from '../features/actions/authAction';

export default function ForgotPassword() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
        const [showVerify, setVerify] = useState(false);
    const [Data, setData] = useState({});
    const [showPassword, setShowPassword] = useState(false);

    const { currentUser, status, message } = useSelector((state) => state.auth);




    const handleChange = (e) => {
        setData({ ...Data, [e.target.name]: e.target.value });
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        const emailFormat = /^[a-zA-Z0-9_.+]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;

        const { email } = Data;

        if (!email ) {
            handleError("Please enter email");
            return;
        }

        if (!emailFormat.test(email)) {
            handleError("Please enter a valid email address!");
            return;
        }

        dispatch(sendOtp(email));
    };

     const handleVerifyOtp = (e) => {
            e.preventDefault();
            const { otp } = Data;
            if (!otp) {
                handleError("Please enter OTP");
                return;
            }
            // console.log(data);
            
            const data = {
                otp: otp,
                email: currentUser.email
            };
            setTimeout(() => {
                dispatch(verifyOtp(data));
            }, 1000);
        };

    useEffect(() => {
if(status===1 && message==="OTP generated and sent successfully"){
         
                setVerify(true);
}
if(status===1 && message==="OTP_VERIFIED"){
              navigate(`/resetpassword/${currentUser.otp}/${currentUser.email}`)       
                    //    setVerify(true);
}
        if (status !== null) {
            dispatch(clearAuthMessage());
        }
    }, [status, message, dispatch, navigate]);

    return (
        <div className='min-h-screen w-full bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8'>
            {/* {loading && <Loader />} */}



            <div className='max-w-6xl w-full flex flex-col lg:flex-row items-start gap-12'>
                {/* Left Side - Branding & Features */}
                <div className='lg:w-1/2 text-center lg:text-left'>
                    <div className="flex items-center justify-center lg:justify-start space-x-3 mb-6">
                        <div className='w-[100px]'>

                            <img src="logo.png" alt="" />
                        </div>
                        <span className="text-5xl font-bold text-black poppins-medium">
                            minigram
                        </span>
                    </div>

                </div>

                {/* Right Side - Login Form */}
                <div className='lg:w-1/2 w-full max-w-md'>
                    <div className='bg-white rounded-2xl shadow-xl p-8 border border-gray-100'>
                        <div className="text-center mb-8">
                            <h3 className="text-3xl font-bold text-gray-800 mb-2">Forgot Password</h3>

                        </div>

                       {!showVerify? (<div className="space-y-5">
                            {/* Email Input */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Email Address
                                </label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                    <input
                                        type="email"
                                        name='email'
                                        onChange={handleChange}
                                        className="w-full pl-10 pr-4 py-3 rounded-lg border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition"
                                        placeholder="john@example.com"
                                        required
                                    />
                                </div>
                            </div>



                            {/* Submit Button */}
                            <button
                                type="submit"
                                onClick={handleSubmit}
                                className='w-full bg-gradient-to-r  from-purple-600 to-pink-700 text-white py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition transform hover:scale-[1.02] shadow-lg'
                            >
                                Forgot Password
                            </button>
                        </div>):
                        (<VerifyOtp handleChange={handleChange} handleVerifyOtp={handleVerifyOtp} setVerify={setVerify}/>)
                        }

                        {/* Sign Up Link */}
                        <p className="text-center text-gray-600 text-sm mt-6">
                            I know the password?{' '}
                            <Link to='/login' className='text-blue-600 hover:text-blue-700 font-semibold hover:underline'>
                                Sign in
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
