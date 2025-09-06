import React from 'react'
import { Link } from '@tanstack/react-router'
import { useSelector } from 'react-redux';


const Navbar = () => {

  const {isAuthenticated, user} = useSelector((state) => state.auth);

  return (
    <nav className="bg-white border-b">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Left side - App name */}
          <div className="flex-shrink-0">
            <Link 
              to="/" 
              className="text-xl font-bold text-gray-800 hover:text-blue-600"
            >
              URL Shortener
            </Link>
          </div>

          {/* Right side - Login button */}
          {
            isAuthenticated ? 
            (
              <div className="relative group">
                <img
                  className="w-10 h-10 rounded-full object-cover border border-gray-200 cursor-pointer"
                  src="/user_image.png"
                  alt="user image"
                />
                <div className="absolute left-1/2 -translate-x-1/2 mt-2 w-48 p-3 bg-white border border-gray-200 rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity z-10 text-sm text-gray-800">
                  <div className="font-semibold">{user.user?.name || "Username"}</div>
                  <div className="text-gray-500">{user.user?.email || "user@email.com"}</div>
                </div>
              </div>
            )
            :
            (<div className="flex items-center space-x-4">
              <Link 
                to="/auth" 
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
              >
                Login
              </Link>
            </div>)
          }   

        </div>
      </div>
    </nav>
  )
}

export default Navbar