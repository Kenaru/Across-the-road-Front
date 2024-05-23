import React, { useState } from 'react';
import { Button, Input, FormControl, FormLabel, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter } from '@chakra-ui/react'; 

const CMSForm = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({}); // State to+ store form data

  const handleChange = (event) => {
  const { name, value } = event.target;
  setFormData({ ...formData, [name]: value });
};

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(formData);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Create Page Form</ModalHeader>
        <ModalCloseButton />
        <form onSubmit={handleSubmit}>
          <ModalBody>
            <FormControl>
              <FormLabel>Title</FormLabel>
              <Input type="text" name="title" placeholder="Enter title" onChange={handleChange} />
            </FormControl>
            {/* Add other form fields as needed */}
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="teal" mr={3} type="submit">Submit</Button>
            <Button variant="outline" onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
}

export default CMSForm;
