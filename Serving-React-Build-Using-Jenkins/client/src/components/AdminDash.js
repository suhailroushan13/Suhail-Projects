import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

import Header from "./Header";
import Body from "./Body";

function AdminDash({ alert, showAlert }) {
    let navigate = useNavigate()

    const authAdmin = async () => {
        try {
            let token = JSON.parse(localStorage.getItem("token"))
            let { data } = await axios.get("/api/auth", { headers: { "x-auth-token": token.token } })
            if (data.role !== "admin") {
                localStorage.removeItem("token")
                navigate("/login", { replace: true })
            }

        } catch (err) {
            console.log(err.response.data)
            localStorage.removeItem("token")
            navigate("/login", { replace: true })
        }
    }

    useEffect(() => {
        authAdmin()
    }, [])

    const logout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    }

    return (
        <>
            <Header content={"Admin Dashboard"} />
            <div style={{ overflow: "auto" }}>
                <Body showAlert={showAlert} alert={alert} />
                <div className="menu">
                    <Link to="/">Home</Link>
                    <p onClick={logout}> Logout</p>
                    <Link to="/register">Register</Link>
                    <Link to="/contact">Contact Us</Link>
                </div>
            </div>
        </>
    );
}

export default AdminDash;
