import React from 'react';
import Image from 'next/image';
import styles from './styles.module.css';
import { Link } from 'react-router-dom'; //Pour les redirections entre les components




const ResetPassword = () => {
    return (
      <div className={ResetPasswordStyles.container}>
        <div className={ResetPasswordStyles.leftPanel}>
          <form id="reset-password-form" action="" method="post">
            <h1>Réinitialisation du mot de passe</h1>
            <input type="password" id="password" name="password" placeholder="Nouveau mot de passe" required />
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              placeholder="Confirmer le nouveau mot de passe"
              required/>
            <br />
            <a href="../login/login.html" id="forgot-password">Se connecter</a>
            <br />
            <div id="response"></div>
            <button type="submit">Envoyer</button>
            <br />
          </form>
        </div>
        <Image
          src="../../../img/logo_typo_noire.svg"
          alt="logo"
          width={width} // Spécifiez la largeur souhaitée
          height={height} // Spécifiez la hauteur souhaitée
        />
      </div>
    );
  };

export {ResetPassword}