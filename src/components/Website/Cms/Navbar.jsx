import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Box, Flex, Button, Image, List, ListItem, Text, Input, IconButton, Switch, Stack } from '@chakra-ui/react';
import { FaEdit, FaSave, FaTimes, FaUpload } from 'react-icons/fa';
import { fetchNavbarData, updateNavbarItem, addNavbarItem, deleteNavbarItem } from '../../../api/NavbarApi';

const Navbar = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));
    const [logo, setLogo] = useState('../../assets/logo_b.png');
    const [links, setLinks] = useState([]);
    const [editMode, setEditMode] = useState(false);

    useEffect(() => {
        async function loadNavbarData() {
            try {
                const data = await fetchNavbarData();
                setLinks(data.links);  // Adjust according to how your data is structured
                setLogo(data.logo);   // Assuming logo URL comes from the server
            } catch (error) {
                console.error("Failed to fetch navbar data:", error);
            }
        }
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

    const handleLogoChange = async (event) => {
        const file = event.target.files[0];
        if (file) {
            try {
                const imageUrl = await updateNavbarItem('logo', { image: file });
                setLogo(imageUrl);
            } catch (error) {
                console.error("Failed to update logo:", error);
            }
        }
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
                        <ListItem key={link.id} ml="20px">
                            {editMode ? (
                                <>
                                    <Input
                                        value={link.title}
                                        onChange={(e) => handleChangeLinkTitle(link.id, e.target.value)}
                                        size="sm"
                                        autoFocus
                                    />
                                    <IconButton  onClick={toggleEditMode} size="xs" ml="2" color="white" variant="ghost" aria-label="Save" />
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
