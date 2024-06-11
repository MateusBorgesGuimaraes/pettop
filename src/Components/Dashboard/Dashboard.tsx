import React from "react";
import { Route, Routes, useLocation, useParams } from "react-router-dom";
import DashboardPost from "./DashboardPost/DashboardPost";
import DashboardPostAdd from "./DashboardPostAdd/DashboardPostAdd";
import DashboardServico from "./DashboardServico/DashboardServico";
import Sidenav from "./Sidenav/Sidenav";
import DashboardProduto from "./DashboardProduto/DashboardProduto";
import DashboardUser from "./DashboardUser/DashboardUser";
import styles from "./Dashboard.module.css";
import DashboardInicio from "./DashboardInicio/DashboardInicio";
import DashboardPostEdit from "./DashboardPostEdit/DashboardPostEdit";
import DashboardServicoInfo from "./DashboardServicoInfo/DashboardServicoInfo";
import DashboardProdAdd from "./DashboardProdAdd/DashboardProdAdd";
import DashboardUsersDados from "./DashboardUsersDados/DashboardUsersDados";

const Dashboard = () => {
  const { pathname } = useLocation();

  function formatarString(str: string): string {
    // Substitui "/" e "-" por espaços, converte para maiúsculas e adiciona um espaço no início
    return str
      .replace(/[/-]/g, " ")
      .replace("dashboard", "")
      .toUpperCase()
      .trim();
  }

  // Exemplo de uso
  const stringFormatada: string = formatarString("/dashboard/post");
  // console.log(stringFormatada);

  let title;
  if (pathname === "/dashboard") {
    title = "INICIO";
  } else {
    title = formatarString(pathname);
  }

  return (
    <section className="container">
      <div className={styles.dashboardContainer}>
        <div className={styles.dashboardCol1}>
          <Sidenav />
        </div>
        <div className={styles.dashboardCol2}>
          <div className={styles.produtoTit}>
            <h2>{title}</h2>
          </div>
          <main className={styles.dashboardCol2down}>
            <Routes>
              <Route path="/" element={<DashboardInicio />} />
              <Route path="/post/*" element={<DashboardPost />} />
              <Route path="/post/add" element={<DashboardPostAdd />} />
              <Route path="/post/edit/:id" element={<DashboardPostEdit />} />
              <Route path="/servico/*" element={<DashboardServico />} />
              <Route path="/servico/:id" element={<DashboardServicoInfo />} />
              <Route path="/produto/*" element={<DashboardProduto />} />
              <Route path="/produto/add" element={<DashboardProdAdd />} />
              <Route path="/user/*" element={<DashboardUser />} />
              <Route path="/user/:id" element={<DashboardUsersDados />} />
            </Routes>
          </main>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
