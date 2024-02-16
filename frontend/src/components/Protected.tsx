import  { useCallback, useEffect, useState } from 'react'
import axios from '../lib/axios'
import { Outlet, useNavigate } from 'react-router-dom'
import { useAuthContext } from '../contexts/AuthContext'
import { useSocketContext } from '../contexts/SocketContext'
import { io } from 'socket.io-client'

const Proctected = () => {
    const [loggedIn,setLoggedIn] = useState(false)
    const [loading, setLoading] = useState(true)
    const {id ,setUsername, setPicName, setId } = useAuthContext()
    const {socket} = useSocketContext()
    
    const navigate = useNavigate()

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('/profile');
                const { username, picName, _id } = response.data;
                setUsername(username);
                setId(_id);
                setPicName(picName);
                setLoggedIn(true);
                
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
       
    }, []);
    

    if(loading) return null
    if(!loading && !loggedIn) navigate('/')
    if(!loading && loggedIn) return <Outlet/>
 
}

export default Proctected