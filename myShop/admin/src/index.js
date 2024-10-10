import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'

import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Inventory from './pages/Inventory'
import LayOut from './components/LayOut'
import Dashboard from './pages/Dashboard'
import Orders from './pages/Orders'
import Customers from './pages/Customers'
import Add from './pages/Add'
import AdminContextProvider from './context/adminContext'
import Login from './pages/Login'


const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <LayOut />,
      children: [
        { path: 'inventory', element: <Inventory /> },
        { index:true, element: <Dashboard /> },
        { path: 'orders', element: <Orders /> },
        { path: 'customers', element: <Customers /> },
        { path: 'add', element: <Add /> },
        {path:'login',element:<Login/>}
      ]


    }
  ]
)

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <AdminContextProvider>
    <RouterProvider router={router} />
  </AdminContextProvider>
)
