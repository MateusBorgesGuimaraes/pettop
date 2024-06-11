import React from "react";
import styles from "./Produto.module.css";
import { Link, useParams } from "react-router-dom";
import imgRacao from "../../assets/imgteste-200x346.png";
import cartAdd from "../../assets/cartadd-32x30.svg";
import useFetch from "../../Hooks/useFetch";
import { GET_PRODUCT_BY_ID } from "../../api";
import CartContext from "../../Context/cartContext";
import UserContext from "../../Context/UserContext";

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

const Produto = () => {
  const { request } = useFetch();
  const { id } = useParams();
  const [product, setProduct] = React.useState<TipoProduto | null>();

  const cartContext = React.useContext(CartContext);
  const userContext = React.useContext(UserContext);

  function handleClick(id: string) {
    cartContext?.addItem(id);
  }

  React.useEffect(() => {
    async function loadProduct() {
      if (id) {
        const { url, options } = GET_PRODUCT_BY_ID(id);
        // console.log("url: " + JSON.stringify(url));
        // console.log("options: " + JSON.stringify(options));
        const { response, json } = await request(url, options);
        // console.log("json: " + JSON.stringify(json));

        if (response && response.ok) setProduct(json);
      }
    }
    loadProduct();
  }, [request, id]);

  return (
    <section className={`${styles.produto} container`}>
      <div className={styles.produtoContainer1}>
        <p>
          Compre agora os melhores produtos com os melhores preços. PRECISA
          ESTAR LOGADO PARA EFETUAR A COMPRA !!!
        </p>
      </div>
      <div className={styles.produtoContainer2}>
        <h1 className={styles.titProduto}>PRODUTO</h1>
      </div>
      <div className={styles.produtoContainer3}>
        <div className={styles.produtoImg}>
          <img src={product?.img} alt="" />
        </div>

        <div className={styles.content}>
          <p className={styles.pix}>
            R$ {product ? (product.price * 0.95).toFixed(2) : ""} com desconto
            de 5% no PIX
          </p>
          <h4 className={styles.nomeProduto}>{product?.title}</h4>
          <p className={styles.descProduto}>{product?.desc}</p>
          <div className={styles.btnContainer}>
            <Link className={styles.btnComprar} to="/">
              COMPRAR
            </Link>
            {userContext?.login ? (
              <button className={styles.btnAdd}>
                <img
                  src={cartAdd}
                  alt=""
                  onClick={() => product && handleClick(product._id)}
                />
              </button>
            ) : (
              <button className={styles.btnAdd}>
                <img src={cartAdd} alt="" />
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Produto;
