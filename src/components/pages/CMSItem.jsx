import React, { useState } from 'react';
import {Flex, IconButton, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, FormControl, FormLabel, Input, Button } from '@chakra-ui/react';
import { CloseIcon } from '@chakra-ui/icons';

// Import your sub-components
import About from '../Website/Cms/About';
import Navbar from '../Website/Cms/Navbar';
import Footer from '../Website/Cms/Footer';
import FeedbackSection from '../Website/Cms/FeedbackSection';
import Service from '../Website/Cms/Service';
import TeamSection from '../Website/Cms/TeamSection';
import Event from '../Website/Cms/Event';


const CMSItem = () => {
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

    const defaultComponents = [
        { id: "navbar", type: 'Sommaire', component: availableComponents['Sommaire'] },
        { id: "about", type: 'A propos de nous', component: availableComponents['A propos de nous'] },
        { id: "feedback", type: 'Vos Avies', component: availableComponents['Vos Avies'] },
        { id: "services", type: 'Services', component: availableComponents['Services'] },
        { id: "event", type: 'Evenements', component: availableComponents['Evenements'] },
        { id: "team", type: 'Notre equipe', component: availableComponents['Notre equipe'] },
        { id: "footer", type: 'Lien Utiles', component: availableComponents['Lien Utiles'] }
    ];

    const [components, setComponents] = useState(defaultComponents);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(formData);
        setIsFormOpen(false);
    };

    const handleDragStart = (index) => (event) => {
        event.dataTransfer.setData("draggedIndex", index);
    };

    const handleDrop = (index) => (event) => {
        event.preventDefault();
        const draggedIndex = event.dataTransfer.getData("draggedIndex");
        const newComponents = [...components];
        const [draggedComponent] = newComponents.splice(draggedIndex, 1);
        newComponents.splice(index, 0, draggedComponent);
        setComponents(newComponents);
    };

    const handleDragOver = (event) => {
        event.preventDefault();
    };

    return (
        <Flex direction="column" width="100%" bg="#010132" p={4}>
            {components.map((item, index) => (
                <Flex
                    key={item.id}
                    p={4}
                    borderRadius="md"
                    boxShadow="base"
                    mb={4}
                    draggable={item.id !== 'navbar' && item.id !== 'footer'}
                    onDragStart={handleDragStart(index)}
                    onDrop={handleDrop(index)}
                    onDragOver={handleDragOver}
                    alignItems="center"
                    justify="space-between"
                >
                    {item.component}
                    {item.id !== 'navbar' && item.id !== 'footer' && (
                        <IconButton
                            icon={<CloseIcon />}
                            onClick={() => setComponents(components.filter((_, idx) => idx !== index))}
                            size="sm"
                            color="white"
                            aria-label="Remove component"
                            variant="ghost"
                        />
                    )}
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
