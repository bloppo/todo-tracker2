import {Navigate, Outlet } from "react-router";

const ProtectedRoute = ({isAuthenticated}:{ isAuthenticated:boolean}) => {
    return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
}

export default ProtectedRoute;
