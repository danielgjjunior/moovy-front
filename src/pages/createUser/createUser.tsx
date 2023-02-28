import styles from 'createUser.module.css'

import styles from "./login.module.css";
import logoWhite from "../../assets/img/MoovyWhite.png";
import logoBlack from "../../assets/img/MoovyBlack.png";
import movieGif from "../../assets/gif/movie.gif";
import tarken from "../../assets/img/tarken.png";
import { InputField } from "../../components/inputField/inputField";
import { useState } from "react";
import { Button } from "../../components/button/button";

export function CreateLogin() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
  };

  return (
    <div className={styles.loginPage}>
      <div className={styles.loginMain}>
        <div className={styles.loginLeft}>
          <div className={styles.logoMoovy}>
            <img src={logoBlack} alt="Logo Moovy" />
          </div>
          <div className={styles.svgMovie}>
            <img
              src={movieGif}
              alt="Animação de cinema"
              className={styles.gif}
            />
          </div>
        </div>
        <div className={styles.loginRight}>
          <div className={styles.greatings}>
          <p className={styles.title}> Hello</p>
            <p>Sign to your account</p>
          </div>
          
          <div className={styles.form}>
            <form onSubmit={handleSubmit}>
              <InputField
                label="FullName"
                type="text"
                value={email}
                onChange={handleEmailChange}
              />
              <InputField
                label="Senha"
                type="password"
                value={password}
                onChange={handlePasswordChange}
              />
              <Button
                text="Clique aqui!"
                color="Marrom"
                width="28vw"
                onClick={() => console.log("Botão clicado!")}
              />
            </form>
            <a href="/Home" className={styles.link}>Not Registered? Create an Account</a>
          </div>
          <img src={tarken} alt="Logo Tarken" className={styles.logo} />
        </div>
      </div>
    </div>
  );
}

