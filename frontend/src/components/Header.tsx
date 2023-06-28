import React, { useState } from 'react';
import logo from '../assets/Cart-Light.svg';
import { Link } from 'react-router-dom';

const Header = () => {
  const [_logged] = useState(true);
  const [mobileMenu, setMobileMenu] = useState(true);

  const toggleDropdownState = () => {
    setMobileMenu(mobileMenu ? false : true);
  };
  const toggleDropdown = () => {
    if (mobileMenu)
      return 'w-full items-center justify-between lg:order-1 lg:flex lg:w-auto hidden';
    else
      return 'w-full items-center justify-between lg:order-1 lg:flex lg:w-auto';
  };

  return (
    <header>
      <nav className='ay-600 border-gray-200 bg-white px-4 py-2.5 dark:bg-slate-700 lg:px-6 '>
        <div className='mx-auto flex max-w-screen-2xl flex-wrap items-center justify-between '>
          <Link
            to='/'
            className='flex items-center'
          >
            <img
              src={logo}
              className='mr-3 h-6 sm:h-9 '
              alt='Logo'
            />
            <span className='self-center whitespace-nowrap text-xl font-semibold dark:text-white'>
              Inventory Management
            </span>
          </Link>
          <div className='flex items-center lg:order-2'>
            {_logged ? (
              <>
                <Link
                  to='/login'
                  className='mr-2 rounded-lg border border-white px-4 py-2 text-sm font-medium text-gray-800 hover:bg-gray-50 focus:outline-none focus:ring-4 focus:ring-gray-300 dark:text-white dark:hover:bg-gray-700 dark:focus:ring-gray-800 lg:px-5 lg:py-2.5'
                >
                  Log in
                </Link>
                <Link
                  to='/signup'
                  className='mr-2 rounded-lg bg-blue-700 px-4 py-2 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 lg:px-5 lg:py-2.5'
                >
                  Get started
                </Link>
              </>
            ) : (
              <a
                href='#'
                className='mr-2 rounded-lg border border-white px-4 py-2 text-sm font-medium text-gray-800 hover:bg-gray-50 focus:outline-none focus:ring-4 focus:ring-gray-300 dark:text-white dark:hover:bg-gray-700 dark:focus:ring-gray-800 lg:px-5 lg:py-2.5'
              >
                Log out
              </a>
            )}
            <button
              onClick={toggleDropdownState}
              data-collapse-toggle='mobile-menu-2'
              type='button'
              className='ml-1 inline-flex items-center rounded-lg p-2 text-sm text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600 lg:hidden'
              aria-controls='mobile-menu-2'
              aria-expanded='false'
            >
              <span className='sr-only'>Open main menu</span>
              <svg
                className='h-6 w-6'
                fill='currentColor'
                viewBox='0 0 20 20'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  fillRule='evenodd'
                  d='M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z'
                  clipRule='evenodd'
                ></path>
              </svg>
              <svg
                className='hidden h-6 w-6'
                fill='currentColor'
                viewBox='0 0 20 20'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  fillRule='evenodd'
                  d='M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z'
                  clipRule='evenodd'
                ></path>
              </svg>
            </button>
          </div>
          <div
            className={toggleDropdown()}
            id='mobile-menu-2'
          >
            <ul className='mt-4 flex flex-col text-center font-medium lg:mt-0 lg:flex-row lg:space-x-8'>
              <li>
                <Link
                  to='/'
                  className='block border-b border-gray-100 py-2 pl-3 pr-4 text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white lg:border-0 lg:p-0 lg:hover:bg-transparent lg:hover:text-blue-700 lg:dark:hover:bg-transparent lg:dark:hover:text-white'
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to='/dashboard'
                  className='block border-b border-gray-100 py-2 pl-3 pr-4 text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white lg:border-0 lg:p-0 lg:hover:bg-transparent lg:hover:text-blue-700 lg:dark:hover:bg-transparent lg:dark:hover:text-white'
                >
                  Profile
                </Link>
              </li>

              <li>
                <a
                  href='#'
                  className='block border-b border-gray-100 py-2 pl-3 pr-4 text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white lg:border-0 lg:p-0 lg:hover:bg-transparent lg:hover:text-blue-700 lg:dark:hover:bg-transparent lg:dark:hover:text-white'
                >
                  Report
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
