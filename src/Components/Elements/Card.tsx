import React from "react";
import styles from "./Card.module.css";
import { Link } from "react-router-dom";
import test from "../../assets/imgteste-200x346.png";
import cart from "../../assets/cartadd-20x19.svg";
import CartContext from "../../Context/cartContext";
import UserContext from "../../Context/UserContext";

type Card = {
  name: string;
  price: number;
  id: string;
  img: string;
};

const Card = ({ name, price, id, img }: Card) => {
  const cartContext = React.useContext(CartContext);
  const userContext = React.useContext(UserContext);

  function handleClick(id: string) {
    cartContext?.addItem(id);
  }

  return (
    <div className={styles.card}>
      <div className={styles.imageContainer}>
        <img className={styles.image} src={img} alt="" />
      </div>
      <div className={styles.secondRowCard}>
        <p className={styles.name}>{name}</p>
        <span className={styles.price}>R$ {price}</span>
        <div className={styles.btns}>
          <Link className={styles.btnComprar} to={`/produto/${id}`}>
            VER MAIS
          </Link>
          {userContext?.login ? (
            <button onClick={() => handleClick(id)} className={styles.btnAdd}>
              <img src={cart} alt="" />
            </button>
          ) : (
            <button className={styles.btnAdd}>
              <img src={cart} alt="" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Card;
