import React, { useState } from "react";
import { Button, Card, FloatingLabel, Form } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "../../providers/AuthProvider";

/**
 * O componente `Cadastrar` fornece a interface gráfica para um atela
 * que permite criar uma conta de usuário.
 *
 * O componente interage com outros recursos do aplicativo, como o
 * AuthContext para executar a operação de criar uma conta de usuário
 * junto ao backend.
 *
 * @returns {ReactElement}
 */
export default function Cadastrar() {
  const [showModal, setShowModal] = useState(false);
  const [modalTitle, setModalTitle] = useState();
  const [modalBody, setModalBody] = useState();
  const [cadastroOk, setCadastroOk] = useState(false);
  const navigate = useNavigate();

  // Obtém o método signUp do AuthContext
  const { signUp } = useAuthContext();

  /**
   * Define um tratador de evento para mostrar a modal
   */
  const handleShowModal = () => setShowModal(true);

  /**
   * Define um tratador de evento para ocultar a modal
   */
  const handleCloseModal = () => {
    if (cadastroOk) {
      navigate("/perfil");
    }
    setShowModal(false);
  };

  /**
   * Define um tratador de evento utilizado no submit do formulário.
   *
   * O código obtém os dados do formulário e utiliza o FormData.
   * Além disso, utiliza o método `signUp`, definido no `AuthContext`,
   * para enviar o nome do usuário, o e-mail e a senha para o backend.
   *
   * @param {*} e
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const { username, email, password } = Object.fromEntries(formData);
    try {
      await signUp(username, email, password);
      setModalTitle("Conta de usuário criada com sucesso");
      setModalBody(
        "Sua conta de usuário foi criada. Ao continuar, você terá acesso a sua área de usuário."
      );
      setCadastroOk(true);
    } catch (erro) {
      setModalTitle("Não foi possível criar sua conta de usuário");
      setModalBody(erro);
    }
    handleShowModal();
  };

  return (
    <Card>
      <Card.Body>
        <Card.Title>Criar conta de usuário</Card.Title>
        <Card.Text>
          Crie uma conta de usuário para acessar funcionalidades restritas a
          usuários cadastrados e com contas ativas.
        </Card.Text>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <FloatingLabel label="Nome">
              <Form.Control
                type="text"
                name="username"
                placeholder="Informe seu nome"
                required
              />
            </FloatingLabel>
          </Form.Group>

          <Form.Group className="mb-3">
            <FloatingLabel label="E-mail">
              <Form.Control
                type="email"
                name="email"
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
            </FloatingLabel>
          </Form.Group>
          <Button variant="outline-dark" type="submit" className="w-100">
            Salvar
          </Button>
        </Form>
      </Card.Body>
      <Card.Footer>
        <Link to={"/"}>Voltar para a loja</Link>
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
