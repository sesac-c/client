import { create } from 'zustand';
import { fetchPosts } from '@/services/api';

const useSearchPostStore = create((set, get) => ({
  keyword: '',
  posts: [],
  size: 3,
  apiUrl: '',
  page: 0,
  hasMore: true,
  isLoading: false,

  loadPosts: async () => {
    const { isLoading, hasMore, page, posts, size, keyword, apiUrl } = get();
    if (isLoading || !hasMore) {
      return;
    }

    set({ isLoading: true });
    try {
      const { newPosts, last } = await fetchPosts({ page, size, keyword }, apiUrl);
      set({
        posts: posts.concat(newPosts),
        page: page + 1,
        hasMore: !last,
        isLoading: false
      });
    } catch (error) {
      console.error('Failed to fetch posts:', error);
      set({ hasMore: false, isLoading: false });
    }
  },

  setKeyword: keyword => {
    set({ keyword, page: 0, posts: [], hasMore: true });
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
      posts: [],
      page: 0,
      hasMore: true,
      isLoading: false,
      keyword: ''
    })
}));

export default useSearchPostStore;
