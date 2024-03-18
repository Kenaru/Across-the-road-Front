import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Flex, Button, Image, List, ListItem, Text } from '@chakra-ui/react';
import logo from '../../assets/logo_b.png'; // Import the logo image

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
        <Flex width="100%">
            <Box className="navbar" bgGradient="linear(to-r, #010132, #6f13ad)" borderRadius="20px" boxShadow="0 8px 16px rgba(255, 255, 255, 0.5)" padding="20px" marginBottom="40px" flexGrow={1}>
                <Flex alignItems="center" justifyContent="space-between" width="100%"> {/* Adjusted width to 100% */}
                    <Box className="nav-logo">
                        <Image src={logo} alt="Logo" htmlWidth="50px" htmlHeight="50px" cursor="pointer" />
                    </Box>
                    <List display="flex" listStyleType="none" margin="0" padding="0">
                        {navLinks.map((link) => (
                            <ListItem key={link.id} marginLeft="20px">
                                <Link to={`/${link.id}`}>
                                    <Text color="white" fontSize="1rem" _hover={{ textDecoration: 'underline' }}>{link.title}</Text>
                                </Link>
                            </ListItem>
                            
                        ))}
                        <ListItem>
                            {isAuthenticated ? (
                                <Button onClick={handleLogout} backgroundColor="#6f13ad" color="white" borderRadius="5px" padding="5px 10px" cursor="pointer" transition="background-color 0.3s" _hover={{ backgroundColor: '#4a087c' }}>Logout</Button>
                            ) : (
                                <Link to="/login">
                                    <Text color="white" fontSize="1rem" _hover={{ textDecoration: 'underline' }}>Login</Text>
                                </Link>
                            )}
                        </ListItem>
                        
                    </List>
                </Flex>
            </Box>
        </Flex>
    );
};

export default Navbar;
