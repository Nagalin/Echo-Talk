import { Route, Routes } from 'react-router-dom'
import Login from './pages/Authentication'

const App = () => {
  return (
    <Routes>
      <Route element={<Login/>} path='/'/>
      </Routes>
  )
}

export default App