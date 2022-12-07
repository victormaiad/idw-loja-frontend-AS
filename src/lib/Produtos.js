import { API } from "../constants";
import { strapiDataToObject } from "./funcoes";

/**
 * Define um Singleton com métodos para acessar o endpoint produtos do backend.
 */
export const Produtos = {
  /**
   * Obtém a lista dos produtos.
   * 
   * @returns A lista dos produtos
   */
  async find() {
    try {
      const response = await fetch(`${API}/produtos/?populate=foto`);
      const json = await response.json();
      if (json.data) {
        const produtos = strapiDataToObject(json.data);
        console.log(produtos, 'Console produtos') //Verificar os produtos na tela inicial
        return produtos;
      }
      if (json.error) {
        throw json.error;
      }
    } catch (error) {
      throw error;
    }
  },
  /** 
   * Obtém os dados do produto identificado por `id`.
   * 
   * @param {Number} id O identificador do produto
   * @returns 
   */
  async findOne(id) {
    try {
      const response = await fetch(`${API}/produtos/${id}/?populate=foto`);
      const json = await response.json();
      if (json.data) {
        const produto = strapiDataToObject(json.data);
        console.log(produto) //Console produto no SAIBA MAIS
        return produto;
      }
      if (json.error) {
        throw json.error;
      }
    } catch (error) {
      throw error;
    }
  }
};