import Header from "./Header";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Register({ showAlert, alert }) {
    let navigate = useNavigate()
    const [userData, setUserData] = useState({
        firstname: "",
        lastname: "",
        email: "",
        password: "",
        password2: ""
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
            let { data } = await axios.post("/api/user/register", userData);
            showAlert({
                type: "success",
                msg: data.success
            });
            navigate("/login", { replace: true })
        } catch (err) {
            let data
            if (err.response.data.error)
                data = err.response.data.error

            if (err.response.data.errors)
                data = err.response.data.errors.map(e => e.msg).join(" ,")
            showAlert({
                type: "error",
                msg: data
            });
        }
    }
    return (
        <div>
            <Header content={"Online Library"}/>
            <div className="container">
                <div>
                    <center>
                        <Link to="/">
                            <img src="https://pngimg.com/uploads/book/book_PNG51090.png" alt="Register" style={{ width: '20%' }} />
                            <h1>User Signup </h1>
                            {alert !== null && <div className={`alert-${alert.type}`}> {alert.msg}</div>}
                        </Link>
                    </center>
                </div>
                <br />
                <div>
                    <form onSubmit={submitHandler}>
                        <label htmlFor="firstname"><b> First Name : </b></label><br />
                        <input type="text" name="firstname" required onChange={onChangeHandler} /><br /><br />

                        <label htmlFor="lastname"><b> Last Name : </b></label><br />
                        <input type="text" name="lastname" required onChange={onChangeHandler} /><br /><br />

                        <label htmlFor="email"><b>Email : </b></label><br />
                        <input type="email" name="email" autoComplete="off" required onChange={onChangeHandler} /><br />

                        <label htmlFor="password"><b> Password : </b></label><br />
                        <input type="password" name="password" autoComplete="off" required onChange={onChangeHandler} /><br /><br />

                        <label htmlFor="password2"><b> Confirm Password : </b></label><br />
                        <input type="password" name="password2" autoComplete="off" required onChange={onChangeHandler} /><br /><br />

                        <center>
                            <input type="submit" value="Register" />
                        </center>
                    </form>
                </div>
                <center>
                    <p> Already have an account ? <Link to="/login"> <b> Login</b></Link></p>
                </center>
            </div>
        </div>

    )
}

export default Register;