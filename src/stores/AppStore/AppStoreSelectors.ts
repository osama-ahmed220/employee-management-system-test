import { ExtractState } from '../types/SelectorsTypes';
import appStore from './AppStore';

export const appStoreIsDesktopSelector = (state: ExtractState<typeof appStore>) => state.isDesktop;
export const appStoreIsLoadingSelector = (state: ExtractState<typeof appStore>) => state.isLoading;

export const appStoreActionsSelector = (state: ExtractState<typeof appStore>) => state.actions;
