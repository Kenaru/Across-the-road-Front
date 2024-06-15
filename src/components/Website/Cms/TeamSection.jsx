import React, { useState, useEffect } from 'react';
import { Flex, Box, Text, Image, IconButton, Input, Switch, Textarea, Heading, useToast } from '@chakra-ui/react';
import { FaPlus, FaUpload, FaTrash, FaSave, FaCheck, FaTimes, FaEdit } from 'react-icons/fa';

const defaultMember = {
    id: `default-member-${Date.now()}`,
    name: "Default Member",
    role: "Default Role",
    img: 'https://via.placeholder.com/150'
};

const defaultTeamInfo = {
    title: "Découvrez Notre Équipe",
    description: "Nous sommes des étudiants de deuxième année à l'ESGI, passionnés de technologie et désireux de contribuer de manière significative à la société..."
};

const TeamMemberCard = ({ member, isEditable, handleEditSection, handleImageChange, handleDeleteMember, isEditing, handleEditClick, handleSaveClick, handleCancelClick }) => {
    return (
        <Flex
            direction="column"
            align="center"
            w="300px"
            p="3"
            m="2"
            bg="#010132"
            color="white"
            borderRadius="lg"
            boxShadow="md"
            _hover={{ boxShadow: "lg", transform: "scale(1.05)" }}
            transition="all 0.2s"
        >
            <Image
                src={member.img || 'https://via.placeholder.com/150'}
                alt={member.name}
                boxSize="150px"
                borderRadius="full"
                objectFit="cover"
                m="auto"
            />
            {isEditable && isEditing ? (
                <>
                    <Input
                        value={member.name || ''}
                        placeholder="Name"
                        onChange={(e) => handleEditSection(member.id, 'name', e.target.value)}
                        mb={2}
                        color="white"
                    />
                    <Input
                        value={member.role || ''}
                        placeholder="Role"
                        onChange={(e) => handleEditSection(member.id, 'role', e.target.value)}
                        mb={2}
                        color="white"
                    />
                    <Flex justifyContent="center" alignItems="center" mt={2}>
                        <IconButton
                            icon={<FaUpload />}
                            onClick={() => document.getElementById(`file-input-${member.id}`).click()}
                            size="sm"
                            aria-label="Upload Image"
                            colorScheme="blue"
                            mr={2}
                        />
                        <input
                            id={`file-input-${member.id}`}
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleImageChange(member.id, e)}
                            hidden
                        />
                        <IconButton
                            icon={<FaCheck />}
                            onClick={() => handleSaveClick(member.id)}
                            size="sm"
                            aria-label="Save"
                            colorScheme="green"
                            mr={2}
                        />
                        <IconButton
                            icon={<FaTimes />}
                            onClick={() => handleCancelClick(member.id)}
                            size="sm"
                            aria-label="Cancel"
                            colorScheme="red"
                            mr={2}
                        />
                    </Flex>
                </>
            ) : (
                <>
                    <Text fontSize="lg" fontWeight="bold" textShadow="1px 1px 2px #ffffff">{member.name}</Text>
                    <Text textShadow="1px 1px 2px #ffffff">{member.role}</Text>
                    {isEditable && (
                        <Flex justifyContent="center" alignItems="center" mt={2}>
                            <IconButton
                                icon={<FaEdit />}
                                onClick={() => handleEditClick(member.id)}
                                size="sm"
                                aria-label="Edit"
                                colorScheme="blue"
                                mr={2}
                            />
                            <IconButton
                                icon={<FaTrash />}
                                onClick={() => handleDeleteMember(member.id)}
                                size="sm"
                                aria-label="Delete"
                                colorScheme="red"
                                mr={2}
                            />
                        </Flex>
                    )}
                </>
            )}
        </Flex>
    );
};

const TeamSection = ({ initialData = { members: [defaultMember], info: defaultTeamInfo }, setInitialData }) => {
    const [teamMembers, setTeamMembers] = useState(initialData.members);
    const [teamInfo, setTeamInfo] = useState(initialData.info);
    const [isEditable, setIsEditable] = useState(false);
    const [editIndex, setEditIndex] = useState(-1);
    const [currentMember, setCurrentMember] = useState({});
    const toast = useToast();

    useEffect(() => {
        if (initialData) {
            setTeamMembers(initialData.members);
            setTeamInfo(initialData.info);
        }
    }, [initialData]);

    const handleAddMember = () => {
        const newMember = {
            id: `member-${Date.now()}`,
            name: "New Member",
            role: "New Role",
            img: 'https://via.placeholder.com/150'
        };
        const updatedMembers = [...teamMembers, newMember];
        setTeamMembers(updatedMembers);
        setInitialData({ info: teamInfo, members: updatedMembers });
    };

    const handleEditSection = (id, field, value) => {
        setCurrentMember(prev => ({ ...prev, [field]: value }));
    };

    const handleImageChange = (id, event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                handleEditSection(id, 'img', reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleEditClick = (id) => {
        const index = teamMembers.findIndex(member => member.id === id);
        setEditIndex(index);
        setCurrentMember({ ...teamMembers[index] });
    };

    const handleSaveClick = (id) => {
        const updatedMembers = teamMembers.map((member, idx) => idx === editIndex ? { ...member, ...currentMember } : member);
        setTeamMembers(updatedMembers);
        setInitialData({ info: teamInfo, members: updatedMembers });
        setEditIndex(-1);
        setCurrentMember({});
        toast({
            title: 'Member updated',
            description: 'The team member has been updated successfully.',
            status: 'success',
            duration: 3000,
            isClosable: true,
        });
    };

    const handleCancelClick = (id) => {
        setEditIndex(-1);
        setCurrentMember({});
    };

    const handleDeleteMember = (id) => {
        const updatedMembers = teamMembers.filter(member => member.id !== id);
        setTeamMembers(updatedMembers);
        setInitialData({ info: teamInfo, members: updatedMembers });
        toast({
            title: 'Member deleted',
            description: 'The team member has been deleted.',
            status: 'success',
            duration: 3000,
            isClosable: true,
        });
    };

    const handleSave = async () => {
        const data = {
            info: teamInfo,
            members: teamMembers
        };

        try {
            const response = await fetch('/api/saveTeamData', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            if (response.ok) {
                toast({
                    title: "Saved",
                    description: "Team data has been saved successfully.",
                    status: "success",
                    duration: 3000,
                    isClosable: true
                });
            } else {
                throw new Error("Failed to save data");
            }
        } catch (error) {
            toast({
                title: "Error",
                description: "Failed to save team data.",
                status: "error",
                duration: 3000,
                isClosable: true
            });
        }
    };

    return (
        <Flex color="white" direction="column" align="center" padding="5rem">
            <Switch isChecked={isEditable} onChange={() => setIsEditable(!isEditable)} mb="4" />
            {isEditable ? (
                <Box mb="4" w="full">
                    <Input
                        value={teamInfo.title}
                        onChange={(e) => setTeamInfo({ ...teamInfo, title: e.target.value })}
                        placeholder="Title"
                        mb="2"
                        color="white"
                        bg="transparent"
                    />
                    <Textarea
                        value={teamInfo.description}
                        onChange={(e) => setTeamInfo({ ...teamInfo, description: e.target.value })}
                        placeholder="Description"
                        color="white"
                        bg="transparent"
                    />
                    <IconButton
                        icon={<FaSave />}
                        colorScheme="whiteAlpha"
                        onClick={handleSave}
                        mt="4"
                        size="lg"
                        aria-label="Save"
                    />
                </Box>
            ) : (
                <Box textAlign="center" mb="4">
                    <Heading as="h2">{teamInfo.title}</Heading>
                    <Text>{teamInfo.description}</Text>
                </Box>
            )}
            <Flex wrap="wrap" justify="center" gap="4">
                {teamMembers.map((member, index) => (
                    <TeamMemberCard
                        key={member.id}
                        member={editIndex === index ? currentMember : member}
                        isEditable={isEditable}
                        handleEditSection={handleEditSection}
                        handleImageChange={handleImageChange}
                        handleDeleteMember={handleDeleteMember}
                        handleEditClick={handleEditClick}
                        handleSaveClick={handleSaveClick}
                        handleCancelClick={handleCancelClick}
                        isEditing={editIndex === index}
                    />
                ))}
                {isEditable && (
                    <Flex
                        direction="column"
                        align="center"
                        w="300px"
                        p="3"
                        m="2"
                        border="2px dashed gray"
                        borderRadius="lg"
                        justifyContent="center"
                        onClick={handleAddMember}
                        cursor="pointer"
                        transition="all 0.2s"
                    >
                        <FaPlus size={32} color="gray" />
                        <Text mt="2" color="gray">Add Member</Text>
                    </Flex>
                )}
            </Flex>
        </Flex>
    );
};

export default TeamSection;
