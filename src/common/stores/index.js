import { create } from 'zustand';

import useModalStore from './modalStore';
import useAuthStore from './authStore';
import useWritePostStore from '../../user/store/writePostStore';

const useStore = create((set) => ({
    ...useModalStore,
    ...useAuthStore,
    ...useWritePostStore
}));

export default useStore;