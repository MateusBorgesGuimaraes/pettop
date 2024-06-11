import React, { useState } from "react";
import styles from "./DashboardProdAdd.module.css";
import Input from "../../Forms/Input";
import Button from "../../Forms/Button";
import addProd from "../../../assets/add-prod-32x32.svg";
import useFetch from "../../../Hooks/useFetch";
import useForm from "../../../Hooks/useForm";
import { PROD_POST } from "../../../api";
import Error from "../../Helper/Error";

type TipoProduto = {
  title: string;
  desc: string;
  especie: "ave" | "reptil" | "peixe" | "cao" | "gato" | "roedor";
  img: string;
  mainCategory: "brinquedos" | "saudeBeleza" | "comida";
  subCategories?: string[];
  price: number;
  _id: string;
};

type TipeCategories = "brinquedos" | "saudeBeleza" | "comida";
type TipeEspecies = "ave" | "reptil" | "peixe" | "cao" | "gato" | "roedor";

const DashboardProdAdd = () => {
  const { request, loading, error } = useFetch();
  const [categoriaSelecionada, setCategoriaSelecionada] =
    useState<TipeCategories | null>();
  const [especieSelecionada, setEspecieSelecionada] =
    useState<TipeEspecies | null>();

  const title = useForm("");
  const subCategories = useForm("");
  const price = useForm("");
  const desc = useForm("");
  const img = useForm("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const token = window.localStorage.getItem("token");
    if (token && categoriaSelecionada && especieSelecionada) {
      // console.log("post: " + post.value);
      console.log("token: " + token);
      console.log("title: " + title.value);
      console.log("desc: " + desc.value);
      console.log("especie: " + especieSelecionada);
      console.log("img: " + img.value);
      console.log("main: " + categoriaSelecionada);
      console.log("subCategories: " + subCategories.value.split(", "));
      console.log("price: " + +price.value);
      const { url, options } = PROD_POST(token, {
        title: title.value,
        desc: desc.value,
        especie: especieSelecionada,
        img: img.value,
        mainCategory: categoriaSelecionada,
        subCategories: subCategories.value.split(", "),
        price: +price.value,
      });

      const { response, json } = await request(url, options);
      console.log("json: " + JSON.stringify(json));
    }
  }

  // const userContext = React.useContext(UserContext);

  // if (!userContext) {
  //   return null;
  // }
  return (
    <div className={styles.containerProdAdd}>
      <form className={styles.formAddProd} onSubmit={handleSubmit}>
        <div className={styles.categorias}>
          <h3>Categorias:</h3>
          <input
            type="radio"
            id="brinquedos"
            name="categoria"
            value="brinquedos"
            className={styles.red}
            onChange={() => setCategoriaSelecionada("brinquedos")}
          />
          <label htmlFor="brinquedos">Brinquedos</label>
          <input
            className={styles.blue}
            type="radio"
            id="saude"
            name="categoria"
            value="saude"
            onChange={() => setCategoriaSelecionada("saudeBeleza")}
          />
          <label htmlFor="saude">Saude e Beleza</label>
          <input
            className={styles.green}
            type="radio"
            id="comida"
            name="categoria"
            value="comida"
            onChange={() => setCategoriaSelecionada("comida")}
          />
          <label htmlFor="comida">Comida</label>
        </div>

        <div className={styles.categorias}>
          <h3>Especies:</h3>
          <input
            type="radio"
            id="ave"
            name="especie"
            value="ave"
            className={styles.red}
            onChange={() => setEspecieSelecionada("ave")}
          />
          <label htmlFor="ave">Ave</label>
          <input
            className={styles.blue}
            type="radio"
            id="reptil"
            name="especie"
            value="reptil"
            onChange={() => setEspecieSelecionada("reptil")}
          />
          <label htmlFor="reptil">Reptil</label>
          <input
            className={styles.green}
            type="radio"
            id="peixe"
            name="especie"
            value="peixe"
            onChange={() => setEspecieSelecionada("peixe")}
          />
          <label htmlFor="peixe">Peixe</label>
          <input
            type="radio"
            id="cao"
            name="especie"
            value="cao"
            className={styles.red}
            onChange={() => setEspecieSelecionada("cao")}
          />
          <label htmlFor="cao">Cão</label>
          <input
            className={styles.blue}
            type="radio"
            id="gato"
            name="especie"
            value="gato"
            onChange={() => setEspecieSelecionada("gato")}
          />
          <label htmlFor="gato">Gato</label>
          <input
            className={styles.green}
            type="radio"
            id="roedor"
            name="especie"
            value="roedor"
            onChange={() => setEspecieSelecionada("roedor")}
          />
          <label htmlFor="roedor">Roedor</label>
        </div>
        <Input label="Nome do Produto:" campo={title} />
        <Input
          label="Sub categorias: (adicione as categoria separadas por , )"
          campo={subCategories}
        />
        <Input label="Preço do produto:" campo={price} />
        <Input label="Descrição do produto:" campo={desc} />
        <Input label="Link com a imagem do produto:" campo={img} />

        {loading ? (
          <Button disabled className={styles.prodAddBtn}>
            ADICIONANDO..
          </Button>
        ) : (
          <Button className={styles.prodAddBtn}>ADD PRODUTO</Button>
        )}

        <Error error={error} />
      </form>
    </div>
  );
};

export default DashboardProdAdd;
