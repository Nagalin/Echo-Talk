import React, { useEffect, useState } from 'react'
import axios from '../lib/axios'
import { Outlet, useNavigate } from 'react-router-dom'
import { useAuthContext } from '../contexts/AuthContext'

const Proctected = () => {
    const [loggedIn,setLoggedIn] = useState(false)
    const [loading, setLoading] = useState(true)
    const {setUsername, setPicName} = useAuthContext()
    const navigate = useNavigate()

    useEffect(() =>{
        axios.get('/profile')
        .then(response => {
            const {username, picName} = response.data
            setUsername(username)
            setPicName(picName)
            setLoggedIn(true)
        })
        .catch(err => console.error(err))
        .finally(()=> setLoading(false))
    },[])

    if(loading) return null
    if(!loading && !loggedIn) navigate('/')
    if(!loading && loggedIn) return <Outlet/>
 
}

export default Proctected