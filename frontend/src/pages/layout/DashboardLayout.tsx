import { Outlet, useNavigate } from 'react-router-dom';
import Sidebar from '../../components/Sidebar';

const DashboardLayout = () => {
  const navigate = useNavigate();

  return (
    <>
      <Sidebar />
      <div className='flex'>
        <p className='w-14 xl:w-44 ' />
        <Outlet />
      </div>
    </>
  );
};

export default DashboardLayout;
