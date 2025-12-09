import { createContext, useState, useEffect } from "react";
import { getCart } from "../services/cartService";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // -------- UPDATE CART LOCALLY --------
    const updateCart = (cart) => {
        setUser(prev => {
            const updatedUser = { ...prev, cart };
            localStorage.setItem("user", JSON.stringify(updatedUser));
            return updatedUser;
        });
    };

    // -------- LOAD CART FROM BACKEND --------
    const loadCart = async (currentUser) => {
        if (!currentUser) return;

        try {
            const cart = await getCart();
            setUser(prev => {
                const updated = { ...prev, cart };
                localStorage.setItem("user", JSON.stringify(updated));
                return updated;
            });
        } catch (err) {
            console.error("Failed to load cart:", err);
        }
    };

    // -------- LOAD USER FROM LOCALSTORAGE --------
    useEffect(() => {
        const storedUser = localStorage.getItem("user");

        if (storedUser) {
            const parsed = JSON.parse(storedUser);
            setUser(parsed);

            // !!! ТУК се зарежда количката от BE !!!
            loadCart(parsed);
        }

        setLoading(false);
    }, []);

    // -------- LOGIN --------
    const login = async (userData) => {
        setUser(userData);
        localStorage.setItem("user", JSON.stringify(userData));

        // !!! СЛЕД ЛОГИН → ВЗЕМИ КОЛИЧКАТА ОТ BE !!!
        await loadCart(userData);
    };

    // -------- LOGOUT --------
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
            updateCart,
            loadCart
        }}>
            {!loading && children}
        </UserContext.Provider>
    );
};

export default UserContext;
