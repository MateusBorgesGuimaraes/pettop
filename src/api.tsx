export const API_URL = "http://localhost:5000/api";

type TipoUserLogin = {
  username: string;
  password: string;
};

type TipoUserRegister = {
  username: string;
  email: string;
  password: string;
  telefone: string;
  rua: string;
  bairro: string;
  cep: string;
  numero: number;
};

type TipoService = {
  nome: string;
  telefone: string;
  rua: string;
  bairro: string;
  cep: string;
  numero: number;
  date: string;
  hour: string;
  tipeService: "hospedagem" | "adestramento" | "tosa" | "banho";
};

type TipoPost = {
  title: string;
  autor: string;
  post: string;
  category: "aviso" | "utilidade" | "promocoes";
};

type TipoProduto = {
  title: string;
  desc: string;
  especie: "ave" | "reptil" | "peixe" | "cao" | "gato" | "roedor";
  img: string;
  mainCategory: "brinquedos" | "saudeBeleza" | "comida";
  subCategories?: string[];
  price: number;
};

type TipoCategorias = "brinquedos" | "saudeBeleza" | "comida";

type TipoEspecie = "ave" | "reptil" | "peixe" | "cao" | "gato" | "roedor";

export function TOKEN_POST(body: TipoUserLogin) {
  return {
    url: API_URL + "/auth/login",
    options: {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    },
  };
}

export function VERIFY_TOKEN(token: string) {
  return {
    url: API_URL + "/auth/verify-token",
    options: {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token }),
    },
  };
}

export function USER_GET(token: string) {
  return {
    url: API_URL + "/auth/user",
    options: {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
      },
    },
  };
}

export function USER_POST(body: TipoUserRegister) {
  return {
    url: API_URL + "/auth/register",
    options: {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    },
  };
}

//PEGA OS ULTIMOS 10 POSTS
export function GET_ALL_POSTS() {
  return {
    url: API_URL + "/posts",
    options: {
      method: "GET",
    },
  };
}

export function GET_POST_BY_ID(id: string) {
  return {
    url: API_URL + "/posts/find/" + id,
    options: {
      method: "GET",
    },
  };
}

// export function PUT_POST_BY_ID(id: string, token: string, body: TipoPost) {
//   return {
//     url: API_URL + "/posts/" + id,
//     options: {
//       method: "PUT",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: "Bearer " + token,
//       },
//       body: JSON.stringify(body),
//     },
//   };
// }

export function PUT_POST_BY_ID(id: string, token: string, body: TipoPost) {
  return {
    url: API_URL + "/posts/" + id,
    options: {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        token: "Bearer " + token, // Incluindo o token no cabeçalho 'token' com o prefixo 'Bearer'
      },
      body: JSON.stringify(body),
    },
  };
}

export function DEL_POST_BY_ID(id: string, token: string) {
  return {
    url: API_URL + "/posts/" + id,
    options: {
      method: "DELETE",
      headers: {
        // "Content-Type": "application/json",
        token: "Bearer " + token, // Incluindo o token no cabeçalho 'token' com o prefixo 'Bearer'
      },
    },
  };
}

export function SERVICE_POST(body: TipoService, token: string) {
  return {
    url: API_URL + "/services",
    options: {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        token: "Bearer " + token,
      },
      body: JSON.stringify(body),
    },
  };
}

export function BLOG_POST(token: string, body: TipoPost) {
  return {
    url: API_URL + "/posts",
    options: {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify(body),
    },
  };
}

export function GET_ALL_SERVICES(token: string) {
  return {
    url: API_URL + "/services",
    options: {
      method: "GET",
      headers: {
        // "Content-Type": "application/json",
        token: "Bearer " + token, // Incluindo o token no cabeçalho 'token' com o prefixo 'Bearer'
      },
    },
  };
}

export function GET_SERVICE_BY_ID(id: string, token: string) {
  return {
    url: API_URL + "/services/find/" + id,
    options: {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
      },
    },
  };
}

export function UPDATE_SERVICE_CHECKED(id: string, token: string) {
  return {
    url: API_URL + "/services/" + id,
    options: {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({ checked: true }),
    },
  };
}

export function GET_ALL_USERS(token: string) {
  return {
    url: API_URL + "/users",
    options: {
      method: "GET",
      headers: {
        // "Content-Type": "application/json",
        token: "Bearer " + token, // Incluindo o token no cabeçalho 'token' com o prefixo 'Bearer'
      },
    },
  };
}

export function GET_USER_BY_ID(id: string, token: string) {
  return {
    url: API_URL + "/users/find/" + id,
    options: {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
      },
    },
  };
}

export function DEL_USER_BY_ID(id: string, token: string) {
  return {
    url: API_URL + "/users/" + id,
    options: {
      method: "DELETE",
      headers: {
        // "Content-Type": "application/json",
        token: "Bearer " + token, // Incluindo o token no cabeçalho 'token' com o prefixo 'Bearer'
      },
    },
  };
}

// export function GET_ALL_PRODUCTS(token: string) {
//   return {
//     url: API_URL + "/products",
//     options: {
//       method: "GET",
//       headers: {
//         // "Content-Type": "application/json",
//         token: "Bearer " + token, // Incluindo o token no cabeçalho 'token' com o prefixo 'Bearer'
//       },
//     },
//   };
// }

export function GET_ALL_PRODUCTS_NEW() {
  return {
    url: API_URL + "/products",
    options: {
      method: "GET",
      // headers: {
      //   // "Content-Type": "application/json",
      //   token: "Bearer " + token, // Incluindo o token no cabeçalho 'token' com o prefixo 'Bearer'
      // },
    },
  };
}

export function GET_PRODUCT_BY_ID(id: string) {
  return {
    url: API_URL + "/products/find/" + id,
    options: {
      method: "GET",
    },
  };
}

export function PROD_POST(token: string, body: TipoProduto) {
  return {
    url: API_URL + "/products",
    options: {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify(body),
    },
  };
}

export function GET_PRODUCTS_BY_CATEGORY(category: string) {
  return {
    url: API_URL + "/products?subCategories=" + category,
    options: {
      method: "GET",
    },
  };
}

export function GET_PRODUCTS_BY_ESPECIE(especie: TipoEspecie) {
  return {
    url: API_URL + "/products?especie=" + especie,
    options: {
      method: "GET",
    },
  };
}

export function DEL_PROD_BY_ID(id: string, token: string) {
  return {
    url: API_URL + "/products/" + id,
    options: {
      method: "DELETE",
      headers: {
        // "Content-Type": "application/json",
        token: "Bearer " + token,
      },
    },
  };
}

export function GET_USER_CART_BY_ID(id: string, token: string) {
  return {
    url: API_URL + "/carts/find/" + id,
    options: {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
      },
    },
  };
}

export function CREATE_USER_CART(token: string, userId: string) {
  return {
    url: API_URL + "/carts",
    options: {
      method: "POST",
      headers: {
        token: "Bearer " + token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId }),
    },
  };
}

// export function CREATE_USER_CART(token: string) {
//   return {
//     url: API_URL + "/carts",
//     options: {
//       method: "POST",
//       headers: {
//         // Authorization: "Bearer " + token,
//         token: "Bearer " + token,
//       },
//     },
//   };
// }

type ICart = {
  userId: string;
  products: { productId: string; quantity: number }[];
};

export function ATT_CART(token: string, id: string, body: ICart) {
  return {
    url: API_URL + "/carts/" + id,
    options: {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
        token: "Bearer " + token,
      },
      body: JSON.stringify(body),
    },
  };
}
