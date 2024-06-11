import React, { useState } from "react";
import Input from "../../Forms/Input";
import styles from "./DashboardPostEdit.module.css";
import TextArea from "../../Forms/TextArea";
import useForm from "../../../Hooks/useForm";
import { useParams } from "react-router-dom";
import useFetch from "../../../Hooks/useFetch";
import { GET_POST_BY_ID, PUT_POST_BY_ID } from "../../../api";
import InputEditavel from "../../Forms/InputEditavel";
import TextAreaEditavel from "../../Forms/TextAreaEditavel";
import Error from "../../Helper/Error";

type PostType = {
  _id: string;
  title: string;
  autor: string;
  post: string;
  category: "utilidade" | "aviso" | "promocoes";
  createdAt: string;
  updatedAt: string;
};

const DashboardPostEdit = () => {
  const { id } = useParams();
  const token = window.localStorage.getItem("token");
  const [titleValue, setTitleValue] = useState<string>("");
  const [autorValue, setAutorValue] = useState<string>("");
  const [postValue, setPostValue] = useState<string>("");

  const [category, setCategory] = React.useState<
    "utilidade" | "aviso" | "promocoes"
  >("aviso");

  const { request, error, loading } = useFetch();
  const [postEdit, setPostEdit] = React.useState<PostType | undefined>();

  React.useEffect(() => {
    async function loadPost() {
      const { url, options } = GET_POST_BY_ID(id ?? "");
      const { response, json } = await request(url, options);
      if (response && response.ok) {
        setPostEdit(json);
        setCategory(json.category);
        setTitleValue(json.title);
        setAutorValue(json.autor);
        setPostValue(json.post);
      }
    }
    loadPost();
  }, [request, id]);

  const handleCategoryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCategory(event.target.value as "utilidade" | "aviso" | "promocoes");
  };

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    console.log("titulo: " + titleValue);
    console.log("autor: " + autorValue);
    console.log("post: " + postValue);
    console.log("categoria: " + category);

    if (id && token) {
      const { url, options } = PUT_POST_BY_ID(id, token, {
        title: titleValue,
        autor: autorValue,
        post: postValue,
        category: category,
      });

      const { response, json } = await request(url, options);
      console.log("json: " + JSON.stringify(json));
    }
  }

  return (
    <section className={styles.postContainer}>
      <form className={styles.postForm} onSubmit={handleSubmit}>
        <InputEditavel
          label="Titulo do Post"
          type="text"
          name="titulo"
          value={titleValue}
          onChange={(newValue) => {
            if (typeof newValue === "string") {
              setTitleValue(newValue); // Se for uma string, atualiza o estado diretamente
            } else {
              setTitleValue(newValue.target.value); // Se for um evento de mudança, extrai o valor do evento
            }
          }}
        />
        <InputEditavel
          label="Autor(a)"
          type="text"
          name="autor"
          value={autorValue}
          onChange={(newValue) => {
            if (typeof newValue === "string") {
              setAutorValue(newValue);
            } else {
              setAutorValue(newValue.target.value);
            }
          }}
        />

        <TextAreaEditavel
          label="Post"
          rows={40}
          name="post"
          value={postValue}
          onChange={(newValue) => {
            if (typeof newValue === "string") {
              setPostValue(newValue);
            } else {
              setPostValue(newValue.target.value);
            }
          }}
        />

        <div className={styles.categorias}>
          <h3>Categorias:</h3>
          <input
            type="radio"
            id="aviso"
            name="categoria"
            value="aviso"
            className={styles.red}
            checked={category === "aviso"}
            onChange={handleCategoryChange}
          />
          <label htmlFor="aviso">Aviso</label>
          <input
            className={styles.blue}
            type="radio"
            id="utilidade"
            name="categoria"
            value="utilidade"
            checked={category === "utilidade"}
            onChange={handleCategoryChange}
          />
          <label htmlFor="utilidade">Utilidade</label>
          <input
            className={styles.green}
            type="radio"
            id="promocoes"
            name="categoria"
            value="promocoes"
            checked={category === "promocoes"}
            onChange={handleCategoryChange}
          />
          <label htmlFor="promocoes">Promoções</label>
        </div>
        {loading ? (
          <button disabled className={styles.btn}>
            SALVANDO
          </button>
        ) : (
          <button className={styles.btn}>SALVAR MUDANÇAS</button>
        )}
        <Error error={error} />
      </form>
    </section>
  );
};

export default DashboardPostEdit;
