import React from 'react';
import './styles/styles.module.css';
import { Link } from 'react-router-dom'; //Pour les redirections entre les components




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
  
  export {Register}