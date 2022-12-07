import * as dayjs from "dayjs";
import "dayjs/locale/pt-br";
import localizedFormat from "dayjs/plugin/localizedFormat";
import relativeTime from "dayjs/plugin/relativeTime";
import { redirect, useLoaderData } from "react-router-dom";
import auth from "../lib/auth";
import { useAuthContext } from "../providers/AuthProvider";
import { Pedidos } from "../lib/Pedidos";
import Table from 'react-bootstrap/Table';
import formatarPreco from "../lib/funcoes";
import "../componentes/Pedidos.scss";

dayjs.locale("pt-br");
dayjs.extend(relativeTime);
dayjs.extend(localizedFormat);

export async function loader({ params }) {
  const user = auth.getUserInfo();
  if (!user) {
    return redirect("/contas/entrar");
  }
  const { pedido, meta } = await Pedidos.findOne(params.idPedido);
  return { pedido, meta };
}

function DetalhesPedido({ data, total, produtos }) {
  
  return (
    <div>
      <div id="data-total">
        <div><b>Data:</b> <i>{dayjs(data).format("L LT")}</i></div>
        <div><b>Total:</b> {formatarPreco(total)}</div>
      </div>
        <Table striped bordered hover variant="dark">
          <thead>
            <tr>
              <th>Produto</th>
              <th>Quantidade</th>
              <th>Total</th>
            </tr>
          </thead>

          {produtos && produtos.map((produto, id) => {
            //console.log(produtos) //console de cada produto do PEDIDO

            const nome = produto.attributes.produto.data.attributes.nome
            const quant = produto.attributes.quantidade
            const total = produto.attributes.produto.data.attributes.preco * quant

            return (
              <tbody key={id}>
                <tr>
                  <td>{nome}</td>
                  <td>{quant}</td>
                  <td>{formatarPreco(total)}</td>
                </tr>
              </tbody>
            );
          })}
        </Table>
    </div>
  );
}

export default function Pedido() {
  const { user } = useAuthContext();
  const { pedido } = useLoaderData();
  
  return (
    <div>
      <h1>Olá, {user.username}, esses são os detalhes do seu pedido! 😉</h1>
      <hr></hr>

      <h2>Detalhes do Pedido #{pedido.id}</h2>
      <br></br>

      {pedido && <DetalhesPedido //pega dados do console de PEDIDO
        data={pedido.attributes.createdAt}
        total={pedido.attributes.total}
        produtos={pedido.attributes.itens_pedidos.data}
      />}
    </div>
  );
}
