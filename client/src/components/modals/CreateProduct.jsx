import React, { useContext, useState, useEffect} from "react"; 
import Modal from "react-bootstrap/Modal";
import { Button, Dropdown, Form } from "react-bootstrap";
import { Context } from "../../index";
import { observer } from "mobx-react-lite";
import { createProduct, fetchCategoties, fetchMarks } from "../../http/productApi";

const CreateProduct = observer(({ show, onHide }) => {
  const product = useContext(Context).product;

  const [name, setName] = useState("");
  const [image, setImage] = useState(null);
  const [article, setArticle] = useState(0);
  const [price, setPrice] = useState(0);
  const [info, setInfo] = useState(""); // состояние для описания

  useEffect(() => {
    fetchMarks().then(data => product.setMarks(data))
    fetchCategoties().then(data => product.setCategories(data))
}, [])

  const addProduct = () => {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("image", image);
    formData.append("article", `${article}`);
    formData.append("price", `${price}`);
    formData.append("categoryId", product.selectedCategory.id);
    formData.append("markId", product.selectedMark.id);
    // formData.append("info", JSON.stringify(info)); // отправляем описание

    createProduct(formData).then((data) => onHide());
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Добавить новое блюдо
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Control
            onChange={(e) => setName(e.target.value)} // исправлено: правильное извлечение значения
            className="mt-3"
            placeholder="Введите название блюда"
          />
          <Form.Control
            onChange={(e) => setImage(e.target.files[0])}
            className="mt-3"
            type="file"
          />
          <Form.Control
            onChange={(e) => setArticle(Number(e.target.value))} // исправлено: правильное извлечение значения
            className="mt-3"
            type="number"
            placeholder="Введите артикул"
          />
          <Form.Control
            onChange={(e) => setPrice(Number(e.target.value))} // исправлено: правильное извлечение значения
            className="mt-3"
            type="number"
            placeholder="Введите цену"
          />
          <Dropdown className="mt-3 mb-2">
            <Dropdown.Toggle>
              {product.selectedCategory.name || "Выберите категорию"}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {product.categories.map((category) => (
                <Dropdown.Item
                  onClick={() => product.setSelectedCategory(category)}
                  key={category.id}
                >
                  {category.name}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
          <Dropdown className="mt-3 mb-2">
            <Dropdown.Toggle>
              {product.selectedMark.name || "Выберите метку (В разработке)"}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {product.marks.map((mark) => (
                <Dropdown.Item
                  onClick={() => product.setSelectedMark(mark)}
                  key={mark.id}
                >
                  {mark.name}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
          <textarea 
            className="mt-3 form-control"
            id="exampleFormControlTextarea1"
            rows="3"
            placeholder="Добавить описание"
            onChange={(e) => setInfo(e.target.value)} // сохраняем описание в состоянии
          />
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button className="admin-page-btn" onClick={onHide}>
          Закрыть
        </Button>
        <Button className="admin-page-btn" onClick={addProduct}>
          Добавить
        </Button>
      </Modal.Footer>
    </Modal>
  );
});

export default CreateProduct;
