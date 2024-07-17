import React from 'react';
import { Box, Flex, Text, Heading } from '@chakra-ui/react';

const TeamInfo = ({ initialData }) => {
    const { title, description } = initialData;

    return (
        <Flex color="white" direction="column" align="center" padding="5rem">
            <Box mb="4" w="full" textAlign="center">
                <Heading as="h2" size="xl" mb="4">{title || 'Team'}</Heading>
                <Text>{description || 'Description not available'}</Text>
            </Box>
        </Flex>
    );
};

export default TeamInfo;
  