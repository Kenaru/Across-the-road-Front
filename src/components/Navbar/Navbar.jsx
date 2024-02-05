import React from 'react';
import { useNavigate,Link } from 'react-router-dom';
import { setAuthToken } from '../../api/Authcontext';
import logo from '../../assets/logo_b.png';
import './Navbar.scss';

export const navLinks = [
    {
        id: "home",
        title: "Home",
    },
    {
        id: "services",
        title: "Services",
    },
    {
        id: "about",
        title: "About",
    },
    {
        id: "blog",
        title: "Blog",
    },
    {
        id: "associations",
        title: "Associations",
    }
];
const Navbar = () => {
    const navigate = useNavigate();
    const isAuthenticated = localStorage.getItem('token') ? true : false;

    const handleLogout = () => {
        setAuthToken(null); //
        localStorage.removeItem('userToken');
        navigate('/');
    };

    return (
        <nav className="navbar">
            <div className="nav-logo">
                <a href="#home">
                    <img src={logo} alt="Logo" />
                </a>
            </div>
            <ul className="nav-links">
                {navLinks.map((link) => (
                    <li key={link.id}>
                        <a href={`#${link.id}`}>{link.title}</a>
                    </li>
                ))}
                <li>
                    {isAuthenticated ? (
                        <button onClick={handleLogout}>Connected</button> // Changed text to 'Connected'
                    ) : (
                        <Link to="/">Login</Link> // Display 'Login' when not authenticated
                    )}
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;