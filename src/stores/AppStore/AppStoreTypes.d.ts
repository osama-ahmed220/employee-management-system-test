type AppStoreState = {
  isDesktop: boolean;
  isLoading?: boolean;
};

type AppStoreActions = {
  setIsDesktop: (isDesktop: boolean) => void;
  setIsLoadingStart: () => void;
  setIsLoadingEnd: () => void;
  resetAppStore: () => void;
};

type AppStoreActionsType = ActionType<AppStoreActions>;

type AppStoreType = AppStoreState & AppStoreActionsType;
