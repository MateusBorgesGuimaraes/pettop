import React from "react";
import styles from "./DashboardProduto.module.css";
import { Link } from "react-router-dom";
import addProd from "../../../assets/add-prod-32x32.svg";
import Input from "../../Forms/Input";
import search from "../../../assets/search-24x24.svg";
import remove from "../../../assets/remove-24x27.svg";
import {
  DEL_PROD_BY_ID,
  GET_PRODUCTS_BY_CATEGORY,
  GET_ALL_PRODUCTS_NEW,
} from "../../../api";
import useFetch from "../../../Hooks/useFetch";
import useForm from "../../../Hooks/useForm";

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

const DashboardProduto = () => {
  const token = window.localStorage.getItem("token");
  const [products, setProducts] = React.useState<TipoProduto[] | null>();
  // const [searchValue, setSearchValue] = React.useState("");
  const searchValue = useForm("");
  const { request } = useFetch();

  React.useEffect(() => {
    async function loadProducts() {
      if (token) {
        const { url, options } = GET_ALL_PRODUCTS_NEW();
        const { response, json } = await request(url, options);
        if (response && response.ok) {
          setProducts(json);
        }
      }
    }
    loadProducts();
  }, [token, request]);

  function getCategoryClass(
    mainCategory: "brinquedos" | "saudeBeleza" | "comida"
  ): string {
    switch (mainCategory) {
      case "brinquedos":
        return styles.yellow1;
      case "saudeBeleza":
        return styles.green1;
      case "comida":
        return styles.red1;
      default:
        return ""; // ou qualquer classe de estilo padrão
    }
  }

  async function handleSubmit(event: React.FocusEvent<HTMLFormElement>) {
    event.preventDefault();
    const { url, options } = GET_PRODUCTS_BY_CATEGORY(searchValue.value);
    // console.log("url: " + url);
    // console.log("options: " + options);
    const { response, json } = await request(url, options);
    // console.log("json: " + JSON.stringify(json));
    // console.log("searchValue: " + searchValue.value);
    if (response && response.ok) {
      setProducts(json);
    }
  }

  const deleteProduct = React.useCallback(
    async function (event: React.MouseEvent<HTMLButtonElement>) {
      const productId = event.currentTarget.getAttribute("id");
      if (productId && token) {
        const { url, options } = DEL_PROD_BY_ID(productId, token);
        const { response, json } = await request(url, options);

        // console.log("response:" + response);
        // console.log("json:" + JSON.stringify(json));

        if (response && response.ok) {
          // Remova o post do estado após a exclusão bem-sucedida
          setProducts((prevProducts) =>
            prevProducts?.filter((product) => product._id !== productId)
          );
        }
      }
    },
    [request, token]
  );

  return (
    <section className={styles.containerProdInfos}>
      <div className={styles.categorias}>
        <h3>Categorias</h3>
        <p className={styles.red}>Comida</p>
        <p className={styles.yellow}>Brinquedos</p>
        <p className={styles.green}>Saude e Beleza</p>
      </div>

      <div className={styles.produtosGeral}>
        <form className={styles.formSearch} onSubmit={handleSubmit}>
          <Input
            campo={searchValue}
            // className={styles.inputForm}
            placeholder="Pesquisar por categoria"
          />
          <button className={styles.buttonForm}>
            <img src={search} alt="" />
          </button>
        </form>

        <ul className={styles.produto}>
          {products?.map((product) => (
            <li key={product._id}>
              <div
                className={`${styles.bg} ${getCategoryClass(
                  product.mainCategory
                )}`}
              >
                <Link to={`/produto/${product._id}`} className={styles.nome}>
                  {product.title}
                </Link>
                <p className={styles.preco}>R$ {product.price}</p>
              </div>
              <button id={product._id} onClick={deleteProduct}>
                <img src={remove} alt="" />
              </button>
            </li>
          ))}
        </ul>

        <Link to="/dashboard/produto/add" className={styles.buttonAdd}>
          NOVO PRODUTO <img src={addProd} alt="" />
        </Link>
      </div>
    </section>
  );
};

export default DashboardProduto;
