import React, { useState } from 'react';
import { Login_user } from '../../api/ApiUser';
import { setAuthToken } from '../../api/Authcontext';
import logo from '../../assets/logo_b.png';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import {
  Button,
  Flex,
  FormControl,
  Input,
  VStack,
  Text,
  Image,
  extendTheme,
  ChakraProvider,
  CircularProgress
} from '@chakra-ui/react';

const theme = extendTheme({
  styles: {
    global: {
      body: {
        bgGradient: "linear(to-l, #010132, #723c8d)",
        color: "white",
        fontFamily: "Arial, sans-serif",
      },
    },
  },
});

function Login() {
  const [formData, setFormData] = useState({ mail: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setError('');
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = await Login_user(formData);
      setAuthToken(data.token);
      navigate('/');
    } catch (error) {
      setError(error.message);
      setLoading(false);  
    }
  };

  return (
    <ChakraProvider theme={theme}>
      <Flex minHeight="100vh" align="center" justify="center">
        <VStack spacing={4} bg="whiteAlpha.200" p={8} borderRadius="20px" boxShadow="0 4px 8px rgba(255, 255, 255, 0.3)" width="100%" maxW="400px">
          <Image src={logo} alt="Logo" boxSize="150px" />
          <Text fontSize="2xl">Login</Text>
          {error && <Text color="red.500">{error}</Text>}
          {loading && <CircularProgress isIndeterminate color="red.300" />}
          <form onSubmit={handleLogin} style={{ width: '100%' }}>
            <VStack spacing={4}>
              <FormControl isRequired>
                <Input color="Black" name="mail" placeholder="Email" type="email" value={formData.mail} onChange={handleChange} autoComplete="on" bg="white" />
              </FormControl>
              <FormControl isRequired>
                <Input color="Black" name="password" placeholder="Password" type="password" value={formData.password} onChange={handleChange} autoComplete="on" bg="white" />
              </FormControl>
              <Button type="submit" colorScheme="purple" width="full" isLoading={loading} loadingText="Logging in">
                Login
              </Button>
            </VStack>
          </form>
          <RouterLink to="/register">
            <Text mt={4} color="red" >Create an account</Text>
          </RouterLink>
          <RouterLink to="/Resetpassword">
            <Text mt={2} color="white" >Reset your password</Text>
          </RouterLink>
        </VStack>
      </Flex>
    </ChakraProvider>
  );
}

export default Login;
