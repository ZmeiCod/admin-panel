import React, { useState, useContext } from "react";
import { Button, Card, Container, Form, Row } from "react-bootstrap";
import "../index.css";
import { login, registration } from "../http/userApi";
import { observer } from "mobx-react-lite";
import { Context } from "../index";
import { useNavigate } from "react-router-dom";
import { SHOP_ROUTE } from "../utils/consts";

const Auth = observer(() => {
  const numbers = process.env.REACT_APP_NUMBER;
  const { user } = useContext(Context);
  const history = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [number, setNumber] = useState("");
  
  const click = async () => {
    try {
      if (number === numbers) {
        let data = await registration(email, password);
        if (data) {
          user.setUser(data);
          user.setIsAuth(true);
          history(SHOP_ROUTE);
        }
      } else {
        let data = await login(email, password);
        if (data) {
          user.setUser(data);
          user.setIsAuth(true);
          history(SHOP_ROUTE);
        }
      }
    } catch (e) {
      alert(e.response?.data?.message || "Произошла ошибка");
    }
  };

  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{ height: window.innerHeight - 54 }}
    >
      <Card style={{ width: 600 }} className="p-5">
        <h2 className="m-auto">Авторизация</h2>
        <Form>
          <Form.Control
            className="mt-3 form-control-custom"
            placeholder="Введите ваш email..."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Form.Control
            className="mt-3 form-control-custom"
            placeholder="Введите ваш пароль..."
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
          />
          <Form.Control
            className="mt-3 form-control-custom"
            value={number}
            onChange={(e) => setNumber(e.target.value)}
            // type="password"
          />
          <Row
            className="d-flex justify-content-center mt-3 pl-3 pr-3"
            style={{ marginRight: 0, marginLeft: 0 }}
          >
            <Button className="BTN" onClick={click} variant={"outline-none"}>
              Войти
            </Button>
          </Row>
        </Form>
      </Card>
    </Container>
  );
});

export default Auth;
