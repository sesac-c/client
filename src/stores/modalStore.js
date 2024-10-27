import { create } from 'zustand';

const useModalStore = create((set) => ({
    modals: [],
    addModal: (modal) => set((state) => ({ modals: [...state.modals, modal] })),
    removeModal: (id) => set((state) => ({ modals: state.modals.filter(m => m.id !== id) })),
}));

export default useModalStore;