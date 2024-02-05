import React from 'react';
import Service from './service';
import { services } from '../../components/constants/index';




const ServicesSection = () => (
  <section className="services-section">
    {services.map((service) => (
      <Service key={service.id} {...service} />
    ))}
  </section>
);

export default ServicesSection;
