import { create } from 'zustand';
import useModalStore from './modalStore';
import useWritePostStore from './writePostStore';

const useStore = create((set) => ({
    // 모달 관련 메서드들
    ...useModalStore,
    ...useWritePostStore
}));

export default useStore;