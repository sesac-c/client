import { create } from 'zustand';

import useModalStore from './modalStore';
import useWritePostStore from './writePostStore';

const useStore = create((set) => ({
    ...useModalStore,
    ...useWritePostStore
}));

export default useStore;