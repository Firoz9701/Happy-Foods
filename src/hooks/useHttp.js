import { useCallback, useEffect, useState } from "react"
import axios from "axios"

async function sendHttpRequest(url, config) {
  const response = await axios(url, config)
  return response.data; // ✅ Axios already parses JSON
}

export default function useHttp(url, config, initialData) {
  const [data, setData] = useState(initialData)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState()


  function clearData(){
    setData(initialData)
  }
  const sendRequest = useCallback(
    async function sendRequest(sendData) {
      setIsLoading(true)
      setError(null)
      try {
        const resData = await sendHttpRequest(url, {
          ...config,
          data: sendData, // ✅ Axios uses `data`, not `body`
        })
        setData(resData)
      } catch (error) {
        setError(error.response?.data?.message || error.message || 'Something went wrong')
      }
      setIsLoading(false)
    },
    [url, config]
  )

  useEffect(() => {
    if ((config && (config.method === 'GET' || !config.method)) || !config) {
      sendRequest()
    }
  }, [sendRequest, config])

  return {
    data,
    isLoading,
    error,
    sendRequest,
    clearData
  }
}
