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
import Transfer from '../pages/Transfer';
import TransferDetailsPage from '../pages/TransferDetails';
import RepairNotificationPage from '../pages/RepairNotification';
import CarPurchasePage from '../pages/CarPurchase';

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
      path: '/Goodpayment',
      element: <Payment />
    },
    {
      path: '/register',
      element: <Personal />
    },
    {
      path: '/transfer',
      element: <Transfer />
    },
    {
      path: '/transferdetails',
      element: <TransferDetailsPage />
    },
    {
      path: '/repairnotification',
      element: <RepairNotificationPage />
    },
    {
      path: '/carpurchase',
      element: <CarPurchasePage />
    }
])

export default router;