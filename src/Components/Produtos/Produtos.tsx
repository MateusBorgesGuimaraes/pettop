import React from "react";
import styles from "./Produtos.module.css";
import Card from "../Elements/Card";
import useFetch from "../../Hooks/useFetch";
import { GET_ALL_PRODUCTS_NEW, GET_PRODUCTS_BY_ESPECIE } from "../../api";
import { useParams } from "react-router-dom";

type TipoProduto = {
  title: string;
  img: string;
  price: number;
  _id: string;
};

type TipoEspecie = "ave" | "reptil" | "peixe" | "cao" | "gato" | "roedor";

const Produtos = () => {
  const [products, setProducts] = React.useState<TipoProduto[] | null>();
  const { request } = useFetch();

  const path = window.location.pathname;
  const id = path.split("/").pop();

  React.useEffect(() => {
    async function loadProducts() {
      if (id && id != undefined) {
        const idEspecie = id as TipoEspecie;
        const { url, options } = GET_PRODUCTS_BY_ESPECIE(idEspecie);
        const { response, json } = await request(url, options);
        if (response && response.ok) {
          setProducts(json);
        }
      } else {
        const { url, options } = GET_ALL_PRODUCTS_NEW();
        const { response, json } = await request(url, options);
        if (response && response.ok) {
          setProducts(json);
        }
      }
    }
    loadProducts();
  }, [request, id]);

  return (
    <section className="container">
      <div className={styles.produtosContainer}>
        <div className={styles.produtosContainer1}>
          <h3>filtrar produtos</h3>
          <div className={styles.especie}>
            <p className={styles.titMin}>Especie</p>
            <form className={styles.formClass} action="">
              <div className={styles.formCol1}>
                <div>
                  <input type="checkbox" id="aves" name="aves" value="aves" />
                  <label htmlFor="aves">aves</label>
                </div>

                <div>
                  <input type="checkbox" id="caes" name="caes" value="caes" />
                  <label htmlFor="caes">cães</label>
                </div>

                <div>
                  <input
                    type="checkbox"
                    id="gatos"
                    name="gatos"
                    value="gatos"
                  />
                  <label htmlFor="gatos">gatos</label>
                </div>
              </div>

              <div className={styles.formCol2}>
                <div>
                  <input
                    type="checkbox"
                    id="repteis"
                    name="repteis"
                    value="repteis"
                  />
                  <label htmlFor="repteis">repteis</label>
                </div>

                <div>
                  <input
                    type="checkbox"
                    id="roedores"
                    name="roedores"
                    value="roedores"
                  />
                  <label htmlFor="roedores">roedores</label>
                </div>

                <div>
                  <input
                    type="checkbox"
                    id="peixes"
                    name="peixes"
                    value="peixes"
                  />
                  <label htmlFor="peixes">peixes</label>
                </div>
              </div>
            </form>
          </div>

          <div className={styles.preco}>
            <h3>Preço</h3>
            <form className={`${styles.formClass} ${styles.col1}`} action="">
              <div className={styles.formCol1}>
                <div>
                  <input
                    type="checkbox"
                    id="preco1"
                    name="preco1"
                    value="preco1"
                  />
                  <label htmlFor="preco1">R$ 0,00 a R$ 25,00</label>
                </div>

                <div>
                  <input
                    type="checkbox"
                    id="preco2"
                    name="preco2"
                    value="preco2"
                  />
                  <label htmlFor="preco2">R$ 26,00 a R$ 75,00</label>
                </div>

                <div>
                  <input
                    type="checkbox"
                    id="preco3"
                    name="preco3"
                    value="preco3"
                  />
                  <label htmlFor="preco3">R$ 76,00 a R$ 150,00</label>
                </div>

                <div>
                  <input
                    type="checkbox"
                    id="preco4"
                    name="preco4"
                    value="preco4"
                  />
                  <label htmlFor="preco4">R$ 151,00 a R$ 300,00</label>
                </div>

                <div>
                  <input
                    type="checkbox"
                    id="preco5"
                    name="preco5"
                    value="preco5"
                  />
                  <label htmlFor="preco5">+R$ 300,00</label>
                </div>
              </div>
            </form>
          </div>

          <div className={styles.tipo}>
            <h3>Tipo de produto</h3>
            <form className={`${styles.formClass} ${styles.col1}`} action="">
              <div className={styles.formCol1}>
                <div>
                  <input
                    type="checkbox"
                    id="racao"
                    name="racao"
                    value="racao"
                  />
                  <label htmlFor="racao">ração</label>
                </div>

                <div>
                  <input
                    type="checkbox"
                    id="brinquedos"
                    name="brinquedos"
                    value="brinquedos"
                  />
                  <label htmlFor="brinquedos">brinquedos</label>
                </div>

                <div>
                  <input
                    type="checkbox"
                    id="saudeBeleza"
                    name="saudeBeleza"
                    value="saudeBeleza"
                  />
                  <label htmlFor="saudeBeleza">Saúde e Beleza</label>
                </div>
              </div>
            </form>
          </div>
        </div>
        <div className={styles.produtosContainer2}>
          <div className={styles.produtoTit}>
            <h2>NOSSOS PRODUTOS</h2>
          </div>

          <div className={styles.produtosContainer3}>
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
      </div>
    </section>
  );
};

export default Produtos;
