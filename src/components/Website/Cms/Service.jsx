import React, { useState, useEffect } from 'react';
import { Box, Text, Image, Heading, Input, IconButton, FormControl, Switch, Stack, Flex } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { AddIcon, DeleteIcon, CheckIcon } from "@chakra-ui/icons";
import { FaUpload } from 'react-icons/fa';

const MotionBox = motion(Box);

const Service = ({ initialData, setInitialData }) => {
    const defaultService = {
        id: 1,
        title: "Default Service",
        content: "This is the default service content.",
        img: "https://via.placeholder.com/400"
    };

    const [services, setServices] = useState(initialData.length > 0 ? initialData : [defaultService]);
    const [isEditable, setIsEditable] = useState(false);

    useEffect(() => {
        if (initialData.length > 0) {
            setServices(initialData);
        }
    }, [initialData]);

    const handleInputChange = (index, field, value) => {
        const newServices = [...services];
        newServices[index][field] = value;
        setServices(newServices);
        setInitialData(newServices);
    };

    const handleAddService = () => {
        const newService = { id: services.length + 1, title: "", content: "", img: "" };
        setServices([...services, newService]);
        setInitialData([...services, newService]);
    };

    const handleDeleteService = (id) => {
        const updatedServices = services.filter(service => service.id !== id);
        setServices(updatedServices);
        setInitialData(updatedServices);
    };

    const handleImageChange = (event, index) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                handleInputChange(index, 'img', reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <Box mb="5rem" mt="200px" textAlign="center" maxW="1200px" mx="auto">
            <Heading as="h2" size="xl" mb="4rem" color="red.600">
                Notre Identité
            </Heading>
            <Stack direction="row" justifyContent="center" alignItems="center" mb={4}>
                <Text fontSize="lg" color="white" mr={2}>Modifiable View:</Text>
                <Switch isChecked={isEditable} onChange={() => setIsEditable(!isEditable)} />
            </Stack>
            <Flex wrap="wrap" justifyContent="center" alignItems="flex-start" gap={6}>
                {services.map((service, index) => (
                    <MotionBox
                        key={service.id}
                        initial="hidden"
                        animate="visible"
                        variants={{ hidden: { opacity: 0, y: 50 }, visible: { opacity: 1, y: 0 } }}
                        transition={{ delay: index * 0.2, duration: 0.5 }}
                        p={4}
                        height="600px"
                        minW="300px"
                        align="center"
                        color="white"
                        display="flex"
                        flexDirection="column"
                        justifyContent="space-between"
                        bg="transparent"
                        mx={4}
                        boxShadow="lg"
                        borderRadius="md"
                    >
                        {isEditable ? (
                            <>
                                <FormControl mb={2}>
                                    <Input type="file" accept="image/*" id={`file-input-${index}`} onChange={e => handleImageChange(e, index)} style={{ display: 'none' }} />
                                    <IconButton icon={<FaUpload />} onClick={() => document.getElementById(`file-input-${index}`).click()} aria-label="Upload image" colorScheme="teal" mb={2} />
                                </FormControl>
                                {service.img ? (
                                    <Image src={service.img} alt="Service Image" objectFit="cover" height="300px" width="100%" mb={2} />
                                ) : (
                                    <Box height="300px" width="100%" mb={2} display="flex" justifyContent="center" alignItems="center" border="2px dashed gray">
                                        <Text color="gray.500">Image Placeholder</Text>
                                    </Box>
                                )}
                                <Input mb={2} value={service.title} onChange={e => handleInputChange(index, 'title', e.target.value)} placeholder="Service Title" />
                                <Input mb={2} value={service.content} onChange={e => handleInputChange(index, 'content', e.target.value)} placeholder="Service Content" />
                                <Stack direction="row" justify="center" spacing={4}>
                                    <IconButton icon={<CheckIcon />} size="sm" aria-label="Save service" variant="ghost" colorScheme="green" />
                                    <IconButton icon={<DeleteIcon />} onClick={() => handleDeleteService(service.id)} size="sm" aria-label="Remove service" variant="ghost" colorScheme="red" />
                                </Stack>
                            </>
                        ) : (
                            <>
                                {service.img ? (
                                    <Image src={service.img} alt="Service Image" objectFit="cover" height="300px" width="100%" mb={2} />
                                ) : (
                                    <Box height="300px" width="100%" mb={2} display="flex" justifyContent="center" alignItems="center">
                                        {isEditable && <Text color="gray.500">Image Placeholder</Text>}
                                    </Box>
                                )}
                                <Text mb={2} fontWeight="bold" fontSize="2xl">{service.title}</Text>
                                <Text mb={2} fontSize="xl">{service.content}</Text>
                            </>
                        )}
                    </MotionBox>
                ))}
                {isEditable && (
                    <MotionBox
                        initial="hidden"
                        animate="visible"
                        variants={{ hidden: { opacity: 0, y: 50 }, visible: { opacity: 1, y: 0 } }}
                        transition={{ delay: services.length * 0.2, duration: 0.5 }}
                        p={4}
                        height="600px"
                        minW="300px"
                        align="center"
                        color="gray.500"
                        display="flex"
                        flexDirection="column"
                        justifyContent="center"
                        cursor="pointer"
                        onClick={handleAddService}
                        bg="transparent"
                        mx={4}
                        boxShadow="lg"
                        borderRadius="md"
                    >
                        <AddIcon boxSize={10} />
                        <Text mt={4}>Ajouter un service</Text>
                    </MotionBox>
                )}
            </Flex>
        </Box>
    );
};

export default Service;
