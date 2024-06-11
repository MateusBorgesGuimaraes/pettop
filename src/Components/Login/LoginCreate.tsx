import React from "react";
import styles from "./LoginCreate.module.css";
import Input from "../Forms/Input";
import Button from "../Forms/Button";
import useForm from "../../Hooks/useForm";
import { USER_POST } from "../../api";
import UserContext from "../../Context/UserContext";
import useFetch from "../../Hooks/useFetch";
import Error from "../Helper/Error";

const LoginCreate = () => {
  const username = useForm("");
  const password = useForm("");
  const email = useForm("email");
  const telefone = useForm("");
  const rua = useForm("");
  const bairro = useForm("");
  const cep = useForm("");
  const numero = useForm("");

  const { userLogin } = React.useContext(UserContext) || {};
  const { loading, error, request } = useFetch();

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const { url, options } = USER_POST({
      username: username.value,
      password: password.value,
      email: email.value,
      telefone: telefone.value,
      rua: rua.value,
      bairro: bairro.value,
      cep: cep.value,
      numero: +numero.value,
    });
    // const response  = await fetch(url, options);
    const { response } = await request(url, options);

    if (response?.ok && userLogin) {
      userLogin(username.value, password.value);
    }
  }

  return (
    <section className={`${styles.loginForm} container`}>
      <form className={styles.loginFormContainer1} onSubmit={handleSubmit}>
        <Input label="NOME" type="text" name="username" campo={username} />
        <Input label="SENHA" type="password" name="password" campo={password} />
        <Input label="EMAIL" type="email" name="email" campo={email} />
        <Input label="TELEFONE" type="text" name="telefone" campo={telefone} />
        <Input label="RUA" type="text" name="rua" campo={rua} />
        <Input label="BAIRRO" type="text" name="bairro" campo={bairro} />
        <div className={styles.loginFormContainer1Flex}>
          <Input label="CEP" type="text" name="cep" campo={cep} />
          <Input label="NUMERO" type="number" name="numero" campo={numero} />
        </div>
        {loading ? (
          <Button disabled>CADASTRANDO...</Button>
        ) : (
          <Button>CADASTRAR</Button>
        )}
        <Error error={error} />
      </form>
      <div className={styles.loginFormContainer2}>
        <h1 className={styles.titLogin}>CADASTRO</h1>
      </div>
    </section>
  );
};

export default LoginCreate;
