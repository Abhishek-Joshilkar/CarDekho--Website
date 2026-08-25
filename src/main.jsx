import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import UserHome from './users/UserHome.jsx'
import Cars from './users/Cars.jsx'
import AddCar from './admin/AddCar.jsx'
import Login from './users/Login.jsx'
import Register from './users/Register.jsx'
import AdminHome from './admin/AdminHome.jsx'
import AdminNav from './admin/AdminNav.jsx'
import ViewCar from './admin/ViewCar.jsx'
import EditCar from './admin/EditCar.jsx'

let router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <UserHome />
      },
      {
        path: "cars",
        element: <Cars />
      },
      {
        path: 'addcar',
        element: <AddCar />
      },
      {
        path: 'login',
        element: <Login />
      },
      {
        path: 'register',
        element: <Register />
      }
    ]
  },
  {
    path: "admin",
    element: <AdminNav />,
    children: [
      {
        path: "true",
element: <AdminHome />
      },
      {
        path:"cars",
        element:<ViewCar/>
      },
      {
        path:"edit/:id",
        element:<EditCar/>
      }
    ]
  }
])

createRoot(document.getElementById('root')).render(

  <RouterProvider router={router} />

)
