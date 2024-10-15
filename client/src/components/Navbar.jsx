// client/src/components/Navbar.jsx

import '../styles/navbar.css'
import {
    useContext
} from 'react';
import {
    faBars
} from '@fortawesome/free-solid-svg-icons'
import {
    FontAwesomeIcon
} from "@fortawesome/react-fontawesome";
import {
    Link, useNavigate
} from "react-router-dom"
import {
    AuthContext
} from "../authContext"


const Navbar = () => {

    const navigate = useNavigate()

    const { user, dispatch } = useContext(AuthContext)
    const handleClick = async (e) => {
        e.preventDefault();
        dispatch({ type: "LOGOUT" });
        navigate("/")
    }



    return (
        <div className='navContainer'>
            <Link to="/">
                <p className='navLogo'>Reminisce</p>
            </Link>

            <input type="checkbox" id='menu-bar' />
            <label htmlFor="menu-bar">
                <FontAwesomeIcon icon={faBars} className="icon" />
            </label>
            <nav className='navbar'>
                <ul>
                    <Link to="/">
                        <li><p>Home</p></li>
                    </Link>
                    <Link to="/create">
                        <li><p>Create</p></li>
                    </Link>
                    {user ? (<>

                        <li onClick={handleClick} style={{ cursor: "pointer" }}>
                            <p>Logout</p>
                        </li>
                        <li><div className="profilePicture">
                            <img src={user.profilePicture ||
                                "https://i.ibb.co/MBtjqXQ/no-avatar.gif"} alt="" />
                        </div></li>
                        <li id="usernamename"><p>{user.username}</p></li>

                    </>
                    )
                        :
                        (
                            <>
                                <Link to="/register">
                                    <li><p>Register</p></li>
                                </Link>
                                <Link to="/login">
                                    <li><p>Login</p></li>
                                </Link>
                            </>
                        )}
                </ul>
            </nav>
        </div >
    )
}

export default Navbar
