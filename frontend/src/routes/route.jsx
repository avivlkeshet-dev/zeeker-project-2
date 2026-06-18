import { createBrowserRouter } from 'react-router-dom'
import LoginPage from '../pages/login'
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
import TransferDetailsPage from '../pages/TransferDetails';
import RepairNotificationPage from '../pages/RepairNotification';
import CarPurchasePage from '../pages/CarPurchase';
import ProtectedRoutes from './protectedRoutes'

const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginPage />
  },
  {
    path: '/register',
    element: <Personal />
  },
  {
    element: <ProtectedRoutes />, 
    children: [
      {
        path: "/services",
        element: <Services />
      },
      {
        path: "/carsettings",
        element: <CarSettings />
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
        path: '/goodpayment',
        element: <Payment />
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
    ]
  }
]);

export default router;