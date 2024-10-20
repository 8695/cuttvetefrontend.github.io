import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import { BASE_URL } from '../services/helper';

function OtpVerification() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [isPhoneVerified, setIsPhoneVerified] = useState(false);
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const { email, phone } = useParams();
  const navigate = useNavigate();

  const verifyPhone = async (data) => {
    try {
      const phoneResponse = await axios.post(`${BASE_URL}/verifyOtp/phone`, { phone, otp: data.phoneOtp });
      if (phoneResponse.data.phoneVerified) {
        setIsPhoneVerified(true);
        toast.success(phoneResponse.data.message);
       
      } else {
        toast.error(phoneResponse.data.message);
      }
    } catch (err) {
      console.error(err);
      toast.error("An error occurred during phone verification.");
    }
  };

  const verifyEmail = async (data) => {
    try {
      const emailResponse = await axios.post(`${BASE_URL}/verifyOtp/email`, { email, otp: data.mailOtp });
      if (emailResponse.data.emailVerified) {
        setIsEmailVerified(true);
        toast.success(emailResponse.data.message);
        navigate("/home");
      } else {
        toast.error(emailResponse.data.message);
      }
    } catch (err) {
      console.error(err);
      toast.error("An error occurred during email verification.");
    }
  };

  

  return (
    <div className="min-h-screen flex flex-col justify-center py-8 sm:px-6 lg:px-8">
      <div className="flex overflow-hidden mx-auto max-w-sm lg:max-w-4xl w-full">
        <div className="hidden lg:flex lg:w-1/2 bg-cover items-center justify-center">
          <p className="text-center" style={{ color: 'rgba(41, 41, 41, 0.7)', paddingRight: "30px" }}>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry.
          </p>
        </div>

        <div className="py-6 px-4 shadow sm:px-10 flex flex-col justify-center w-full lg:w-1/2 gradient-border">
          <h2 className="mt-4 text-center text-3xl font-extrabold text-gray-900">Verify OTP</h2>

          {/* Phone OTP Input */}
          <form className="space-y-6 p-4">
            <div className="mt-2 relative">
              <input
                {...register('phoneOtp')}
                type="text"
                className={`appearance-none rounded-md block w-full px-3 py-2 pl-10 border ${errors.phoneOtp ? 'border-red-500' : 'border-gray-400'} placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                placeholder="Mobile OTP"
                style={{ backgroundColor: "rgba(244, 244, 244, 1)", backgroundImage: "url('/assets/image/phone.png')", backgroundSize: '20px', backgroundRepeat: 'no-repeat', backgroundPosition: '10px center' }}
              />
              {errors.phoneOtp && <span className="text-red-500 text-sm">{errors.phoneOtp.message}</span>}
              {isPhoneVerified && <img src="/assets/image/ok.png" className="absolute right-3 -mt-6 top-1/2 transform -translate-y-1/2 h-5" alt="Verified" />}
              <button
                type="button"
                onClick={handleSubmit(verifyPhone)}
                className="group relative w-full mt-4 flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Verify Mobile OTP
              </button>
            </div>

            {/* Email OTP Input */}
            <div className="mt-2 relative">
              <input
                {...register('mailOtp')}
                type="text"
                className={`appearance-none rounded-md block w-full px-3 py-2 pl-10 border ${errors.mailOtp ? 'border-red-500' : 'border-gray-400'} placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                placeholder="Email OTP"
                style={{ backgroundColor: "rgba(244, 244, 244, 1)", backgroundImage: "url('/assets/image/mail.png')", backgroundSize: '20px', backgroundRepeat: 'no-repeat', backgroundPosition: '10px center' }}
              />
              {errors.mailOtp && <span className="text-red-500 text-sm">{errors.mailOtp.message}</span>}
              {isEmailVerified && <img src="/assets/image/ok.png" className="absolute right-3 -mt-6 top-1/2 transform -translate-y-1/2 h-5" alt="Verified" />}
              <button
                type="button"
                onClick={handleSubmit(verifyEmail)}
                className="group relative w-full mt-4 flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Verify Email OTP
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default OtpVerification;
