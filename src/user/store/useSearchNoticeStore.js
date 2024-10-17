import { create } from 'zustand';
import { fetchNotices } from '@/user/services/api/notices';

const useSearchNoticeStore = create((set, get) => ({
  keyword: '',
  notices: [],
  size: 3,
  apiUrl: '',
  page: 0,
  hasMore: true,
  isLoading: false,

  loadNotices: async () => {
    const { isLoading, hasMore, page, notices, size, keyword, apiUrl } = get();
    if (isLoading || !hasMore) {
      return;
    }

    set({ isLoading: true });
    try {
      const { newNotices, last } = await fetchNotices({ page, size, keyword }, apiUrl);
      set({
        notices: notices.concat(newNotices),
        page: page + 1,
        hasMore: !last,
        isLoading: false
      });
    } catch (error) {
      console.error('Failed to fetch notices:', error);
      set({ hasMore: false, isLoading: false });
    }
  },

  setKeyword: keyword => {
    set({ keyword, page: 0, notices: [], hasMore: true });
  },

  setSize: size => set({ size }),

  setApiUrl: newApiUrl =>
    set(state => {
      if (state.apiUrl !== newApiUrl) {
        return { apiUrl: newApiUrl };
      }
      return state;
    }),

  resetStore: () =>
    set({
      notices: [],
      page: 0,
      hasMore: true,
      isLoading: false,
      keyword: ''
    })
}));

export default useSearchNoticeStore;