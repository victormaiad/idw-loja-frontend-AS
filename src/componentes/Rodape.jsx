import "./Rodape.scss";
import logo from "../logo.svg";
import Container from "react-bootstrap/Container";

export default function Rodape() {
  return (
    <footer className="rodape">
      <Container>
        <div>Loja PMW &copy; 2022 - Todos os direitos reservados.</div>
        <div>
          Desenvolvido com
          <img src={logo} className="App-logo" alt="logo" />
        </div>
      </Container>
    </footer>
  );
}
