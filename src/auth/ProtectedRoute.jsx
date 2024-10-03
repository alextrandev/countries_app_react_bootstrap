import { Navigate, Outlet } from "react-router-dom"
import LoadingScreen from "../components/LoadingScreen"

const Protectedroute = ({ user, loading }) => {
  if (loading) {
    return <LoadingScreen />
  }

  if (!user) {
    return <Navigate to="/login" />
  }
  return <Outlet />
}

export default Protectedroute;