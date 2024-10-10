import { Navigate, Outlet } from "react-router-dom"
import LoadingScreen from "../components/LoadingScreen"
import { toast } from "react-toastify"

// this component to deny user access to some routes when not logged in

const Protectedroute = ({ user, loading }) => {
  // this is to prevent error on reload, firebase will need sometime to verify the login status
  if (loading) {
    return <LoadingScreen />
  }

  // redirect user when not logged in
  if (!user) {
    toast.warn("Please login or register first", {
      toastId: 'requirelogin',
    });
    return <Navigate to="/login" />
  }

  return <Outlet />
}

export default Protectedroute;