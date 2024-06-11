import React from "react";
import styles from "./Home.module.css";
import { Link } from "react-router-dom";
import atendimento from "../../assets/atendimento-105x100.svg";
import frete from "../../assets/frete-gratis-105x100.svg";
import hospedagem from "../../assets/hospedagem-105x100.svg";
import roedores from "../../assets/roedores-elipse-120x120.png";
import repteis from "../../assets/repteis-elipse-120x120.png";
import aves from "../../assets/aves-elipse-120x120.png";
import peixes from "../../assets/peixes-elipse-120x120.png";
import caes from "../../assets/caes-elipse-120x120.png";
import gatos from "../../assets/gatos-elipse-120x120.png";
import Card from "../Elements/Card";
import { GET_PRODUCTS_BY_CATEGORY } from "../../api";
import useFetch from "../../Hooks/useFetch";
import UserContext from "../../Context/UserContext";
import CartContext from "../../Context/cartContext";

type TipoProduto = {
  title: string;
  img: string;
  price: number;
  _id: string;
};

const Home = () => {
  const [products, setProducts] = React.useState<TipoProduto[] | null>();
  const userContext = React.useContext(UserContext);
  const cartContext = React.useContext(CartContext);

  const loadCart = React.useCallback(async () => {
    if (userContext?.login) {
      await cartContext?.createCart();
    }
  }, [userContext?.login, cartContext]);

  React.useEffect(() => {
    loadCart();
  }, [loadCart]);

  // React.useEffect(() => {
  //   async function loadCart() {
  //     if (userContext?.login) {
  //       await cartContext?.createCart();
  //     }
  //   }
  //   loadCart();
  // }, [userContext?.login]);

  const { request } = useFetch();
  React.useEffect(() => {
    async function loadProducts() {
      const { url, options } = GET_PRODUCTS_BY_CATEGORY("maisVendidos");
      // console.log("url: " + url);
      // console.log("options: " + options);
      const { response, json } = await request(url, options);
      // console.log("json: " + JSON.stringify(json));
      if (response && response.ok) {
        setProducts(json);
      }
    }
    loadProducts();
  }, [request]);

  return (
    <section className="container">
      <div className={styles.containerMainHero}>
        <div className={styles.col1}>
          <h1 className={styles.titPettop}>PETOP</h1>
        </div>
        <div className={styles.col2}>
          <div className={styles.pix}>
            <p>10% off no PIX</p>
          </div>
          <div className={styles.contentCol2}>
            <h1 className={styles.titCol2}>
              O Melhor Para o<br /> Seu Melhor Amigo
            </h1>
            <p className={styles.pCol2}>
              as melhores promoções de produtos de saúde higiene e beleza você
              encontra aqui.
            </p>
            <Link className={styles.linkCol2} to="/">
              Promoções
            </Link>
          </div>
        </div>
      </div>

      <div className={styles.beneficios}>
        <div className={styles.beneficiosLeft}>
          <div className={styles.beneficiosContent}>
            <img src={atendimento} alt="" />
            <div>
              <h4>Atendimento a domicilio</h4>
              <p>Atendimento de segunda a sexta feira</p>
            </div>
          </div>
        </div>

        <div className={styles.beneficiosMid}>
          <div className={styles.beneficiosContent}>
            <img src={frete} alt="" />
            <div>
              <h4>Frete Grátis </h4>
              <p>Em compras acima de R$ 150,00</p>
            </div>
          </div>
        </div>

        <div className={styles.beneficiosRight}>
          <div className={styles.beneficiosContent}>
            <img src={hospedagem} alt="" />
            <div>
              <h4>Hospedagem</h4>
              <p>Hotel para pet, para você viajar tranquilo</p>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.especialidades}>
        <h2 className={styles.especialidadesTit1}>NOSSOS</h2>
        <div className={`${styles.especialidadesAnimal} ${styles.corRed}`}>
          <div>
            <img src={roedores} alt="" />
            <Link className={styles.link} to="/produtos/roedor">
              ROEDORES
            </Link>
          </div>
        </div>
        <div className={`${styles.especialidadesAnimal} ${styles.corYellow}`}>
          <div>
            <img src={repteis} alt="" />
            <Link className={styles.link} to="/produtos/reptil">
              REPTEIS
            </Link>
          </div>
        </div>
        <div className={`${styles.especialidadesAnimal} ${styles.corGreen} `}>
          <div>
            <img src={aves} alt="" />
            <Link className={styles.link} to="/produtos/ave">
              AVES
            </Link>
          </div>
        </div>
        <div className={`${styles.especialidadesAnimal} ${styles.corRed}`}>
          <div>
            <img src={peixes} alt="" />
            <Link className={styles.link} to="/produtos/peixe">
              PEIXES
            </Link>
          </div>
        </div>
        <div className={`${styles.especialidadesAnimal} ${styles.corYellow}`}>
          <div>
            <img src={caes} alt="" />
            <Link className={styles.link} to="/produtos/cao">
              CÃES
            </Link>
          </div>
        </div>
        <div className={`${styles.especialidadesAnimal} ${styles.corGreen}`}>
          <div>
            <img src={gatos} alt="" />
            <Link className={styles.link} to="/produtos/gato">
              GATOS
            </Link>
          </div>
        </div>
        <h2 className={styles.especialidadesTit2}>DOMINIOS</h2>
      </div>

      <div className={styles.maisVendidos}>
        <div className={styles.maisVendidoscol1}>
          <h2>MAIS</h2>
          <h2>VEN</h2>
          <h2>DIDOS</h2>
        </div>
        <div className={styles.maisVendidoscol2}>
          {products?.map((product) => (
            <Card
              key={product._id}
              name={product.title}
              id={product._id}
              img={product.img}
              price={product.price}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Home;
