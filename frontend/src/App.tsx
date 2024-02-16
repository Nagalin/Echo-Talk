import { Route, Routes } from 'react-router-dom'
import Authenitcation from './pages/Authentication'
import { AuthContextProvider } from './contexts/AuthContext'
import Protected from './components/Protected'
import Drawer from './components/Drawer'
import Navbar from './components/Navbar'
import Homepage from './pages/Homepage'
import { SocketContextProvider } from './contexts/SocketContext'

const App = () => {
  return (
    <SocketContextProvider>
      <AuthContextProvider>


        <Routes>
          <Route element={<Authenitcation />} path='/' />

          <Route element={<Protected />}>
            <Route element={<Navbar />}>

              <Route element={<Homepage />} path='/homepage' />
            </Route>

          </Route>
        </Routes>
      </AuthContextProvider>
    </SocketContextProvider>
  )
}

export default App