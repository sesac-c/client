import { create } from 'zustand';

const useSearchPostStore = create((set, get) => ({
  keyword: '',

  setKeyword: keyword => set({ keyword }),

  resetStore: () =>
    set({
      keyword: ''
    })
}));

export default useSearchPostStore;
