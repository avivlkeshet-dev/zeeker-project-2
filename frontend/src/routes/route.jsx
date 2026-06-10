import { createBrowserRouter } from 'react-router-dom'
import LoginPage from '../pages/login.jsx'
import Contact from '../pages/contact.jsx'
import Pages from '../pages/Pages.jsx'
import PaymentFinalize from '../pages/MainPaymentPage.jsx'
import Message from '../pages/MessagePage.jsx'
import Repair from '../pages/Repair.jsx'
import AgencyPage from '../pages/AgencyPage.jsx'
import Dashboard from '../pages/dashboard';
import Deals from '../pages/Deals';
import Payment from '../pages/Payment';
import Personal from '../pages/register/Personal';
import React from 'react';

const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginPage />
  },
  {
    path: "/contact",
    element: <Contact />
  },
  {
    path: "/Pages",
    element: <Pages />
  },
    {
    path: "/Payment",
    element: <PaymentFinalize />
  },
    {
    path: "/Message",
    element: <Message />
  },
  {
    path: "/Repair",
    element: <Repair />
  },
  {
    path: "/Agency",
    element: <AgencyPage />
  },
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

])

export default router;