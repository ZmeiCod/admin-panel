import React, { useState } from "react";
import { Button, Container } from "react-bootstrap";
import CreateProduct from "../components/modals/CreateProduct";
import CreateCategory from "../components/modals/CreateCategory";
import CreateMark from "../components/modals/CreateMark";
import CreateCarousel from "../components/modals/CreateCarousel";
import NavBar from "../components/NavBar";

const Admin = () => {
  const [categoryVisible, setCategoryVisible] = useState(false);
  const [productVisible, setProductVisible] = useState(false);
  const [markVisible, setMarkVisible] = useState(false);

  const [carouselVisible, setCarouselVisible] = useState(false);

  return (
    <div>
      <NavBar />
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
        <Button
          className="admin-page-btn mt-4 p-2"
          onClick={() => setCarouselVisible(true)}
        >
          Добавить слайды
        </Button>

        <CreateProduct
          show={productVisible}
          onHide={() => setProductVisible(false)}
        />
        <CreateCategory
          show={categoryVisible}
          onHide={() => setCategoryVisible(false)}
        />
        <CreateMark show={markVisible} onHide={() => setMarkVisible(false)} />
        <CreateCarousel
          show={carouselVisible}
          onHide={() => setCarouselVisible(false)}
        />
      </Container>

      {/* <Container className="d-flex flex-column mt-5">
        <Button className="admin-page-btn mt-4 p-2">
          Редактировать категорию (В разработке)
        </Button>
        <Button className="admin-page-btn mt-4 p-2">
          Редактировать метку (В разработке)
        </Button>
      </Container>

      <Container className="d-flex flex-column mt-5">
        <Button className="admin-page-btn mt-4 p-2">
          Удалить слайды (В разработке)
        </Button>
        <CreateCarousel
          show={carouselVisible}
          onHide={() => setCarouselVisible(false)}
        />
      </Container> */}
    </div>
  );
};

export default Admin;
