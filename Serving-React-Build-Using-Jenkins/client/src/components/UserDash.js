import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

import Header from "./Header";
import Body from "./Body";

function UserDash() {
    let navigate = useNavigate()

    const authUser = async () => {
        try {
            let token = JSON.parse(localStorage.getItem("token"))
            let { data } = await axios.get("/api/auth", { headers: { "x-auth-token": token.token } })
            if (data.role !== "user") {
                localStorage.removeItem("token")
                navigate("/login", { replace: true })
            }

        } catch (err) {
            console.log(err.response.data)
            navigate("/login", { replace: true })
        }
    }

    useEffect(() => {
        authUser()
    }, [])

    const logout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    }

    return (
        <>
            <Header content={"User Dashboard"} />
            <div style={{ overflow: "auto" }}>
                <Body />
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

export default UserDash;
