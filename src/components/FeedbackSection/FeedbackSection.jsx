import React from 'react';
import './FeedbackSection.scss'; // Correct import path for styles

// Define feedback data directly within the component
const feedbackData = [
    {
        id: "feedback-1",
        content: "Un outils accessible et necessaire pour la vivacité des associations.",
        name: "Jeane Dufour",
        title: "Fondateur association",
        img: require('../../assets/people01.png')
    },
    {
        id: "feedback-2",
        content: "Produit fiable et visuellement à la hauteur.",
        name: "Jean Brillet",
        title: "Adherent SSO",
        img: require('../../assets/people02.png')
    },
    {
        id: "feedback-3",
        content: "Remet une visibillité sur la vie des associations",
        name: "Carl Creval",
        title: "Developeur",
        img: require('../../assets/people03.png')
    },
];

const FeedbackItem = ({ content, name, title, img }) => (
    <div className="feedback-item">
        <div className="feedback-content">
            <img src={img} alt={name} className="feedback-img" />
            <p>{content}</p>
            <p>{name} - <span>{title}</span></p>
        </div>
    </div>
);


const FeedbackSection = () => (
    <section className="feedback-section">
        {feedbackData.map((item) => (
            <FeedbackItem key={item.id} {...item} />
        ))}
    </section>
);

export default FeedbackSection;
