import { Container, Offcanvas } from "react-bootstrap";
import { Outlet } from "react-router-dom";
import BarraDeNavegacao from "../componentes/BarraDeNavegacao";
import Carrinho from "../componentes/Carrinho";
import Rodape from "../componentes/Rodape";
import { useLojaContext } from "../providers/AppProvider";

/**
 * O layout `Vitrine` é utilizado para as funcionalidades gerais 
 * do aplicativo que envolvem, mais especificamente, a interface
 * gráfica da loja.
 * 
 * Fornece uma interface gráfica com:
 * * barra de navegação, 
 * * área de conteúdo, 
 * * offcanvas que apresenta o carrinho e 
 * * rodapé

 * @param {{children}} param0 
 * @returns 
 */
export default function Vitrine({ children }) {
  const { showCarrinho, handleFecharCarrinho } = useLojaContext();

  return (
    <>
      <BarraDeNavegacao />

      <Container className="my-5">
        <main>
          <Outlet />
        </main>
      </Container>

      <Offcanvas
        show={showCarrinho}
        onHide={handleFecharCarrinho}
        placement="end"
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Carrinho</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Carrinho />
        </Offcanvas.Body>
      </Offcanvas>

      <Rodape />
    </>
  );
}
