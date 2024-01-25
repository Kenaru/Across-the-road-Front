import React from 'react';
import './forgotpass.module.css';

function ForgotPassword() {
  return (
    <div className="container">
      <div className="left-panel">
        <form id="forgot-password-form" action="http://localhost:5000/api/post/forgot-password" method="post">
          <h1>Mot de Passe Oublié</h1>
          <input type="email" id="mail" name="mail" placeholder="Adresse mail" required />
          <input type="email" id="confirmmail" name="confirmmail" placeholder="Confirmation Adresse mail" required />
          <br />
          <a href="../login/login.html" id="firstConnect">se connecter?</a>
          <br />
          <div id="responsmail"></div>
          <button type="submit">envoyer</button>
          <br />
        </form>
      </div>
      <div className="right-panel">
        <img src="../../../img/logo_typo_noire.svg" alt="logo" />
      </div>
    </div>
  );
}

export default ForgotPassword;
