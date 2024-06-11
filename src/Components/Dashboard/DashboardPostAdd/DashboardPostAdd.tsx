import React, { useState } from "react";
import Input from "../../Forms/Input";
import addPost from "../../../assets/add-post-32x32.svg";
import styles from "./DashboardPostAdd.module.css";
import TextArea from "../../Forms/TextArea";
import useForm from "../../../Hooks/useForm";
import { useParams } from "react-router-dom";
import { BLOG_POST } from "../../../api";
import UserContext from "../../../Context/UserContext";
import useFetch from "../../../Hooks/useFetch";
import Error from "../../Helper/Error";

const DashboardPostAdd = () => {
  type TipeCategories = "utilidade" | "aviso" | "promocoes";
  const { request, loading, error } = useFetch();
  const [categoriaSelecionada, setCategoriaSelecionada] =
    useState<TipeCategories | null>();

  // const { id } = useParams();
  const title = useForm("");
  const autor = useForm("");
  const post = useForm("");

  const userContext = React.useContext(UserContext);

  if (!userContext) {
    return null;
  }

  const { admin } = userContext;

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const token = window.localStorage.getItem("token");
    if (admin && token && categoriaSelecionada) {
      console.log("post: " + post.value);
      const { url, options } = BLOG_POST(token, {
        title: title.value,
        autor: autor.value,
        post: post.value,
        category: categoriaSelecionada,
      });

      const { response, json } = await request(url, options);
      console.log("json: " + JSON.stringify(json));
    }
  }

  return (
    <section className={styles.postContainer}>
      <form className={styles.postForm} onSubmit={handleSubmit}>
        <Input label="Titulo do Post" type="text" name="titulo" campo={title} />
        <Input label="Autor(a)" type="text" name="autor" campo={autor} />
        <TextArea label="Post" rows={40} name="post" campo={post} />
        <div className={styles.categorias}>
          <h3>Categorias:</h3>
          <input
            type="radio"
            id="aviso"
            name="categoria"
            value="aviso"
            className={styles.red}
            onChange={() => setCategoriaSelecionada("aviso")}
          />
          <label htmlFor="aviso">Aviso</label>
          <input
            className={styles.blue}
            type="radio"
            id="utilidade"
            name="categoria"
            value="utilidade"
            onChange={() => setCategoriaSelecionada("utilidade")}
          />
          <label htmlFor="utilidade">Utilidade</label>
          <input
            className={styles.green}
            type="radio"
            id="promocoes"
            name="categoria"
            value="promocoes"
            onChange={() => setCategoriaSelecionada("promocoes")}
          />
          <label htmlFor="promocoes">Promoções</label>
        </div>
        {loading ? (
          <button disabled className={styles.btn}>
            ADICINANDO...
          </button>
        ) : (
          <button className={styles.btn}>
            ADD POST <img src={addPost} alt="" />
          </button>
        )}
        <Error error={error} />
      </form>
    </section>
  );
};

export default DashboardPostAdd;
