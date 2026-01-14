import { ArrowLeftCircle, MessageCircle, Mail, Lock, Shield, Users, Zap, User, MapPin, Phone, Globe } from 'lucide-react';
import { useEffect, useState } from 'react';
import { data, Link, useNavigate } from 'react-router-dom';
import Button from '../component/Button';
import { handleError, handleSuccess } from '../component/loaster';
import { RegisterUser, sendOtp, verifyOtp } from '../features/actions/authAction';
import { clearAuthMessage } from '../features/slices/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import VerifyOtp from '../component/VerifyOtp';


export default function Register() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [Data, setData] = useState({});
    const [showPassword, setShowPassword] = useState(false);
    const [showVerify, setVerify] = useState(false);
    const { currentUser, status, message, loading, IsLogin } = useSelector((state) => state.auth);

    // useEffect(()=>{
    //     dispatch(checkUser())
    // },[dispatch])
    // console.log(IsLogin);


    const handleChange = (e) => {
        setData({ ...Data, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const emailFormat = /^[a-zA-Z0-9_.+]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;

        const { email, password, city, country, userName } = Data;

        if (!email || !password || !city || !country || !userName) {
            handleError("Please fill all fields");
            return;
        }

        if (!emailFormat.test(email)) {
            handleError("Please enter a valid email address!");
            return;
        }
        console.log(Data);

dispatch(RegisterUser(Data));
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
        if (status === 1 && message === "REGISTER_SUCCESS") {
            dispatch(sendOtp(currentUser.email));
            setVerify(true);
        }

        if (status === 1 && message === "OTP_VERIFIED") {
            handleSuccess("Your account is verified!");
            navigate("/login");
        }
        if (status !== null) {
            dispatch(clearAuthMessage());
        }
    }, [status, message, clearAuthMessage]);

    return (
        <div className='min-h-screen w-full bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8'>
            {/* {loading && <Loader />} */}



            <div className='max-w-6xl w-full flex flex-col md:flex-row items-center md:gap-12'>
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
                    <h2 className="text-3xl font-bold text-gray-800 mb-4 ">
                        Welcome Back!
                    </h2>
                    <div className="text-lg text-gray-600 mb-8">
                        <p>
                            Connect. Share. Engage.
                        </p>
                        <p>
                            Log in to continue your journey

                        </p>

                    </div>


                </div>

                {/* Right Side - Login Form */}
                <div className='lg:w-1/2 w-full max-w-md'>
                    <div className='bg-white rounded-2xl shadow-xl p-8 border border-gray-100'>
                        <div className="text-center mb-8">
                            <h3 className="text-3xl font-bold text-gray-800 mb-2">Create Account</h3>
                            <p className="text-gray-600">Fill in your details to get started</p>
                        </div>

                        {!showVerify ? (
                            <div className="space-y-4">
                                {/* Full Name */}
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        User Name *
                                    </label>
                                    <div className="relative">
                                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                        <input
                                            type="text"
                                            name='userName'
                                            onChange={handleChange}
                                            className="w-full pl-10 pr-4 py-3 rounded-lg border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition"
                                            placeholder="John Doe"
                                            required
                                        />
                                    </div>
                                </div>

                                {/* Email */}
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Email Address *
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


                                {/* City & Country in Grid */}
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                            City
                                        </label>
                                        <div className="relative">
                                            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                            <input
                                                type="text"
                                                name='city'
                                                onChange={handleChange}
                                                className="w-full pl-10 pr-4 py-3 rounded-lg border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition"
                                                placeholder="New York"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                            Country
                                        </label>
                                        <div className="relative">
                                            <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                            <input
                                                type="text"
                                                name='country'
                                                onChange={handleChange}
                                                className="w-full pl-10 pr-4 py-3 rounded-lg border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition"
                                                placeholder="USA"
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Password */}
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Password *
                                    </label>
                                    <div className="relative">
                                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                        <input
                                            type="password"
                                            name='password'
                                            onChange={handleChange}
                                            className="w-full pl-10 pr-4 py-3 rounded-lg border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition"
                                            placeholder="••••••••"
                                            required
                                        />
                                    </div>
                                </div>

                                {/* Submit Button */}
                                <Button
                                    text={"Create Account"}
                                    type="submit"
                                    padding={'py-1'}
                                    width={"w-full"}
                                    Action={handleSubmit}

                                />
                            </div>
                        ) : (
                            // OTP Verification Section
                         <VerifyOtp handleChange={handleChange} handleVerifyOtp={handleVerifyOtp} setVerify={setVerify}/>
                        )}

                        {/* Footer Links */}
                        <div className="mt-6 text-center space-y-2">
                            <Link to='/forgotpassword' className='text-blue-600 hover:text-blue-700 text-sm font-medium hover:underline block'>
                                Forgot your password?
                            </Link>
                            <p className="text-gray-600 text-sm">
                                Already have an account?{' '}
                                <Link to='/login' className='text-blue-600 hover:text-blue-700 font-semibold hover:underline'>
                                    Sign In
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}