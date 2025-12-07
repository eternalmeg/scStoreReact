import { useContext } from "react";
import { Navigate } from "react-router-dom";
import UserContext from "../context/UserContext.jsx";


export default function AdminRoute({ children }) {
    const { isAdmin } = useContext(UserContext);

    if (!isAdmin) {
        return <Navigate to="/" replace />;
    }

    return children;
}
