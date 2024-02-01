import React from 'react';
import Image from 'next/image';
import styles from './styles.module.css';
import { Link } from 'react-router-dom'; //Pour les redirections entre les components




const BackgroundRainbow = () => {
    return (
      <div className={styles.backgroundRainbow}>
        <Image 
          src="../../img/arc_en_ciel_avec_fond_svg.svg" 
          alt="rainbow" 
          height="100vh" 
          width="100%"
        />
      </div>
    );
  };
  export {BackgroundRainbow};