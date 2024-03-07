import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle, faBars, faShoePrints, faComment, faEdit, faTrashAlt, faSave, faPalette, faIdCard } from '@fortawesome/free-solid-svg-icons'; // Add faPalette for theme icon
import About from '../About/About';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import FeedbackSection from '../FeedbackSection/FeedbackSection';
import CardGrid from '../CardGrid/CardGrid';
import './CMS.scss';

const CMS = () => {
    const [addedComponents, setAddedComponents] = useState([]);
    const [selectedComponentId, setSelectedComponentId] = useState(null);
    const [editMode, setEditMode] = useState(false);
    const [hoveredIndex, setHoveredIndex] = useState(null);
    const [theme, setTheme] = useState('default'); // Add state for theme

    const handleSave = (data) => {
        // Implement your save logic here
        console.log('Save data:', data);
    };
    const handleToggleEditMode = () => {
        setEditMode(!editMode);
    };

    const handleSaveChanges = () => {
        setEditMode(false); // Disable edit mode when saving changes
    };

    const handleAddComponent = (componentName) => {
        let newComponent = null;
        switch (componentName) {
            case 'About':
                newComponent = { id: Date.now(), component: <About />, content: 'About content', type: 'About' };
                break;
            case 'Navbar':
                newComponent = { id: Date.now(), component: <Navbar onSave={handleSave} />, content: 'Navbar content', type: 'Navbar' };
                break;
            case 'Footer':
                newComponent = { id: Date.now(), component: <Footer />, content: 'Footer content', type: 'Footer' };
                break;
            case 'FeedbackSection':
                newComponent = { id: Date.now(), component: <FeedbackSection />, content: 'Feedback section content', type: 'FeedbackSection' };
                break;
            case 'CardGrid':
                newComponent = { id: Date.now(), component: <CardGrid />, content: 'CardGrid section content', type: 'CardGrid' };
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

    const handleChangeTheme = (newTheme) => {
        setTheme(newTheme);
    };

    return (
        <div className="app">
            <div className="sidebar" style={{ backgroundColor: theme === 'dark' ? '#023d44' : '#fff' }}>
                <div draggable onDragStart={() => handleAddComponent('About')}>
                    <FontAwesomeIcon icon={faInfoCircle} color={theme === 'dark' ? '#fff' : '#000'} />
                    <span>About</span>
                </div>
                <div draggable onDragStart={() => handleAddComponent('Navbar')}>
                    <FontAwesomeIcon icon={faBars} color={theme === 'dark' ? '#fff' : '#000'} />
                    <span>Navbar</span>
                </div>
                <div draggable onDragStart={() => handleAddComponent('Footer')}>
                    <FontAwesomeIcon icon={faShoePrints} color={theme === 'dark' ? '#fff' : '#000'} />
                    <span>Footer</span>
                </div>
                <div draggable onDragStart={() => handleAddComponent('FeedbackSection')}>
                    <FontAwesomeIcon icon={faComment} color={theme === 'dark' ? '#fff' : '#000'} />
                    <span>Feedback Section</span>
                </div>
                <div draggable onDragStart={() => handleAddComponent('CardGrid')}>
                    <FontAwesomeIcon icon={faIdCard} color={theme === 'dark' ? '#fff' : '#000'} />
                    <span>CardGrid</span>
                </div>
                {/* Add option to change theme */}
                <div onClick={() => handleChangeTheme('default')}>
                    <FontAwesomeIcon icon={faPalette} color={theme === 'dark' ? '#fff' : '#000'} />
                    <span>{theme === 'default' ? 'Default Theme' : 'Dark Theme'}</span>
                </div>
                <div onClick={() => handleChangeTheme('dark')}>
                    <FontAwesomeIcon icon={faPalette} color={theme === 'dark' ? '#fff' : '#000'} />
                    <span>{theme === 'dark' ? 'Dark Theme' : 'Default Theme'}</span>
                </div>
            </div>




    <div className="content" onDrop={handleDrop} onDragOver={(e) => e.preventDefault()}>
                {addedComponents.map((component, index) => (
                    <div
                        key={component.id}
                        className={`droppable ${selectedComponentId === component.id ? 'selected' : ''}`}
                        draggable
                        onDragStart={(e) => handleDragStart(e, component.id)}
                        onDragOver={() => handleDragOver(index)}
                        onDragEnd={handleDragEnd}
                        style={{ position: 'relative' }} // Add position relative to enable absolute positioning of icons
                    >
                        {/* Render component content */}
                        {component.component}

                        {/* Show edit and delete icons */}
                        <div className="options" style={{ position: 'absolute', top: 0, right: 0 }}>
                            <button onClick={() => setEditMode(!editMode)}>
                                <FontAwesomeIcon icon={faEdit} />
                            </button>
                            <button onClick={() => handleDeleteComponent(component.id)}>
                                <FontAwesomeIcon icon={faTrashAlt} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Display edit and save buttons */}
            <div className="options">
                {editMode ? (
                    <button onClick={handleSaveChanges}>
                        <FontAwesomeIcon icon={faSave} />
                    </button>
                ) : (
                    <button onClick={handleToggleEditMode}>
                        <FontAwesomeIcon icon={faEdit} />
                    </button>
                )}
            </div>
        </div>
    );
};

export default CMS;
