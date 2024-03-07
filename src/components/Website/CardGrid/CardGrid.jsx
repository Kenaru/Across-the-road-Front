// CardGrid.jsx

import React from 'react';
import { SimpleGrid, Box, Heading, Text, Button } from '@chakra-ui/react';
import './CardGrid.scss';

const CardGrid = () => {
  return (
    <SimpleGrid spacing={4} templateColumns='repeat(auto-fill, minmax(200px, 1fr)' className="simple-grid">
      <Card>
        <CardHeader>
          <Heading size='md'>Association 1</Heading>
        </CardHeader>
        <CardBody>
          <Text>Description de l'association 1.</Text>
        </CardBody>
        <CardFooter>
          <Button colorScheme="blue">En savoir plus</Button>
        </CardFooter>
      </Card>
      <Card>
        <CardHeader>
          <Heading size='md'>Association 2</Heading>
        </CardHeader>
        <CardBody>
          <Text>Description de l'association 2.</Text>
        </CardBody>
        <CardFooter>
          <Button colorScheme="blue">En savoir plus</Button>
        </CardFooter>
      </Card>
      <Card>
        <CardHeader>
          <Heading size='md'>Association 3</Heading>
        </CardHeader>
        <CardBody>
          <Text>Description de l'association 3.</Text>
        </CardBody>
        <CardFooter>
          <Button colorScheme="blue">En savoir plus</Button>
        </CardFooter>
      </Card>
    </SimpleGrid>
  );
};

const Card = ({ children }) => {
  return <Box className="card">{children}</Box>;
};

const CardHeader = ({ children }) => {
  return <Box className="card-header">{children}</Box>;
};

const CardBody = ({ children }) => {
  return <Box className="card-body">{children}</Box>;
};

const CardFooter = ({ children }) => {
  return <Box className="card-footer">{children}</Box>;
};

export default CardGrid;
