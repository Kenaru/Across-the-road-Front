import React, { Component } from 'react';
import { Box, Heading, Text, Button, SimpleGrid, Center } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { fetchAllPages } from '../../api/cmsApi';
import withNavigation from './withNavigation'; // Import the wrapper component

class CMSAdmin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            websitePages: [],
            error: null,
        };
    }

    componentDidMount() {
        this.fetchWebsitePages();
    }

    fetchWebsitePages = async () => {
        try {
            const pages = await fetchAllPages();
            console.log('API response:', pages); // Log the response to debug its structure
            this.setState({ websitePages: pages });
        } catch (error) {
            this.setState({ error: error.message });
            console.error('Error fetching website pages:', error);
            if (error.response && error.response.status === 401) {
                // Redirect to login or handle unauthorized access
                console.error('Unauthorized access - redirecting to login');
                // Redirect to login page or display a message
                this.props.navigate('/login'); // Use this.props.navigate provided by the wrapper
            }
        }
    };

    render() {
        const { websitePages, error } = this.state;

        return (
            <Box bg="#010132" p="20px" minHeight="100vh">
                <Center>
                    <Box display="flex" justifyContent="center" width="100%">
                        <Box width="70%" margin="20px" height="100vh" overflowY="auto">
                            <Heading as="h1" size="xl" mb="40px" color="white" textAlign="center">
                                Website Pages
                            </Heading>
                            {error && <Text color="red">{error}</Text>}
                            <SimpleGrid columns={[1, 2, 3]} spacing="40px">
                                {websitePages.map((page) => (
                                    <Box
                                        key={page.page.id}
                                        p="20px"
                                        boxShadow="md"
                                        borderRadius="lg"
                                        bg="white"
                                        color="black"
                                        textAlign="center"
                                    >
                                        <Heading as="h2" size="md" mb="10px">
                                            {page.page.title}
                                        </Heading>
                                        <Text fontSize="md">{page.page.url}</Text>
                                        <Link to={`/CMSPage/${page.page.id}`}>
                                            <Button colorScheme="blue" mt="20px" size="sm">
                                                View Page
                                            </Button>
                                        </Link>
                                    </Box>
                                ))}
                            </SimpleGrid>
                        </Box>
                    </Box>
                </Center>
            </Box>
        );
    }
}

export default withNavigation(CMSAdmin); // Wrap with withNavigation
