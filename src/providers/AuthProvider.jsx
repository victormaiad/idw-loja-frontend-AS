import { createContext, useContext, useState } from "react";
import { API } from "../constants";
import auth from "../lib/auth";

/**
 * Um objeto utilizado para mapear mensagens do backend (em inglês)
 * para um texto que será apresentado na interface gráfica para o
 * usuário.
 */
const MAPEADOR_DE_MENSAGENS = {
  "password must be at least 6 characters":
    "A senha precisa ter, pelo menos, 6 caracteres",
  "email must be a valid email": "O endereço de e-mail precisa ser válido",
  "Email or Username are already taken":
    "E-mail ou nome de usuário já foram utilizados em outro cadastro",
  "Invalid identifier or password": "E-mail ou senha inválidos",
};

// Define o AuthContext
export const AuthContext = createContext();

/**
 * Define o AuthProvider, que fornece o AuthContext, métodos e state
 * relacionados ao mecanismo de autenticação do usuário.
 *
 * @param {{children}} param0
 * @returns
 */
export function AuthProvider({ children }) {
  // Obtém a informação do usuário da sessão para inicializar o state posteriormente
  const sessionUserInfo = auth.getUserInfo();

  // Define o state user e o inicializa com o que foi obtido da sessão
  const [user, setUser] = useState(sessionUserInfo);

  const signIn = async (identifier, password) => {
    try {
      const response = await fetch(`${API}/auth/local`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ identifier, password }),
      });
      const json = await response.json();
      if (json.error) {
        throw json.error;
      } else {
        auth.setToken(json.jwt);
        auth.setUserInfo(json.user);
        setUser(json.user);
        return json;
      }
    } catch (error) {
      throw MAPEADOR_DE_MENSAGENS[error.message];
    }
  };

  const signUp = async (username, email, password) => {
    try {
      const response = await fetch(`${API}/auth/local/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password }),
      });
      const json = await response.json();
      if (json.error) {
        throw json.error;
      } else {
        auth.setToken(json.jwt);
        auth.setUserInfo(json.user);
        setUser(json.user);
        return json;
      }
    } catch (error) {
      throw MAPEADOR_DE_MENSAGENS[error.message];
    }
  };

  const signOut = () => {
    setUser(null);
    auth.clearToken();
    auth.clearUserInfo();
  };

  const value = {
    user,
    setUser,
    signIn,
    auth,
    signUp,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuthContext = () => useContext(AuthContext);
