import * as dayjs from "dayjs";
import "dayjs/locale/pt-br";
import localizedFormat from "dayjs/plugin/localizedFormat";
import relativeTime from "dayjs/plugin/relativeTime";
import { Link, redirect, useLoaderData } from "react-router-dom";
import auth from "../lib/auth";
import formatarPreco from "../lib/funcoes";
import { useAuthContext } from "../providers/AuthProvider";
import { Pedidos } from "../lib/Pedidos";
import { Button } from "react-bootstrap";
import "../componentes/Relatorios.scss";

dayjs.locale("pt-br");
dayjs.extend(relativeTime);
dayjs.extend(localizedFormat);

export async function loader() {
  const user = auth.getUserInfo();
  if (!user) {
    return redirect("/contas/entrar");
  }
  const { pedidos, meta1 } = await Pedidos.find();
  return { pedidos, meta1 }
}


function InfoRelatorios({ id, data, updata, publish, total }) {
  return (
    <div>
      <div id="pedido-info3">
        <div id="pedido-info4">
          <div><b>Key(ID) Pedido:</b> <i>{id}</i> </div>
          <div><b>Data Pedido:</b> <i>{dayjs(data).format("L LT")}</i> </div>
          <div><b>Data Update:</b> <i>{dayjs(updata).format("L LT")}</i></div>
          <div><b>Data Publicação:</b> <i>{dayjs(publish).format("L LT")}</i></div>          
          <div><b>Itens Info:</b> Para mais informações dos itens: <Button as={Link} to={`/MeusPedidos/${id}`}>clique aqui</Button></div>
          <div><b>Valor Total:</b> {formatarPreco(total)}</div>
        </div>
      </div>

      <br></br>
      <br></br>

    </div>
  );
}

export default function Relatorio() {
  const { user } = useAuthContext();
  const { pedidos } = useLoaderData();

  return (
    <div className="pedidos">
      <h1>Olá, {user.username}, esses são os <b>RELATÓRIOS</b> dos pedidos! 😉</h1>
      <hr></hr>

      {pedidos && <div>
        {pedidos.map((itemPedido) => (
          <InfoRelatorios
            key={itemPedido.id}
            id={itemPedido.id}
            data={itemPedido.createdAt}
            dataup={itemPedido.updatedAt}
            publish={itemPedido.publishedAt}
            total={itemPedido.total}
          />
        ))}
      </div>}
    </div>
  );
}
  