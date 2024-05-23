import React, { useRef, useEffect, useState } from 'react';
import { Box, Text, Image, Link as ChakraLink, Grid, Button, Heading } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { ArrowForwardIcon } from "@chakra-ui/icons";

import enligneImage from "../../assets/enligne.jpg";
import evenementImage from "../../assets/evenement.jpg";
import activitesImage from "../../assets/activites.jpg";

const MotionBox = motion(Box);

const Service = () => {
    const services = [
        { id: "1", title: "Création Rapide de Site Web", content: "Lancez un site web pour votre association en quelques clics, sans coûts cachés.", link: "#", img: enligneImage },
        { id: "2", title: "Amplifiez la Portée de Vos Événements grâce à notre Blog", content: "Faites connaître vos événements à des milliers de membres à travers notre réseau dédié.", link: "#", img: evenementImage },
        { id: "3", title: "Engagez-vous dans la Vie Associative", content: "Rejoignez et participez activement aux initiatives de votre communauté.", link: "#", img: activitesImage },
    ];

    const ref = useRef();
    const [show, setShow] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
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

    const variants = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0 }
    };

    return (
        <Box ref={ref} mb="5rem" mt="200px" textAlign="center" justifyContent="center" alignContent="center">
            <Heading as="h2" size="xl" mb="4rem" color="white">
                Révolutionnez Votre Association avec Nos SiteWeb Dynamique
            </Heading>
            <Text margin="4rem" color="white">
                Chez <strong>Across The Road</strong>, nous offrons un CMS sur mesure et personnalisable
            </Text>
            <Grid templateColumns="repeat(auto-fit, minmax(400px, 1fr))" gap={6} justifyContent="center" alignContent="center">
                {services.map((service, index) => (
                    <MotionBox
                        key={service.id}
                        initial="hidden"
                        animate={show ? "visible" : "hidden"}
                        variants={variants}
                        transition={{ delay: index * 0.2, duration: 0.5 }}
                        borderWidth="1px"
                        borderRadius="lg"
                        overflow="hidden"
                        boxShadow="xl"
                        p={4}
                        bgGradient="linear(to-b, #010132, #0a000e)"
                        padding="2rem"
                        height="600px"
                        align="center"
                    >
                        <Image src={service.img} alt={service.title} objectFit="cover" height="250px" width="full"/>
                        <Box p={2} d="flex" flexDirection="column" justifyContent="space-between">
                            <Text padding="1rem" color="white" fontWeight="bold" fontSize="lg">
                                {service.title}
                            </Text>
                            <Text padding="1rem" color="white" fontSize="sm">
                                {service.content}
                            </Text>
                            <ChakraLink href={service.link} isExternal color="red.500" fontSize="sm" fontWeight="bold">
                                <Button
                                    rightIcon={<ArrowForwardIcon />}
                                    colorScheme="red"
                                    variant="solid"
                                    size="lg"
                                    width="200px"
                                >
                                    Voir plus
                                </Button>
                            </ChakraLink>
                        </Box>
                    </MotionBox>
                ))}
            </Grid>
        </Box>
    );
};

export default Service;
