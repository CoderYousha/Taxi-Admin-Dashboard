import { Navigate } from "react-router-dom";
import Login from "../pages/auth/Login";

function AuthRoutes(){
    return [
        {
            path: "/login",
            element: <Login />
        },
        {
            path: "/",
            element: <Navigate to='/login' />
        },
    ];
}

export default AuthRoutes;