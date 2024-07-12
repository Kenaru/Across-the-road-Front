import React, { useState, useEffect } from 'react';
import { Box, Flex, Image, Input, Textarea, IconButton, Switch, Stack, Text, useToast } from '@chakra-ui/react';
import { FaPlus, FaUpload, FaTrash, FaCheck, FaTimes, FaEdit } from 'react-icons/fa';

const About = ({ initialData, setInitialData }) => {
    const defaultSection = {
        id: Math.random().toString(36).substr(2, 9),
        title: "Default Title",
        content: "Default content here...",
        imageUrl: ''
    };

    const [sections, setSections] = useState(initialData.length > 0 ? initialData : [defaultSection]);
    const [isEditable, setIsEditable] = useState(false);
    const [editIndex, setEditIndex] = useState(-1);
    const [currentSection, setCurrentSection] = useState({});
    const toast = useToast();

    useEffect(() => {
        if (initialData.length > 0) {
            setSections(initialData);
        }
    }, [initialData]);

    const handleAddSection = () => {
        const newSection = {
            id: Math.random().toString(36).substr(2, 9),
            title: "New Title",
            content: "New content here...",
            imageUrl: ''
        };
        const updatedSections = [...sections, newSection];
        setSections(updatedSections);
        setInitialData(updatedSections);
        toast({
            title: 'Section added',
            description: 'A new section has been added.',
            status: 'success',
            duration: 3000,
            isClosable: true,
        });
    };

    const handleEditSection = (id, field, value) => {
        setCurrentSection(prev => ({ ...prev, [field]: value }));
    };

    const handleImageChange = (id, event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                handleEditSection(id, 'imageUrl', reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleEditClick = (id) => {
        const index = sections.findIndex(section => section.id === id);
        setEditIndex(index);
        setCurrentSection({ ...sections[index] });
    };

    const handleSaveClick = (id) => {
        const updatedSections = sections.map((section, idx) => idx === editIndex ? { ...section, ...currentSection } : section);
        setSections(updatedSections);
        setInitialData(updatedSections);
        setEditIndex(-1);
        setCurrentSection({});
        toast({
            title: 'Section updated',
            description: 'The section has been updated successfully.',
            status: 'success',
            duration: 3000,
            isClosable: true,
        });
    };

    const handleCancelClick = (id) => {
        setEditIndex(-1);
        setCurrentSection({});
    };

    const handleDeleteSection = (id) => {
        const updatedSections = sections.filter(section => section.id !== id);
        setSections(updatedSections);
        setInitialData(updatedSections);
        toast({
            title: 'Section deleted',
            description: 'The section has been deleted.',
            status: 'success',
            duration: 3000,
            isClosable: true,
        });
    };

    return (
        <Flex direction="column" align="center" justify="center" minHeight="100vh" color="white" width="100%" p="5rem">
            <Stack direction="row" justifyContent="center" alignItems="center" mb={4}>
                <Text color="white" fontSize="lg" mr={2}>Mode écriture:</Text>
                <Switch isChecked={isEditable} onChange={() => setIsEditable(!isEditable)} />
            </Stack>
            <Flex wrap="wrap" justify="center" gap={4}>
                {sections.map((section, index) => (
                    <Flex key={section.id} direction="row" align="center" w="full" p="3" minHeight="300px">
                        {section.imageUrl ? (
                            <Box flex="1" height="800px" display="flex" justifyContent="center" alignItems="center">
                                <Image src={section.imageUrl} alt="About Section" objectFit="contain" height="100%" borderRadius="md" />
                            </Box>
                        ) : (
                            isEditable && (
                                <Box
                                    flex="1"
                                    height="300px"
                                    border="2px dashed gray"
                                    borderRadius="md"
                                    display="flex"
                                    justifyContent="center"
                                    alignItems="center"
                                    textAlign="center"
                                    color="gray.500"
                                    m="4"
                                >
                                    Emplacement Image
                                </Box>
                            )
                        )}
                        <Box flex="1" pl="4">
                            {isEditable && editIndex === index ? (
                                <>
                                    <Input
                                        variant="flushed"
                                        placeholder="Title"
                                        value={currentSection.title || ''}
                                        onChange={(e) => handleEditSection(section.id, 'title', e.target.value)}
                                        textAlign="center"
                                        color="white"
                                    />
                                    <Textarea
                                        variant="flushed"
                                        placeholder="Content"
                                        value={currentSection.content || ''}
                                        onChange={(e) => handleEditSection(section.id, 'content', e.target.value)}
                                        textAlign="center"
                                        color="white"
                                    />
                                    <Flex justify="center" mt={2}>
                                        <IconButton
                                            icon={<FaCheck />}
                                            onClick={() => handleSaveClick(section.id)}
                                            size="sm"
                                            aria-label="Save"
                                            colorScheme="green"
                                            mr={2}
                                        />
                                        <IconButton
                                            icon={<FaTimes />}
                                            onClick={() => handleCancelClick(section.id)}
                                            size="sm"
                                            aria-label="Cancel"
                                            colorScheme="red"
                                        />
                                    </Flex>
                                </>
                            ) : (
                                <>
                                    <Text fontSize="xl" fontWeight="bold" textAlign="center">{section.title}</Text>
                                    <Text fontSize="md" textAlign="center" my="2">{section.content}</Text>
                                    {isEditable && (
                                        <Flex justify="center" mt={2}>
                                            <IconButton
                                                icon={<FaEdit />}
                                                onClick={() => handleEditClick(section.id)}
                                                size="sm"
                                                aria-label="Edit"
                                                colorScheme="blue"
                                                mr={2}
                                            />
                                            <IconButton
                                                icon={<FaTrash />}
                                                onClick={() => handleDeleteSection(section.id)}
                                                size="sm"
                                                aria-label="Delete"
                                                colorScheme="red"
                                            />
                                        </Flex>
                                    )}
                                </>
                            )}
                        </Box>
                        {isEditable && editIndex === index && (
                            <Flex align="center">
                                <IconButton
                                    color="white"
                                    icon={<FaUpload />}
                                    variant="ghost"
                                    onClick={() => document.getElementById(`file-input-${section.id}`).click()}
                                    size="sm"
                                    ml="2"
                                    aria-label="Upload image"
                                />
                                <input
                                    id={`file-input-${section.id}`}
                                    type="file"
                                    hidden
                                    onChange={(e) => handleImageChange(section.id, e)}
                                />
                            </Flex>
                        )}
                    </Flex>
                ))}
                {isEditable && (
                    <Flex
                        direction="column"
                        align="center"
                        justify="center"
                        w="300px"
                        h="300px"
                        p="3"
                        m="2"
                        border="2px dashed gray"
                        borderRadius="10px"
                        cursor="pointer"
                        onClick={handleAddSection}
                    >
                        <FaPlus size={32} color="gray" />
                        <Text mt={2} color="gray">Ajouter une section</Text>
                    </Flex>
                )}
            </Flex>
        </Flex>
    );
};

export default About;
