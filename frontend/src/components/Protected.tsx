import { useEffect, useState } from 'react'
import axios from '../lib/axios'
import { Outlet, useNavigate } from 'react-router-dom'

const Protected = () => {
    const [isLoggedIn,setIsLoggedIn] = useState(false)
    const [isLoading,setIsLoading] = useState(true)
    const navigate = useNavigate()

    useEffect(() => {
        axios.get('/auth')
        .then(() => setIsLoggedIn(true))
        .catch(err => console.log(err))
        .finally(() => setIsLoading(false))
    },[])

    if(isLoading) return null
    if(!isLoading &&  !isLoggedIn) navigate('/')
    if(!isLoading && isLoggedIn) return <Outlet/>
  
}

export default Protected