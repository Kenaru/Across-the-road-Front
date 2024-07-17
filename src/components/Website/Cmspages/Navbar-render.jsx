import React from 'react';
import { Box, Flex, Image, List, ListItem, Text } from '@chakra-ui/react';

const Navbar = ({ initialData }) => {
    const links = [
        { id: 'home', title: 'Home', url: '/' },
        { id: 'blog', title: 'Blog', url: '/blog' },
    ];

    return (
        <Flex width="100%" direction="column" position="sticky" top="0" zIndex="1000">
            <Flex bgGradient="linear(to-r, #010132, #6f13ad)" color="white" p="20px" alignItems="center" justifyContent="space-between" boxShadow="0 8px 16px rgba(255, 255, 255, 0.5)">
                <Flex alignItems="center">
                    {initialData?.logo ? (
                        <Image src={initialData.logo} alt="Logo" width="60px" height="50px" cursor="pointer" />
                    ) : (
                        <Box width="60px" height="50px" borderWidth="2px" borderStyle="dashed" borderColor="white" display="flex" alignItems="center" justifyContent="center">
                            <Text color="white">Logo Placeholder</Text>
                        </Box>
                    )}
                </Flex>
                <List display="flex">
                    {links.map(link => (
                        <ListItem key={link.id} ml="20px" display="flex" alignItems="center">
                            <a href={link.url} style={{ color: 'white', textDecoration: 'none' }}>{link.title}</a>
                        </ListItem>
                    ))}
                </List>
            </Flex>
        </Flex>
    );
};

export default Navbar;
