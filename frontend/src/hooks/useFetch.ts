import { useEffect, useState } from "react"
import axios from "../lib/axios"
import { AxiosError } from "axios"

const useFetch =  <T>(url: string, initialValue: T): [T,boolean,string] => {
      const [data, setData] = useState<T>(initialValue)
      const [error,setError] = useState('')
      const [loading,setLoading] = useState(true)

      useEffect(() => {
        const fetch = async () => {
          try {
            const response = await axios.get(url)
            setData(response.data)
          
        } catch (error) {
          console.error(error)
          error instanceof AxiosError? 
          setError(error.response?.data) : setError('Something went wrong')
        } finally {
          setLoading(false)
        }

        }
        fetch()

      },[url])

     

      return  [data,loading, error]

}

export default useFetch