/**
 * Formata o número como moeda em padrão BRL (Real Brasileiro).
 *
 * @param {number} valor
 * @returns
 */
function formatarPreco(valor) {
  return valor.toLocaleString(undefined, {
    style: "currency",
    currency: "BRL",
  });
}

/**
 * Recebe um objeto com a estrutura do Strapi e retorna uma
 * representação simplificada.
 * 
 * @param {*} data 
 * @returns 
 */
export function strapiDataToObject(data) {
  function mapList(list) {
    return list.map((item) => mapItem(item))
  }
  function mapItem(obj) {
    const { id, attributes, data } = obj;
    if (data) {
      return { id, ...strapiDataToObject(data) }
    }
    if (id) {
      let newObj = { id };
      (attributes && Object.entries(attributes).forEach(i => {
        const [key, value] = i;
        if (!value) {
          newObj[key] = value;
        } else {
          if (Array.isArray(value)) {
            newObj[key] = mapList(value);
          } else if (typeof value == 'object') {
            newObj[key] = mapItem(value);
          } else {
            newObj[key] = value;
          }
        }
      }));
      return newObj;
    } else {
      let newObj = {};
      Object.entries(obj).forEach(i => {
        const [key, value] = i;
        if (!value) {
          newObj[key] = value;
        } else {
          if (Array.isArray(value)) {
            newObj[key] = mapList(value);
          } else if (typeof value == 'object') {
            newObj[key] = mapItem(value);
          } else {
            newObj[key] = value;
          }
        }
      });
      return newObj;
    }

  }

  if (Array.isArray(data)) {
    return mapList(data);
  } else {
    return mapItem(data);
  }
}

export default formatarPreco;