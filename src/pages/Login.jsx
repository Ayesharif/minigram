import { ArrowLeftCircle, MessageCircle, Mail, Lock, Shield, Users, Zap } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../component/Button';
import { checkUser, login } from '../features/actions/authAction';
import { useDispatch, useSelector } from 'react-redux';
import { clearAuthMessage} from '../features/slices/authSlice';
import { handleError, handleSuccess } from '../component/loaster';
import Loader from '../component/Loader';

export default function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [loginData, setLoginData] = useState({ email: "", password: "" });
    const [showPassword, setShowPassword] = useState(false);

    const { currentUser, status, message, loading, IsLogin } = useSelector((state) => state.auth);


    useEffect(()=>{
        dispatch(checkUser())
        if (IsLogin) {
            navigate("/");
        }
    },[dispatch, IsLogin])
    console.log(IsLogin);
    

    const handleChange = (e) => {
        setLoginData({ ...loginData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const emailFormat = /^[a-zA-Z0-9_.+]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;

        const { email, password } = loginData;

        if (!email || !password) {
            handleError("Please fill all fields");
            return;
        }

        if (!emailFormat.test(email)) {
            handleError("Please enter a valid email address!");
            return;
        }
console.log(loginData);

        dispatch(login(loginData));
    };

    useEffect(() => {
        if (status === 1 && message === "User logged_in") {
             navigate('/');
        
        }
        if (status === 1 && message === "Login_SUCCESS") {
            handleSuccess("Login Successfull")
            navigate('/');

        }


        

        if (status !== null) {
            dispatch(clearAuthMessage());
        }
    }, [status, message, dispatch, navigate]);

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
                            <h3 className="text-3xl font-bold text-gray-800 mb-2">Sign In</h3>
                            <p className="text-gray-600">Enter your credentials to access your account</p>
                        </div>

                        <div className="space-y-5">
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
                                        value={loginData.email}
                                        className="w-full pl-10 pr-4 py-3 rounded-lg border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition"
                                        placeholder="john@example.com"
                                        required
                                    />
                                </div>
                            </div>

                            {/* Password Input */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Password
                                </label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        name="password"
                                        onChange={handleChange}
                                        value={loginData.password}
                                        className="w-full pl-10 pr-12 py-3 rounded-lg border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition"
                                        placeholder="••••••••"
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition"
                                    >
                                        {showPassword ? (
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                                            </svg>
                                        ) : (
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                            </svg>
                                        )}
                                    </button>
                                </div>
                            </div>

                            {/* Remember Me & Forgot Password */}
                            <div className="flex items-center justify-end">
                                
                                <Link
                                    to='/forgotpassword'
                                    className='text-sm text-blue-600 hover:text-blue-700 font-medium hover:underline'
                                >
                                    Forgot Password?
                                </Link>
                            </div>

                            {/* Submit Button */}
                            <Button type={"submit"} width={'w-full'} padding={"py-1"} Action={handleSubmit} text={"Sign in"}></Button>
                        </div>


                        <p className="text-center text-gray-600 text-sm mt-6">
                            Don't have an account?{' '}
                            <Link to='/register' className='text-blue-600 hover:text-blue-700 font-semibold hover:underline'>
                                Create Account
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}