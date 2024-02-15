import { useEffect, useState } from "react"
import axios from "../lib/axios"

const useDebouncedSearch = <T>(url: string ,searchString: string, delay = 500) => {
    const [result,setResult] = useState<T>()

    useEffect(() => {
        const timeout = setTimeout(() => {
            axios.get(`${url}/${searchString}`)
            .then(response => setResult(response.data))

        },delay)

        return () => clearTimeout(timeout)

    },[searchString,delay])

    return result
}

export default useDebouncedSearch