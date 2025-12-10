import { createContext, useState, useContext } from "react";
import { setGlobalErrorHandler } from "./ErrorInterceptor.js";

const ErrorContext = createContext();

export const ErrorProvider = ({ children }) => {
    const [error, setError] = useState(null);

    const throwError = (message) => setError(message);
    const clearError = () => setError(null);

    setGlobalErrorHandler(throwError);

    return (
        <ErrorContext.Provider value={{ error, throwError, clearError }}>
            {children}
        </ErrorContext.Provider>
    );
};

export const useError = () => useContext(ErrorContext);
export default ErrorContext;