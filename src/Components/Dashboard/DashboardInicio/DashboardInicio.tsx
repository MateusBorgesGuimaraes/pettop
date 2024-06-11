import React from "react";
import styles from "./DashboardInicio.module.css";
import UserContext from "../../../Context/UserContext";
const DashboardInicio = () => {
  const userContext = React.useContext(UserContext);

  if (!userContext) {
    return null;
  }

  const { data, userLogout, admin } = userContext;
  return (
    <div className={styles.dashboardInit}>
      <h3>admin: {data?.username}</h3>
      <h3>email: {data?.email}</h3>
      <h3>criado em: {data?.createdAt.slice(0, 10)}</h3>
      <h3>telefone: {data?.telefone}</h3>
    </div>
  );
};

export default DashboardInicio;
