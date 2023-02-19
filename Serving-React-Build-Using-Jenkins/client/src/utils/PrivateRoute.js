import {Outlet, Navigate} from "react-router-dom"

function PrivateRoute() {
  let auth = localStorage.getItem("token")
    return (
        auth ? <Outlet/> : <Navigate to="/login"/>
  )
}
  
export default PrivateRoute