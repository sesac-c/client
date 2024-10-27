import { create } from 'zustand';
import { removeImage, uploadImage } from '@/services/api';
import { IMAGE_API_URL } from '@/constants';

const useWriteReportStore = create((set, get) => ({
  achievementSummary: '',
  participants: [],
  mainContent: '',
  duration: 0,
  photo: null,

  setAchievementSummary: achievementSummary => set({ achievementSummary }),
  setMainContent: mainContent => set({ mainContent }),
  setPhoto: photo => set({ photo }),
  setParticipants: participants => set({ participants }),
  setDuration: duration => set({ duration }),

  handlePhotoUpload: async file => {
    try {
      const response = await uploadImage(file);
      const { data } = response;

      if (!data && !data.length) {
        return;
      }

      const [image] = data;

      set({ photo: `${image.uuid}_${image.fileName}` });
    } catch (error) {
      console.error('Image upload failed:', error);
    }
  },

  handlePhotoRemove: async file => {
    try {
      await removeImage(file);

      set({ photo: null });
    } catch (error) {
      console.error('Image remove failed:', error);
    }
  },

  resetStore: () =>
    set({
      mainContent: '',
      achievementSummary: '',
      participants: [],
      duration: 0,
      photo: null
    }),

  getPhoto: () => IMAGE_API_URL(get().photo)
}));

export default useWriteReportStore;
