import React, { useState } from 'react';
import {
    Box, Text, Image, Button, Heading, Grid, Input, IconButton, FormControl, FormLabel, useColorModeValue, Switch, Stack
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { AddIcon, DeleteIcon, EditIcon } from "@chakra-ui/icons";

const MotionBox = motion(Box);

const Service = () => {
    const [services, setServices] = useState([
        { id: 1, title: "Création Rapide de Site Web", content: "Lancez un site web pour votre association en quelques clics.", img: 'https://via.placeholder.com/400' },
        { id: 2, title: "Amplifiez Vos Événements", content: "Faites connaître vos événements à travers notre réseau.", img: 'https://via.placeholder.com/400' }
    ]);
    const [isEditable, setIsEditable] = useState(false);
    const bgGradient = useColorModeValue('linear(to-b, gray.100, gray.300)', 'linear(to-b, gray.700, gray.900)');

    const handleInputChange = (index, field, value) => {
        const newServices = [...services];
        newServices[index][field] = value;
        setServices(newServices);
    };

    const handleAddService = () => {
        const newService = { id: services.length + 1, title: "", content: "", img: "https://via.placeholder.com/400" };
        setServices([...services, newService]);
    };

    const handleDeleteService = (id) => {
        setServices(services.filter(service => service.id !== id));
    };

    return (
        <Box direction="column" mb="5rem" mt="200px" textAlign="center" maxW="1200px" mx="auto">
            <Heading as="h2" size="xl" mb="4rem" color="red.600">
                Notre Identité
            </Heading>
            <Stack direction="column" justifyContent="center" alignItems="center" mb={4}>
                <Text fontSize="lg" mr={2}>Modifiable View:</Text>
                <Switch isChecked={isEditable} onChange={() => setIsEditable(!isEditable)} />
            </Stack>
            <Grid direction="column"  templateColumns="repeat(auto-fit, minmax(300px, 1fr))" gap={6} justifyContent="center">
                {services.map((service, index) => (
                    <MotionBox
                        key={service.id}
                        initial="hidden"
                        animate="visible"
                        variants={{ hidden: { opacity: 0, y: 50 }, visible: { opacity: 1, y: 0 } }}
                        transition={{ delay: index * 0.2, duration: 0.5 }}
                        borderWidth="1px"
                        borderRadius="lg"
                        overflow="hidden"
                        boxShadow="xl"
                        p={4}
                        bgGradient={bgGradient}
                        height="auto"
                        align="center"
                    >
                        {isEditable ? (
                            <>
                                <FormControl mb={2}>
                                    <FormLabel>Ajouter une image</FormLabel>
                                    <Input type="file" accept="image/*" onChange={e => handleInputChange(index, 'img', URL.createObjectURL(e.target.files[0]))} />
                                </FormControl>
                                <Input mb={2} value={service.title} onChange={e => handleInputChange(index, 'title', e.target.value)} placeholder="Service Title" />
                                <Input mb={2} value={service.content} onChange={e => handleInputChange(index, 'content', e.target.value)} placeholder="Service Content" />
                                <IconButton icon={<DeleteIcon />} onClick={() => handleDeleteService(service.id)} size="sm" aria-label="Remove service" variant="ghost" colorScheme="red" />
                            </>
                        ) : (
                            <>
                                <Image src={service.img} alt="Service Image" objectFit="cover" height="250px" width="full"/>
                                <Text mb={2} fontWeight="bold">{service.title}</Text>
                                <Text mb={2}>{service.content}</Text>
                            </>
                        )}
                    </MotionBox>
                ))}
            </Grid>
            {isEditable && (
                <Button leftIcon={<AddIcon />} colorScheme="green" onClick={handleAddService} mt={4}>
                    Ajouter un service
                </Button>
            )}
        </Box>
    );
};

export default Service;
