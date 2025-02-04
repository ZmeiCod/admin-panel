import React, {useState} from 'react';
import Modal from "react-bootstrap/Modal";
import {Form, Button} from "react-bootstrap";
import {createMark} from "../../http/productApi";

const CreateMark= ({show, onHide}) => {
    const [value, setValue] = useState('')

    const addMark = () => {
        createMark({name: value}).then(data => {
            setValue('')
            onHide()
        })
    }

    // Просто берем название и создаем его в бд

    return (
        <Modal
            show={show}
            onHide={onHide}
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Добавить метку
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Control
                        value={value}
                        onChange={e => setValue(e.target.value)}
                        placeholder={"Введите название метки"}
                    />
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button className="admin-page-btn" onClick={onHide}>Закрыть</Button>
                <Button className="admin-page-btn" onClick={addMark}>Добавить</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default CreateMark;