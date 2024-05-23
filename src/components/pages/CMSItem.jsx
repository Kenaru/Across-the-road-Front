import React, { useState } from 'react';
import { Flex, Button, Menu, MenuButton, MenuItem, MenuList, Portal, IconButton, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, FormControl, FormLabel, Input } from '@chakra-ui/react';
import { ChevronDownIcon, CloseIcon } from '@chakra-ui/icons';

// Import your sub-components
import About from '../Website/Cms/About';
import Navbar from '../Website/Cms/Navbar';
import Footer from '../Website/Cms/Footer';
import FeedbackSection from '../Website/Cms/FeedbackSection';
import Service from '../Website/Cms/Service';
import TeamSection from '../Website/Cms/TeamSection';
import Event from '../Website/Cms/Event';

const CMSItem = () => {
    const [components, setComponents] = useState([]);
    const [formData, setFormData] = useState({});
    const [isFormOpen, setIsFormOpen] = useState(false);

    const availableComponents = {
        'Sommaire': <Navbar />,
        'A propos de nous': <About />,
        'Vos Avies': <FeedbackSection />,
        'Services': <Service />,
        'Evenements': <Event/>,
        'Notre equipe': <TeamSection />,
        'Lien Utiles': <Footer />

    };

    const handleAddComponent = (type) => {
        setComponents(prevComponents => [
            ...prevComponents,
            { id: Date.now(), type: type, component: availableComponents[type] }
        ]);
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(formData);
        setIsFormOpen(false);
    };

    return (
        <Flex direction="column" width="100%" bg="#010132" p={4}>
            <Menu>
                <MenuButton as={Button} rightIcon={<ChevronDownIcon />} zIndex={1400}>
                    Ajouter une section
                </MenuButton>
                <Portal>
                    <MenuList zIndex={1400}>
                        {Object.keys(availableComponents).map(key => (
                            <MenuItem key={key} onClick={() => handleAddComponent(key)}>
                                {key}
                            </MenuItem>
                        ))}
                        <MenuItem key="createForm" onClick={() => setIsFormOpen(true)}>
                            Create Form
                        </MenuItem>
                    </MenuList>
                </Portal>
            </Menu>
            {components.map((item, index) => (
                <Flex
                    key={item.id}
                    p={4}
                    borderRadius="md"
                    boxShadow="base"
                    mb={4}
                    draggable
                    onDragOver={(e) => e.preventDefault()}
                    alignItems="center"
                    justify="space-between"
                >
                    {item.component}
                    <IconButton
                        icon={<CloseIcon />}
                        onClick={() => setComponents(components.filter((_, idx) => idx !== index))}
                        size="sm"
                        color="white"
                        aria-label="Remove component"
                        variant="ghost"
                    />
                </Flex>
            ))}
            <Modal isOpen={isFormOpen} onClose={() => setIsFormOpen(false)}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Create Page Form</ModalHeader>
                    <ModalCloseButton />
                    <form onSubmit={handleSubmit}>
                        <ModalBody>
                            <FormControl>
                                <FormLabel>Nom ou Titre</FormLabel>
                                <Input type="text" name="title" placeholder="Entrer le nom ici" onChange={handleChange} />
                            </FormControl>
                        </ModalBody>
                        <ModalFooter>
                            <Button colorScheme="red.500" mr={3} type="submit">Enregistrer</Button>
                            <Button variant="outline" onClick={() => setIsFormOpen(false)}>Annuler</Button>
                        </ModalFooter>
                    </form>
                </ModalContent>
            </Modal>
        </Flex>
    );
};

export default CMSItem;
