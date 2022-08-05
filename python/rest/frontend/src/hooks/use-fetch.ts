import { useCallback, useReducer } from "react";

export enum FetchActionType {
  Loading,
  Fetched,
  Error,
}

type FetchAction<T> =
  | { type: FetchActionType.Loading }
  | { type: FetchActionType.Fetched; payload?: T }
  | { type: FetchActionType.Error; payload?: Error };

export type FetchState<T> = {
  data?: T;
  loading?: boolean;
  error?: Error;
};

export const useFetch = <T = unknown>(
  url: string,
  options?: RequestInit
): [() => Promise<void>, FetchState<T>] => {
  const initialFetchState: FetchState<T> = {
    data: undefined,
    loading: true,
    error: undefined,
  };

  const fetchReducer = (
    state: FetchState<T>,
    action: FetchAction<T>
  ): FetchState<T> => {
    switch (action.type) {
      case FetchActionType.Loading:
        return { ...initialFetchState, loading: true };
      case FetchActionType.Fetched:
        return { ...initialFetchState, data: action.payload };
      case FetchActionType.Error:
        return { ...initialFetchState, error: action.payload };
      default:
        return state;
    }
  };

  const [fetchState, dispatch] = useReducer(fetchReducer, initialFetchState);

  const makeRequest = useCallback(async () => {
    if (!url) {
      return;
    }

    dispatch({ type: FetchActionType.Loading });

    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        dispatch({ type: FetchActionType.Error });
      }

      const responseData = (await response.json()) as T;
      dispatch({ type: FetchActionType.Fetched, payload: responseData });
    } catch (error) {
      dispatch({ type: FetchActionType.Error, payload: error as Error });
    }
  }, [url, options]);

  return [makeRequest, fetchState];
};
