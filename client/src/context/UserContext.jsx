import { createContext, useState, useEffect } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);          // { _id, email, role, accessToken }
    const [loading, setLoading] = useState(true);

    // Check session on first load
    useEffect(() => {
        const storedUser = localStorage.getItem("user");

        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }

        setLoading(false);
    }, []);

    const login = (userData) => {
        setUser(userData);
        localStorage.setItem("user", JSON.stringify(userData));
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem("user");
    };

    return (
        <UserContext.Provider value={{
            user,
            isAuthenticated: !!user,
            isAdmin: user?.role === "admin",
            login,
            logout,
        }}>
            {!loading && children}
        </UserContext.Provider>
    );
};

export default UserContext;
