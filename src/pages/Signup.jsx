import React from 'react';
import { useForm } from 'react-hook-form';
import axios from "axios"
import "../App.css"
import { toast } from 'react-toastify';
import Cookies from 'js-cookie';

import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../services/helper';


function Signup() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();

  const onSubmit = async(data) => {
    console.log(data)
    try{
        const response = await axios.post(`${BASE_URL}/userSignUp`,data)
        console.log("response",response)
        if(response){
            const responseotp = await axios.post(`${BASE_URL}/sendOtp`,data)
            Cookies.set("token",response?.token)
            if(responseotp){
                toast.success(responseotp.data.message)
                navigate(`/otp-verify/${data.email}/${data.phone}`)
            }
            else{
                toast.error(responseotp.message)
            }
        }
        toast.success(response.data.message)

    }catch(err){
        console.log("error",err)
        toast.error(err.response.data.message)
    }
  };

  return (


<div className="min-h-screen flex flex-col justify-center py-8 sm:px-6 lg:px-8">
      <div className="flex overflow-hidden mx-auto max-w-sm lg:max-w-4xl">
        <div className="hidden lg:flex lg:w-1/2 bg-cover items-center justify-center">
          <p className="text-center" style={{ color: 'rgba(41, 41, 41, 0.7)', paddingRight: "30px" }}>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley.
          </p>
        </div>
        <div className="py-6 px-4 shadow sm:px-10 flex flex-col justify-center gradient-border">
          <div className="sm:mx-auto sm:w-full sm:max-w-md">
            <h2 className="mt-4 text-center text-3xl font-extrabold text-gray-900">
              Sign Up
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              <a href="#" className="font-medium text-blue-600 hover:text-blue-500">
                Lorem Ipsum is simply dummy text
              </a>
            </p>
          </div>
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            {[
              { name: "name", placeholder: "Name", icon: "/assets/image/personicon.png" },
              { name: "phone", type: "number", placeholder: "Enter Phone with Country Code", icon: "/assets/image/phone.png" },
              { name: "companyName", placeholder: "Company Name", icon: "/assets/image/personicon.png" },
              { name: "email", type: "email", placeholder: "Enter your email address", icon: "/assets/image/mail.png" },
              { name: "companySize", placeholder: "Company Size", icon: "/assets/image/groups.png" },
            ].map((field, index) => (
              <div className="mt-2 relative" key={index}>
                <input
                  {...register(field.name, { required: `${field.placeholder} is required` })}
                  type={field.type || "text"}
                  className={`appearance-none rounded-md block w-full px-3 py-2 pl-10 border ${errors[field.name] ? 'border-red-500' : 'border-gray-400'} placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                  placeholder={field.placeholder}
                  style={{
                    backgroundColor: "rgba(244, 244, 244, 1)",
                    backgroundImage: `url(${field.icon})`,
                    backgroundSize: '20px',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: '10px center',
                  }}
                />
                {errors[field.name] && <span className="text-red-500 text-sm">{errors[field.name].message}</span>}
              </div>
            ))}

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <label htmlFor="remember_me" className="ml-2 block text-sm text-gray-900">
                  By clicking on proceed you will accept our <span className='text-blue-400'>Terms</span> & <span className='text-blue-400'>Condition</span>
                </label>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Proceed
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>



        


     
  );
}

export default Signup;
