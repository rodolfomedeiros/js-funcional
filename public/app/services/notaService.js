import { Maybe } from "../utils/Maybe.js";
import { partialize, pipe } from "../utils/operations.js";
import { handleRequestStatus } from "../utils/promise-helpers.js";

const API = "http://localhost:3000/notas";

const getItemsFromNotas = notasM => notasM.map(notas => notas.$flatMap(nota => nota.itens));
const filterItemsByCode = (code, itemsM) => itemsM.map(items => items.filter(item => code ? item.codigo === code : true));
const sumItemsValue = itemsM => itemsM.map(items => items.reduce((total, item) => total += item.valor, 0));

export const notaService = {

  listAll() {
    return fetch(API)
      .then(handleRequestStatus)
      .then(notas => Maybe.of(notas))
      .catch(err => {
        console.log(err);
        return Promise.reject("Não foi possível obter as notas fiscais.");
      })
  },

  sumItems(code) {
    const filterItems = partialize(filterItemsByCode, code);

    const sumItems = pipe(getItemsFromNotas, filterItems, sumItemsValue);

    return this.listAll().then(sumItems).then(result => result.getOrElse(0));
  }
};