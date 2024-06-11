import React from "react";
import styles from "./Post.module.css";
import useFetch from "../../Hooks/useFetch";
import { GET_POST_BY_ID } from "../../api";
import { useLocation } from "react-router-dom";

type PostType = {
  _id: string;
  title: string;
  autor: string;
  post: string;
  category: "utilidade" | "aviso" | "promocoes";
  createdAt: string;
  updatedAt: string;
};
const Post = () => {
  const { request } = useFetch();
  const [post, setPost] = React.useState<PostType | undefined>();

  const { pathname } = useLocation();

  const postId = pathname.split("/").pop();

  React.useEffect(() => {
    async function loadPosts() {
      const { url, options } = GET_POST_BY_ID(postId ?? "");
      const { response, json } = await request(url, options);
      if (response && response.ok) setPost(json);
    }
    loadPosts();
  }, [request, postId]);

  return (
    <section className="container">
      <div className={styles.postContainer}>
        <div className={styles.postCol1}>
          <h1 className={styles.titCol1}>POST</h1>
        </div>
        <div className={styles.postCol2}>
          <h3>{post?.title}</h3>
          <h4>autor(a): {post?.autor}</h4>
          <p>{post?.post}</p>
          <div className={styles.date}>
            Data do post: {post?.createdAt.slice(0, 10)}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Post;
