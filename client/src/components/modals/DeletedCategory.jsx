import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import { Form, Button } from "react-bootstrap";
import { deleteCategory } from "../../http/productApi"; // Изменено на deleteCategory
import { useNavigate } from "react-router-dom";
import { SHOP_ROUTE } from "../../utils/consts";

const DeletedCategory = ({ show, onHide }) => {
  const api = process.env.REACT_APP_API_URL;
  const [categoryName, setCategoryName] = useState(""); // Изменено на categoryName

  const navigate = useNavigate();

  const confirmDeleteCategory = async () => { // Переименовано
    const confirmDelete = window.confirm(
      "Вы уверены, что хотите удалить эту категорию?"
    );
    if (confirmDelete) {
      await delCategory(); // Изменено на delCategory
    }
  };

  const getCategoryIdByName = async (name) => { // Переименовано
    try {
      const response = await fetch(`${api}api/category`); // Получаем категории вместо слайдов
      if (!response.ok) {
        throw new Error("Ошибка при получении категорий");
      }
      const categories = await response.json();

      const category = categories.find((category) => category.name === name); // Меняем на category

      return category ? category.id : null;
    } catch (error) {
      console.error("Ошибка при поиске категории по имени: ", error);
      return null;
    }
  };

  const delCategory = async () => { // Переименовано
    try {
      const id = await getCategoryIdByName(categoryName); // Изменено на categoryName
      if (id) {
        await deleteCategory(id); // Изменено на deleteCategory
        console.log("Категория удалена");
        navigate(SHOP_ROUTE);
      } else {
        alert("Категория с таким названием не найдена.");
      }
    } catch (error) {
      console.error("Ошибка при удалении категории: ", error);
    }
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Удалить категорию
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Control
            value={categoryName} // Изменено на categoryName
            onChange={(e) => setCategoryName(e.target.value)} // Изменено на categoryName
            placeholder={"Введите название категории для удаления"}
          />
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button className="admin-page-btn" onClick={onHide}>
          Отменить
        </Button>
        <Button className="admin-page-btn" onClick={confirmDeleteCategory}> {/* Изменено на confirmDeleteCategory */}
          Удалить
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeletedCategory;
