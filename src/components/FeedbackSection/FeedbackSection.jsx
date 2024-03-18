import React from 'react';
import { Flex, Box, Text, Image } from '@chakra-ui/react';

const feedbackData = [
    {
        id: "feedback-1",
        content: "Un outils accessible et necessaire pour la vivacité des associations.",
        name: "Jeane Dufour",
        title: "Fondateur association",
        img: require('../../assets/people01.png') // Add .default for image import
    },
    {
        id: "feedback-2",
        content: "Produit fiable et visuellement à la hauteur.",
        name: "Jean Brillet",
        title: "Adherent SSO",
        img: require('../../assets/people02.png')// Add .default for image import
    },
    {
        id: "feedback-3",
        content: "Remet une visibillité sur la vie des associations",
        name: "Carl Creval",
        title: "Developeur",
        img: require('../../assets/people03.png')// Add .default for image import
    },
];

const FeedbackItem = ({ content, name, title, img }) => (
    <Box
        textAlign="center" // Center the content horizontally
        margin="5rem" 
        w="250px"
        h="350px"
        border="1px solid #ddd"
        borderRadius="10px"
        overflow="hidden"
        bgGradient="linear(to-b, #010132, #0a000e)"
        boxShadow="0 4px 8px rgba(255, 255, 255, 0.5)"
        transition="transform 0.3s ease, box-shadow 0.3s ease"
        _hover={{
            transform: 'scale(1.05)',
            boxShadow: '0 8px 16px rgba(255, 255, 255, 0.5)',
        }}
    >
        <Flex direction="column" justify="space-between" h="100%" p="1rem">
            <Image alignItems="center" src={img} alt={name} w="80px" h="80px" borderRadius="full" objectFit="cover" />
            <Text textAlign="center" fontSize="20px" color="azure" mb="1rem">{content}</Text>
            <Text textAlign="center" color="azure">{name} - <span>{title}</span></Text>
        </Flex>
    </Box>
);

const FeedbackSection = () => (
    <Flex justify="center" gap="4rem" pb="5rem" mt="200px">
        {feedbackData.map((item) => (
            <FeedbackItem key={item.id} {...item} />
        ))}
    </Flex>
);

export default FeedbackSection;
