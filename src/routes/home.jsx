import { useLoaderData, useRouteError } from "react-router-dom";
import ListaDeProdutos from "../componentes/ListaDeProdutos";
import { Produtos } from "../lib/Produtos";
import { useLojaContext } from "../providers/AppProvider";

export async function loader() {
  const dados = await Produtos.find();
  return { dados };
}

export default function Home() {
  const { dados } = useLoaderData();
  const { onComprar } = useLojaContext();

  return (
    <div>
      <h1>Produtos</h1>
      <ListaDeProdutos produtos={dados} onComprar={onComprar}></ListaDeProdutos>
    </div>
  );
}

export function ServidorIndisponivel() {
  const error = useRouteError();
  return (
    <div>
      <h1>Oops!</h1>
      <p>
        Infelizmente temos um problema para obter os dados de produtos. Tente
        novamente dentro de instantes.
      </p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  );
}
