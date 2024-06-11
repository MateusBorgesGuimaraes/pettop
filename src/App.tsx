import React from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./Components/Header";
import Home from "./Components/Home/Home";
import Footer from "./Components/Footer";
import Login from "./Components/Login/Login";
import Servicos from "./Components/Servicos/Servicos";
import Blog from "./Components/Blog/Blog";
import Post from "./Components/Post/Post";
import Produto from "./Components/Produto/Produto";
import Produtos from "./Components/Produtos/Produtos";
import Cart from "./Components/Cart/Cart";
import Servico from "./Components/Serviço/Servico";
import Dashboard from "./Components/Dashboard/Dashboard";
import { UserStorage } from "./Context/UserContext";
import ProtectedRoute from "./Components/Helper/ProtectedRoute";
import { CartStorage } from "./Context/cartContext";

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <UserStorage>
          <CartStorage>
            <Header />
            <main className="AppBody">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login/*" element={<Login />} />
                <Route path="/serviços/*" element={<Servicos />} />
                <Route path="/blog/*" element={<Blog />} />
                <Route path="/produtos/*" element={<Produtos />} />
                {/* <Route path="/cart/*" element={<Cart />} /> */}
                <Route
                  path="/cart/*"
                  element={
                    <ProtectedRoute>
                      <Cart />
                    </ProtectedRoute>
                  }
                />
                {/* <Route path="/dashboard/*" element={<Dashboard />} /> */}
                <Route
                  path="/dashboard/*"
                  element={
                    <ProtectedRoute adminOnly>
                      <Dashboard />
                    </ProtectedRoute>
                  }
                />
                <Route path="/post/:id" element={<Post />} />
                <Route path="/produto/:id" element={<Produto />} />
                <Route path="/servico/:id" element={<Servico />} />
              </Routes>
            </main>
            <Footer />
          </CartStorage>
        </UserStorage>
      </BrowserRouter>
    </div>
  );
};

export default App;
