import React from 'react';
import { shield, star } from "../../assets";
import './Service.scss'

const services = [
    {
        id: "services-1",
        icon: star,
        title: "Créer votre site simplement",
        content:
            "Creation d'un site web pour les associations, Accédez à un outil sécurisé, hébergé en France et accessible sans compétences techniques.",
    },
    {
        id: "services-2",
        icon: shield,
        title: "Une visibilité en ligne accessible à tous",
        content:
            "Across the road rend la création de site web simple et agréable. Glissez, déposez et créez vous-même simplement votre site internet. Aucune compétence technique requise. Créer son site facilement sans coder n'a jamais été aussi simple.",
    },
    {
        id: "services-3",
        icon: shield,
        title: "Bien plus qu’une solution pour créer un site web",
        content:
            "Nous nous engageons à être utiles pour nos utilisateurs, nos collaborateurs et le monde qui nous entoure.Nous avons la volonté de proposer une solution durable de création de site. Pour s’inscrire dans la préservation de l’environnement, nous mesurons et réduisons au maximum notre empreinte carbone.",
    },
];

const Service = () => (
    <section className="services">
        {services.map((service) => (
            <div key={service.id} className="service">
                <img src={service.icon} alt={service.title} className="service-icon" />
                <h3 className="service-title">{service.title}</h3>
                <p className="service-content">{service.content}</p>
            </div>
        ))}
    </section>
);

export default Service;
