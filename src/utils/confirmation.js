export const confirmAction = (message) => {
    return new Promise((resolve) => {
        const shouldProceed = window.confirm(message);
        resolve(shouldProceed);
    });
};  