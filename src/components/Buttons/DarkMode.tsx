'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { FiMoon, FiSun } from 'react-icons/fi';

export default function DarkModeButton() {
  const [mounted, setMounted] = useState(false);
  const { setTheme, resolvedTheme } = useTheme();

  useEffect(() => setMounted(true), []);

  if (!mounted)
    return (
      <div className="w-14 h-8 bg-gray-200 rounded-full flex items-center justify-center">
        <FiSun className="text-gray-500" />
      </div>
    );

  const toggleTheme = () => {
    setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');
  };

  return (
    <div className="flex justify-center items-center">
      <div className="flex flex-row justify-between toggle">
        <label
          htmlFor="dark-toggle"
          className="flex items-center cursor-pointer"
        >
          <div className="relative">
            <input
              type="checkbox"
              name="dark-mode"
              id="dark-toggle"
              className="hidden peer"
              checked={resolvedTheme === 'light'}
              onChange={toggleTheme}
            />
            <div className="flex justify-between items-center w-14 h-8 rounded-full border border-transparent dark:border-white bg-[#FF5449] dark:bg-primaryDark">
              {/* Ícono de Sol */}
              <div className="w-[50%] h-full flex justify-center items-center">
                <FiSun
                  className={`text-gray-300 transition-opacity ${
                    resolvedTheme === 'dark' ? 'opacity-0' : 'opacity-100'
                  }`}
                />
              </div>

              {/* Ícono de Luna */}
              <div className="w-[50%] h-full flex justify-center items-center">
                <FiMoon
                  className={`text-white transition-opacity ${
                    resolvedTheme === 'dark' ? 'opacity-100' : 'opacity-0'
                  }`}
                />
              </div>
            </div>
            <div className="absolute top-1 left-1 w-6 h-6 bg-white rounded-full transition peer-checked:translate-x-full"></div>
          </div>
        </label>
      </div>
    </div>
  );
}
