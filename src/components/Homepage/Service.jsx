import React, { useRef, useEffect, useState } from 'react';
import { Box, Text, Icon, Button, Heading } from '@chakra-ui/react';
import { ArrowForwardIcon } from '@chakra-ui/icons';
import { FaLaptopCode, FaBullhorn, FaHandsHelping } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const Service = () => {
    const navigate = useNavigate();
    const services = [
        { id: '1', title: 'Création Rapide de Site Web', content: 'Lancez un site web pour votre association en quelques clics, sans coûts cachés.', route: '/activity1', icon: FaLaptopCode },
        { id: '2', title: 'Amplifiez la Portée de Vos Événements grâce à notre Blog', content: 'Faites connaître vos événements à des milliers de membres à travers notre réseau dédié.', route: '/activity2', icon: FaBullhorn },
        { id: '3', title: 'Engagez-vous dans la Vie Associative', content: 'Rejoignez et participez activement aux initiatives de votre communauté.', route: '/activity3', icon: FaHandsHelping },
    ];

    const ref = useRef();
    const [show, setShow] = useState(false);

    useEffect(() => {
        console.log('Service component mounted');
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        console.log('Service component is in view');
                        setShow(true);
                        observer.disconnect();
                    }
                });
            },
            {
                threshold: 0.5
            }
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        console.log('Show state changed:', show);
    }, [show]);

    console.log('Rendering Service component with services:', services);

    return (
        <Box ref={ref} mt="200px" textAlign="center" justifyContent="center" alignContent="center">
            <Heading as="h2" size="xl" mb="4rem" color="white">
                Révolutionnez Votre Association avec Nos Sites Web Dynamiques
            </Heading>
            <Text margin="4rem" color="white">
                Chez <strong>Across The Road</strong>, nous offrons un CMS sur mesure et personnalisable
            </Text>
            {services.map((service, index) => (
                <Box
                    key={service.id}
                    bg="#010132"
                    color="white"
                    p={8}
                    borderRadius="50px"
                    mb="2rem"
                    mx="10%"
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    justifyContent="center"
                    minHeight="300px"
                >
                    <Icon as={service.icon} w={32} h={32} mb={4} color="red" />
                    <Heading as="h3" size="lg" mb={4}>
                        {service.title}
                    </Heading>
                    <Text fontSize="xl" mb={6} color="white">
                        {service.content}
                    </Text>
                    <Button
                        onClick={() => navigate(service.route)}
                        rightIcon={<ArrowForwardIcon />}
                        bg="red"
                        variant="solid"
                        size="lg"
                        color="white"
                    >
                        Voir plus
                    </Button>
                </Box>
            ))}
        </Box>
    );
};

export default Service;
