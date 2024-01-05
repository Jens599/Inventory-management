import {
  faBell,
  faHouse,
  faCircleChevronDown,
  faCircleChevronUp,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className='group/mainDiv w-15 fixed h-[calc(100vh-62px)] origin-left hover:w-44  xl:w-44'>
      <div className='bg-white h-full pt-8 border-r-2 border-gray-500 px-2'>
        <div className=''>
          <ul className='space-y-3'>
            <li>
              <NavLink
                to='home'
                className='peer flex items-center rounded-lg p-2 text-base font-normal text-gray-900 hover:bg-gray-100 '
              >
                <FontAwesomeIcon
                  icon={faHouse}
                  className='activeParent h-6 w-6 flex-shrink-0 text-gray-500 transition duration-75 peer-hover:text-gray-900'
                />
                <span className='ml-3 hidden group-hover/mainDiv:inline-block xl:inline-block'>
                  Home
                </span>
              </NavLink>
            </li>

            {/* <li>
              <NavLink
                to='employee'
                className='group flex items-center rounded-lg p-2 text-base font-normal text-gray-900 hover:bg-gray-100 '
              >
                <svg
                  className='activeParent h-6 w-6 flex-shrink-0 text-gray-500 transition duration-75 group-hover:text-gray-900'
                  fill='currentColor'
                  viewBox='0 0 20 20'
                >
                  <path
                    fillRule='evenodd'
                    d='M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z'
                    clipRule='evenodd'
                  ></path>
                </svg>
                <span className='ml-3 hidden flex-1 whitespace-nowrap group-hover/mainDiv:inline-block xl:inline-block'>
                  Employee
                </span>
              </NavLink>
            </li> */}
            <li>
              <NavLink
                to='inventory'
                className='group flex items-center rounded-lg p-2 text-base font-normal text-gray-900 hover:bg-gray-100 '
              >
                <svg
                  className='activeParent h-6 w-6 flex-shrink-0 text-gray-500 transition duration-75 group-hover:text-gray-900'
                  fill='currentColor'
                  viewBox='0 0 20 20'
                >
                  <path d='M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z'></path>
                </svg>
                <span className='ml-3 hidden flex-1 whitespace-nowrap group-hover/mainDiv:inline-block xl:inline-block'>
                  Inventory
                </span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to='addItem'
                className='group flex items-center rounded-lg p-2 text-base font-normal text-gray-900 hover:bg-gray-100 '
              >
                <FontAwesomeIcon
                  icon={faCircleChevronDown}
                  className='activeParent h-6 w-6 flex-shrink-0 text-gray-500 transition duration-75 group-hover:text-gray-900'
                />
                <span className='ml-3 hidden flex-1 whitespace-nowrap group-hover/mainDiv:inline-block xl:inline-block'>
                  Add Product
                </span>
              </NavLink>
            </li>

            {/* <li>
              <a
                href='#'
                className='group flex items-center rounded-lg p-2 text-base font-normal text-gray-900 hover:bg-gray-100 '
              >
                <FontAwesomeIcon
                  icon={faBell}
                  className='activeParent h-6 w-6 flex-shrink-0 text-gray-500 transition duration-75 group-hover:text-gray-900'
                />
                <span className='ml-3 hidden flex-1 whitespace-nowrap group-hover/mainDiv:inline-block xl:inline-block'>
                  Notification
                </span>
              </a>
            </li> */}
            {/* <li>
              <a
                href='#'
                className='group flex items-center rounded-lg p-2 text-base font-normal text-gray-900 hover:bg-gray-100 '
              >
                <svg
                  className='activeParent h-6 w-6 flex-shrink-0 text-gray-500 transition duration-75 group-hover:text-gray-900'
                  fill='currentColor'
                  viewBox='0 0 20 20'
                >
                  <path
                    fillRule='evenodd'
                    d='M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z'
                    clipRule='evenodd'
                  ></path>
                </svg>
                <span className='ml-3 hidden flex-1 whitespace-nowrap group-hover/mainDiv:inline-block xl:inline-block'>
                  Sign Out
                </span>
              </a>
            </li> */}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
