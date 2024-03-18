import React from 'react';
import { Box, Flex, Text, Link as ChakraLink, Image } from '@chakra-ui/react';
import { facebook, instagram, linkedin, twitter } from "../assets";

const footerLinks = [
    {
        title: "Liens Utile",
        links: [
            {
                name: "Contenu",
                link: "https://www.acrosstheroad.com/contenu/",
            },
            {
                name: "Demo",
                link: "https://www.acrosstheroad.com/demo/",
            },
            {
                name: "Créer votre site",
                link: "https://www.acrosstheroad.com/site/",
            },
            {
                name: "Conditions",
                link: "https://www.acrosstheroad.com/conditions/",
            },
        ],
    },
    {
        title: "Communauté",
        links: [
            {
                name: "Help Center",
                link: "https://www.acrosstheroad.com/Support/",
            },
            {
                name: "Partenaires",
                link: "https://www.acrosstheroad.com/Apropos_de_Nous/",
            },
            {
                name: "Suggestions",
                link: "https://www.acrosstheroad.com/Temoins/",
            },
            {
                name: "Blog",
                link: "https://www.acrosstheroed.com/blog/",
            },
            {
                name: "Services",
                link: "https://www.acrosstheroed.com/",
            },
        ],
    },
];

const socialMedia = [
    {
        id: "social-media-1",
        icon: instagram,
        link: "https://www.instagram.com/",
    },
    {
        id: "social-media-2",
        icon: facebook,
        link: "https://www.facebook.com/",
    },
    {
        id: "social-media-3",
        icon: twitter,
        link: "https://www.twitter.com/",
    },
    {
        id: "social-media-4",
        icon: linkedin,
        link: "https://www.linkedin.com/",
    },
];

const Footer = () => {
    return (
        <Flex direction="column" align="center" justify="center" textAlign="center" fontFamily="Poppins" borderTop="2px solid #ffffff" borderRadius="20px" padding="1.5rem" background="linear-gradient(270deg, #010132 100%, #6f13ad 0%)" width="100%" margin="0">
            <Flex direction="row" justify="center" align="center" gap="5rem" marginBottom="2rem">
                {footerLinks.map((group, index) => (
                    <Box key={index} className="link-group">
                        <Text fontWeight="normal" fontSize="25px" lineHeight="27px" color="#ffffff" marginBottom="1rem">{group.title}</Text>
                        <Flex direction="column" align="center">
                            {group.links.map((link, index) => (
                                <ChakraLink key={index} href={link.link} color="#ffffff" fontSize="16px" lineHeight="24px" marginBottom="1rem" _hover={{ color: '#ffffff' }} target="_blank" rel="noopener noreferrer">{link.name}</ChakraLink>
                            ))}
                        </Flex>
                    </Box>
                ))}
            </Flex>
            <Flex direction="row" justify="center" align="center" gap="1.5rem">
                {socialMedia.map((media) => (
                    <ChakraLink key={media.id} href={media.link} target="_blank" rel="noopener noreferrer">
                        <Image src={media.icon} alt="Social Icon" w="21px" h="21px" cursor="pointer" />
                    </ChakraLink>
                ))}
            </Flex>
        </Flex>
    );
};

export default Footer;
