import React from 'react';
import Image from 'next/image';
import styles from './styles.module.css';
import { Link } from 'react-router-dom'; //Pour les redirections entre les components


// components/BackgroundRainbow.js

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




// components/Login.js

const Login = () => {
  return (
    <div className={styles.formulaire}>
        <form id="login-form" action="http://localhost:5000/api/post/login" method="post">
            <h1>Connexion</h1>
            <input type="text" id="mail" placeholder="Mail" required/>
            <input type="password" id="password" placeholder="Mot de passe" required/>
            <br/>
            <Link to="/register" id="firstConnect">Première connexion?</Link>
            <br/>
            <Link to="/forgot-password" id="forgot-password">Mot de passe oublie?</Link><br/>
            <div id="response"></div>
            <div id="login-status"></div>
            <button type="submit">Se connecter</button>
            <br/>
        </form>
    </div>
  );
};





// components/Register.js

const Register = () => {
  return (
    <div className={styles.formulaire}>
      <form id="register-form" action="http://localhost:5000/api/post/register" method="post">
        <h1>Register</h1>
        <input type="text" id="mail" placeholder="Adresse Mail" required />
        <input type="text" id="lastname" placeholder="Nom" required />
        <input type="text" id="firstname" placeholder="Prénom" required />
        <input type="text" id="phonenumber" placeholder="Numéro de Téléphone" required />
        <input type="date" id="birthday" placeholder="Date de Naissance" required />
        <input type="password" id="password" placeholder="Mot de passe" required />
        <input type="password" id="confirmpassword" placeholder="Confirmer le Mot de passe" required />
        <br />
        <Link to="/forgot-password" id="forgot-password">Mot de passe oublié?</Link>
        <br />
        <Link to="/login" id="firstConnect">Se connecter</Link>
        <br />
        <div id="respons"></div>
        <button type="submit">S inscrire</button>
        <br />
      </form>
    </div>
  );
};





// components/ResetPassword.js

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

  


  
// components/ForgotPassword.js

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


export { BackgroundRainbow, Login, Register, ResetPassword, ForgotPassword };

