import React, { useState } from 'react';
import { Flex, Box, Text, Image, IconButton, Input, Textarea, Switch, Stack, Heading } from '@chakra-ui/react';
import { FaEdit, FaTrash, FaCheck, FaTimes, FaPlus, FaUpload } from 'react-icons/fa';

const FeedbackSection = () => {
    const [feedbackData, setFeedbackData] = useState([
        {
            id: "feedback-1",
            content: "Un outil nécessaire pour la vivacité des associations.",
            name: "ex:Jeane Dufour",
            role: "ex:Fondateur association handifac",
            img: 'https://via.placeholder.com/150'
        },
        {
            id: "feedback-2",
            content: "Produit fiable et visuellement à la hauteur.",
            name: "ex:Jean Brillet",
            role: "ex:Adhérent SSO",
            img: 'https://via.placeholder.com/150'
        }
    ]);
    const [editIndex, setEditIndex] = useState(-1);  // -1 when not editing
    const [currentFeedback, setCurrentFeedback] = useState({});
    const [isEditable, setIsEditable] = useState(false);

    const handleEditFeedback = (index) => {
        setEditIndex(index);
        setCurrentFeedback({ ...feedbackData[index] });
    };

    const handleSaveFeedback = () => {
        const updatedFeedback = feedbackData.map((item, idx) => idx === editIndex ? { ...item, ...currentFeedback } : item);
        setFeedbackData(updatedFeedback);
        setEditIndex(-1);
        setCurrentFeedback({});
    };

    const handleAddFeedback = () => {
        const newFeedback = {
            id: `feedback-${feedbackData.length + 1}`,
            content: "New feedback content",
            name: "New Contributor",
            role: "New Title",
            img: 'https://via.placeholder.com/150'
        };
        setFeedbackData([...feedbackData, newFeedback]);
    };

    const handleInputChange = (field, value) => {
        setCurrentFeedback(prev => ({ ...prev, [field]: value }));
    };

    const handleImageChange = (event, index) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                handleInputChange('img', reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleDeleteFeedback = (id) => {
        setFeedbackData(feedbackData.filter(item => item.id !== id));
    };

    return (
        <Flex direction="column" align="center" justify="center" minHeight="100vh" color="white" width="100%">
            <Heading as="h2" size="xl" mt="5rem" color="white">Avis sur l'Association</Heading>
            <Stack direction="row" justifyContent="center" alignItems="center" mb={4}>
                <Text fontSize="lg" mr={2}>Edit Mode:</Text>
                <Switch isChecked={isEditable} onChange={() => setIsEditable(!isEditable)} />
            </Stack>
            {feedbackData.map((item, index) => (
                <Box
                    key={item.id}
                    textAlign="center"
                    margin="2rem"
                    w="300px"
                    maxW="100%"
                    h="auto"
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
                    <Flex direction="column" justify="space-between" p="2rem" align="center">
                        <Image
                            src={item.img}
                            alt={`${item.name} photo`}
                            boxSize="100px"
                            borderRadius="full"
                            objectFit="cover"
                            m="auto"
                        />
                        <Text fontSize="lg" fontWeight="bold">{item.name}</Text>
                        <Text fontSize="sm">{item.role}</Text>
                        <Text fontSize="md">{item.content}</Text>
                        {isEditable && (
                            editIndex === index ? (
                                <>
                                    <Input
                                        value={currentFeedback.name || ''}
                                        onChange={(e) => handleInputChange('name', e.target.value)}
                                        placeholder="Name"
                                    />
                                    <Input
                                        value={currentFeedback.role || ''}
                                        onChange={(e) => handleInputChange('role', e.target.value)}
                                        placeholder="Role"
                                    />
                                    <Textarea
                                        value={currentFeedback.content || ''}
                                        onChange={(e) => handleInputChange('content', e.target.value)}
                                        placeholder="Content"
                                    />
                                    <Flex>
                                        <IconButton
                                            icon={<FaCheck />}
                                            onClick={handleSaveFeedback}
                                            size="sm"
                                            aria-label="Save feedback"
                                            colorScheme="green"
                                            mr="0.5rem"
                                        />
                                        <IconButton
                                            icon={<FaTimes />}
                                            onClick={() => { setEditIndex(-1); setCurrentFeedback({}); }}
                                            size="sm"
                                            aria-label="Cancel editing"
                                            colorScheme="red"
                                        />
                                        <IconButton
                                            icon={<FaUpload />}
                                            onClick={() => document.getElementById(`file-input-${index}`).click()}
                                            size="sm"
                                            aria-label="Upload image"
                                            colorScheme="teal"
                                            mr="0.5rem"
                                        />
                                        <input
                                            id={`file-input-${index}`}
                                            type="file"
                                            hidden
                                            onChange={(e) => handleImageChange(e, index)}
                                        />
                                    </Flex>
                                </>
                            ) : (
                                <>
                                    <IconButton
                                        icon={<FaEdit />}
                                        onClick={() => handleEditFeedback(index)}
                                        size="sm"
                                        aria-label="Edit feedback"
                                        colorScheme="blue"
                                        mr="0.5rem"
                                    />
                                    <IconButton
                                        icon={<FaTrash />}
                                        onClick={() => handleDeleteFeedback(item.id)}
                                        size="sm"
                                        aria-label="Delete feedback"
                                        colorScheme="red"
                                    />
                                </>
                            )
                        )}
                    </Flex>
                </Box>
            ))}
            {isEditable && (
                <IconButton
                    icon={<FaPlus />}
                    onClick={handleAddFeedback}
                    colorScheme="blue"
                    aria-label="Add new feedback"
                    size="lg"
                    mt="4"
                />
            )}
        </Flex>
    );
};

export default FeedbackSection;
