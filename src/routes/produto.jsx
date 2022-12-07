import * as dayjs from "dayjs";
import "dayjs/locale/pt-br";
import { useState } from "react";
import { Button, Spinner } from "react-bootstrap";
import Toast from "react-bootstrap/Toast";
import ToastContainer from "react-bootstrap/ToastContainer";
import ReactMarkdown from "react-markdown";
import { useLoaderData, useRouteError } from "react-router-dom";
import gfm from "remark-gfm";
import { Favoritos } from "../lib/Favoritos";
import formatarPreco from "../lib/funcoes";
import { Produtos } from "../lib/Produtos";
import { useLojaContext } from "../providers/AppProvider";
import { useAuthContext } from "../providers/AuthProvider";

export async function loader({ params }) {
  const dados = await Produtos.findOne(params.idProduto);
  let favorito = null;
  try {
    const { favoritos } = await Favoritos.findByProduto(params.idProduto);
    if (favoritos.length !== 0) {
      favorito = favoritos[0];
    }
  } catch (error) {}
  return { dados, favorito };
}

export default function Produto() {
  const { dados, favorito } = useLoaderData();
  const { user } = useAuthContext();
  const { onComprar } = useLojaContext();
  const [loading, setLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [novoFavorito, setNovoFavorito] = useState();

  const handleCurtirClick = async (e) => {
    e.preventDefault();
    setLoading(true);
    const favorito = await Favoritos.create(dados.id);
    setNovoFavorito(favorito);
    toggleToast();
    setLoading(false);
  };

  const toggleToast = () => setShowToast(!showToast);

  return (
    <div>
      <div className="row me-2 mt-4">
        <div className="col-md-9">
          <div className="card p-3  border-0">
            <div className="row">
              <div className="col-md-3">
                <img
                  src={`http://localhost:1337${dados.foto?.formats?.thumbnail?.url}`}
                  className="img-fluid"
                  alt={dados.nome}
                ></img>
              </div>
              <div className="col-md-9">
                <h1 className="fs-3">{dados.nome}</h1>
                {favorito && (
                  <div className="small text-muted">
                    ❤ Você favoritou este produto em{" "}
                    {dayjs(favorito.createdAt).format("L LT")}
                  </div>
                )}
                {novoFavorito && (
                  <div className="small text-muted">
                    ❤ Você favoritou este produto em{" "}
                    {dayjs(novoFavorito.createdAt).format("L LT")}
                  </div>
                )}
                {user != null && favorito == null && novoFavorito == null && (
                  <Button
                    onClick={handleCurtirClick}
                    variant="outline-light"
                    className="text-dark"
                    disabled={loading}
                  >
                    {loading && <Spinner size="sm"></Spinner>}
                    {!loading && <span>❤</span>} Adicionar aos favoritos
                  </Button>
                )}
                <div className="my-4">
                  <ReactMarkdown remarkPlugins={[gfm]}>
                    {dados.descricao}
                  </ReactMarkdown>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card border-0">
            <div className="card-body">
              <div className="fs-2 mb-3">{formatarPreco(dados.preco)}</div>
              <Button onClick={() => onComprar(dados)} className="w-100">
                Comprar
              </Button>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer className="p-3" position="bottom-end">
        <Toast show={showToast} bg="success" onClose={toggleToast}>
          <Toast.Header>
            <span>❤</span>
            <strong className="me-auto">Favoritos</strong>
            <small>agora mesmo</small>
          </Toast.Header>
          <Toast.Body className="text-white">
            Você adicionou o produto aos favoritos.
          </Toast.Body>
        </Toast>
      </ToastContainer>
    </div>
  );
}

export function ProdutoNaoEncontrado() {
  const error = useRouteError();
  return (
    <div>
      <h1>Oops!</h1>
      <p>Infelizmente o produto que você procura não existe.</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  );
}
