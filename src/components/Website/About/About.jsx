import React from 'react';
import { Box, Image, Text } from '@chakra-ui/react';
import aboutImage from '../assets/asso01.jpg';

const About = () => {
    return (
        <Box
            padding="4rem"
            borderBottom="1px solid #f8f6f6"
        >
            <Box
                display="flex"
                flexDirection={{ base: 'column', md: 'row' }}
                alignItems="center"
                justifyContent="center"
                gap="2rem"
                margin="0 auto"
                padding="0 1rem"
            >
                <Box
                    flex="1"
                    boxShadow="0 8px 16px rgb(255, 255, 255)"
                    transition="transform 0.3s, box-shadow 0.3s"
                    _hover={{
                        transform: 'scale(1.05)',
                        boxShadow: '0 8px 16px rgb(255, 255, 255)',
                    }}
                >
                    <Image src={aboutImage} alt="About" maxW="500px" borderRadius="8px" />
                </Box>
                <Box flex="1">
                    <Text fontSize={{ base: '2xl', md: '4xl' }} color="#ffffff" mb="1rem">
                        Simples, intuitives, ludiques.
                    </Text>
                    <Text fontSize="xl" color="#ffffff" lineHeight="1.5">
                        Nous pensons que la création d’un site devrait toujours être simple, agréable et abordable.
                        Notre mission est simple.
                    </Text>
                    <Text fontSize="xl" color="#ffffff" lineHeight="1.5" mt="1rem">
                        Vous donner les moyens de créer et de gérer un site de qualité professionnelle en toute liberté, de façon autonome quelles que soient vos connaissances techniques.
                    </Text>
                </Box>
            </Box>
        </Box>
    );
};

export default About;
