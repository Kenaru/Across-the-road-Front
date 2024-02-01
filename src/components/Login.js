import React from 'react';
import Image from 'next/image';
import styles from './styles.module.css';
import { Link } from 'react-router-dom'; //Pour les redirections entre les components




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









export {Login}



