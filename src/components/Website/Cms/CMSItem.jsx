import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Flex, Icon, List, ListItem, Text,Box } from '@chakra-ui/react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle, faBars, faShoePrints, faComment, faTrashAlt,  faServer, faListNumeric } from '@fortawesome/free-solid-svg-icons'; 
import About from '../About/About';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import FeedbackSection from '../FeedbackSection/FeedbackSection';
import Service from '../Service/Service';
import StatsSection from '../StatsSection/StatsSection';
import CMSForm from './CMSForm';

const CMSItem = () => {
    const [addedComponents, setAddedComponents] = useState([]);
    const [selectedComponentId, setSelectedComponentId] = useState(null);
    const [hoveredIndex, setHoveredIndex] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState(null);

const handleAddComponent = (componentName) => {
    let newComponent = null;
    switch (componentName) {
        case 'Navbar':
            newComponent = { id: Date.now(), component: <Navbar />, content: 'Navbar content', type: 'Navbar' };
            break;
        case 'About':
            newComponent = { id: Date.now(), component: <About />, content: 'About content', type: 'About' };
            break;
        case 'Footer':
            newComponent = { id: Date.now(), component: <Footer />, content: 'Footer content', type: 'Footer' };
            break;
        case 'FeedbackSection':
            newComponent = { id: Date.now(), component: <FeedbackSection />, content: 'Feedback section content', type: 'FeedbackSection' };
            break;
        case 'Service':
            newComponent = { id: Date.now(), component: <Service />, content: 'Service content', type: 'Service' };
            break;
        case 'StatsSection':
            newComponent = { id: Date.now(), component: <StatsSection />, content: 'StatsSection content', type: 'StatsSection' };
            break;
        default:
            // Handle default case or unrecognized component
            break;
    }
    if (newComponent) {
        const updatedComponents = [...addedComponents];
        updatedComponents.splice(hoveredIndex !== null ? hoveredIndex : updatedComponents.length, 0, newComponent);
        setAddedComponents(updatedComponents);
    }
};


    const handleDragStart = (e, id) => {
        e.dataTransfer.setData('componentId', id);
        setSelectedComponentId(id);
    };

    const handleDragOver = (index) => {
        setHoveredIndex(index);
    };

    const handleDragEnd = () => {
        setSelectedComponentId(null);
        setHoveredIndex(null);
    };

    const handleDeleteComponent = (id) => {
        const updatedComponents = addedComponents.filter(component => component.id !== id);
        setAddedComponents(updatedComponents);
        setSelectedComponentId(null);
    };

const handleSubmitForm = (formData) => {
    setFormData(formData);
    setShowForm(false);
    if (formData !== null) {
        handleSavePage(); // Call handleSavePage function only if formData is not null
    }
};





    const handleCloseForm = () => {
        setShowForm(false); // Close the form
    };

    const handleSavePage = () => {
    // Map component types to import statements
    const componentImports = {
        Navbar: "import Navbar from '../Navbar/Navbar';",
        About: "import About from '../About/About';",
        Footer: "import Footer from '../Footer/Footer';",
        FeedbackSection: "import FeedbackSection from '../FeedbackSection/FeedbackSection';",
        CardGrid: "import CardGrid from '../CardGrid/CardGrid';",
        Service: "import Service from '../Service/Service';",
        StatsSection: "import StatsSection from '../StatsSection/StatsSection';",
        // Add import statements for additional components here
    };

    // Initialize an array to store the import statements
    const imports = [];

    // Iterate over added components to construct page data and import statements
    addedComponents.forEach(component => {
        // Check if component type exists in componentImports mapping
        if (componentImports.hasOwnProperty(component.type)) {
            // Add import statement for the component
            const componentImport = componentImports[component.type];
            imports.push(componentImport);
        }
    });

    const pageData = {
        imports: imports,
        components: [...addedComponents],
        formData: formData // Include form data
    };

    axios.post('http://localhost:3001/websitePages', pageData)
    .then(response => {
        console.log('Page saved successfully:', response.data);
    })
    .catch(error => {
        console.error('Error saving page:', error);
    });
};


    

    const handleDrop = (e) => {
        e.preventDefault();
        const componentId = e.dataTransfer.getData('componentId');
        const draggedComponentIndex = addedComponents.findIndex(component => component.id === Number(componentId));
        if (draggedComponentIndex !== -1) {
            const updatedComponents = [...addedComponents];
            updatedComponents.splice(hoveredIndex !== null ? hoveredIndex : updatedComponents.length, 0, updatedComponents.splice(draggedComponentIndex, 1)[0]);
            setAddedComponents(updatedComponents);
        }
    };

    return (
<Flex className="app">
       <Flex className="sidebar" direction="column" bg="white" width="300px" padding="20px" overflowY="auto" position="fixed" left="0" top="0" bottom="0">
        <List spacing="2" marginTop="20px">
          <ListItem draggable onDragStart={() => handleAddComponent('Navbar')} cursor="pointer">
            <Box bg="#fff" border="1px solid #000" borderRadius="5px" padding="3px" display="flex" alignItems="center">
              <Icon as={FontAwesomeIcon} icon={faBars} color="#000" marginRight="5px" />
              <Text color="#000">Navbar</Text>
            </Box>
          </ListItem>
                            <ListItem
                                draggable
                                onDragStart={() => handleAddComponent('About')}
                                onMouseOver={() => handleDragOver(1)}
                            >
                                <Box
                                    display="flex"
                                    alignItems="center"
                                    bg="#fff"
                                    border="1px solid #000"
                                    borderRadius="5px"
                                    padding="5px"
                                    cursor="pointer"
                                >
                                    <Icon as={FontAwesomeIcon} icon={faInfoCircle} color="#000" marginRight="5px" />
                                    <Text color="#000">About</Text>
                                </Box>
                            </ListItem>
                            <ListItem
                                draggable
                                onDragStart={() => handleAddComponent('FeedbackSection')}
                                onMouseOver={() => handleDragOver(2)}
                            >
                                <Box
                                    display="flex"
                                    alignItems="center"
                                    bg="#fff"
                                    border="1px solid #000"
                                    borderRadius="5px"
                                    padding="5px"
                                    cursor="pointer"
                                >
                                    <Icon as={FontAwesomeIcon} icon={faComment} color="#000" marginRight="5px" />
                                    <Text color="#000">Feedback Section</Text>
                                </Box>
                            </ListItem>
                            <ListItem
                                draggable
                                onDragStart={() => handleAddComponent('Service')}
                                onMouseOver={() => handleDragOver(3)}
                            >
                                <Box
                                    display="flex"
                                    alignItems="center"
                                    bg="#fff"
                                    border="1px solid #000"
                                    borderRadius="5px"
                                    padding="5px"
                                    cursor="pointer"
                                >
                                    <Icon as={FontAwesomeIcon} icon={faServer} color="#000" marginRight="5px" />
                                    <Text color="#000">Service</Text>
                                </Box>
                            </ListItem>
                            <ListItem
                                draggable
                                onDragStart={() => handleAddComponent('StatsSection')}
                                onMouseOver={() => handleDragOver(4)}
                            >
                                <Box
                                    display="flex"
                                    alignItems="center"
                                    bg="#fff"
                                    border="1px solid #000"
                                    borderRadius="5px"
                                    padding="5px"
                                    cursor="pointer"
                                >
                                    <Icon as={FontAwesomeIcon} icon={faListNumeric} color="#000" marginRight="5px" />
                                    <Text color="#000">StatsSection</Text>
                                </Box>
                            </ListItem>
                            <ListItem
                                draggable
                                onDragStart={() => handleAddComponent('Footer')}
                                onMouseOver={() => handleDragOver(5)}
                            >
                                <Box
                                    display="flex"
                                    alignItems="center"
                                    bg="#fff"
                                    border="1px solid #000"
                                    borderRadius="5px"
                                    padding="5px"
                                    cursor="pointer"
                                >
                                    <Icon as={FontAwesomeIcon} icon={faShoePrints} color="#000" marginRight="5px" />
                                    <Text color="#000">Footer</Text>
                                </Box>
                            </ListItem>
                                                        
                        <Flex direction="column" alignItems="center" className="save-page-button">
            {/* Render the "Save Page" button only if the form is not submitted */}
            {!formData && (
                <Button colorScheme="teal" variant="solid" margin="20px" onClick={() => setShowForm(true)}>
                    Save Page
                </Button>
            )}
            {/* Render the CMSForm component if showForm is true */}
            {showForm && (
                <CMSForm isOpen={showForm} onClose={handleCloseForm} onSubmit={handleSubmitForm} />
            )}
        </Flex>


                            <Link to="/CMSAdmin" alignItems="center" className="admin-link">
                                    <Button colorScheme="teal" variant="solid" className="go-to-admin-button">Go to Admin</Button>
                            </Link>

                    </List>

            
    </Flex> 


 <Flex className="content" direction="column" flex="1" alignItems="stretch" padding="0 20px" onDrop={handleDrop} onDragOver={(e) => e.preventDefault()} marginLeft="300px" >
        {addedComponents.map((component, index) => (
          <Flex
            key={component.id}
            className={`droppable ${selectedComponentId === component.id ? 'selected' : ''}`}
            draggable
            onDragStart={(e) => handleDragStart(e, component.id)}
            onDragOver={() => handleDragOver(index)}
            onDragEnd={handleDragEnd}
            position="relative"
            marginBottom="20px"
            width="calc(100% - 40px)" // Adjust the width to match the padding of 20px on both sides
          >
            {component.component}
            <Flex className="options" position="absolute" top="0" right="0">
              <Button onClick={() => handleDeleteComponent(component.id)}><FontAwesomeIcon icon={faTrashAlt} /></Button>
            </Flex>
          </Flex>
        ))}
      </Flex>
    </Flex>

               
        
    );
};

export default CMSItem;
