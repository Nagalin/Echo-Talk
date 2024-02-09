import { useEffect, useState } from 'react'
import axios from '../lib/axios'
import { Outlet, useNavigate } from 'react-router-dom'
import { useAuthContext } from '../contexts/AuthContext'

const Protected = () => {
    const [isLoggedIn,setIsLoggedIn] = useState(false)
    const [isLoading,setIsLoading] = useState(true)
    const navigate = useNavigate()
    const {setUsername, setPicName} = useAuthContext()

    useEffect(() => {
        axios.get('/profile')
        .then( response => {
            setIsLoggedIn(true)
            setUsername(response.data.username)
            setPicName(response.data.picName)
        })
        .catch(err => console.log(err))
        .finally(() => setIsLoading(false))
    },[])

    if(isLoading) return null
    if(!isLoading &&  !isLoggedIn) navigate('/')
    if(!isLoading && isLoggedIn) return <Outlet/>
  
}

export default Protected