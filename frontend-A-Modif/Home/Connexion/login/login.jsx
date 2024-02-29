import React from 'react';

function login() {
    return (
        <div className="container">
            <div className="left-panel">
            <form id="login-form" action="http://localhost:5000/api/post/login" method="post">
                <h1>Connexion</h1>
                <input type="email" id="mail" name="mail" placeholder="Adresse mail" required />
                <input type="password" id="password" name="password" placeholder="Mot de passe" required />
                <br />
                <a href="../forgot-password/forgotpass.html" id="forgotPass">mot de passe oublié?</a>
                <br />
                <div id="responsmail"></div>
                <button type="submit">se connecter</button>
                <br />
            </form>
            </div>
            <div className="right-panel">
            <img src="../../../img/logo_typo_noire.svg" alt="logo" />
            </div>
        </div> 
    );
}
  
  export default login;