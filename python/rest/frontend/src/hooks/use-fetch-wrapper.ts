import { useFetch } from "./use-fetch";

type RequestOptions<RequestData> = {
  auth?: boolean;
  data?: RequestData;
};

export const useFetchWrapper = <RequestData, ResponseData = unknown>(
  url: string,
  options?: RequestOptions<RequestData> & RequestInit
): ReturnType<typeof useFetch<ResponseData>> => {
  return useFetch(url, {
    ...options,
    headers: {
      ...(options?.auth ? { Authorization: `Bearer ${localStorage.getItem('accessToken')}` } : {}),
      "Content-Type": "application/json"
    },
    body: options?.data ? JSON.stringify(options.data) : undefined,
  })
};
