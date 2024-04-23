'use client';

import { useStoreWithEqualityFn } from 'zustand/traditional';

import { Params } from '../types/SelectorsTypes';
import appStore from './AppStore';
import {
  appStoreActionsSelector,
  appStoreIsDesktopSelector,
  appStoreIsLoadingSelector,
} from './AppStoreSelectors';

type StoreType = typeof appStore;

function useAppStore<U>(selector: Params<U, StoreType>[1], equalityFn?: Params<U, StoreType>[2]) {
  return useStoreWithEqualityFn(appStore, selector, equalityFn);
}

export const useAppStoreIsDesktop = () => useAppStore(appStoreIsDesktopSelector);
export const useAppStoreIsLoading = () => useAppStore(appStoreIsLoadingSelector);

export const useAppStoreActions = () => useAppStore(appStoreActionsSelector);
