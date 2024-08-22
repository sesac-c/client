import { useState, useCallback, useId } from 'react';

import useModalStore from '../../stores/modalStore';

/**
 * 각 모달의 상태를 관리하며, 열기/닫기 함수를 제공
 */
const isArrEmpty = (arr) => arr.length === 0;

export const useModal = (component) => {
    const { addModal, removeModal } = useModalStore();
    const [isOpen, setIsOpen] = useState(false);
    const id = useId();

    const openModal = useCallback(() => {
        setIsOpen(true);
        addModal({ id, element: component });
        // 페이지의 스크롤을 비활성화(
        //      현재 페이지에서 스크롤 바가 보이지 않게 되고, 
        //      사용자가 마우스 휠이나 터치로 스크롤하려 해도 페이지가 스크롤되지 않음
        // )
        document.body.style.overflow = 'hidden';
    }, [component, id, addModal]);

    const closeModal = useCallback(() => {
        setIsOpen(false);
        removeModal(id);
        if (isArrEmpty(useModalStore.getState().modals)) {
            // overflow 속성을 기본 상태로 되돌림
            document.body.style.overflow = 'unset';
        }
    }, [id, removeModal]);

    return { isOpen, openModal, closeModal };
};