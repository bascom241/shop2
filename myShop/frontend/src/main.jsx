
import { createRoot } from 'react-dom/client'

import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import LayOut from './components/LayOut.jsx';
import Home from './pages/Home.jsx';
import CheckOut from './pages/CheckOut.jsx';
import Category from './pages/Category.jsx';
import Product from './pages/Product.jsx';
import Register from './pages/Register.jsx';
import Login from './pages/Login.jsx';
import ShopContextProvider from './components/context/shopContext.jsx';
import Cart from './pages/Cart.jsx';
import ErrorPage from './pages/ErrorPage.jsx';
import AboutPage from './pages/AboutPage.jsx';
import BlogDetail from './pages/BlogDetail.jsx';
import ThankYou from './pages/ThankYou.jsx';


const router = createBrowserRouter(


  
  [
    {
      path: '/',
      element: <LayOut />,
      errorElement: <ErrorPage />,
      children: [
        { index: true, element: <Home /> },
        { path: 'product/:productId', element: <Product /> },
        { path: 'checkout', element: <CheckOut /> },
        { path: 'category', element: <Category /> },
        { path: 'cart', element: <Cart /> },
        { path: 'register', element: <Register /> },
        { path: 'login', element: <Login /> },
        { path: 'about', element: <AboutPage /> },
        {path:'detail/:id', element:<BlogDetail/>},
        {path:'thank-you/:userId', element:<ThankYou/>},

       
      ]
    }
  ]
)

createRoot(document.getElementById('root')).render(
  <ShopContextProvider>
    <RouterProvider router={router} />
  </ShopContextProvider>

)
