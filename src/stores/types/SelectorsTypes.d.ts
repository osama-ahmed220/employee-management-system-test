import { StoreApi } from 'zustand';

import { useStoreWithEqualityFn } from 'zustand/traditional';

type ExtractState<S> = S extends {
  getState: () => infer T;
}
  ? T
  : never;

type Params<U, S extends StoreApi<unknown>> = Parameters<
  typeof useStoreWithEqualityFn<S, U>
>;
