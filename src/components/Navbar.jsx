import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import sun from '../assets/light.png';  // ☀️ Icon for light mode
import moon from '../assets/dark.png';  // 🌙 Icon for dark mode
import logo from '../assets/snipp.png'; // 🧠 App logo

const Navbar = () => {
  // ✅ Set the initial theme based on localStorage, default to 'light'
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'light';
  });

  // ✅ Toggle dark/light theme and update localStorage
  const handlemode = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);

    // ✅ Apply/remove the 'dark' class on <html> for Tailwind dark mode
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  // ✅ Ensure theme is applied on initial mount or when theme changes
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  return (
    <nav className="w-screen bg-gradient-to-r from-purple-800 via-purple-900 to-indigo-900 dark:from-zinc-900 dark:via-zinc-800 dark:to-zinc-900 shadow-lg backdrop-blur-md bg-opacity-60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">

        {/* 🧠 Logo and Brand Name */}
        <div className="flex items-center gap-2">
          <img
            src={logo}
            alt="Snippz Logo"
            title="Snippz"
            className="rounded-full h-8 w-8 shadow-md"
          />
          <span className="text-white font-semibold text-lg hidden sm:block">
            Snippz
          </span>
        </div>

        {/* 🔗 Navigation Links */}
        <div className="flex items-center space-x-4">
          {/* 🏠 Home Link */}
          <NavLink
            to="/"
            className={({ isActive }) =>
              `px-4 py-2 rounded-lg text-sm font-medium transition duration-200 ${
                isActive
                  ? 'bg-purple-700 text-white'
                  : 'text-gray-200 hover:text-white hover:bg-purple-700'
              }`
            }
          >
            Home
          </NavLink>

          {/* 📋 Snippets Link */}
          <NavLink
            to="/pastes"
            className={({ isActive }) =>
              `px-4 py-2 rounded-lg text-sm font-medium transition duration-200 ${
                isActive
                  ? 'bg-purple-700 text-white'
                  : 'text-gray-200 hover:text-white hover:bg-purple-700'
              }`
            }
          >
            Snippets
          </NavLink>

          {/* 🌗 Theme Toggle Button */}
          <button
            onClick={handlemode}
            className="bg-blue-300 hover:bg-purple-600 rounded-full h-13 w-13 flex items-center justify-center transition duration-200"
          >
            <img
              src={theme === 'dark' ? sun : moon} // ☀️ if dark mode, show sun
              alt="Toggle Theme"
              className="h-4 w-4"
            />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
