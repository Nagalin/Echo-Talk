import { Route, Routes } from 'react-router-dom'
import Login from './pages/Authentication'
import { AuthContextProvider } from './contexts/AuthContext'
import Protected from './components/Protected'
import Drawer from './components/Drawer'
import Navbar from './components/Navbar'

const App = () => {
  return (
    <AuthContextProvider>

      <Routes>
        <Route element={<Login />} path='/' />

        <Route element={<Protected/>}>
          <Route element={<Navbar/>}>

          <Route element={<Drawer/>} path='/homepage'/>
          </Route>

        </Route>
      </Routes>
    </AuthContextProvider>
  )
}

export default App