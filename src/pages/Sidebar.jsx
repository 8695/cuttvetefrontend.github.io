import React from 'react'

function Sidebar() {
  return (
    <div>
       

<div className="min-h-screen flex flex-row bg-gray-100">
  <div className="flex flex-col w-56 overflow-hidden">
    <ul className="flex flex-col py-4">
      <li>
        <a href="#" className="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-gray-800">
          <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400 ml-4"><img src="assets/image/home.png"/></span>
          <span className="text-sm font-medium">Dashboard</span>
        </a>
      </li>
    </ul>
  </div>
</div>



    </div>
  )
}

export default Sidebar