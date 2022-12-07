import { createContext, useContext, useEffect, useState } from "react";

// Define o context
export const LojaContext = createContext();

/**
 * O AppContextProvider é utilizado como state global do aplicativo.
 *
 * @param {{children}} Props
 * @returns
 */
const AppProvider = ({ children }) => {
  // obtém o valor do localStorage
  const carrinho = JSON.parse(localStorage.getItem("carrinho") || "[]");

  // cria o state, inicializando-o com o que foi obtido do localStorage
  const [produtosDoCarrinho, setProdutosDoCarrinho] = useState(carrinho);

  // controla se o carrinho está visível ou não
  const [showCarrinho, setShowCarrinho] = useState(false);
  
  const handleFecharCarrinho = () => {
    setShowCarrinho(false);
  };

  const handleAbrirCarrinho = () => {
    setShowCarrinho(true);
  };



  // controla se o relatorio está visível ou não
  const [showRelatorio, setRelatorio] = useState(false);

  const handleFecharRelatorio = () => {
    showRelatorio(false);
  };

  const handleAbrirRelatorio = () => {
    setRelatorio(true);
  };


  const onComprar = (produto) => {
    // procura o produto no carrinho
    let item = produtosDoCarrinho.find((p) => p.id === produto.id);

    if (!item) {
      // o produto não está no carrinho, então adiciona
      item = { ...produto, quantidadeNoCarrinho: 1 };
      // atualiza o state
      setProdutosDoCarrinho([...produtosDoCarrinho, item]);
    } else {
      // o produto está no carrinho, então cria uma nova
      // lista de produtos para atualizar o carrinho
      const lista = produtosDoCarrinho.map((item) => {
        if (item.id === produto.id) {
          // se o item da lista atual é o produto que está sendo
          // comprado, então incrementa a quantidade no carrinho
          item.quantidadeNoCarrinho++;
        }
        return item;
      });
      // atualiza o state
      setProdutosDoCarrinho(lista);
    }
    setShowCarrinho(true);
  };

  const onRemover = (produto) => {
    // cria uma nova lista de produtos para atualizar o carrinho
    const lista = produtosDoCarrinho
      .map((item) => {
        if (item.id === produto.id) {
          // se o item da lista atual é o produto que está
          // sendo removido do carrinho, então
          // decrementa a quantidade no carrinho
          item.quantidadeNoCarrinho--;
        }
        return item;
      })
      // remove da lista o item com quantidade igual a 0
      .filter((item) => item.quantidadeNoCarrinho !== 0);

    // atualiza o state
    setProdutosDoCarrinho(lista);
  };
  

  

  // Utiliza o hook useEffect para executar um código
  // quando houver alteração no state produtosDoCarrinho.
  // Especificamente, o código atualiza o localStorage
  useEffect(() => {
    localStorage.setItem("carrinho", JSON.stringify(produtosDoCarrinho));
  }, [produtosDoCarrinho]);

  // Define o valor do LojaContext
  const value = {
    produtosDoCarrinho,
    setProdutosDoCarrinho,
    onComprar,
    onRemover,
    
    showRelatorio,
    setRelatorio,
    handleAbrirRelatorio,
    handleFecharRelatorio,
    showCarrinho,
    setShowCarrinho,
    handleFecharCarrinho,
    handleAbrirCarrinho,
  };

  return <LojaContext.Provider value={value}>{children}</LojaContext.Provider>;
};

export default AppProvider;

export function useLojaContext() {
  return useContext(LojaContext);
}
