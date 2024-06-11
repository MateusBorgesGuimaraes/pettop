import React from "react";
import { Link, NavLink } from "react-router-dom";
import styles from "./Sidenav.module.css";

const Sidenav = () => {
  return (
    <header className={styles.sidenav}>
      <ul>
        <li>
          <Link to={`/dashboard`}>Inicio</Link>
        </li>

        <li>
          <Link to={`/dashboard/post`}>Posts</Link>
        </li>

        <li>
          <Link to={`/dashboard/servico`}>Serviços</Link>
        </li>

        <li>
          <Link to={`/dashboard/produto`}>Produtos</Link>
        </li>

        <li>
          <Link to={`/dashboard/user`}>Users</Link>
        </li>
      </ul>
    </header>
  );
};

export default Sidenav;
