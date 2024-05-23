import React, { useState, useEffect } from 'react';
import { Box, Flex, Image, Input, Textarea, IconButton, Switch, Stack, Text, useToast } from '@chakra-ui/react';
import { FaPlus, FaUpload, FaTrash } from 'react-icons/fa';
import { getAllSections, addSection, deleteSection, updateSection, handleImageUpload } from '../../../api/AboutAPI';

const About = () => {
    const [sections, setSections] = useState([]);
    const [isEditable, setIsEditable] = useState(false);
    const toast = useToast(); // Chakra UI toast for showing messages

    useEffect(() => {
        const fetchSections = async () => {
            try {
                const fetchedSections = await getAllSections();
                setSections(fetchedSections);
            } catch (error) {
                toast({
                    title: 'Erreur',
                    description: error.message,
                    status: 'error',
                    duration: 5000,
                    isClosable: true,
                });
            }
        };
        fetchSections();
    }, []);

    const handleAddSection = async () => {
        const newSection = {
            title: "Nouveau Titre",
            content: "Nouveau contenu ici...",
            imageUrl: ''
        };
        try {
            const addedSection = await addSection(newSection);
            setSections([...sections, { ...newSection, id: addedSection.id }]);
        } catch (error) {
            toast({
                title: 'Erreur',
                description: error.message,
                status: 'error',
                duration: 5000,
                isClosable: true,
            });
        }
    };

    const handleEditSection = async (id, field, value) => {
        const updatedSection = sections.map(section => {
            if (section.id === id) {
                return { ...section, [field]: value };
            }
            return section;
        });
        try {
            await updateSection(id, { ...updatedSection.find(section => section.id === id) });
            setSections(updatedSection);
        } catch (error) {
            toast({
                title: 'Erreur',
                description: error.message,
                status: 'error',
                duration: 5000,
                isClosable: true,
            });
        }
    };

    const handleDeleteSection = async (id) => {
        try {
            await deleteSection(id);
            setSections(sections.filter(section => section.id !== id));
        } catch (error) {
            toast({
                title: 'Erreur',
                description: error.message,
                status: 'error',
                duration: 5000,
                isClosable: true,
            });
        }
    };

    const handleImageChange = async (event, index) => {
        const file = event.target.files[0];
        if (file) {
            try {
                const imageUrl = await handleImageUpload(file);
                await handleEditSection(index, 'imageUrl', imageUrl);
            } catch (error) {
                toast({
                    title: 'Erreur',
                    description: error.message,
                    status: 'error',
                    duration: 5000,
                    isClosable: true,
                });
            }
        }
    };


    return (
        <Flex direction="column" align="center" justify="center" minHeight="100vh" color="white" width="100%">
            <Stack direction="row" justifyContent="center" alignItems="center" mb={4}>
                <Text color="white" fontSize="lg" mr={2}>Edit Mode:</Text>
                <Switch isChecked={isEditable} onChange={() => setIsEditable(!isEditable)} />
            </Stack>
            {sections.map((section, index) => (
                <Flex color="white" key={section.id} direction="row" align="center" w="full" p="3" minHeight="200px">
                    {section.imageUrl && (
                        <Image src={section.imageUrl} alt="About Section" boxSize="50%" objectFit="cover" borderRadius="md" />
                    )}
                    <Box flex="1" pl="4">
                        {isEditable ? (
                            <>
                                <Input variant="flushed" placeholder="Title" value={section.title} onChange={(e) => handleEditSection(index, 'title', e.target.value)} textAlign="center" />
                                <Textarea variant="flushed" placeholder="Content" value={section.content} onChange={(e) => handleEditSection(index, 'content', e.target.value)} textAlign="center" />
                            </>
                        ) : (
                            <>
                                <Text fontSize="xl" fontWeight="bold" textAlign="center">{section.title}</Text>
                                <Text fontSize="md" textAlign="center" my="2">{section.content}</Text>
                            </>
                        )}
                    </Box>
                    {isEditable && (
                        <Flex align="center">
                            <IconButton color="white" icon={<FaUpload />} variant="ghost" onClick={() => document.getElementById(`file-input-${index}`).click()} size="sm" ml="2" aria-label="Upload image" />
                            <input id={`file-input-${index}`} type="file" hidden onChange={(e) => handleImageChange(e, index)} />
                            <IconButton icon={<FaTrash />} variant="ghost" color="white" onClick={() => handleDeleteSection(index)} size="sm" ml="2" aria-label="Delete section" />
                        </Flex>
                    )}
                </Flex>
            ))}
            {isEditable && (
                <IconButton icon={<FaPlus />} onClick={handleAddSection} colorScheme="blue" aria-label="Add section" size="lg" mt="4" />
            )}
        </Flex>
    );
};

export default About;
