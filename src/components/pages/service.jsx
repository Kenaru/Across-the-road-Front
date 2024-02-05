
import React from 'react';
import '../../Sass/Service.scss';


const Service = ({ icon, title, content }) => (
  <div className="service">
    <img src={icon} alt={title} className="service-icon" />
    <h3 className="service-title">{title}</h3>
    <p className="service-content">{content}</p>
  </div>
);

export default Service;
