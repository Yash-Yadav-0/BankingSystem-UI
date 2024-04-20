import { Link } from "react-router-dom";

import Button from '@mui/material/Button';
const userType = localStorage.getItem('userType');


const handleLogout = () => {
    localStorage.clear(); // Clear local storage
    history.push("/"); // Redirect to home page
};

export default function Navbar() {
    return (
        <nav>
            <div id="navContainer" className="nav-container">
                <div>
                    <img src="/assets/image/AloiBank-logo_full-h.png" alt="Logo" id="navLogo" />
                </div>
                <div >
                    <ul id="navItems">
                        <li className="item">
                            <Link to="/"><p>Home</p></Link>
                        </li>
                        <li className="item">
                            <Link to="/aboutUs"><p>About Us</p></Link>
                        </li>
                        <li className="item">
                            <Link to="/team"><p>Team</p></Link>
                        </li>
                        <li className="item">
                            <Link to="/contactUs"><p>Contact Us</p></Link>

                        </li>

                    </ul>
                </div>
                <div>
                    <Button variant="contained" className="log-btn">
                        {userType === null ? (
                            <span >
                                <Link to="/login">Login</Link>
                            </span>
                        ) : (
                            <span onClick={handleLogout}>
                                Logout
                            </span>)}
                    </Button>
                </div>
            </div>
        </nav >
    )
}
