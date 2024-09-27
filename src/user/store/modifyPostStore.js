import { create } from 'zustand';

const useModifyPostStore = create((set, get) => ({
  title: '',
  content: '',
  isPostUpdate: false,

  setTitle: title => set({ title }),
  setContent: content => set({ content }),
  setIsPostUpdate: isPostUpdate => set({ isPostUpdate }),

  isCompleteButtonEnabled: () => {
    const { title, content } = get();
    return title.trim() !== '' && content.trim() !== '';
  },

  resetStore: () =>
    set({
      title: '',
      content: ''
    }),

  // Getter 함수들
  getTitleLength: () => get().title.length,
  getContentLength: () => get().content.length
}));

export default useModifyPostStore;
