import { createBrowserRouter } from 'react-router-dom'
import LoginPage from '../pages/login.jsx'
import Contact from '../pages/contact.jsx'
import Pages from '../pages/Pages.jsx'
import Payment from '../pages/Payment.jsx'
import Message from '../pages/MessagePage.jsx'
import Repair from '../pages/Repair.jsx'

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
    element: <Payment />
  },
    {
    path: "/Message",
    element: <Message />
  },
  {
    path: "/Repair",
    element: <Repair />
  }
]);

export default router;