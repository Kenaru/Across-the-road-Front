import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Box, Flex, Button, Image, List, ListItem, Text, Input, IconButton, Switch, Stack } from '@chakra-ui/react';
import { FaEdit, FaSave, FaTimes, FaUpload, FaPlus, FaTrash } from 'react-icons/fa';

const Navbar = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));
    const [logo, setLogo] = useState('../../assets/logo_b.png');
    const [links, setLinks] = useState([
        { id: 'home', title: 'Home' },
        { id: 'about', title: 'A propos de Nous' },
        { id: 'contact', title: 'Contact' },
        { id: 'blog', title: 'Blog' }
    ]);
    const [editMode, setEditMode] = useState(false);

    useEffect(() => {
        // Mock fetching data, can be replaced with actual API call
        const loadNavbarData = async () => {
            // Simulated fetch
            const data = {
                logo: '../../assets/logo_b.png',
                links: [
                    { id: 'home', title: 'Home' },
                    { id: 'about', title: 'Apropos  de Nous' },
                    { id: 'contact', title: 'Contact' },
                    { id: 'blog', title: 'Blog' }
                ]
            };
            setLinks(data.links);
            setLogo(data.logo);
        };
        loadNavbarData();
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        setIsAuthenticated(false);
    };

    const toggleEditMode = () => {
        setEditMode(!editMode);
    };

    const handleChangeLinkTitle = (id, value) => {
        const updatedLinks = links.map(link => ({
            ...link,
            title: link.id === id ? value : link.title
        }));
        setLinks(updatedLinks);
    };

    const handleLogoChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setLogo(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleAddLink = () => {
        const newLink = {
            id: Math.random().toString(36).substr(2, 9), // Generate a random ID
            title: 'New Link'
        };
        setLinks([...links, newLink]);
    };

    const handleDeleteLink = (id) => {
        setLinks(links.filter(link => link.id !== id));
    };

    return (
        <Flex width="100%" direction="column" position="sticky" top="0" zIndex="1000">
            <Flex bgGradient="linear(to-r, #010132, #6f13ad)" color="white" p="20px" alignItems="center" justifyContent="space-between" boxShadow="0 8px 16px rgba(255, 255, 255, 0.5)">
                <Flex alignItems="center">
                    <Image src={logo} alt="Logo" htmlWidth="60px" htmlHeight="50px" cursor="pointer" />
                    {editMode && (
                        <>
                            <IconButton
                                icon={<FaUpload />}
                                onClick={() => document.getElementById('logoInput').click()}
                                ml={2}
                                variant="ghost"
                                aria-label="Upload Logo"
                                color="white"
                                size="sm"
                            />
                            <input id="logoInput" type="file" accept="image/*" onChange={handleLogoChange} style={{ display: 'none' }} />
                        </>
                    )}
                </Flex>
                <List display="flex">
                    {links.map(link => (
                        <ListItem key={link.id} ml="20px" display="flex" alignItems="center">
                            {editMode ? (
                                <>
                                    <Input
                                        value={link.title}
                                        onChange={(e) => handleChangeLinkTitle(link.id, e.target.value)}
                                        size="sm"
                                        autoFocus
                                    />
                                    <IconButton
                                        icon={<FaTrash />}
                                        onClick={() => handleDeleteLink(link.id)}
                                        size="xs"
                                        ml="2"
                                        color="white"
                                        variant="ghost"
                                        aria-label="Delete Link"
                                    />
                                </>
                            ) : (
                                <Text as={Link} to={`/${link.id}`} cursor="pointer">{link.title}</Text>
                            )}
                        </ListItem>
                    ))}
                </List>
                <Stack direction="row" align="center">
                    <Switch isChecked={editMode} onChange={toggleEditMode} />
                    <Text ml={2}>Edit Mode</Text>
                </Stack>
                {editMode && (
                    <IconButton
                        icon={<FaPlus />}
                        onClick={handleAddLink}
                        colorScheme="blue"
                        aria-label="Add Link"
                        size="lg"
                        mt="4"
                    />
                )}
                {isAuthenticated ? (
                    <Button onClick={handleLogout} bg="transparent" color="white" _hover={{ bg: 'whiteAlpha.200' }}>Logout</Button>
                ) : (
                    <Link to="/login">
                        <Text color="white" _hover={{ textDecoration: 'underline' }}>Login</Text>
                    </Link>
                )}
            </Flex>
        </Flex>
    );
};

export default Navbar;
