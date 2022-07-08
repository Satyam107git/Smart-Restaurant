import React from "react";
import {
  Row,
  Col,
  Navbar,
  Nav,
  Container,
  NavDropdown,
  Image,
} from "react-bootstrap";

import { useDispatch, useSelector } from "react-redux";

import { LinkContainer } from "react-router-bootstrap";
import { logout } from "../actions/userActions";

function Header() {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const dispatch = useDispatch();

  const logoutHandler = () => {
    dispatch(logout());
  };

  return (
    <header>
      <Navbar variant="light" bg="warning" expand="lg" collapseOnSelect>
        <Container fluid>
          <Image src="/images/chef.jpg" roundedCircle fluid className="mx-2" />

          <LinkContainer to="/">
            <Navbar.Brand> Smart Restaurant</Navbar.Brand>
          </LinkContainer>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <LinkContainer to="/cart">
                <Nav.Link>
                  <i className="fas fa-shopping-cart"></i> Cart
                </Nav.Link>
              </LinkContainer>

              {userInfo && (
                <LinkContainer to="/myorders">
                  <Nav.Link>
                    <i className="fas fa-clipboard-list"></i> Your Orders
                  </Nav.Link>
                </LinkContainer>
              )}
              {userInfo ? (
                <NavDropdown title={userInfo.name} id="username">
                  <LinkContainer to="/profile">
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                  </LinkContainer>

                  <NavDropdown.Item onClick={logoutHandler}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <LinkContainer to="/login">
                  <Nav.Link>
                    <i className="fas fa-user"></i>Login
                  </Nav.Link>
                </LinkContainer>
              )}

              {userInfo && userInfo.isAdmin && (
                <NavDropdown title="Admin" id="adminmenue">
                  <LinkContainer to="/admin/userlist">
                    <NavDropdown.Item>Users</NavDropdown.Item>
                  </LinkContainer>

                  <LinkContainer to="/admin/itemlist">
                    <NavDropdown.Item>Items</NavDropdown.Item>
                  </LinkContainer>

                  <LinkContainer to="/admin/tablelist">
                    <NavDropdown.Item>Tables</NavDropdown.Item>
                  </LinkContainer>

                  <LinkContainer to="/admin/orderlist">
                    <NavDropdown.Item>Orders</NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
}

export default Header;

/* <Navbar.Brand href="/">Proshop</Navbar.Brand> */
