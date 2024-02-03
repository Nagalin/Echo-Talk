import { Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import Homepage from './pages/Homepage'
import Navbar from './components/Navbar'

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Login/>} />
      <Route path="/register" element={<Register/>} />

      <Route element={<Navbar/>}>


      <Route path='/homepage' element={<Homepage/>}/>
      </Route>
    </Routes>
  )
}

export default App