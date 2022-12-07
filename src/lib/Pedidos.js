import * as qs from "qs";
import { API, BEARER } from "../constants";
import auth from "./auth";
import { strapiDataToObject } from "./funcoes";

/**
 * Define um Singleton com métodos para acessar o endpoint Pedidos do backend.
 */

export const Pedidos = {
    
  async find() {
    const user = auth.getUserInfo();
    try {
      let query = qs.stringify(
        {
          populate: [
            'itens_pedidos',
            'itens_pedidos.produto',
            'itens_pedidos.produto.foto'
          ],

          filters: {
            user: {
              id: {
                $eq: user.id,
              }
            },
          }
        },

        {
          encodeValuesOnly: true,
        }
      );

      const response = await fetch(`${API}/pedidos/?${query}`, {
        headers: {
          Authorization: `${BEARER} ${auth.getToken()}`
        }
      });

      const json = await response.json();
      if (json.data) {
        const pedidos = strapiDataToObject(json.data);
        console.log(pedidos, 'Console Pedidos')
        return { pedidos, meta: json.meta };
      }
      if (json.error) {
        throw json.error;
      }
    } catch (error) {
      throw error;
    }
  },

  /**
   * Obtém a lista dos Pedidos para o usuário da sessão.
   * 
   * O parâmetro `idProduto` permite definir se a lista dos Pedidos 
   * é filtrada pelo identificador do pedido, ou seja, permite obter
   * a informação do registro de um favorito do usuário para o pedido
   * em questão.
   * 
   * @param {Number} idPedido O identificador do pedido
   * @returns A lista dos Pedidos do usuário da sessão.
  */

  async findOne(idPedido) {
    try {
      let query = qs.stringify(
        {
          populate: [
            'itens_pedidos',
            'itens_pedidos.produto',
            'itens_pedidos.produto.foto'
          ],
        },

        {
          encodeValuesOnly: true,
        }
      );

      const response = await fetch(`${API}/pedidos/${idPedido}/?${query}`, {
        headers: {
          Authorization: `${BEARER} ${auth.getToken()}`
        }
      });

      const json = await response.json();
      if (json.data) {
        const pedido = (json.data); // -> Retorna ARRAY
        console.log(pedido)
        //const pedido = strapiDataToObject(json.data); -> Retorna Objeto

        return { pedido, meta: json.meta };
      }
      if (json.error) {
        throw json.error;
      }
    } catch (error) {
      throw error;
    }
  },

  /**
   * @param {Array} itens_pedidos Os identificadores e quantidade dos itens do pedido
   * @param {Number} total O valor total do pedido
   * @returns 
   */

  async create(itens_pedidos, total) {
    const user = auth.getUserInfo();
    try {
      const response = await fetch(`${API}/pedidos`, {
        method: 'POST',

        headers: {
          Authorization: `${BEARER} ${auth.getToken()}`,
          "Content-type": "application/json",
        },
      
        body: JSON.stringify(
          {
            data: {
              user: user.id,
              itens_pedidos: itens_pedidos,
              total: total
            }
          }
        )
      });
      
      const json = await response.json();
      if (json.data) {
        const pedido = (json.data); // -> Retorna ARRAY
        //console.log(pedido, 'Console Pedido')

        return { pedido, meta: json.meta };
      }
      if (json.error) {
        throw json.error;
      }
    } catch (error) {
      throw error;
    }
  }
  
}
