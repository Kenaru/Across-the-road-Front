import React, { useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Box, Flex, Text, Link as ChakraLink, Image, Input, IconButton, Switch } from '@chakra-ui/react';
import { FaEdit, FaUpload, FaTrash } from 'react-icons/fa';

import instagramIcon from '../assets/instagram.svg';
import facebookIcon from '../assets/facebook.svg';
import twitterIcon from '../assets/twitter.svg';
import linkedinIcon from '../assets/linkedin.svg';

const defaultSocialMedia = [
    { id: 'instagram', icon: instagramIcon, link: 'https://www.instagram.com' },
    { id: 'facebook', icon: facebookIcon, link: 'https://www.facebook.com' },
    { id: 'twitter', icon: twitterIcon, link: 'https://www.twitter.com' },
    { id: 'linkedin', icon: linkedinIcon, link: 'https://www.linkedin.com' },
];

const Footer = ({ initialData, setInitialData }) => {
    const [isEditable, setIsEditable] = useState(false);
    const [logo, setLogo] = useState(initialData?.logo || '');
    const [socialMedia, setSocialMedia] = useState(initialData?.socialMedia || defaultSocialMedia);

    useEffect(() => {
        if (initialData) {
            setLogo(initialData.logo || '');
            setSocialMedia(initialData.socialMedia || defaultSocialMedia);
        }
    }, [initialData]);

    const handleLogoChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setLogo(reader.result);
                setInitialData({ ...initialData, logo: reader.result });
            };
            reader.readAsDataURL(file);
        }
    };

    const handleEditSocialLink = (id, newLink) => {
        const updatedSocialMedia = socialMedia.map(media =>
            media.id === id ? { ...media, link: newLink } : media
        );
        setSocialMedia(updatedSocialMedia);
        setInitialData({ ...initialData, socialMedia: updatedSocialMedia });
    };

    const handleRemoveSocialIcon = (id) => {
        const updatedSocialMedia = socialMedia.filter(media => media.id !== id);
        setSocialMedia(updatedSocialMedia);
        setInitialData({ ...initialData, socialMedia: updatedSocialMedia });
    };

    return (
        <Flex direction="column" align="center" justify="center" textAlign="center" fontFamily="Poppins" borderTop="2px solid #ffffff" borderRadius="20px" padding="1.5rem" background="linear-gradient(270deg, #010132 100%, #6f13ad 0%)" width="100%" margin="0">
            <Flex justifyContent="space-between" width="100%" px="20px" alignItems="center">
                <Box>
                    <RouterLink to="/">
                        {logo ? (
                            <Image color="white" src={logo} alt="Logo" boxSize="70px" />
                        ) : (
                            <Box
                                width="70px"
                                height="70px"
                                borderWidth="2px"
                                borderStyle="dashed"
                                borderColor="white"
                                display="flex"
                                alignItems="center"
                                justifyContent="center"
                            >
                                <Text color="white">Logo</Text>
                            </Box>
                        )}
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
                AcrossTheRoad© 2024 Copyright
            </Text>
        </Flex>
    );
};

export default Footer;
