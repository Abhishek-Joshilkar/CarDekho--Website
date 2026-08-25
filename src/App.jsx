import './App.css'
import UserNav from './users/UserNav'
import { Outlet } from 'react-router-dom'

function App() {
  return (
    <>
      <UserNav/>
      <Outlet/>
    </>
  )
}

export default App
