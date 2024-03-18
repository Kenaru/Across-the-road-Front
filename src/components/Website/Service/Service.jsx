import React from 'react';
import { Box, Flex, Text, Image } from '@chakra-ui/react';
import { shield, star } from "../assets";

const services = [
    {
        id: "services-1",
        icon: star,
        title: "Créer votre site ",
        content:
            "Créer votre site simplement, Accédez à un outil sécurisé, hébergé en France et accessible.",
    },
    {
        id: "services-2",
        icon: shield,
        title: "Une visibilité en ligne accessible à tous",
        content:
            "Glissez, déposez et créez vous-même simplement votre site internet.",
    },
    {
        id: "services-3",
        icon: shield,
        title: "Bien plus qu’une solution pour créer un site web",
        content:
            "Nous avons la volonté de proposer une solution durable de création de site. ",
    },
];

const Service = () => (
    <Flex className="services-section" border="1px solid #f8f6f6" padding="10rem"
            textAlign="center" // Center the content horizontally
            margin="5rem"wrap="wrap" justifyContent="center" gap="1rem" >
        {services.map((service) => (
            <Box key={service.id} className="service"  w="30%" h="250px" border="1px solid #ddd" borderRadius="10px" background="black" display="flex" flexDirection="column" alignItems="center" justifyContent="space-between" _hover={{ boxShadow: '0 8px 16px rgb(255, 255, 255)' }}>
                <Image src={service.icon} alt={service.title} w="10%" h="auto" marginTop="20px" />
                <Text className="service-title" fontSize="1em" color="#ffffff">{service.title}</Text>
                <Text className="service-content"  marginBottom="20px" textAlign="center"  fontSize="1em" color="#ffffff" overflowY="auto">{service.content}</Text>
            </Box>
        ))}
    </Flex>
);

export default Service;
