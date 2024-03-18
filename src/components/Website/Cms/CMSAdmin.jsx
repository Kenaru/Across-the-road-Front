import React, { Component } from 'react';
import axios from 'axios';
import { Box, Heading, Text, Button, SimpleGrid, Center } from '@chakra-ui/react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

// Log import statement for StatsSection
console.log("Importing StatsSection:", import('../StatsSection/StatsSection'));

class CMSAdmin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      websitePages: [],
      totalTables: 0,
      totalElements: 0,
      maxElementsInTable: 0,
      selectedTable: null,
      adminData: {},
      numWebsites: 0, // Added state for number of websites
    };
  }

  componentDidMount() {
    axios
      .get('http://localhost:3001/websitePages')
      .then((response) => {
        this.setState({ websitePages: response.data });
        this.computeAdminData(response.data);
      })
      .catch((error) => {
        console.error('Error fetching website pages:', error);
      });
  }

  computeAdminData(pages) {
    let totalTables = 0;
    let totalElements = 0;
    let maxElementsInTable = 0;
    let numWebsites = 0;

    const adminData = {};

    pages.forEach((page) => {
        if (page.formData && page.formData.title) {
            numWebsites++;
        }

        page.components.forEach((component) => {
            totalTables++;
            const elementCount = Object.keys(component).length;
            totalElements += elementCount;

            if (elementCount > maxElementsInTable) {
                maxElementsInTable = elementCount;
                this.setState({ selectedTable: component.type });
            }

            if (!adminData[component.type]) {
                adminData[component.type] = [];
            }
            adminData[component.type].push(component.id);
        });
    });

    this.setState({ totalTables, totalElements, maxElementsInTable, adminData, numWebsites });
}


  handleTableClick = (table) => {
    this.setState({ selectedTable: table });
  };

  render() {
    const { totalTables, totalElements, maxElementsInTable, selectedTable, adminData, websitePages, numWebsites } = this.state;

    return (
      <Center>
        <Box display="flex" justifyContent="center" width="100%">
          {/* Sidebar 1 */}
          <Box width="40%" margin="20px" height="80vh" overflowY="auto">
            <Heading as="h1" size="xl" mb="40px" color="white" textAlign="center">
              Admin Dashboard
            </Heading>
            <Box p="20px" boxShadow="md" borderRadius="lg" bg="green" color="black" mb="20px" textAlign="center">
              <Text color="black" fontSize="md">Total Tables: {totalTables}</Text>
              <Text color="black" fontSize="md">Total Elements: {totalElements}</Text>
              <Text color="black" fontSize="md">Max Elements in Table: {maxElementsInTable}</Text>
              <Text color="black" fontSize="md">Number of Websites: {numWebsites}</Text> {/* Display number of websites */}
            </Box>
            <SimpleGrid columns={[1, 2, 3]} spacing="40px">
              {Object.keys(adminData).map((table) => (
                <Box
                  key={table}
                  p="20px"
                  boxShadow="md"
                  borderRadius="lg"
                  bg={selectedTable === table ? 'teal.300' : 'white'}
                  color="black"
                  onClick={() => this.handleTableClick(table)}
                  textAlign="center"
                >
                  <Heading as="h2" size="md" mb="10px">
                    {table}
                  </Heading>
                  <Text color="black" fontSize="md">Total Elements: {adminData[table].length}</Text>
                </Box>
              ))}
            </SimpleGrid>
          </Box>

          {/* Sidebar 2 */}
          <Box width="50%" margin="auto" height="80vh" overflowY="auto">
            <Heading as="h1" size="xl" mb="40px" color="white" textAlign="center">
              Website Pages
            </Heading>
            <SimpleGrid columns={[1, 2, 3]} spacing="40px">
              {websitePages.map((page) => (
                <Box
                  key={page.id}
                  p="20px"
                  boxShadow="md"
                  borderRadius="lg"
                  bg="white"
                  color="black"
                  textAlign="center"
                >
                  <Heading as="h2" size="md" mb="10px">
                    {page.id}
                  </Heading>
                  <Text fontSize="md">Description of the page.</Text>
                  <Link to={`/CMSPage/${page.id}`}> {/* Link to CMSPage component */}
                    <Button colorScheme="blue" mt="20px" size="sm">
                      Learn More
                    </Button>
                  </Link>
                </Box>
              ))}
            </SimpleGrid>
          </Box>
        </Box>
      </Center>
    );
  }
}
export default CMSAdmin;
