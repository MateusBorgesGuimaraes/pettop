import React from "react";
import styles from "./Header.module.css";
import { Link } from "react-router-dom";
import logo from "../assets/logo-72x67.svg";
import cart from "../assets/cart-header-24x24.svg";
import user from "../assets/login-header-18x23.svg";
import UserContext from "../Context/UserContext";
import Login from "./Login/Login";
import CartContext from "../Context/cartContext";

const admin = true;

const Header = () => {
  const userContext = React.useContext(UserContext);
  const cartContext = React.useContext(CartContext);
  const [quantidadeTotal, setQuantidadeTotal] = React.useState<
    number | undefined
  >(0);

  React.useEffect(() => {
    function loadQuantityCart() {
      const total = cartContext?.dataCart?.products.reduce(
        (acc, curr) => acc + curr.quantity,
        0
      );
      setQuantidadeTotal(total);
      if (!userContext?.login) {
        setQuantidadeTotal(0);
      }
    }
    loadQuantityCart();
  }, [cartContext, userContext?.login]);

  if (!userContext) {
    return null;
  }

  // console.log("dataCart no header: " + JSON.stringify(cartContext?.dataCart));

  const { data, userLogout, admin, login } = userContext;
  // if (!data) {
  //   const newData = 'Login'
  // }

  return (
    <header>
      <nav className={`${styles.headerNav} container`}>
        <div className={styles.logoNav}>
          <Link to="/">
            <img src={logo} alt="" />
          </Link>
        </div>
        <div className={styles.linksNav}>
          <ul className={styles.containerLinksNav}>
            <li>
              <Link to="/produtos">Produtos</Link>
            </li>
            <li>
              <Link to="/serviços">Serviços</Link>
            </li>
            <li>
              <Link to="/blog">Blog</Link>
            </li>
            <li>
              {data ? (
                <Link className={styles.iconNav} to="/login">
                  <img src={user} alt="" />
                  {data.username}{" "}
                  <button className={styles.sair} onClick={userLogout}>
                    sair
                  </button>
                </Link>
              ) : (
                <Link className={styles.iconNav} to="/login">
                  <img src={user} alt="" />
                  Login
                </Link>
              )}
            </li>
            <li>
              <Link className={styles.iconNav} to="/cart">
                <img src={cart} alt="" /> {quantidadeTotal}
              </Link>
            </li>

            {admin && (
              <li>
                <Link
                  className={`${styles.iconNav} ${styles.admin}`}
                  to="/dashboard"
                >
                  Dashboard
                </Link>
              </li>
            )}
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Header;
