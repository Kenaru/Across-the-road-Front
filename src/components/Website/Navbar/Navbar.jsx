import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Navbar.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faSave, faTrash, faPlus } from '@fortawesome/free-solid-svg-icons';

const navLinksData = [
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
    const [editableLinks, setEditableLinks] = useState([...navLinksData]);
    const [editingIndex, setEditingIndex] = useState(null);
    const [newLinkTitle, setNewLinkTitle] = useState('');

    useEffect(() => {
        const storedLinks = localStorage.getItem('editableLinks');
        if (storedLinks) {
            setEditableLinks(JSON.parse(storedLinks));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('editableLinks', JSON.stringify(editableLinks));
    }, [editableLinks]);

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/');
    };

    const handleEditLink = (index) => {
        setEditingIndex(index);
        setNewLinkTitle(editableLinks[index].title);
    };

    const handleSaveLink = (index) => {
        const updatedLinks = [...editableLinks];
        updatedLinks[index].title = newLinkTitle;
        setEditableLinks(updatedLinks);
        setEditingIndex(null);
        setNewLinkTitle('');
    };

    const handleDeleteLink = (index) => {
        const updatedLinks = [...editableLinks];
        updatedLinks.splice(index, 1);
        setEditableLinks(updatedLinks);
    };

    const handleAddLink = () => {
        const newLink = {
            id: `new-link-${editableLinks.length + 1}`,
            title: newLinkTitle,
        };
        setEditableLinks([...editableLinks, newLink]);
        setNewLinkTitle('');
    };

    return (
        <nav className="navbar">
            <ul className="nav-links">
                {editableLinks.map((link, index) => (
                    <li key={link.id}>
                        {editingIndex === index ? (
                            <>
                                <input
                                    type="text"
                                    value={newLinkTitle}
                                    onChange={(e) => setNewLinkTitle(e.target.value)}
                                />
                                <FontAwesomeIcon icon={faSave} onClick={() => handleSaveLink(index)} />
                                <FontAwesomeIcon icon={faTrash} onClick={() => handleDeleteLink(index)} />
                            </>
                        ) : (
                            <>
                                <button onClick={() => navigate(`/${link.id}`)}>
                                    {link.title}
                                </button>
                                <FontAwesomeIcon icon={faEdit} onClick={() => handleEditLink(index)} />
                            </>
                        )}
                    </li>
                ))}
                <li>
                    <form onSubmit={(e) => { e.preventDefault(); handleAddLink(); }}>
                        <input
                            type="text"
                            value={newLinkTitle}
                            onChange={(e) => setNewLinkTitle(e.target.value)}
                            placeholder="New Link Title"
                        />
                        <button type="submit"><FontAwesomeIcon icon={faPlus} /></button>
                    </form>
                </li>
            </ul>
            <li>
                {isAuthenticated ? (
                    <button onClick={handleLogout}>Logout</button>
                ) : (
                    <input
                        type="button"
                        value="Login"
                        onClick={() => navigate('/login')}
                    />
                )}
            </li>
        </nav>
    );
};

export default Navbar;
