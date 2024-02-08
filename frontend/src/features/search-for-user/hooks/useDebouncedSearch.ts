import { useEffect, useState } from "react"
import axios from "../../../lib/axios"

const useDebouncedSearch = <T>(searchString: string, initialValue: T,delay = 500) => {
    const  [results, setResults] = useState<T>(initialValue)

    useEffect(() => {
        const timeout = setTimeout(() => {
            axios.get(`/user/${searchString}`)
            .then(response => setResults(response.data))

        },delay)

        return () => clearTimeout(timeout)

    },[searchString])

    return results

}

export default useDebouncedSearch