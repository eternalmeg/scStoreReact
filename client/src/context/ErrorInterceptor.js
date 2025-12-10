let errorHandler = null;


export function setGlobalErrorHandler(handler) {
    errorHandler = handler;
}


export function triggerGlobalError(message) {
    if (errorHandler) {
        errorHandler(message);
    }
}
