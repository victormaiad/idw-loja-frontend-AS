import * as dayjs from "dayjs";
import "dayjs/locale/pt-br";
import localizedFormat from "dayjs/plugin/localizedFormat";
import relativeTime from "dayjs/plugin/relativeTime";
import ListGroup from "react-bootstrap/ListGroup";
import { Link, redirect, useLoaderData } from "react-router-dom";
import auth from "../lib/auth";
import { Favoritos } from "../lib/Favoritos";
import { useAuthContext } from "../providers/AuthProvider";

dayjs.locale("pt-br");
dayjs.extend(relativeTime);
dayjs.extend(localizedFormat);

export async function loader() {
  const user = auth.getUserInfo();
  if (!user) {
    return redirect("/contas/entrar");
  }
  const { favoritos, meta } = await Favoritos.find();
  const dados = favoritos.slice(0, 2);
  return { dados, meta };
}

export default function Perfil() {
  const { user } = useAuthContext();
  const { dados } = useLoaderData();

  return (
    <>
      <h1>Olá, {user.username}!</h1>
      <div>
        Cadastrado em <strong>{dayjs(user.createdAt).format("L LT")}</strong>
      </div>
      <div>
        Seu e-mail é <strong>{user.email}</strong>
      </div>
      <div>
        <small className="text-muted">
          Seu e-mail é a identidade da sua conta de usuário em nossa loja.
        </small>
      </div>
      <section className="my-4">
        <h2 className="mb-3">
          <small>❤</small> Alguns dos seus produtos favoritos
        </h2>
        <ListGroup>
          {dados.map((favorito) => (
            <ListGroup.Item key={favorito.id}>
              <div>
                <Link
                  to={`/produtos/${favorito.produto.id}`}
                  className="text-decoration-none fw-bold"
                >
                  {favorito.produto.nome}
                </Link>
              </div>
              <small
                className="text-muted"
                title={dayjs(favorito.createdAt).format("L LT")}
              >
                {dayjs(favorito.createdAt).fromNow()}
              </small>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </section>
    </>
  );
}
