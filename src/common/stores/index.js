import { create } from 'zustand';

import useModalStore from './modalStore';
import useAuthStore from './authStore';
import useWritePostStore from '../../user/store/writePostStore';
import useNoticeStore from '../../manager/store/writeNoticeStore';
import useModifyFeedStore from '@/user/store/modifyFeedStroe';
import useSearchPostStore from '@/user/store/searchPostStore';
import useSearchNoticeStore from '@/user/store/useSearchNoticeStore';


const useStore = create((set) => ({
    ...useModalStore,
    ...useAuthStore,
    ...useWritePostStore,
    ...useNoticeStore,
    ...useModifyFeedStore,
    ...useSearchPostStore,
    ...useSearchNoticeStore,
}));

export default useStore;