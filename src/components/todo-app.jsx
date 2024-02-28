import React, { useState } from "react";
import {
  Container,
  Form,
  Button,
  ListGroup,
  Modal,
  Alert,
  Col,
  Row,
} from "react-bootstrap";
import "../components/todo-app.css";

function TodoApp() {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [showEditModal, setShowEditModal] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [editValue, setEditValue] = useState("");

  const [submissionStatus, setSubmissionStatus] = useState(null);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim() !== "") {
      setTodos([...todos, inputValue]);
      setInputValue("");
      setSubmissionStatus("true");
    } else {
      setSubmissionStatus("false");
    }
  };

  const handleDelete = (index) => {
    const updatedTodos = todos.filter((_, i) => i !== index);
    setTodos(updatedTodos);
  };

  const handleEdit = (index) => {
    setEditIndex(index);
    setEditValue(todos[index]);
    setShowEditModal(true);
  };

  const handleEditInputChange = (e) => {
    setEditValue(e.target.value);
  };

  const handleEditSubmit = () => {
    const updatedTodos = [...todos];
    updatedTodos[editIndex] = editValue;
    setTodos(updatedTodos);
    setShowEditModal(false);
    setEditIndex(null);
  };

  return (
    <Container className="mt-5">
      <h1 className="text-center mb-4">Todo List</h1>
      <Form onSubmit={handleSubmit} className="mb-3">
        <Form.Group controlId="formTodo">
          <Form.Control
            size="lg"
            type="text"
            placeholder="Add a new todo"
            value={inputValue}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Button variant="primary" type="submit" id="addbotton">
          Add
        </Button>
      </Form>
      {submissionStatus === "false" && (
        <Alert variant="danger" className="mt-3">
          Please enter Task
        </Alert>
      )}
      <ListGroup>
        {todos.map((todo, index) => (
          <ListGroup.Item key={index} className="list-items">
            <Row>
              <Col className="task">
                <span>{todo}</span>
              </Col>
              <Col lg="2" sm="12">
                <Button
                  className="ml-2"
                  variant="info"
                  onClick={() => handleEdit(index)}
                  style={{ margin: 5 }}
                >
                  Edit
                </Button>
                <Button
                  className="ml-2"
                  variant="danger"
                  onClick={() => handleDelete(index)}
                  style={{ margin: 5 }}
                >
                  Delete
                </Button>
              </Col>
            </Row>
          </ListGroup.Item>
        ))}
      </ListGroup>
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Todo</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Control
            type="text"
            value={editValue}
            onChange={handleEditInputChange}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEditModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleEditSubmit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default TodoApp;
