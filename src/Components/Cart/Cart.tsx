import React from "react";
import styles from "./Cart.module.css";
import prodtest1 from "../../assets/imgteste-200x346.png";
import prodtest2 from "../../assets/imgteste2-200x345.png";
import more from "../../assets/more-add-cart-30x30.svg";
import minus from "../../assets/minus-remove-cart-30x30.svg";
import CartContext from "../../Context/cartContext";
import { GET_PRODUCT_BY_ID } from "../../api";

type IProduct = {
  productId: string;
  quantity: number;
};

type IProductInfo = {
  productId: string;
  quantity: number;
  // _id: string;
  img: string;
  price: number;
};

const Cart = () => {
  const cartContext = React.useContext(CartContext);
  const [productsInfo, setProductsInfo] = React.useState<IProductInfo[]>([]);

  function calculateSubtotal(productsInfo: IProductInfo[]) {
    return productsInfo.reduce((total, product) => {
      const subtotal = product.quantity * product.price;
      return total + subtotal;
    }, 0);
  }

  React.useEffect(() => {
    if (cartContext && cartContext.dataCart) {
      const fetchProductInfo = async () => {
        const products = cartContext.dataCart?.products || [];

        const fetchProductPromises = products?.map(
          async (product: IProduct) => {
            const { productId, quantity } = product;
            const { url, options } = GET_PRODUCT_BY_ID(productId);
            const response = await fetch(url, options);
            const productData = await response.json();

            const productInfo: IProductInfo = {
              productId: productData._id,
              quantity,
              // _id: product.productId,
              img: productData.img,
              price: productData.price,
            };

            return productInfo;
          }
        );

        const productsInfo = await Promise.all(fetchProductPromises);
        setProductsInfo(productsInfo);
      };
      fetchProductInfo();
    }
  }, [cartContext]);

  function handleClick(id: string) {
    cartContext?.addItem(id);
  }

  function handleClickM(id: string) {
    cartContext?.removeItem(id);
  }

  // console.log("cart depois de tudo: " + JSON.stringify(productsInfo));

  const subtotal = calculateSubtotal(productsInfo);

  return (
    <section className="container">
      <div className={styles.cartContainer}>
        <div className={styles.cartCol1}>
          <h2>CART</h2>
        </div>
        <div className={styles.cartCol2}>
          <div className={styles.tableContainer}>
            <table>
              <caption className={styles.titulo}>Produtos</caption>

              <tr className={styles.header}>
                <th>Produto</th>
                <th>Preço</th>
                <th>Quantidade</th>
                <th>Subtotal</th>
              </tr>

              {productsInfo.map((prod) => (
                <tr key={prod.productId} className={styles.produtos}>
                  <td className={styles.produto}>
                    <button
                      onClick={() => handleClick(prod.productId)}
                      className={styles.more}
                    >
                      <img src={more} alt="" />
                    </button>

                    <img className={styles.img} src={prod.img} alt="" />

                    <button
                      onClick={() => handleClickM(prod.productId)}
                      className={styles.minus}
                    >
                      <img src={minus} alt="" />
                    </button>
                  </td>
                  <td className={styles.preco}>R$ {prod.price}</td>
                  <td className={styles.quantidade}>{prod.quantity}</td>
                  <td className={styles.subtotal}>
                    R$ {(prod.price * prod.quantity).toFixed(2)}
                  </td>
                </tr>
              ))}

              {/* <tr className={styles.produtos}>
                <td className={styles.produto}>
                  <button className={styles.more}>
                    <img src={more} alt="" />
                  </button>

                  <img className={styles.img} src={prodtest2} alt="" />

                  <button className={styles.minus}>
                    <img src={minus} alt="" />
                  </button>
                </td>
                <td className={styles.preco}>R$ 75,00</td>
                <td className={styles.quantidade}>4</td>
                <td className={styles.subtotal}>R$ 300,00</td>
              </tr> */}
            </table>
          </div>
        </div>

        <div className={styles.cartCol3}>
          <p>TOTAL: R$ {subtotal.toFixed(2)}</p>

          <button>FINALIZAR</button>
        </div>
      </div>
    </section>
  );
};

export default Cart;
