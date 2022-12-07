import * as dayjs from "dayjs";
import "dayjs/locale/pt-br";
import localizedFormat from "dayjs/plugin/localizedFormat";
import relativeTime from "dayjs/plugin/relativeTime";
import { Link, redirect, useLoaderData } from "react-router-dom";
import auth from "../lib/auth";
import { useAuthContext } from "../providers/AuthProvider";
import { Pedidos } from "../lib/Pedidos";
import { Button } from "react-bootstrap";
import formatarPreco from "../lib/funcoes";
import "../componentes/MeusPedidos.scss";

dayjs.locale("pt-br");
dayjs.extend(relativeTime);
dayjs.extend(localizedFormat);

export async function loader() {
  const user = auth.getUserInfo();
  if (!user) {
    return redirect("/contas/entrar");
  }
  const { pedidos, meta } = await Pedidos.find();
  return { pedidos, meta };
}

function ItemDoPedido({ id, data, total }) {
  return (
    <div>
      <h2>Pedido Nº {id}</h2>

      <div id="pedido-info">
        <div id="pedido-info2">
          <div><b>Data Pedido:</b> <i>{dayjs(data).format("L LT")}</i> </div>
          <div><b>Total Pedido:</b> {formatarPreco(total)}</div>
          <Button as={Link} to={`${id}`} variant="outline-primary">Abrir Detalhes</Button>
        </div>
      </div>

      <br></br>
      <br></br>

    </div>
  );
}

export default function MeusPedidos() {
  const { user } = useAuthContext();
  const { pedidos } = useLoaderData();

  return (
    <div className="pedidos">
      <h1>Olá, {user.username}, esses são seus pedidos! 😉</h1>
      <hr></hr>
      {pedidos && <div>
        {pedidos.map((itemPedido) => (
          <ItemDoPedido
            key={itemPedido.id}
            id={itemPedido.id}
            data={itemPedido.createdAt}
            total={itemPedido.total}
          />
        ))}
      </div>}
    </div>
  );
}
