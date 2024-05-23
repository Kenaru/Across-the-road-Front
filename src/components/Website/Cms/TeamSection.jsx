import React, { useState } from 'react';
import { Box, Flex, Button, Image, Input, Text, IconButton, Switch } from '@chakra-ui/react';
import { FaPlus, FaSave, FaEdit, FaTrash, FaUpload } from 'react-icons/fa';

const initialTeamData = [
    {
        id: 1,
        name: "Jean Dupont",
        role: "Chef de projet",
        img: 'https://via.placeholder.com/150'  // Default placeholder image
    },
];

const TeamMemberCard = ({ member, isEditable, handleEditSection, handleImageChange }) => {
    return (
        <Flex key={member.id} direction="column" align="center" w="300px" p="3" m="2" bg="gray.100" borderRadius="lg" boxShadow="md">
            <Image
                src={member.img || 'https://via.placeholder.com/150'}
                alt={member.name}
                boxSize="150px"
                borderRadius="full"
                objectFit="cover"
                m="auto"
            />
            {isEditable ? (
                <>
                    <Input
                        defaultValue={member.name}
                        placeholder="Name"
                        onChange={(e) => handleEditSection(member.id, 'name', e.target.value)}
                    />
                    <Input
                        defaultValue={member.role}
                        placeholder="Role"
                        onChange={(e) => handleEditSection(member.id, 'role', e.target.value)}
                    />
                    <IconButton
                        icon={<FaUpload />}
                        onClick={() => document.getElementById(`file-input-${member.id}`).click()}
                        size="sm"
                        aria-label="Upload Image"
                    />
                    <input
                        id={`file-input-${member.id}`}
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleImageChange(member.id, e)}
                        hidden
                    />
                </>
            ) : (
                <>
                    <Text fontSize="lg" fontWeight="bold">{member.name}</Text>
                    <Text>{member.role}</Text>
                </>
            )}
        </Flex>
    );
};

const TeamSection = () => {
    const [teamMembers, setTeamMembers] = useState(initialTeamData);
    const [isEditable, setIsEditable] = useState(false);

    const handleAddMember = () => {
        const newMember = {
            id: Date.now(),  // Unique ID for the new member
            name: "Nouveau Membre",
            role: "Nouveau Rôle",
            img: 'https://via.placeholder.com/150'  // Default new member image
        };
        setTeamMembers([...teamMembers, newMember]);
    };

    const handleEditSection = (id, field, value) => {
        const updatedMembers = teamMembers.map(member =>
            member.id === id ? { ...member, [field]: value } : member
        );
        setTeamMembers(updatedMembers);
    };

    const handleImageChange = (id, event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const newImage = e.target.result;
                handleEditSection(id, 'img', newImage);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <Flex bgGradient="linear(to-b, #010132, #0a000e)" direction="column" align="center" p="4">
            <Switch isChecked={isEditable} onChange={() => setIsEditable(!isEditable)} mb="4" />
            <Flex wrap="wrap" justify="center" gap="4">
                {teamMembers.map(member => (
                    <TeamMemberCard

                        key={member.id}
                        member={member}
                        isEditable={isEditable}
                        handleEditSection={handleEditSection}
                        handleImageChange={handleImageChange}
                    />
                ))}
            </Flex>
            {isEditable && (
                <Button leftIcon={<FaPlus />} colorScheme="blue" onClick={handleAddMember} mt="4">
                    Ajouter un membre
                </Button>
            )}
        </Flex>
    );
};

export default TeamSection;
