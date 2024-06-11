import React from "react";
import styles from "./Servico.module.css";
import Input from "../Forms/Input";
import Button from "../Forms/Button";
import { useParams } from "react-router-dom";
import useForm from "../../Hooks/useForm";
import { SERVICE_POST } from "../../api";
import useFetch from "../../Hooks/useFetch";
import Error from "../Helper/Error";

const Servico = () => {
  type ServiceId = "hospedagem" | "adestramento" | "tosa" | "banho";
  const { id } = useParams<{ id: ServiceId }>();
  const { request, error, loading } = useFetch();

  const nome = useForm("");
  const telefone = useForm("");
  const rua = useForm("");
  const bairro = useForm("");
  const cep = useForm("");
  const numero = useForm("");
  const date = useForm("");
  const hour = useForm("");

  let title;
  if (id === "banho") {
    title = "BANHO";
  } else if (id === "tosa") {
    title = "TOSA";
  } else if (id === "adestramento") {
    title = "ADESTRAMENTO";
  } else if (id === "hospedagem") {
    title = "HOSPEDAGEM";
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const token = window.localStorage.getItem("token");
    if (token && id) {
      const { url, options } = SERVICE_POST(
        {
          nome: nome.value,
          telefone: telefone.value,
          rua: rua.value,
          bairro: bairro.value,
          cep: cep.value,
          numero: +numero.value,
          date: date.value,
          hour: hour.value,
          tipeService: id,
        },
        token
      );

      const { json } = await request(url, options);
    }
  }

  return (
    <section className={`${styles.produto} container`}>
      <div className={styles.produtoContainer1}>
        <p>
          Preencha o formulario com suas informações e as datas de agendamento
          pretendidas e entraremos em contato em ate 24 horas
        </p>
      </div>
      <div className={styles.produtoContainer2}>
        <h1 className={styles.titLogin}>{title}</h1>
      </div>
      <form className={styles.produtoContainer3} onSubmit={handleSubmit}>
        {/* <form className={styles.produtoContainer3}> */}
        <Input label="NOME" type="text" name="username" campo={nome} />
        <Input label="TELEFONE" type="text" name="telefone" campo={telefone} />
        <Input label="RUA" type="text" name="rua" campo={rua} />
        <Input label="BAIRRO" type="text" name="bairro" campo={bairro} />
        <div className={styles.produtoContainer3Flex}>
          <Input label="CEP" type="text" name="cep" campo={cep} />
          <Input label="NUMERO" type="text" name="numero" campo={numero} />
        </div>
        <div className={styles.produtoContainer3Flex}>
          <Input label="DATA" type="text" name="data" campo={date} />
          <Input label="HORARIO" type="text" name="horario" campo={hour} />
        </div>
        {loading ? (
          <Button disabled>ENVIANDO...</Button>
        ) : (
          <Button>AGENDAR</Button>
        )}
        <Error error={error} />
      </form>
    </section>
  );
};

export default Servico;
