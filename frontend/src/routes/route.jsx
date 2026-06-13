import { createBrowserRouter } from 'react-router-dom'
import LoginPage from '../pages/login'
import Contact from '../pages/contact'
import Pages from '../pages/Pages'
import PaymentFinalize from '../pages/MainPaymentPage'
import Message from '../pages/MessagePage'
import Repair from '../pages/Repair'
import AgencyPage from '../pages/AgencyPage'
import Dashboard from '../pages/dashboard';
import Deals from '../pages/Deals';
import Payment from '../pages/Payment';
import Personal from '../pages/register/Personal';
import Services from '../pages/Services';
import CarSettings from '../pages/CarSettings';

const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginPage />
  },
  {
    path: "/services",
    element: <Services />
  },
  {
    path: "/carsettings",
    element: <CarSettings />
  },
  {

    path: "/contact",
    element: <Contact />
  },
  {
    path: "/pages",
    element: <Pages />
  },
    {
    path: "/paymentfinalize",
    element: <PaymentFinalize />
  },
    {
    path: "/message",
    element: <Message />
  },
  {
    path: "/repair",
    element: <Repair />
  },
  {
    path: "/agency",
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