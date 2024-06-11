import React from "react";
import { Link, json } from "react-router-dom";
import Input from "../Forms/Input";
import Button from "../Forms/Button";
import useForm from "../../Hooks/useForm";
import styles from "./LoginForm.module.css";
// import { LOGIN_USER } from "../../api";
import UserContext from "../../Context/UserContext";

const LoginForm = () => {
  const username = useForm("");
  const password = useForm("");

  const userContext = React.useContext(UserContext);

  if (!userContext) {
    return null;
  }

  const { userLogin, error, loading } = userContext;

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (username.validate() && password.validate()) {
      userLogin(username.value, password.value);
    }
  }

  return (
    <section className={`${styles.loginForm} container`}>
      <div className={styles.loginFormContainer1}>
        <p>
          Login ou cadastre-se em nosso site para continuar a comprar e receber
          descontos exclusivos
        </p>
      </div>
      <div className={styles.loginFormContainer2}>
        <h1 className={styles.titLogin}>LOGIN</h1>
      </div>
      <form
        onSubmit={handleSubmit}
        className={styles.loginFormContainer3}
        action=""
      >
        <Input label="NOME" type="text" name="username" campo={username} />
        <Input label="SENHA" type="password" name="password" campo={password} />
        {loading ? (
          <Button disabled>CARREGANDO...</Button>
        ) : (
          <Button>ENTRAR</Button>
        )}

        {error && <p>{error}</p>}
        <div className={styles.linkCriar}>
          <Link to="/login/criar">não tem uma conta? cadastre-se</Link>
        </div>
      </form>
    </section>
  );
};

export default LoginForm;
