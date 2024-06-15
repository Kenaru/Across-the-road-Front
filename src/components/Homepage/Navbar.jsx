import React, { useState, useEffect } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { Flex, Button, Image, List, ListItem, Text, Box } from '@chakra-ui/react';
import logo from '../../assets/logo_b.png';
import defaultLogo from '../../assets/user.png';

const navLinks = [
  {
    id: "/",
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
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('userToken');
    setIsAuthenticated(!!token);

    const storedUserName = localStorage.getItem('userName');
    setUserName(storedUserName || 'User');
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('userToken');
    localStorage.removeItem('userName');
    setIsAuthenticated(false);
    navigate('/login');
  };

  return (
      <Flex
          as="nav"
          align="center"
          justify="space-between"
          wrap="wrap"
          padding="1.5rem"
          bgGradient="linear(to-r, #010132, #6f13ad)"
          color="white"
          position="fixed"
          top={0}
          left={0}
          right={0}
          zIndex={999}
      >
        {/* Website logo on the left */}
        <Image src={logo} alt="Website Logo" htmlWidth="60px" htmlHeight="50px" cursor="pointer" onClick={() => navigate('/')} />

        {/* Centered navigation links */}
        <List display="flex" flexDirection="row" flexGrow={1} justifyContent="center">
          {navLinks.map((link) => (
              <ListItem key={link.id} px={4}>
                <RouterLink to={link.id === "/" ? "/" : `/${link.id}`}>
                  <Text fontSize="1rem" _hover={{ textDecoration: 'underline' }}>
                    {link.title}
                  </Text>
                </RouterLink>
              </ListItem>
          ))}
        </List>

        {/* User or default logo and logout/login on the right */}
        <Flex align="center" direction="column">
          <Image src={defaultLogo} alt="User Logo" htmlWidth="30px" htmlHeight="30px" cursor="pointer" />
          {isAuthenticated ? (
              <Box textAlign="center" mt={2}>
                <Text fontSize="1rem">{userName}</Text>
                <Button onClick={handleLogout} variant="link" mt={2}>
                  <Text _hover={{ textDecoration: 'underline' }}>Logout</Text>
                </Button>
              </Box>
          ) : (
              <RouterLink to="/login">
                <Text fontSize="1rem" _hover={{ textDecoration: 'underline' }}>
                  Login
                </Text>
              </RouterLink>
          )}
        </Flex>
      </Flex>
  );
};

export default Navbar;
