import { Route, Routes } from 'react-router-dom'
import Authenitcation from './pages/Authentication'
import { AuthContextProvider } from './contexts/AuthContext'
import Protected from './components/Protected'
import Navbar from './components/Navbar'
import Homepage from './pages/Homepage'
import { SocketContextProvider } from './contexts/SocketContext'
import { ChatContextProvider } from './contexts/ChatContext'

const App = () => {
  return (
    <ChatContextProvider>

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
    </ChatContextProvider>
  )
}

export default App