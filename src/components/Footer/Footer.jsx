import React from 'react';
import { facebook, instagram, linkedin, twitter } from "../../assets";
import './Footer.scss';

const footerLinks = [
    {
        title: "Liens Utile",
        links: [
            {
                name: "Contenu",
                link: "https://www.acrosstheroad.com/contenu/",
            },
            {
                name: "Demo",
                link: "https://www.acrosstheroad.com/demo/",
            },
            {
                name: "Créer votre site",
                link: "https://www.acrosstheroad.com/site/",
            },
            {
                name: "Conditions",
                link: "https://www.acrosstheroad.com/conditions/",
            },
        ],
    },
    {
        title: "Communauté",
        links: [
            {
                name: "Help Center",
                link: "https://www.acrosstheroad.com/Support/",
            },
            {
                name: "Partenaires",
                link: "https://www.acrosstheroad.com/Apropos_de_Nous/",
            },
            {
                name: "Suggestions",
                link: "https://www.acrosstheroad.com/Temoins/",
            },
            {
                name: "Blog",
                link: "https://www.acrosstheroed.com/blog/",
            },
            {
                name: "Services",
                link: "https://www.acrosstheroed.com/",
            },
        ],
    },
];

const socialMedia = [
    {
        id: "social-media-1",
        icon: instagram,
        link: "https://www.instagram.com/",
    },
    {
        id: "social-media-2",
        icon: facebook,
        link: "https://www.facebook.com/",
    },
    {
        id: "social-media-3",
        icon: twitter,
        link: "https://www.twitter.com/",
    },
    {
        id: "social-media-4",
        icon: linkedin,
        link: "https://www.linkedin.com/",
    },
];

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-links">
                {footerLinks.map((group, index) => (
                    <div key={index} className="link-group">
                        <h4>{group.title}</h4>
                        <ul>
                            {group.links.map((link, index) => (
                                <li key={index}>
                                    <a href={link.link}>{link.name}</a>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
            <div className="social-media">
                {socialMedia.map((media) => (
                    <a key={media.id} href={media.link} target="_blank" rel="noopener noreferrer">
                        <img src={media.icon} alt="Social Icon" />
                    </a>
                ))}
            </div>
        </footer>
    );
};

export default Footer;
