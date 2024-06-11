import React from "react";
import styles from "./DashboardServicoInfo.module.css";
import checkWhite from "../../../assets/checked-white-32x32.svg";
import { useParams } from "react-router-dom";
import { GET_SERVICE_BY_ID, UPDATE_SERVICE_CHECKED } from "../../../api";
import useFetch from "../../../Hooks/useFetch";

type TipoService = {
  _id: string;
  nome: string;
  telefone: string;
  rua: string;
  bairro: string;
  cep: string;
  numero: number;
  date: string;
  hour: string;
  tipeService: "banho" | "tosa" | "adestramento" | "hospedagem";
  cheked: boolean;
  createdAt: string;
};

const DashboardServicoInfo = () => {
  const { request } = useFetch();
  const { id } = useParams();
  const [check, setCheck] = React.useState(false);
  const [service, setService] = React.useState<TipoService | null>();
  const token = window.localStorage.getItem("token");
  React.useEffect(() => {
    async function loadService() {
      if (id && token) {
        const { url, options } = GET_SERVICE_BY_ID(id, token);
        const { response, json } = await request(url, options);
        setService(json);
        console.log("JSON " + JSON.stringify(json));
      }
    }

    loadService();
  }, [id, request, token]);

  async function checkService() {
    if (id && token) {
      const { url, options } = UPDATE_SERVICE_CHECKED(id, token);
      const { response, json } = await request(url, options);
      // Atualize o estado do serviço com o valor retornado do backend
      console.log("Resposta do backend:", json);
      setService(json);
    }
  }

  // Verifique se o serviço está marcado
  const isServiceChecked = service?.cheked || false;

  return (
    <section className={styles.servicoInfo}>
      <div className={styles.dados1}>
        <h4>INFORMAÇÕES PESSOAIS</h4>
        <p>NOME: {service?.nome} </p>
        <p>TELEFONE: {service?.telefone}</p>
      </div>

      <div className={styles.dados1}>
        <h4>RUA: {service?.rua}</h4>
        <p>Bairro: {service?.bairro}</p>
        <p>CEP: {service?.cep}</p>
        <p>NUMERO: {service?.numero}</p>
      </div>

      <div className={styles.dados1}>
        <h4>DATA DO ATENDIMENTO</h4>
        <p>DATA: {service?.date}</p>
        <p>HORARIO: {service?.hour}</p>
      </div>

      <button onClick={checkService}>
        {isServiceChecked ? "CHECKADO" : "CHECK"}{" "}
        <img src={checkWhite} alt="" />
      </button>
    </section>
  );
};

export default DashboardServicoInfo;
