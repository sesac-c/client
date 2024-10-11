import { create } from 'zustand';

import useModalStore from './modalStore';
import useAuthStore from './authStore';
import useWritePostStore from '../../user/store/writePostStore';
import useNoticeStore from '../../manager/store/writeNoticeStore';

const useStore = create((set) => ({
    ...useModalStore,
    ...useAuthStore,
    ...useWritePostStore,
    ...useNoticeStore
}));

export default useStore;