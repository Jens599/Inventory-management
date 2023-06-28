import { Outlet } from 'react-router-dom';
import Sidebar from '../../components/Sidebar';
import React from 'react';

const DashboardLayout = () => {
  return (
    <>
      <Sidebar />
      <div className='flex'>
        <p className='w-14 origin-left transition hover:w-44 xl:w-44' />
        <Outlet />
      </div>
    </>
  );
};

export default DashboardLayout;
