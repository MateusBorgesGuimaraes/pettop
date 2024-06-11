import React from "react";
import styles from "./DashboardPost.module.css";
import { Link } from "react-router-dom";
import clip from "../../../assets/link-30x17.svg";
import edit from "../../../assets/edit-32x32.svg";
import remove from "../../../assets/delete-32x36.svg";
import add from "../../../assets/add-post-32x32.svg";
import useFetch from "../../../Hooks/useFetch";
import { DEL_POST_BY_ID, GET_ALL_POSTS } from "../../../api";

type PostType = {
  _id: string;
  title: string;
  autor: string;
  post: string;
  category: "utilidade" | "aviso" | "promocoes";
  createdAt: string;
  updatedAt: string;
};

const DashboardPost = () => {
  const { request } = useFetch();
  const [posts, setPosts] = React.useState<PostType[] | undefined>();

  const removePost = React.useCallback(
    async function (event: React.MouseEvent<HTMLButtonElement>) {
      const postId = event.currentTarget.getAttribute("id");
      const token = window.localStorage.getItem("token");
      if (postId && token) {
        const { url, options } = DEL_POST_BY_ID(postId, token);

        const { response, json } = await request(url, options);

        // console.log("response:" + response);
        // console.log("json:" + JSON.stringify(json));

        if (response && response.ok) {
          // Remova o post do estado após a exclusão bem-sucedida
          setPosts((prevPosts) =>
            prevPosts?.filter((post) => post._id !== postId)
          );
        }
      }
    },
    [request]
  );

  React.useEffect(() => {
    async function loadPosts() {
      const { url, options } = GET_ALL_POSTS();
      const { response, json } = await request(url, options);
      if (response && response.ok) setPosts(json);
    }
    loadPosts();
  }, [request, removePost]);

  function getCategoryClass(
    category: "utilidade" | "aviso" | "promocoes"
  ): string {
    switch (category) {
      case "utilidade":
        return styles.blue1;
      case "aviso":
        return styles.red1;
      case "promocoes":
        return styles.green1;
      default:
        return ""; // ou qualquer classe de estilo padrão
    }
  }

  return (
    <section>
      <ul>
        {posts?.map((post) => (
          <li key={post._id} className={`${styles.postContainer}`}>
            <div
              className={`${styles.postContent} ${getCategoryClass(
                post.category
              )}`}
            >
              <div className={styles.postCol1}>
                <Link to={`/post/${post._id}`}>
                  <img src={clip} alt="" />
                  {post.title}
                </Link>
                <p>
                  <span>by</span> {post.autor}
                </p>
              </div>
              <p className={styles.containerLinkSecondCol}>
                {post.createdAt.slice(0, 10)}
              </p>
            </div>

            <Link to={`/dashboard/post/edit/${post._id}`}>
              <img src={edit} alt="" />
            </Link>

            <button
              className={styles.buttonRemove}
              id={post._id}
              onClick={removePost}
            >
              <img src={remove} alt="" />
            </button>
          </li>
        ))}
      </ul>

      <div className={styles.btnAddContainer}>
        <Link className={styles.btnAdd} to="/dashboard/post/add">
          NOVO POST <img src={add} alt="" />
        </Link>
      </div>
    </section>
  );
};

export default DashboardPost;
