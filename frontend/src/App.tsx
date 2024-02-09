import { Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import Homepage from './pages/Homepage'
import Navbar from './components/Navbar'
import Protected from './components/Protected'
import { SocketContextProvider } from './contexts/SocketContext'
import { AuthContextProvider } from './contexts/AuthContext'

const App = () => {
  return (
    <AuthContextProvider>
    <SocketContextProvider>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route element={<Protected />}>
          <Route element={<Navbar />}>
            <Route path='/homepage' element={<Homepage />} />
          </Route>
        </Route>
      </Routes>
    </SocketContextProvider>
    </AuthContextProvider>
  )
}

export default App