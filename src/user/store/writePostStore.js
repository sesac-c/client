import { create } from 'zustand';

import { MAX_HASHTAGS, THUMBNAIL_API_URL } from '../../common/constants';

import { removeImage, uploadImage } from '../services/api/posts';

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
      const response = await uploadImage(file);
      const { data } = response;

      if (!data && !data.length) {
        return;
      }

      const [image] = data;

      set({ image: `${image.uuid}_${image.fileName}` });
      set({ thumbnail: image.link });
    } catch (error) {
      console.error('Image upload failed:', error);
    }
  },

  handleImageRemove: async file => {
    try {
      await removeImage(file);

      set({ image: null });
      set({ thumbnail: null });
    } catch (error) {
      console.error('Image remove failed:', error);
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
  getHashtagCount: () => get().hashtags.length,
  getThumbnail: () => THUMBNAIL_API_URL(get().thumbnail)
}));

export default useWritePostStore;
