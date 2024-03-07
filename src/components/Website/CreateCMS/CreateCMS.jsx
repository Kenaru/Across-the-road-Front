import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@chakra-ui/react';
import { ArrowForwardIcon } from '@chakra-ui/icons';
import './CreateCMS.scss';

const CreateCMS = ({ toggleCMS }) => {
    return (
        <div className="create-page-container">
            <h1>Créez votre site web</h1>
            <p>Commencez en cliquant sur le bouton ci-dessous !</p>
            <Link to="/CMS"> {/* Utilisez le composant Link pour la navigation */}
                <Button
                    rightIcon={<ArrowForwardIcon />}
                    bg='red'
                    variant='outline'
                    style={{ width: '500px' }}
                    size='lg'
                    onClick={toggleCMS}
                >
                    Créer votre site web
                </Button>
            </Link>
        </div>
    );
}

export default CreateCMS;
