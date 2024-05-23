import React, { useState } from 'react';
import { Box, Flex, Image, Input, Textarea, IconButton, Switch, Stack, Text, useToast } from '@chakra-ui/react';
import { FaPlus, FaUpload, FaTrash } from 'react-icons/fa';

const About = () => {
    const [sections, setSections] = useState([
        {
            id: 'default',
            title: 'Titre par défaut',
            content: 'Contenu par défaut...',
            imageUrl: ''
        }
    ]);
    const [isEditable, setIsEditable] = useState(false);
    const toast = useToast(); // Chakra UI toast for showing messages

    const handleAddSection = () => {
        const newSection = {
            id: Math.random().toString(36).substr(2, 9), // Generate a random ID
            title: "Nouveau Titre",
            content: "Nouveau contenu ici...",
            imageUrl: ''
        };
        setSections(prevSections => [...prevSections, newSection]);
        toast({
            title: 'Section ajoutée',
            description: 'Une nouvelle section a été ajoutée.',
            status: 'success',
            duration: 3000,
            isClosable: true,
        });
    };

    const handleEditSection = (id, field, value) => {
        const updatedSections = sections.map(section => {
            if (section.id === id) {
                return { ...section, [field]: value };
            }
            return section;
        });
        setSections(updatedSections);
    };

    const handleDeleteSection = (id) => {
        setSections(sections.filter(section => section.id !== id));
        toast({
            title: 'Section supprimée',
            description: 'La section a été supprimée.',
            status: 'success',
            duration: 3000,
            isClosable: true,
        });
    };

    const handleImageChange = (event, id) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const imageUrl = reader.result;
                handleEditSection(id, 'imageUrl', imageUrl);
                toast({
                    title: 'Image téléchargée',
                    description: "L'image a été téléchargée avec succès.",
                    status: 'success',
                    duration: 3000,
                    isClosable: true,
                });
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <Flex direction="column" align="center" justify="center" minHeight="100vh" color="white" width="100%">
            <Stack direction="row" justifyContent="center" alignItems="center" mb={4}>
                <Text color="white" fontSize="lg" mr={2}>Edit Mode:</Text>
                <Switch isChecked={isEditable} onChange={() => setIsEditable(!isEditable)} />
            </Stack>
            {sections.map((section) => (
                <Flex color="white" key={section.id} direction="row" align="center" w="full" p="3" minHeight="200px">
                    {section.imageUrl && (
                        <Image src={section.imageUrl} alt="About Section" boxSize="50%" objectFit="cover" borderRadius="md" />
                    )}
                    <Box flex="1" pl="4">
                        {isEditable ? (
                            <>
                                <Input
                                    variant="flushed"
                                    placeholder="Title"
                                    value={section.title}
                                    onChange={(e) => handleEditSection(section.id, 'title', e.target.value)}
                                    textAlign="center"
                                    color="white"
                                />
                                <Textarea
                                    variant="flushed"
                                    placeholder="Content"
                                    value={section.content}
                                    onChange={(e) => handleEditSection(section.id, 'content', e.target.value)}
                                    textAlign="center"
                                    color="white"
                                />
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
                                onChange={(e) => handleImageChange(e, section.id)}
                            />
                            <IconButton
                                icon={<FaTrash />}
                                variant="ghost"
                                color="white"
                                onClick={() => handleDeleteSection(section.id)}
                                size="sm"
                                ml="2"
                                aria-label="Delete section"
                            />
                        </Flex>
                    )}
                </Flex>
            ))}
            {isEditable && (
                <IconButton
                    icon={<FaPlus />}
                    onClick={handleAddSection}
                    colorScheme="blue"
                    aria-label="Add section"
                    size="lg"
                    mt="4"
                />
            )}
        </Flex>
    );
};

export default About;
