import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import { Container, Button, Col, Image, Row  } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { fetchOneProduct } from "../http/productApi";

const ProductPage = () => {
  const [ product, setProduct] = useState({info:[]})
  const {id} = useParams()

  // Берем инфу из бд и передаем её для отрисовки

  // Описания сейчас не отрисовываются. У них отдельная таблица
  // Я потом перепешу, чтобы они были сразу с продуктом, а не присваивались к его айди

  useEffect(()=> {
    fetchOneProduct(id).then(data => setProduct(data))
  }, [])

  return (
    <div>
      <NavBar />
      <Container
        className="custom-container d-flex justify-content-center align-items-center"
        style={{ height: window.innerHeight - 154 }}
      >
        <Row>
          <Col md={5}>
            <Image
              style={{ borderRadius: "50px" }}
              width={500}
              height={500}
              src={process.env.REACT_APP_API_URL + product.image}
            />
          </Col>
          <Col md={5} className="d-flex flex-column align-items-center">
            <div className="" style={{ color: "#DB7611" }}>
              <h1>{product.name}</h1>
              <h3>{product.price} рублей</h3>
            </div>
            <div>
              <h3
                key={product.id}
                style={{ textAlign: "justify", color: "#ADADAD" }}
              >
                {product.description}
              </h3>
            </div>
            <Row xs="auto" className="m-3">
              <Button className="product-page-btn">Изменить (Разработка)</Button>
              <Button className="product-page-btn-delete ms-5">Удалить (Разработка)</Button>
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ProductPage;
