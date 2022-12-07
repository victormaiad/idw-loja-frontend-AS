import { useState } from "react";
import {
  Button,
  Card,
  FloatingLabel,
  Form,
  Modal,
  Spinner,
} from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "../../providers/AuthProvider";

export default function Entrar() {
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalTitle, setModalTitle] = useState();
  const [modalBody, setModalBody] = useState();

  const { signIn } = useAuthContext();
  const navigate = useNavigate();

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const { identifier, password } = Object.fromEntries(formData);
    try {
      setLoading(true);
      await signIn(identifier, password);
      navigate("/perfil");
    } catch (error) {
      setModalTitle("Erro de Autenticação");
      setModalBody(
        `${error}. Corrija os dados e tente novamente dentro de alguns instantes.`
      );
      handleShowModal();
    }
    setLoading(false);
  };
  return (
    <Card>
      <Card.Body>
        <Card.Title>Entrar</Card.Title>
        <Card.Text>
          Acesse sua área de usuário informando suas credenciais (e-mail e
          senha)
        </Card.Text>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <FloatingLabel label="E-mail">
              <Form.Control
                type="email"
                name="identifier"
                placeholder="Informe seu e-mail"
                required
              />
            </FloatingLabel>
          </Form.Group>

          <Form.Group className="mb-3">
            <FloatingLabel label="Senha">
              <Form.Control
                type="password"
                name="password"
                placeholder="Informe sua senha"
                required
              />
              <Form.Text className="text-muted">
                Esqueceu sua senha?{" "}
                <Link to="/contas/recuperar-acesso">
                  Recuperar acesso à conta
                </Link>
                .
              </Form.Text>
            </FloatingLabel>
          </Form.Group>
          <Button
            variant="outline-dark"
            type="submit"
            className="w-100"
            disabled={loading}
          >
            {loading && (
              <Spinner animation="border" size="sm" className="me-2"></Spinner>
            )}
            Entrar
          </Button>
        </Form>
      </Card.Body>
      <Card.Footer>
        <Link to={"/"}>Voltar para a loja</Link> ou{" "}
        <Link to={"/contas/cadastrar"}>Criar conta de usuário</Link>
      </Card.Footer>
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>{modalTitle}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{modalBody}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            OK
          </Button>
        </Modal.Footer>
      </Modal>
    </Card>
  );
}
