import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import Dashboard from '../pages/dashboard';
import Deals from '../pages/Deals';
import Payment from '../pages/Payment';
import Personal from '../pages/register/Personal';

const router = createBrowserRouter([
    {
      path: '/dashboard',
      element: <Dashboard />
    },
    {
      path: '/deals',
      element: <Deals />
    },
    {
      path: '/payment',
      element: <Payment />
    },
    {
      path: '/register',
      element: <Personal />
    }
]);

export default router;