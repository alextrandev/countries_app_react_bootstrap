import { Navigate, Outlet } from "react-router-dom"
import LoadingScreen from "../components/LoadingScreen"
import { toast } from "react-toastify"

const Protectedroute = ({ user, loading }) => {
  if (loading) {
    return <LoadingScreen />
  }

  if (!user) {
    toast.warn("Please login or register first", {
      toastId: 'requirelogin',
    });
    return <Navigate to="/login" />
  }
  return <Outlet />
}

export default Protectedroute;