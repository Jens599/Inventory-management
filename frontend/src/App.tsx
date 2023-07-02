import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';

import AddItem from './components/AddItem';
import Inventory from './components/Inventory';
import Login from './components/Login';
import Signup from './components/Signup';
import UpdateItem from './components/UpdateItem';
import LandingPage from './pages/LandingPage';
import DashboardLayout from './pages/layout/DashboardLayout';
import RootLayout from './pages/layout/RootLayout';

const routes = createBrowserRouter(
  createRoutesFromElements(
    <Route
      path='/'
      element={<RootLayout />}
    >
      <Route
        index
        element={<LandingPage />}
      />

      <Route
        path='signup'
        element={<Signup />}
      />

      <Route
        path='login'
        element={<Login />}
      />

      <Route
        path='dashboard'
        element={<DashboardLayout />}
      >
        <Route path='home' />
        <Route
          path='inventory'
          element={<Inventory />}
        />

        <Route
          path='employee'
          // element={<Employee />}
        />

        <Route
          path='addItem'
          element={<AddItem />}
        />
        <Route
          path='updateItem/:id'
          element={<UpdateItem />}
        />
      </Route>
    </Route>
  )
);

const App = () => {
  return (
    <>
      <h1>
        <RouterProvider router={routes} />
      </h1>
    </>
  );
};

export default App;
