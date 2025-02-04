import React, {useState} from 'react';
import {Button, Container} from "react-bootstrap";
import CreateProduct from "../components/modals/CreateProduct";
import CreateCategory from "../components/modals/CreateCategory";
import CreateMark from "../components/modals/CreateMark";
import NavBar from '../components/NavBar';

const Admin = () => {
    const [categoryVisible, setCategoryVisible] = useState(false)
    const [productVisible, setProductVisible] = useState(false)
    const [markVisible, setMarkVisible] = useState(false)

    return (
        <div>
          <NavBar></NavBar>
          <Container className="d-flex flex-column">
            <Button
                className="admin-page-btn mt-4 p-2"
                onClick={() => setProductVisible(true)}
            >
                Добавить новое блюдо
            </Button>
            <Button
                className="admin-page-btn mt-4 p-2"
                onClick={() => setCategoryVisible(true)}
            >
                Добавить категорию
            </Button>
            <Button
                className=" admin-page-btn mt-4 p-2"
                onClick={() => setMarkVisible(true)}
            >
                Добавить метку
            </Button>
            <CreateProduct show={productVisible} onHide={() => setProductVisible(false)}/>
            <CreateCategory show={categoryVisible} onHide={() => setCategoryVisible(false)}/>
            
            <CreateMark show={markVisible} onHide={() => setMarkVisible(false)}/>
        </Container>
        </div>
    )};

export default Admin;
