import React from "react";
import { useError } from "./ErrorContext.jsx";
import ErrorModal from "../layout/modals/ErrorModal.jsx";

export default function GlobalErrorHandler() {
    const { error, clearError } = useError();

    return (
        <ErrorModal
            message={error}
            onClose={clearError}
        />
    );
}
