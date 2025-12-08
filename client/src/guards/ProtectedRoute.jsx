import { Navigate } from "react-router-dom";
import  userContext  from "../context/UserContext.jsx";

export default function ProtectedRoute({ children }) {
    const { user } = userContext();


    if (!user) {
        return <Navigate to="/login" replace />;
    }

    return children;
}