import React from "react";
import styles from "./Servicos.module.css";
import { Link } from "react-router-dom";
import UserContext from "../../Context/UserContext";

const Servicos = () => {
  const userContext = React.useContext(UserContext);

  if (!userContext) {
    return null;
  }

  const { login } = userContext;

  return (
    <section className="container">
      <h1 className={styles.servicosTit}>Serviços</h1>
      <div className={`${styles.grid} ${styles.gridArea}`}>
        <div className={styles.banho}>
          <h2>BANHO</h2>
          {login ? (
            <Link to="/servico/banho">AGENDAR</Link>
          ) : (
            <Link to="/login">LOGAR</Link>
          )}
        </div>

        <div className={styles.tosa}>
          <h2>TOSA</h2>
          {login ? (
            <Link to="/servico/tosa">AGENDAR</Link>
          ) : (
            <Link to="/login">LOGAR</Link>
          )}
        </div>

        <div className={styles.adestramento}>
          <h2>ADESTRAMENTO</h2>
          {login ? (
            <Link to="/servico/adestramento">AGENDAR</Link>
          ) : (
            <Link to="/login">LOGAR</Link>
          )}
        </div>

        <div className={styles.hospedagem}>
          <h2>HOSPEDAGEM</h2>
          {login ? (
            <Link to="/servico/hospedagem">AGENDAR</Link>
          ) : (
            <Link to="/login">LOGAR</Link>
          )}
        </div>
      </div>
    </section>
  );
};

export default Servicos;
