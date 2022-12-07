import { API, BEARER } from "../constants";
import auth from "./auth";
import { strapiDataToObject } from "./funcoes";


export const ItemPedido = {
  
/**
 * Cria o Item do Pedido no backend.
 * 
 * @param {Number} produtoId O identificador do produto
 * @param {Number} quantidade A quantidade do produto
 * @returns 
 */

  async create(produtoId, quantidade) {
    const user = auth.getUserInfo();
    try {
      const response = await fetch(`${API}/itens-pedidos`, {
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
              quantidade: quantidade,
            }
          }
        )
      });

      const json = await response.json();
      if (json.data) {
        const itempedido = strapiDataToObject(json.data); // -> Retorna ARRAY
        //console.log(itempedido, "ITEM DO PEDIDO")
        return itempedido;
      }
      
      if (json.error) {
        throw json.error;
      }
    } catch (error) {
      throw error;
    }
  }
}