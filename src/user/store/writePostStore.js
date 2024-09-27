import { create } from 'zustand';

import { MAX_HASHTAGS } from '../../common/constants';

import { processImage } from '../../common/utils/image';

const useWritePostStore = create((set, get) => ({
  title: '',
  content: '',
  image: null,
  hashtags: [],
  thumbnail: null,
  isPostUpdate: false,

  setTitle: title => set({ title }),
  setContent: content => set({ content }),
  setImage: image => set({ image }),
  setThumbnail: thumbnail => set({ thumbnail }),
  setIsPostUpdate: isPostUpdate => set({ isPostUpdate }),

  addHashtag: hashtag => {
    const { hashtags } = get();
    if (hashtags.includes(hashtag)) {
      alert('이미 존재하는 해시태그입니다.');
      return;
    }
    if (hashtags.length < MAX_HASHTAGS) {
      set({ hashtags: [hashtag, ...hashtags] });
    }
  },

  removeHashtag: index => {
    const { hashtags } = get();
    set({ hashtags: hashtags.filter((_, i) => i !== index) });
  },

  handleImageUpload: async file => {
    try {
      // todo: api 요청
      const processedImage = await processImage(file);
      set({ image: file });
      set({ thumbnail: processedImage });
    } catch (error) {
      console.error('Image processing failed:', error);
    }
  },

  isCompleteButtonEnabled: () => {
    const { title, content } = get();
    return title.trim() !== '' && content.trim() !== '';
  },

  resetStore: () =>
    set({
      title: '',
      content: '',
      image: null,
      hashtags: [],
      thumbnail: null
    }),

  // Getter 함수들
  getTitleLength: () => get().title.length,
  getContentLength: () => get().content.length,
  getHashtagCount: () => get().hashtags.length
}));

export default useWritePostStore;
