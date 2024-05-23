import React, { useState } from 'react';
import { Register_user } from '../../api/ApiUser';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import {
  Button,
  Flex,
  FormControl,
  Input,
  VStack,
  Text,
  Link,
  Image,
  extendTheme,
  ChakraProvider
} from '@chakra-ui/react';
import logo from '../../assets/logo_b.png';


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

function Register() {
  const [formData, setFormData] = useState({
    lastname: '',
    firstname: '',
    birthday: '',
    mail: '',
    phonenumber: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await Register_user(formData);
      console.log(response);
      navigate('/login');
    } catch (error) {
      setError(error.message || 'Registration failed. Please try again.');
    }
  };

  return (
    <ChakraProvider theme={theme}>
      <Flex minHeight="100vh" align="center" justify="center">
        <VStack spacing={4} bg="whiteAlpha.200" p={8} borderRadius="20px" boxShadow="0 4px 8px rgba(255, 255, 255, 0.3)" width="100%" maxW="400px"  margin="50px">
          <Image src={logo} alt="Logo" boxSize="150px" />
          <Text fontSize="2xl">Register</Text>
          {error && <Text color="red.500">{error}</Text>}
          <form onSubmit={handleRegister} style={{ width: '70%', height: '80%'}}>
            <VStack spacing={4}>
                    <FormControl isRequired>
                      <Input placeholder="Last Name" name="lastname" value={formData.lastname} onChange={handleChange} bg="white" color="gray.800" _placeholder={{ color: 'gray.500' }} 
                      />
                    </FormControl>
                    <FormControl isRequired>
                      <Input placeholder="First Name" name="firstname" value={formData.firstname} onChange={handleChange}bg="white"color="gray.800"_placeholder={{ color: 'gray.500' }}
                      />
                    </FormControl>
                    <FormControl>
                      <Input type="date" placeholder="Birthday" name="birthday" value={formData.birthday} onChange={handleChange}bg="white"color="gray.800"_placeholder={{ color: 'gray.500' }}
                      />
                    </FormControl>
                    <FormControl isRequired>
                      <Input placeholder="Email" type="email" name="mail" value={formData.mail} onChange={handleChange}bg="white"color="gray.800"_placeholder={{ color: 'gray.500' }}
                      />
                    </FormControl>
                    <FormControl>
                      <Input placeholder="Phone Number" name="phonenumber" value={formData.phonenumber} onChange={handleChange}bg="white"color="gray.800"_placeholder={{ color: 'gray.500' }}
                      />
                    </FormControl>
                    <FormControl isRequired>
                      <Input placeholder="Password" type="password" name="password" value={formData.password} onChange={handleChange}bg="white"color="gray.800"
                      />
                    </FormControl>
                    <FormControl isRequired>
                      <Input placeholder="Confirm Password" type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange}bg="white"color="gray.800"
                      />
                    </FormControl>
                    <Button type="submit" colorScheme="purple" width="full">Register</Button>
                  </VStack>

          </form>
          <Flex direction="column" align="center" mt={4}>
            <Link as={RouterLink} to="/login" color="white">Login</Link>
          </Flex>
        </VStack>
      </Flex>
    </ChakraProvider>
  );
}

export default Register;
