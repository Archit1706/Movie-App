import React from 'react';
import {FiSearch} from 'react-icons/fi'
import Logo from '../assets/logo.jpg'

const Navbar = () => {
  return (
      <div className="flex flex-row justify-between items-center h-16 w-full m-auto sm:p-8 p-2">
          {/* Logo */}
          <div className="shadow-lg">
              <img className="rounded-md" width={150} src={Logo} alt="logo" />
          </div>

          {/* Search Input */}
          <div className="flex flex-row justify-center items-center gap-4 border-gray-500 border-[1px] border-solid px-2 min-h-[30px]">
              <FiSearch className="text-gray-400" />
              <input
                  className="outline-none border-none bg-inherit text-gray-500"
                  type="text"
                  placeholder="Search for a movie"
              />
          </div>
      </div>
  );
}

export default Navbar