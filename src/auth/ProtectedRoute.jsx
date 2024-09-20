import { Navigate, Outlet } from "react-router-dom"
const Protectedroute = ({ user }) => {
  if (!user) {
    return <Navigate to="/login" />
  }
  return <Outlet />
}

export default Protectedroute;