import appStore from './AppStore';
import {
  appStoreActionsSelector,
  appStoreIsDesktopSelector,
  appStoreIsLoadingSelector,
} from './AppStoreSelectors';

const appStoreState = appStore.getState;

export const getAppStoreIsDesktop = () => appStoreIsDesktopSelector(appStoreState());
export const getAppStoreIsLoading = () => appStoreIsLoadingSelector(appStoreState());

export const getAppStoreActions = () => appStoreActionsSelector(appStoreState());
