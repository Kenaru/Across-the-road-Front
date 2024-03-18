import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Heading, Text, Flex, Image } from '@chakra-ui/react'; // Import Image from Chakra UI
import { ArrowForwardIcon } from '@chakra-ui/icons';
import logo from '../assets/logo_b.png'; // Import your website logo

const CreateCMS = ({ toggleCMS }) => {
    return (
        <Flex className="create-page-container" padding="10rem"
            textAlign="center" 
            margin="5rem" flexDirection="column" alignItems="center" justifyContent="center" >
            <Image src={logo} alt="Website Logo" width="200px" mb="4" /> {/* Add your website logo */}
            <Heading color="white" fontSize="3xl" mb="4">Créez votre site web</Heading>
            <Text color="white" fontSize="xl" mb="8">Commencez en cliquant sur le bouton ci-dessous !</Text>
            <Link to="/CMSItem">
                <Button
                    rightIcon={<ArrowForwardIcon />}
                    colorScheme="red"
                    variant="outline"
                    size="lg"
                    width="500px"
                    mb="4"
                    onClick={toggleCMS}
                >
                    Créer votre site web
                </Button>
            </Link>
            <Link to="/CMSAdmin">
                <Button
                    rightIcon={<ArrowForwardIcon />}
                    colorScheme="green"
                    variant="outline"
                    size="lg"
                    width="500px"
                >
                    View Admin dashboards
                </Button>
            </Link>
        </Flex>
    );
}

export default CreateCMS;
