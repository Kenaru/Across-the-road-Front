import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo_b.png'; // Import the logo image
import './Navbar.scss';

const navLinks = [
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
    const isAuthenticated = !!localStorage.getItem('token');

    const handleLogout = () => {
        localStorage.removeItem('token');
    };

    return (
        <nav className="navbar">
            <div className="nav-logo">
                <img
                    src={logo} // Use the imported logo variable here
                    alt="Logo"
                />
            </div>
            <ul className="nav-links">
                {navLinks.map((link) => (
                    <li key={link.id}>
                        <Link to={`/${link.id}`}>
                            {link.title}
                        </Link>
                    </li>
                ))}
                <li>
                    {isAuthenticated ? (
                        <button onClick={handleLogout}>Logout</button>
                    ) : (
                        <Link to="/login">Login</Link>
                    )}
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;
