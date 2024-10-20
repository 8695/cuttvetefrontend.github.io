import React from 'react';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';


function Navbar() {
    const navigate =useNavigate();
    const token = Cookies.get("token");

    const logout =()=>{
        Cookies.remove("token");
        toast.success("logut successfully")
        navigate("/")

    }

  return (
    <div className="flex items-center justify-between ml-4 mr-4  p-4">
      <img src="/assets/image/logo.png" alt="Logo" className="h-8 " />
      <div className='flex '>
      <h1 className="text-gray-800 p-2 ">Contact</h1>
      {token ?(

          <button onClick={logout} className="rounded text-white bg-indigo-600 hover:bg-indigo-700 p-2 ">Logout</button>
      ):(
      ""
      )}
      </div>
    </div>
  );
}

export default Navbar;
