import React from "react";
import styles from "../DashboardServicoInfo/DashboardServicoInfo.module.css";
import { useParams } from "react-router-dom";
import useFetch from "../../../Hooks/useFetch";
import { GET_USER_BY_ID } from "../../../api";

type TipoUser = {
  username: string;
  email: string;
  telefone: string;
  rua: string;
  bairro: string;
  cep: string;
  numero: number;
};

const DashboardUsersDados = () => {
  const { id } = useParams();
  const { request } = useFetch();

  const [user, setUser] = React.useState<TipoUser>();

  React.useEffect(() => {
    async function loadUser() {
      const token = window.localStorage.getItem("token");
      if (token && id) {
        const { url, options } = GET_USER_BY_ID(id, token);
        const { response, json } = await request(url, options);
        setUser(json);
      }
    }
    loadUser();
  }, [request, id]);

  return (
    <section className={styles.servicoInfo}>
      <div className={styles.dados1}>
        <h4>INFORMAÇÕES PESSOAIS</h4>
        <p>NOME: {user?.username}</p>
        <p>TELEFONE: {user?.telefone}</p>
        <p>EMAIL: {user?.email} </p>
      </div>

      <div className={styles.dados1}>
        <h4>ENDEREÇO</h4>
        <p>RUA: {user?.rua}</p>
        <p>Bairro: {user?.bairro}</p>
        <p>CEP: {user?.cep}</p>
        <p>NUMERO: {user?.numero}</p>
      </div>
    </section>
  );
};

export default DashboardUsersDados;
