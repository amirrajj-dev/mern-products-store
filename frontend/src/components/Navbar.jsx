import { Link } from "react-router-dom";
import { CiSquarePlus } from "react-icons/ci";
import { IoSunnyOutline, IoMoonOutline } from "react-icons/io5";
import { useState, useEffect } from "react";

const Navbar = () => {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
  
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const handleDarkLightMode = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    localStorage.setItem('theme', newTheme);
    setTheme(newTheme);
  };

  return (
    <nav className="bg-white dark:bg-slate-800 shadow-md p-4 transition-all rounded duration-300">
      <div className="container mx-auto flex items-center justify-between">
        <Link to="/" className="bg-gradient-to-r from-gray-800 to-gray-700  dark:bg-gradient-to-r text-center capitalize bg-clip-text text-transparent dark:from-cyan-400 dark:to-blue-500 text-2xl sm:text-4xl font-bold">
          Products Store 🛒
        </Link>
        <div className="flex items-center justify-center gap-4">
          <Link 
            to="/create" 
            className="w-10 h-10 sm:w-16 sm:h-11 flex items-center justify-center bg-gray-500/30 dark:bg-gray-700/30 text-gray-800 dark:text-white font-bold rounded-full shadow-md hover:bg-gray-400/50 dark:hover:bg-gray-600/50 transition-all duration-300"
          >
            <CiSquarePlus />
          </Link>
          <button 
            onClick={handleDarkLightMode} 
            className="w-10 h-10 sm:w-16 sm:h-11 flex items-center justify-center bg-gray-500/30 dark:bg-gray-700/30 text-gray-800 dark:text-white font-bold rounded-full shadow-md hover:bg-gray-400/50 dark:hover:bg-gray-600/50 transition-all duration-300"
          >
            {theme === 'dark' ? <IoSunnyOutline /> : <IoMoonOutline />}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;