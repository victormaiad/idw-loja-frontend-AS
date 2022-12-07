import { Button } from "react-bootstrap";
import formatarPreco from "../lib/funcoes";
import { useLojaContext } from "../providers/AppProvider";
import { useAuthContext } from "../providers/AuthProvider";
import Alerta from "./Alerta";
import "./Carrinho.scss";
import { useNavigate } from "react-router-dom";
import { Pedidos } from "../lib/Pedidos";
import { ItemPedido } from "../lib/ItemPedido";

/**
 * O componente ItemDoCarrinho representa um item
 * da lista de produtos do Carrinho.
 *
 * @param {{produto, onRemover}} param0
 * @returns
 */
function ItemDoCarrinho({ produto, onRemover }) {
  return (
    <li>
      <div>{produto.nome}</div>
      <div>{produto.quantidadeNoCarrinho}</div>
      <div>{formatarPreco(produto.preco * produto.quantidadeNoCarrinho)}</div>
      <div>
        <Button variant="warning" size="sm" onClick={() => onRemover(produto)}>
          X
        </Button>
      </div>
    </li>
  );
}

/**
 * O componente Carrinho representa a interface gráfica
 * que apresenta a lista de produtos do carrinho,
 * a quantidade unitária e o total.
 *
 * @returns
 */
export default function Carrinho() {
  // utiliza o hook useContext para obter os valores do LojaContext
  const { produtosDoCarrinho, setProdutosDoCarrinho, onRemover } = useLojaContext();
  
  //Verificar autenticação para aparecer/não aparecer o botão de fechar
  const { user } = useAuthContext();

  const navigate = useNavigate()


  /**
   * Esta função calcula o total do carrinho com base
   * nos preços dos produtos e suas quantidades no carrinho.
   *
   * @returns
   */
  const calcularTotal = () => {
    let total = 0.0;
    if (produtosDoCarrinho) {
      produtosDoCarrinho.forEach(
        (produto) => (total += produto.preco * produto.quantidadeNoCarrinho)
      );
    }
    return total;
  };

  //Limpar o carrinho
  function limparCarrinho() {
    setProdutosDoCarrinho([]);
  }

  //Fechar o pedido
  function fecharPedido() {
    try {
      let itensId = []
      produtosDoCarrinho.forEach(async (produto, id) => {
        //console.log(produtosDoCarrinho, 'Produtos do carrinho')
        const response = await ItemPedido.create(produto.id, produto.quantidadeNoCarrinho)
        itensId.push(response.id)   

        console.log(itensId, "Console let itensId") //Verificar itens let[]

        if (id + 1 === produtosDoCarrinho.length) {
          Pedidos.create(itensId, calcularTotal())
          limparCarrinho();
          navigate("/MeusPedidos")
        }
      })

    } catch (error) {
      throw error
    } 
  }
  
  

  return (
    <div className="carrinho">
      <h1>Seu carrinho</h1>
      <ul id="lista-carrinho">
        {produtosDoCarrinho &&
          produtosDoCarrinho.map((produto) => (
            <ItemDoCarrinho
              key={produto.id}
              produto={produto}
              onRemover={onRemover}
            ></ItemDoCarrinho>
          ))}
        {(!produtosDoCarrinho ||
          (produtosDoCarrinho && produtosDoCarrinho.length === 0)) && (
          <Alerta
            titulo={"Seu carrinho está vazio"}
            mensagem={"Que tal mudar essa situação? 😉"}
          ></Alerta>
        )}
      </ul>
      <div id="carrinho-total">
        <div>Total</div>
        <div>{formatarPreco(calcularTotal())}</div>
      </div>

      {/* Se não estiver logado, não aparece o botão pra fechar o pedido */}
      {user != null && (
        <div id="botao-fechar-pedido">
          <Button id="fechar-pedido" variant="outline-primary" onClick={fecharPedido}>Fechar Pedido</Button>
        </div>
      )}

      <br></br>

      <div id="botao-limpar-carrinho">
        <Button id="limpar-carrinho"
          variant="outline-primary"
          onClick={limparCarrinho}>Limpar Carrinho
        </Button>
      </div>

    </div>
  );
}
