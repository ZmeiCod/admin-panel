import React, { useContext } from "react";
import { Context } from "../index";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { NavLink } from "react-router-dom";
import { Button, Container } from "react-bootstrap";
import { observer } from "mobx-react-lite";
import icon from "../assets/icon.svg";
import { useNavigate } from "react-router-dom";
import { ADMIN_ROUTE, LOGIN_ROUTE, SHOP_ROUTE } from "../utils/consts";

const NavBar = observer(() => {
  const { user } = useContext(Context);
  const history = useNavigate();

    const logOut = () => {
      user.setUser({})
      user.setIsAuth(false)
  }

  return (
    <Navbar bg="dark" variant="dark">
      <Container className="custom-container">
        <NavLink>
          {" "}
          <img src={icon} alt="icon" />{" "}
        </NavLink>
        {user.isAuth ? (
          <Nav className="ms-auto">
            <Button
              className="BTN"
              variant={"outline-light"}
              onClick={() => history(SHOP_ROUTE)}
            >
              Главная
            </Button>
            <Button
              className=" ms-4 BTN"
              variant={"outline-light"}
              onClick={() => history(ADMIN_ROUTE)}
            >
              Управление
            </Button>
            <Button
              variant={"outline-light"}
              className="ms-4 BTN"
              onClick={logOut}
            >
              Выйти
            </Button>
          </Nav>
        ) : (
          <Nav className="ms-auto">
            <Button
              className="BTN"
              variant={"outline-light"}
              onClick={() => history(LOGIN_ROUTE)}
            >
              Авторизация
            </Button>
          </Nav>
        )}
      </Container>
    </Navbar>
  );
});

export default NavBar;
