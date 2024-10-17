import { create } from 'zustand';

const useModifyFeedStore = create((set, get) => ({
    title: '',
    content: '',
    isFeedUpdate: false,

    setTitle: title => set({ title }),
    setContent: content => set({ content }),
    setIsFeedUpdate: isFeedUpdate => set({ isFeedUpdate }),

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

export default useModifyFeedStore;
