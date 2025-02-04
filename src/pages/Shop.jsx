import React, { useContext, useEffect } from "react";
import NavBar from "../components/NavBar";
import { Col, Container, Row } from "react-bootstrap";
import CategoryBar from "../components/CategoryBar";
import "../index.css";
import { observer } from "mobx-react-lite";
import MarkBar from "../components/MarkBar";
import ProductList from "../components/ProductList";
import { fetchCategoties, fetchMarks, fetchProducts } from "../http/productApi";
import { Context } from "../index";

const Shop = observer(() => {
  const { product } = useContext(Context);

  // Сначала мы вызываем отрисовку всех продуктов, категорий и меток

  useEffect(() => {
    fetchCategoties().then((data) => product.setCategories(data));
    fetchMarks().then((data) => product.setMarks(data));
    fetchProducts(null).then((data) => {
      product.setProducts(data.rows);
    });
  }, []);

  // Пагинация при нажатии на категорию
  // Пагинация для меток будет позже

  useEffect(() => {
    fetchProducts(product.selectedCategory.id).then((data) => {
      product.setProducts(data.rows);
    });
  }, [product.selectedCategory]);

  return (
    <div>
      <NavBar />
      <Container className="custom-container">
        <Row className="mt-3">
          <Col md={2}>
            <CategoryBar />
          </Col>
          <Col md={10}>
            <MarkBar />
            <ProductList />
          </Col>
        </Row>
      </Container>
    </div>
  );
});

export default Shop;
