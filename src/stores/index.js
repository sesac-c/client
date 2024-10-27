import { create } from 'zustand';

import useModalStore from './modalStore';
import useAuthStore from './authStore';
import useWritePostStore from './writePostStore';
// import useNoticeStore from '../../manager/store/writeNoticeStore';
import useModifyFeedStore from './modifyFeedStroe';
import useSearchPostStore from './searchPostStore';
import useSearchNoticeStore from './useSearchNoticeStore';


const useStore = create((set) => ({
    ...useModalStore,
    ...useAuthStore,
    ...useWritePostStore,
    // ...useNoticeStore,
    ...useModifyFeedStore,
    ...useSearchPostStore,
    ...useSearchNoticeStore,
}));

export default useStore;