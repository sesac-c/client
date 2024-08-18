import { useCallback } from 'react';
import { confirmAction } from '../utils/confirmation';

export const useConfirmClose = (message) => {
    const handleBeforeClose = useCallback(() => {
        return confirmAction(message);
    }, [message]);

    return handleBeforeClose;
};
