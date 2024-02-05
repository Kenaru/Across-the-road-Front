
import React from 'react';
import { feedback } from '../constants/index';
import '../../Sass/FeedbackSection.scss';
const FeedbackItem = ({ content, name, title, img }) => (
  <div className="feedback-item">
    <img src={img} alt={name} className="feedback-img" />
    <p className="feedback-content">{content}</p>
    <p className="feedback-author">{name} - <span>{title}</span></p>
  </div>
);

const FeedbackSection = () => (
  <section className="feedback-section">
    {feedback.map((item) => (
      <FeedbackItem key={item.id} {...item} />
    ))}
  </section>
);

export default FeedbackSection;
