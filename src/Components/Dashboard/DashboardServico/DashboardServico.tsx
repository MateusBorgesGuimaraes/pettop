import React from "react";
import styles from "./DashboardServico.module.css";
import { Link } from "react-router-dom";
import linkWhite from "../../../assets/link-white-30x17.svg";
import newIcon from "../../../assets/new-40x40.svg";
import checkIcon from "../../../assets/checked-40x40.svg";
import { GET_ALL_SERVICES } from "../../../api";
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

const DashboardServico = () => {
  const { request } = useFetch();
  const [services, setServices] = React.useState<TipoService[] | null>();

  function getCategoryClass(
    category: "banho" | "tosa" | "adestramento" | "hospedagem"
  ): string {
    switch (category) {
      case "banho":
        return styles.blue1;
      case "tosa":
        return styles.red1;
      case "adestramento":
        return styles.green1;
      case "hospedagem":
        return styles.yellow1;
      default:
        return ""; // ou qualquer classe de estilo padrão
    }
  }

  React.useEffect(() => {
    async function loadServices() {
      const token = window.localStorage.getItem("token");
      if (token) {
        const { url, options } = GET_ALL_SERVICES(token);
        const { response, json } = await request(url, options);
        // console.log("services: " + JSON.stringify(json));
        setServices(json);
      }
    }
    loadServices();
  }, [request]);

  // if(!services) return null
  return (
    <section>
      <ul className={styles.containerPedidos}>
        {services &&
          services.map((service) => (
            <li key={service._id} className={`${styles.pedidoCont}`}>
              {service.cheked ? (
                <img src={checkIcon} alt="" />
              ) : (
                <img src={newIcon} alt="" />
              )}
              <div
                className={`${styles.pedido} ${getCategoryClass(
                  service.tipeService
                )}`}
              >
                <div className={styles.firsPart}>
                  <Link to={`/dashboard/servico/${service._id}`}>
                    <img src={linkWhite} alt="" />
                    <p>{service.tipeService}</p>
                  </Link>
                  <p>Cliente: {service.nome}</p>
                </div>
              </div>
              <p className={styles.dateCreate}>
                {service.createdAt.slice(0, 10)}
              </p>
            </li>
          ))}
      </ul>
    </section>
  );
};

export default DashboardServico;
