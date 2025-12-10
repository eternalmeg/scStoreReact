import { useState, useCallback } from "react";
import ConfirmModal from "../layout/modals/ConfirmModal.jsx";

export default function useConfirm() {
    const [config, setConfig] = useState({
        show: false,
        title: "",
        message: "",
        resolve: null,
    });

    const confirm = useCallback((message, title = "Confirm action") => {
        return new Promise(resolve => {
            setConfig({
                show: true,
                title,
                message,
                resolve,
            });
        });
    }, []);

    const handleConfirm = useCallback(() => {
        if (config.resolve) config.resolve(true);
        setConfig(prev => ({ ...prev, show: false, resolve: null }));
    }, [config.resolve]);

    const handleCancel = useCallback(() => {
        if (config.resolve) config.resolve(false);
        setConfig(prev => ({ ...prev, show: false, resolve: null }));
    }, [config.resolve]);

    // Render as a COMPONENT
    const ConfirmUI = () => (
        <ConfirmModal
            show={config.show}
            title={config.title}
            message={config.message}
            onConfirm={handleConfirm}
            onCancel={handleCancel}
        />
    );

    return { confirm, ConfirmUI };
}
