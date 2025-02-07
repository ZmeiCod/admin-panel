import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import { Form, Button } from "react-bootstrap";
import { createCarousel } from "../../http/productApi";

const CreateCarousel = ({ show, onHide }) => {
  const [value, setValue] = useState("");
  const [image, setImage] = useState(null);

  const addCarousel = () => {
    const formData = new FormData();
    formData.append("name", value);
    formData.append("image", image);

    createCarousel(formData).then((data) => {
      setValue("");
      setImage(null);
      onHide();
    });
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Добавить новый слайд
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Control
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder={"Введите название для слайда"}
          />
          <Form.Control
            className="mt-3"
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
          />
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button className="admin-page-btn" onClick={onHide}>
          Закрыть
        </Button>
        <Button className="admin-page-btn" onClick={addCarousel}>
          Добавить
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CreateCarousel;
