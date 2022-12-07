import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function RecuperarAcesso() {
  return (
    <Card>
      <Card.Body>
        <Card.Title>Recuperar acesso à sua conta de usuário</Card.Title>
        <Card.Text>
          Desculpe. Esta funcionalidade ainda não está disponível.
        </Card.Text>
      </Card.Body>
      <Card.Footer>
        <Link to={"/"}>Voltar para a loja</Link> ou{" "}
        <Link to={"/contas/cadastrar"}>Cadastre-se</Link>
      </Card.Footer>
    </Card>
  );
}
