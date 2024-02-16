import { useState } from "react"
import axios from "../lib/axios"
import { AxiosError } from "axios"

const useFetch= async <T>(url: string, initialValue: T) => {
      const [data, setData] = useState<T>(initialValue)
      const [error,setError] = useState('')

      try {
          const response = await axios.get(url)
          setData(response.data)
        
      } catch (error) {
        console.error(error)
        error instanceof AxiosError? 
        setError(error.response?.data) : setError('Something went wrong')
      }

      return  { data, error}

}

export default useFetch