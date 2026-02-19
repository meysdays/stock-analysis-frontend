import NavBar from '../Navigation/NavBar'
import { Outlet } from 'react-router-dom'

const MainLayout = () => {
  return (
    <div className=" flex">
      <NavBar />
      <div className="flex-1">
        <Outlet />
      </div>
    </div>
  )
}

export default MainLayout