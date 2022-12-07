import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { Link } from "react-router-dom";
import formatarPreco from "../lib/funcoes";
/**
 * O componente Produto apresenta as informações do produto
 * na lista de produtos.
 *
 * @param {{produto, onComprar}} props
 * @returns
 */
function Produto({ produto, onComprar }) {
  return (
    <Card className="h-100 border-0">
      <div
        className="card-img-top"
        style={{
          backgroundImage: `url(http://localhost:1337${produto.foto?.formats?.thumbnail?.url})`,
          backgroundSize: "cover",
          backgroundPosition: "center center",
          height: 250,
        }}
      ></div>
      <Card.Body>
        <Card.Title>
          {produto.nome}
        </Card.Title>
        <Card.Text className="fw-bold fs-3">
          {formatarPreco(produto.preco)}
        </Card.Text>
      </Card.Body>
      <Card.Footer>
        <Button as={Link} to={`produtos/${produto.id}`} variant="outline-secondary" className="me-3">Saiba mais</Button>
        <Button onClick={() => onComprar(produto)}>Comprar</Button>
      </Card.Footer>
    </Card>
  );
}

/**
 * O componente ListaDeProdutos apresenta a lista dos produtos.
 *
 * @param {{produtos, onComprar}} Props
 * @returns
 */
export default function ListaDeProdutos({ produtos, onComprar }) {
  return (
    <Row xs={1} md={2} lg={3} xl={4} className="g-4">
      {produtos.map((produto) => (
        <Col key={produto.id}>
          <Produto
            key={produto.id}
            produto={produto}
            onComprar={onComprar}
          ></Produto>
        </Col>
      ))}
    </Row>
  );
}
