import React from 'react';
import { Box, Flex, Image, Text, Heading } from '@chakra-ui/react';

const Service = ({ initialData }) => {
    return (
        <Box mb="5rem" mt="200px" textAlign="center" maxW="1200px" mx="auto">
            <Heading as="h2" size="xl" mb="4rem" color="red.600">
                Les principeaux actions de nos associations
            </Heading>
            <Flex direction="column" alignItems="center" gap={6}>
                {initialData.map(service => (
                    <Flex key={service.id} direction="column" align="center" w="800px" p="3" m="2rem" bg="#010132" color="white" borderRadius="lg" boxShadow="md">
                        {service.imgUrl ? (
                            <Image src={service.imgUrl} alt={service.title} boxSize="800px" height="600px" objectFit="cover" m="2rem"/>
                        ) : (
                            <Box
                                width="800px"
                                height="600px"
                                borderWidth="2px"
                                borderStyle="dashed"
                                borderColor="white"
                                display="flex"
                                alignItems="center"
                                justifyContent="center"
                                m="auto"
                            >
                                <Text color="white">Image Placeholder</Text>
                            </Box>
                        )}
                        <Text fontSize="lg" fontWeight="bold">{service.title}</Text>
                        <Text m="2rem" >{service.content}</Text>
                    </Flex>
                ))}
            </Flex>
        </Box>
    );
};

export default Service;
