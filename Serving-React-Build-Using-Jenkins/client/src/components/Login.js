import Header from "./Header";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios"
function Login({ alert, showAlert }) {
    let navigate = useNavigate()

    const [userData, setUserData] = useState({
        email: "",
        password: "",
    })

    const onChangeHandler = (e) => {
        setUserData({
            ...userData,
            [e.target.name]: e.target.value
        })
    }

    const submitHandler = async (e) => {
        e.preventDefault()
        try {
             let { data } = await axios.post("/api/login", userData);
            console.log(data)
        } catch (err) {
            console.log(err)
        }
    }
    return (
        <div>
            <div className="container">
                <div>
                    <center>
                        <Link to="/">
                            <img src="https://pngimg.com/uploads/book/book_PNG51090.png" alt="login" style={{ width: '20%' }} />
                            <h1>User Login </h1>
                        </Link>
                    </center>
                </div>
                <div>
                    <form onSubmit={submitHandler}>
                        <label htmlFor="email"><b>Email : </b></label><br />
                        <input type="email" name="email" autoComplete="off" onChange={onChangeHandler} /><br />
                        <label htmlFor="password"><b> Password : </b></label><br />
                        <input type="password" name="password" autoComplete="off" onChange={onChangeHandler} /><br /><br />
                        <center>
                            <input type="submit" value="Login" />
                        </center>
                    </form>
                </div>
                <center>
                    <p> Dont you have an account ? <Link to="/register"> <b> Register</b></Link></p>
                </center>
            </div>
        </div>

    )
}

export default Login;
