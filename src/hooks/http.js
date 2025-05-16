import { useCallback, useEffect, useState } from "react";

async function sendHttpRequest(url, config) {
  const response = await fetch(url, config);
  const resData = response.json();

  if (!response.ok) {
    throw new Error(resData.message || "Something went wrong please try again");
  }

  return resData;
}

export default function useHttp(url, config, initialData) {
  const [error, setError] = useState(initialData);
  const [data, setData] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  
  const sendRequest = useCallback(
    async function sendRequest(data) {
      setIsLoading(true);
      try {
        const responseData = await sendHttpRequest(url, {...config, body:data});
        setData(responseData);
      } catch (error) {
        setError(error.message || "Something went wrong");
      }
      setIsLoading(false);
    },
    [url, config]
  );

  function clearData(){
    setData(initialData);
  }

  useEffect(() => {
    if ((config && (config.method == "GET" || !config.method)) || !config)
      sendRequest();
  }, [sendRequest, config]);
  return {
    data,
    isLoading,
    error,
    sendRequest,
    clearData
  };
}
