import React from "react";
import styles from "./Footer.module.css";
import footerLogo from "../assets/footer-marca-90x84.svg";
import pinterest from "../assets/pinterest-25x32.svg";
import facebook from "../assets/facebook-20x31.svg";
import instagram from "../assets/instagram-33x33.svg";

const Footer = () => {
  return (
    <footer>
      <div className={`${styles.conatainerFooter} container`}>
        <div className={styles.col1}>
          <img className={styles.col1Logo} src={footerLogo} alt="" />
        </div>
        <div className={styles.col2}>
          <div className={styles.redesSociais}>
            <h3>REDES SOCIAIS</h3>
            <div>
              <a href="/">
                <img src={pinterest} alt="" />
              </a>
              <a href="/">
                <img src={facebook} alt="" />
              </a>
              <a href="/">
                <img src={instagram} alt="" />
              </a>
            </div>
          </div>
          <div className={styles.contato}>
            <h3>CONTATOS</h3>
            <p>(38) 9965-5455</p>
            <p>pettop@gmail.com</p>
          </div>
          <div className={styles.endereco}>
            <h3>ENDEREÇO</h3>
            <p>Rua Jose Pena</p>
            <p>Bairro Aluino</p>
            <p>Numero 45</p>
            <p>Rio de Janeiro, RJ</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
