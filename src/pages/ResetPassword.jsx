import { ArrowLeftCircle, MessageCircle, Mail, Lock, Shield, Users, Zap } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { handleError } from '../component/loaster';
import { reSetPassword } from '../features/actions/authAction';
import { clearAuthMessage} from '../features/slices/authSlice';
// import { checkUser, login } from '../features/authAction';
// import { useDispatch, useSelector } from 'react-redux';
// import { clearMessage } from '../features/authSlice';
// import { handleError, handleSuccess } from './tosters';
// import Loader from './loader';

export default function ResetPassword() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { currentUser, status, message,  } = useSelector((state) => state.auth);
const{otp, email}=useParams()

    const [Data, setData] = useState({email:"", otp:""});
useEffect(()=>{
if(otp && email){
    setData({email:email, otp:otp})
}
},[])


    const handleChange = (e) => {
        setData({ ...Data, [e.target.name]: e.target.value });
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        const passwordValidation = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/;

        const {  password, otp, email } = Data;

        if (!password) {
            handleError("Please email password");
            return;
        }

        if (!passwordValidation.test(password)) {
            handleError("Please enter a valid email address!");
            return;
        }

        dispatch(reSetPassword(Data));
    };

    useEffect(() => {
        if (status === 1 && message === "Password updated successful") {
            navigate('/login');

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



                            {/* Submit Button */}
                            <button
                                type="submit"
                                onClick={handleSubmit}
                                className='w-full bg-gradient-to-r  from-purple-600 to-pink-700 text-white py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition transform hover:scale-[1.02] shadow-lg'
                            >
                                Reset Password
                            </button>
                        </div>

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
