import { Navigate, Outlet } from "react-router-dom";

const isUserAuthenticated = () => {

    const hasToken = document.cookie.split(';').some((item) => item.trim().startsWith('token='));

    return hasToken || localStorage.getItem('isLoggedIn') === 'true';
};

const ProtectedRoutes = () => {
    const isAuthenticated = isUserAuthenticated();
    return isAuthenticated? <Outlet /> : <Navigate to='/' replace />
}

export default ProtectedRoutes;