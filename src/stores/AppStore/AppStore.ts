import { createStore } from 'zustand';

const initialState: AppStoreState = {
  isDesktop: true,
  isLoading: false,
};

const appStore = createStore<AppStoreType>()((set, get) => ({
  ...initialState,
  actions: {
    setIsDesktop: (isDesktop) =>
      set({
        isDesktop,
      }),
    setIsLoadingStart() {
      const loadingState = get().isLoading;
      if (loadingState) {
        return;
      }
      set({
        isLoading: true,
      });
    },
    setIsLoadingEnd() {
      const loadingState = get().isLoading;
      if (!loadingState) {
        return;
      }
      set({
        isLoading: false,
      });
    },
    resetAppStore: () => set({ ...initialState }),
  },
}));

export default appStore;
