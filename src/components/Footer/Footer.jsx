// Footer.js
import React from 'react';
import { footerLinks, socialMedia } from '../constants/index';
import './Footer.scss';



const Footer = () => (
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

export default Footer;
