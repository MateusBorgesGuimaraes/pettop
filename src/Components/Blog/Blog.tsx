import React from "react";
import styles from "./Blog.module.css";
import { Link, Route, Routes } from "react-router-dom";
import clip from "../../assets/link-30x17.svg";
import Post from "../Post/Post";
import { GET_ALL_POSTS } from "../../api";
import useFetch from "../../Hooks/useFetch";

type PostType = {
  _id: string;
  title: string;
  autor: string;
  post: string;
  category: "utilidade" | "aviso" | "promocoes";
  createdAt: string;
  updatedAt: string;
};

const Blog = () => {
  const { request } = useFetch();
  const [posts, setPosts] = React.useState<PostType[] | undefined>();

  React.useEffect(() => {
    async function loadPosts() {
      const { url, options } = GET_ALL_POSTS();
      const { response, json } = await request(url, options);
      // console.log("json: " + JSON.stringify(json));
      // console.log("response: " + JSON.stringify(response));
      if (response && response.ok) setPosts(json);
    }
    loadPosts();
  }, [request]);

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
    <section className="container">
      <div className={styles.blogContainer}>
        <div className={styles.blogCol1}>
          <h1 className={styles.titCol1}>BLOG</h1>
        </div>
        <div className={styles.blogCol2}>
          <div className={styles.containerLegenda}>
            <p className={styles.red}>aviso</p>{" "}
            <p className={styles.blue}>utilidade</p>
            <p className={styles.green}>promoções</p>
          </div>
          <ul className={styles.containerLinks}>
            {posts?.map((post) => (
              <li
                key={post._id}
                className={`${styles.containerLink} ${getCategoryClass(
                  post.category
                )}`}
              >
                <div className={styles.containerLinkfirtCol}>
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
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Blog;
