import React, { useContext } from "react";
import styles from "./DashboardUser.module.css";
import Input from "../../Forms/Input";
import search from "../../../assets/search-24x24.svg";
import { Link } from "react-router-dom";
import remove from "../../../assets/remove-24x27.svg";
import linkWhite from "../../../assets/link-white-30x17.svg";
import { DEL_USER_BY_ID, GET_ALL_USERS } from "../../../api";
import useFetch from "../../../Hooks/useFetch";

type TipoUsers = {
  username: string;
  _id: string;
  isAdmin: boolean;
};

const DashboardUser = () => {
  const { request } = useFetch();
  const [users, setUsers] = React.useState<TipoUsers[]>();
  const token = window.localStorage.getItem("token");

  const deleteUser = React.useCallback(
    async function (event: React.MouseEvent<HTMLButtonElement>) {
      const postId = event.currentTarget.getAttribute("id");
      if (postId && token) {
        const { url, options } = DEL_USER_BY_ID(postId, token);
        const { response, json } = await request(url, options);

        // console.log("response:" + response);
        // console.log("json:" + JSON.stringify(json));

        if (response && response.ok) {
          // Remova o post do estado após a exclusão bem-sucedida
          setUsers((prevPosts) =>
            prevPosts?.filter((post) => post._id !== postId)
          );
        }
      }
    },
    [request, token]
  );

  React.useEffect(() => {
    async function loadUsers() {
      if (token) {
        const { url, options } = GET_ALL_USERS(token);
        const { response, json } = await request(url, options);
        setUsers(json);
      }
    }
    loadUsers();
  }, [request, token]);

  return (
    <section className={styles.usersGeral}>
      <h1 className={styles.h1Geral}>INFORMAÇÕES DOS USUARIOS: </h1>
      <ul className={styles.user}>
        {users?.map((user) => (
          <li key={user._id}>
            <div className={styles.bg}>
              <Link to={`/dashboard/user/${user._id}`} className={styles.nome}>
                <img src={linkWhite} alt="" /> {user.username}
              </Link>
            </div>
            <button id={user._id} onClick={deleteUser}>
              <img src={remove} alt="" />
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default DashboardUser;
