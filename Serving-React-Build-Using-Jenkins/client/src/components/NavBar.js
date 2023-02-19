import { Link } from "react-router-dom";
function NavBar() {
    return (
        <div className="menu">
            <Link to="/">Home</Link>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
            <Link to="/contact">Contact Us</Link>
        </div>
    )
}

export default NavBar;