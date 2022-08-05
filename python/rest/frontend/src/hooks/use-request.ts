import { useCallback, useState } from "react";

export const useRequest = <D = undefined, R = undefined>(
  url: string,
  options: RequestInit
): [(data?: D) => Promise<void>, R | undefined] => {
  const [response, setResponse] = useState<R>();

  const makeRequest = useCallback(
    async (data?: D) => {
      const fetchResponse = await fetch(url, {
        headers: {
          "content-type": "application/json",
          authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        body: JSON.stringify(data),
        ...options,
      });

      setResponse(await fetchResponse.json());
    },
    [url, options, setResponse]
  );

  return [makeRequest, response];
};
