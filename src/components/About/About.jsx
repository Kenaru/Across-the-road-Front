import React from 'react';
import './About.scss';
import aboutImage from '../../assets/asso01.jpg';

const About = () => {
    return (
        <section className="about">
            <div className="container">
                <div className="image-container">
                    <img src={aboutImage} alt="About" />
                </div>
                <div className="text-content">
                    <h2>Simples, intuitives, ludiques.</h2>
                    <p> Nous pensons que la création d’un site devrait toujours être simple, agréable et abordable.
                        Notre mission est simple.</p>
                    <p>Vous donner les moyens de créer et de gérer un site de qualité professionnelle en toute liberté, de façon autonome quelles que soient vos connaissances techniques. </p>
                </div>
            </div>
        </section>
    );
};

export default About;
