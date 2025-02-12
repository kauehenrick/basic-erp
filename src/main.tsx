import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { Toaster } from 'sonner';
import './index.css';
import Home from './routes/home.tsx';
import Invoice from './routes/invoice.tsx';
import People from './routes/people.tsx';
import Products from './routes/products.tsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/people",
    element: <People />,
  },
  {
    path: "/products",
    element: <Products />,
  },
  {
    path: "/invoice",
    element: <Invoice />,
  }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
    <Toaster />
  </React.StrictMode>,
)
