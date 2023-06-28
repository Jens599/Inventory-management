import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';
import RootLayout from './pages/layout/RootLayout';
import LandingPage from './pages/LandingPage';
import Signup from './components/Signup';
import Login from './components/Login';
import DashboardLayout from './pages/layout/DashboardLayout';
import Inventory from './components/Inventory';
import AddItem from './components/AddItem';

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
