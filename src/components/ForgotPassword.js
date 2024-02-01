import React from 'react';
import Image from 'next/image';
import './styles/styles.module.css';
import { Link } from 'react-router-dom'; //Pour les redirections entre les components


const ForgotPassword = () => {
    return (
      <div className={ForgotPasswordStyles.container}>
        <div className={ForgotPasswordStyles.leftPanel}>
          <form
            id="forgot-password-form"
            action="http://localhost:5000/api/post/forgot-password"
            method="post"
          >
            <h1>Mot de Passe Oublié</h1>
            <input type="email" id="mail" name="mail" placeholder="Adresse mail" required />
            <input
              type="email"
              id="confirmmail"
              name="confirmmail"
              placeholder="Confirmation Adresse mail"
              required
            />
            <br />
            <Link href="/login" passHref>
              <a id="firstConnect">Se connecter?</a>
            </Link>
            <br />
            <div id="responsmail"></div>
            <button type="submit">Envoyer</button>
            <br />
          </form>
        </div>
        <div className={ForgotPasswordStyles.rightPanel}>
          <Image
            src="../../../img/logo_typo_noire.svg"
            alt="logo"
            width={width} // Spécifiez la largeur souhaitée
            height={height} // Spécifiez la hauteur souhaitée
          />
        </div>
      </div>
    );
  };

export default {ForgotPassword}
  