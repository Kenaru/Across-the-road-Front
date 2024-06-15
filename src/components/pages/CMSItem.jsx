import React, { useState } from 'react';
import { Flex, Button, Heading, FormControl, FormLabel, Input, useToast } from '@chakra-ui/react';
import { createPage } from '../../api/cmsApi';
import { useAuth } from '../../api/authContext';

import About from '../Website/Cms/About';
import Navbar from '../Website/Cms/Navbar';
import Footer from '../Website/Cms/Footer';
import FeedbackSection from '../Website/Cms/FeedbackSection';
import Service from '../Website/Cms/Service';
import TeamSection from '../Website/Cms/TeamSection';

const CMSItem = () => {
    const [pageData, setPageData] = useState({ title: '', url: '' });
    const [componentsData, setComponentsData] = useState({
        navbar: {},
        aboutSections: [],
        services: [],
        feedbacks: [],
        teamMembers: { members: [], info: {} },
        footer: {},
    });
    const { userId } = useAuth();  // Get userId from AuthContext
    const toast = useToast();

    const handleSavePage = async () => {
        try {
            if (!userId) {
                console.error('User ID not found');
                return;
            }

            const trimmedUrl = `/${pageData.title.trim().replace(/\s+/g, '-')}`;
            const page = { ...pageData, url: trimmedUrl, userId, componentsData: JSON.stringify(componentsData) };

            const formData = new FormData();
            formData.append('title', page.title);
            formData.append('url', page.url);
            formData.append('userId', page.userId);
            formData.append('componentsData', page.componentsData);

            // Append images to formData
            if (componentsData.navbar.logo) {
                const navbarLogo = dataURItoBlob(componentsData.navbar.logo);
                formData.append('navbar_logo', navbarLogo, 'navbar_logo.webp');
            }

            componentsData.aboutSections.forEach((section, index) => {
                if (section.imageUrl) {
                    const aboutImage = dataURItoBlob(section.imageUrl);
                    formData.append(`about_image`, aboutImage, `about_image_${index}.webp`);
                }
            });

            componentsData.services.forEach((service, index) => {
                if (service.img_url) {
                    const serviceImage = dataURItoBlob(service.img_url);
                    formData.append(`service_image`, serviceImage, `service_image_${index}.webp`);
                }
            });

            componentsData.feedbacks.forEach((feedback, index) => {
                if (feedback.img_url) {
                    const feedbackImage = dataURItoBlob(feedback.img_url);
                    formData.append(`feedback_image`, feedbackImage, `feedback_image_${index}.webp`);
                }
            });

            componentsData.teamMembers.members.forEach((member, index) => {
                if (member.img) {
                    const teamImage = dataURItoBlob(member.img);
                    formData.append(`team_image`, teamImage, `team_image_${index}.webp`);
                }
            });

            if (componentsData.footer.image_url) {
                const footerImage = dataURItoBlob(componentsData.footer.image_url);
                formData.append('footer_image', footerImage, 'footer_image.webp');
            }

            await createPage(formData);

            toast({
                title: 'Page saved',
                description: 'Page and components saved successfully.',
                status: 'success',
                duration: 3000,
                isClosable: true,
            });
        } catch (error) {
            console.error('Failed to save page:', error);
            if (error.response && error.response.status === 400 && error.response.data.error === 'Page with the same URL already exists') {
                toast({
                    title: 'Error',
                    description: 'A page with the same URL already exists. Please choose a different title.',
                    status: 'error',
                    duration: 5000,
                    isClosable: true,
                });
            } else {
                toast({
                    title: 'Error',
                    description: 'Failed to save page.',
                    status: 'error',
                    duration: 3000,
                    isClosable: true,
                });
            }
        }
    };

    const dataURItoBlob = (dataURI) => {
        const byteString = atob(dataURI.split(',')[1]);
        const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
        const ab = new ArrayBuffer(byteString.length);
        const ia = new Uint8Array(ab);
        for (let i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
        }
        return new Blob([ab], { type: mimeString });
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setPageData({ ...pageData, [name]: value });
    };

    return (
        <Flex direction="column" width="100%" bg="#010132" p={4}>
            <Flex mb={4} justifyContent="space-between" alignItems="center">
                <Heading color="white">Create Page</Heading>
                <FormControl>
                    <FormLabel color="white">Page Title</FormLabel>
                    <Input color="white" type="text" name="title" value={pageData.title} onChange={handleChange} />
                </FormControl>
                <Button colorScheme="blue" onClick={handleSavePage}>Save Page</Button>
            </Flex>
            <Navbar initialData={componentsData.navbar} setInitialData={(data) => setComponentsData((prev) => ({ ...prev, navbar: data }))} />
            <About initialData={componentsData.aboutSections} setInitialData={(data) => setComponentsData((prev) => ({ ...prev, aboutSections: data }))} />
            <FeedbackSection initialData={componentsData.feedbacks} setInitialData={(data) => setComponentsData((prev) => ({ ...prev, feedbacks: data }))} />
            <Service initialData={componentsData.services} setInitialData={(data) => setComponentsData((prev) => ({ ...prev, services: data }))} />
            <TeamSection initialData={componentsData.teamMembers} setInitialData={(data) => setComponentsData((prev) => ({ ...prev, teamMembers: data }))} />
            <Footer initialData={componentsData.footer} setInitialData={(data) => setComponentsData((prev) => ({ ...prev, footer: data }))} />
        </Flex>
    );
};

export default CMSItem;
