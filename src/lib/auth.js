import { isEmpty } from 'lodash';
import { SESSION_TOKEN_KEY, SESSION_USER_KEY } from '../constants';

const parse = JSON.parse;
const stringify = JSON.stringify;

/**
 * Define um Singleton com métodos que gerenciam recursos de autenticação
 * armazenando dados de sessão no LocalStorage ou SessionStorage
 */
const auth = {
  /**
   * Remove um item do storage.
   * 
   * @param  {String} key O nome do item
   */
  clear(key) {
    if (localStorage && localStorage.getItem(key)) {
      return localStorage.removeItem(key);
    }

    if (sessionStorage && sessionStorage.getItem(key)) {
      return sessionStorage.removeItem(key);
    }

    return null;
  },

  /**
   * Limpa o storage
   */
  clearAppStorage() {
    if (localStorage) {
      localStorage.clear();
    }

    if (sessionStorage) {
      sessionStorage.clear();
    }
  },

  /**
   * Remove o token do storage.
   * 
   * @param {String} tokenKey O nome da chave associada ao token
   * @returns 
   */
  clearToken(tokenKey = SESSION_TOKEN_KEY) {
    return auth.clear(tokenKey);
  },

  /**
   * Remove os dados do usuário do storage.
   * 
   * @param {String} userInfo O nome da chave associada aos dados do usuário
   * @returns 
   */
  clearUserInfo(userInfo = SESSION_USER_KEY) {
    return auth.clear(userInfo);
  },

  /**
   * Retorna o conteúdo de um item do storage.
   * @param  {String} key O identificador do item
   * @return {String|Object}     Dado do storage (conteúdo do item)
   */
  get(key) {
    if (localStorage && localStorage.getItem(key)) {
      return parse(localStorage.getItem(key)) || null;
    }

    if (sessionStorage && sessionStorage.getItem(key)) {
      return parse(sessionStorage.getItem(key)) || null;
    }

    return null;
  },

  /**
   * Retorna o token armazenado no storage.
   * 
   * @param {String} tokenKey O nome da chave associada ao token
   * @returns 
   */
  getToken(tokenKey = SESSION_TOKEN_KEY) {
    return auth.get(tokenKey);
  },

  /**
   * Retorna os dados do usuário armazenados no storage.
   * 
   * @param {String} userInfo O nome da chave associada aos dados do usuário
   * @returns 
   */
  getUserInfo(userInfo = SESSION_USER_KEY) {
    return auth.get(userInfo);
  },

  /**
   * Armazena o conteúdo de um item do storage.
   * 
   * @param {String|Object}  value    O dado a ser armazenado
   * @param {String}  key             O identificador do item
   * @param {Boolean} isLocalStorage  Define se o storage usa o LocalStorage ou SessionStorage
   */
  set(value, key, isLocalStorage) {
    if (isEmpty(value)) {
      return null;
    }

    if (isLocalStorage && localStorage) {
      return localStorage.setItem(key, stringify(value));
    }

    if (sessionStorage) {
      return sessionStorage.setItem(key, stringify(value));
    }

    return null;
  },

  /**
   * Armazena o conteúdo do token no storage.
   * 
   * @param {String} value O valor do token
   * @param {*} isLocalStorage Define se o storage usa o LocalStorage ou SessionStorage
   * @param {*} tokenKey O nome da chave associada ao token
   * @returns 
   */
  setToken(value = '', isLocalStorage = true, tokenKey = SESSION_TOKEN_KEY) {
    return auth.set(value, tokenKey, isLocalStorage);
  },

  /**
   * Armazena os dados do usuário no storage.
   * 
   * @param {String|Object} value O dado do usuário
   * @param {*} isLocalStorage Define se o storage usa o LocalStorage ou SessionStorage
   * @param {*} userInfo O nome da chave associada ao dado do usuário
   * @returns 
   */
  setUserInfo(value = '', isLocalStorage = true, userInfo = SESSION_USER_KEY) {
    return auth.set(value, userInfo, isLocalStorage);
  },
};

export default auth;