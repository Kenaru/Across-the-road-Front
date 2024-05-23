import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Box, Flex, Text, Link as ChakraLink, Image, Input, IconButton, Switch } from '@chakra-ui/react';
import {FaEdit, FaSave, FaTimes, FaUpload, FaTrash, FaPlus} from 'react-icons/fa';

// Assuming imports for the images are correctly set
import instagramIcon from '../assets/instagram.svg';
import facebookIcon from '../assets/facebook.svg';
import twitterIcon from '../assets/twitter.svg';
import linkedinIcon from '../assets/linkedin.svg';

const Footer = () => {
    const [isEditable, setIsEditable] = useState(false);
    const [logo, setLogo] = useState('../../assets/logo_b.png');
    const [socialMedia, setSocialMedia] = useState([
        { id: "1", icon: instagramIcon, link: "https://www.instagram.com/" },
        { id: "2", icon: facebookIcon, link: "https://www.facebook.com/" },
        { id: "3", icon: twitterIcon, link: "https://www.twitter.com/" },
        { id: "4", icon: linkedinIcon, link: "https://www.linkedin.com/" },
    ]);

    const handleLogoChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => setLogo(reader.result);
            reader.readAsDataURL(file);
        }
    };

    const handleEditSocialLink = (id, newLink) => {
        const updatedSocialMedia = socialMedia.map(media =>
            media.id === id ? { ...media, link: newLink } : media
        );
        setSocialMedia(updatedSocialMedia);
    };

    const handleRemoveSocialIcon = (id) => {
        const updatedSocialMedia = socialMedia.filter(media => media.id !== id);
        setSocialMedia(updatedSocialMedia);
    };

    const handleAddSocialIcon = () => {
        const newIcon = {
            id: `new-${Date.now()}`,
            icon: '../../assets/new_icon.png', // Example placeholder or provide a method to upload an icon
            link: "https://newlink.com"
        };
        setSocialMedia([...socialMedia, newIcon]);
    };

    return (
        <Flex direction="column" align="center" justify="center" textAlign="center" fontFamily="Poppins" borderTop="2px solid #ffffff" borderRadius="20px" padding="1.5rem" background="linear-gradient(270deg, #010132 100%, #6f13ad 0%)" width="100%" margin="0">
            <Flex justifyContent="space-between" width="100%" px="20px" alignItems="center">
                <Box>
                    <RouterLink to="/">
                        <Image color="white" src={logo} alt="Logo" boxSize="70px" />
                    </RouterLink>
                    {isEditable && (
                        <>
                            <IconButton icon={<FaUpload />} onClick={() => document.getElementById('logoInput').click()} aria-label="Upload logo" />
                            <input id="logoInput" type="file" accept="image/*" onChange={handleLogoChange} hidden />
                        </>
                    )}
                </Box>
                <Flex color="white" gap="20px">
                    <ChakraLink as={RouterLink} to="/" fontWeight="bold">Home</ChakraLink>
                    <ChakraLink as={RouterLink} to="/blog" fontWeight="bold">Blog</ChakraLink>
                </Flex>
                {isEditable && (
                    <IconButton icon={<FaPlus />} onClick={handleAddSocialIcon} aria-label="Add new social media icon" />
                )}
                <Switch isChecked={isEditable} onChange={() => setIsEditable(!isEditable)} />
            </Flex>
            <Flex gap="10px" mt="20px">
                {socialMedia.map(media => (
                    <Box key={media.id}>
                        <ChakraLink href={media.link} isExternal>
                            <Image src={media.icon} alt="Social Icon" boxSize="70px" />
                        </ChakraLink>
                        {isEditable && (
                            <>
                                <IconButton icon={<FaEdit />} onClick={() => handleEditSocialLink(media.id, prompt("Enter new URL:", media.link))} aria-label="Edit link" />
                                <IconButton icon={<FaTrash />} onClick={() => handleRemoveSocialIcon(media.id)} aria-label="Remove icon" />
                            </>
                        )}
                    </Box>
                ))}
            </Flex>
            <Text fontSize="sm" color="white" mt="20px">
                © 2024 Copyright
            </Text>
        </Flex>
    );
};

export default Footer;
