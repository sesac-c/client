import { create } from 'zustand';
import useModalStore from './modalStore';

const useStore = create((set) => ({
    // 모달 관련 메서드들
    ...useModalStore
}));

export default useStore;