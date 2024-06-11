import React from "react";
import { TOKEN_POST, USER_GET, VERIFY_TOKEN } from "../api";
import { useNavigate } from "react-router-dom";

type UserSend = {
  username: string;
  password: string;
};

type IUser = {
  username: string;
  password: string;
  email: string;
  telefone: string;
  rua: string;
  bairro: string;
  cep: string;
  numero: number;
  isAdmin: boolean;
  accessToken: string;
  _id: string;
  createdAt: string;
};

type IUserContext = {
  data: IUser | null;
  loading: boolean;
  error: string | null;
  login: boolean | null;
  admin: boolean | null;
  userLogin: (username: string, password: string) => Promise<void>;
  userLogout: () => void;
};

export const UserContext = React.createContext<IUserContext | null>(null);

export const UserStorage = ({ children }: React.PropsWithChildren) => {
  const [data, setData] = React.useState(null);
  const [login, setLogin] = React.useState<null | boolean>(null);
  const [loading, setLoading] = React.useState(false);
  const [admin, setAdmin] = React.useState(null);
  const [error, setError] = React.useState<string | null>(null);
  const navigate = useNavigate();

  const userLogout = React.useCallback(
    async function () {
      setData(null);
      setError(null);
      setLoading(false);
      setLogin(false);
      setAdmin(null);
      window.localStorage.removeItem("token");
      navigate("/login");
    },
    [navigate]
  );

  async function getUser(token: string) {
    const { url, options } = USER_GET(token);
    const res = await fetch(url, options);
    const json = await res.json();
    setAdmin(json.isAdmin);
    setData(json);
    setLogin(true);
  }

  async function userLogin(username: string, password: string) {
    try {
      setError(null);
      setLoading(true);
      const { url, options } = TOKEN_POST({
        username: username,
        password: password,
      });
      const tokenRes = await fetch(url, options);
      if (!tokenRes.ok) throw new Error(`Error:  ${tokenRes.statusText}`);
      const { accessToken } = await tokenRes.json();
      window.localStorage.setItem("token", accessToken);
      await getUser(accessToken);
      navigate("/");
    } catch (err) {
      if (err instanceof Error) setError(err.message);
      setLogin(false);
    } finally {
      setLoading(false);
    }
  }

  React.useEffect(() => {
    async function autoLogin() {
      const token = window.localStorage.getItem("token");
      if (token) {
        try {
          setError(null);
          setLoading(true);
          const { url, options } = VERIFY_TOKEN(token);
          const response = await fetch(url, options);
          const responseJson = await response.json();
          // console.log("reponseJson: " + responseJson);
          if (!responseJson.valido) throw new Error("Token Invalido");
          await getUser(token);
        } catch (error) {
          userLogout();
        } finally {
          setLoading(false);
        }
      } else {
        setLogin(false);
      }
    }
    autoLogin();
  }, [userLogout]);

  return (
    <UserContext.Provider
      value={{ userLogout, userLogin, data, loading, error, login, admin }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
