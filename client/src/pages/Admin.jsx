import React, { useState } from "react";
import { Button, Container } from "react-bootstrap";
import CreateProduct from "../components/modals/CreateProduct";
import CreateCategory from "../components/modals/CreateCategory";
import CreateCarousel from "../components/modals/CreateCarousel";
import NavBar from "../components/NavBar";
import DeletedSlide from "../components/modals/DeletedSlide";

const Admin = () => {
  const [categoryVisible, setCategoryVisible] = useState(false);
  const [productVisible, setProductVisible] = useState(false);
  const [carouselVisible, setCarouselVisible] = useState(false);
  const [deleteSlideVisible, setDeleteSlideVisible] = useState(false);

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
      </Container> */}

      <Container className="d-flex flex-column mt-5">
        <Button
          className="admin-page-btn mt-4 p-2"
          onClick={() => setDeleteSlideVisible(true)}
        >
          Удалить слайды
        </Button>
        <DeletedSlide
          show={deleteSlideVisible}
          onHide={() => setDeleteSlideVisible(false)}
        />
      </Container>
    </div>
  );
};

export default Admin;
