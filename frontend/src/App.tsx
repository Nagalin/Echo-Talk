import { Route, Routes } from 'react-router-dom'
import Login from './pages/Login'

const App = () => {
  return (
    <Routes>
      <Route element={<Login/>} path='/'/>
      </Routes>
  )
}

export default App