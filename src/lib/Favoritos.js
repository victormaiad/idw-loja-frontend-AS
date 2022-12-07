import * as qs from "qs";
import { API, BEARER } from "../constants";
import auth from "./auth";
import { strapiDataToObject } from "./funcoes";

/**
 * Define um Singleton com métodos para acessar o endpoint favoritos do backend.
 */
export const Favoritos = {
  /**
   * Obtém a lista dos favoritos para o usuário da sessão.
   * 
   * O parâmetro `idProduto` permite definir se a lista dos favoritos 
   * é filtrada pelo identificador do produto, ou seja, permite obter
   * a informação do registro de um favorito do usuário para o produto
   * em questão.
   * 
   * @param {Number} produtoId O identificador do produto
   * @returns A lista dos favoritos do usuário da sessão.
   */
  async find(produtoId = undefined) {
    const user = auth.getUserInfo();
    try {
      let query = qs.stringify(
        {
          populate: [
            'produto',
            'produto.foto'
          ],
          filters: {
            user: {
              id: {
                $eq: user.id,
              }
            },
            produto: {
              id: {
                $eq: produtoId
              }
            }
          }
        },
        {
          encodeValuesOnly: true,
        }
      );
      const response = await fetch(`${API}/favoritos/?${query}`, {
        headers: {
          Authorization: `${BEARER} ${auth.getToken()}`
        }
      });
      const json = await response.json();
      if (json.data) {
        const favoritos = strapiDataToObject(json.data);
        return { favoritos, meta: json.meta };
      }
      if (json.error) {
        throw json.error;
      }
    } catch (error) {
      throw error;
    }
  },
  /**
   * Obtém a lista dos favoritos para o usuário da sessão e para o produto
   * identificado por `produtoId`.
   * 
   * @param {Number} produtoId O identificador do produto
   * @returns A lista de favoritos
   */
  async findByProduto(produtoId) {
    return Favoritos.find(produtoId);
  },
  /**
   * Exclui um favorito.
   * @param {Number} id O identificador do favorito
   */
  async delete(id) {
    try {
      const response = await fetch(`${API}/favoritos/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `${BEARER} ${auth.getToken()}`
        }
      });
      const json = await response.json();
      if (json.error) {
        throw json.error;
      }
    } catch (error) {
      throw error;
    }
  },
  /**
   * Cria um registro de favorito para o usuário da sessão e para o produto
   * identificado por `produtoId`.
   * 
   * @param {Number} produtoId O identificador do produto
   * @returns 
   */
  async create(produtoId) {
    const user = auth.getUserInfo();
    try {
      const response = await fetch(`${API}/favoritos`, {
        method: 'POST',
        headers: {
          Authorization: `${BEARER} ${auth.getToken()}`,
          "Content-type": "application/json",
        },
        body: JSON.stringify(
          {
            data: {
              user: user.id,
              produto: produtoId,
            }
          }
        )
      });
      const json = await response.json();
      if (json.data) {
        const favorito = strapiDataToObject(json.data);
        return favorito;
      }
      if (json.error) {
        throw json.error;
      }
    } catch (error) {
      throw error;
    }
  }
}