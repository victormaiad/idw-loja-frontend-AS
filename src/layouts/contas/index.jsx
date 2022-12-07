import { Col, Container, Row } from "react-bootstrap";
import { Outlet } from "react-router-dom";
import "./styles.scss";

/**
 * O layout `Contas` é utilizado para as funcionalidades associadas a
 * contas de usuário e que não exigem autenticação.
 *
 * Fornece uma interface gráfica simplificada, que centraliza o conteúdo
 * na tela, tanto vertical quanto horizontalmente.
 *
 * @param {{children}} param0
 * @returns
 */
export default function Contas({ children }) {
  return (
    <Container fluid className="contas__container">
      <Row className="h-100 align-items-center justify-content-center">
        <Col md={6} lg={4} xl={3}>
          <Outlet />
          <div className="mt-4 small text-muted text-center">
            Loja PMW &copy; 2022
          </div>
        </Col>
      </Row>
    </Container>
  );
}
