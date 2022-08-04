import { useCallback, useState } from "react";

export const useRequest = <T>(url: string, options: RequestInit) => {
  const [response, setResponse] = useState<T>();

  const makeRequest = useCallback(async () => {
    const fetchResponse = await fetch(url, options);
    setResponse(await fetchResponse.json());
  }, [url, options, setResponse]);

  return [makeRequest, response];
};
