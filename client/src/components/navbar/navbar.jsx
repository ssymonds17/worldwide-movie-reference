import React from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import './navbar.scss';

function MyNavbar() {
  return (
    <Navbar className="navbarContainer" bg="primary" expand="lg" fixed="top">
      <Navbar.Brand className="navBrand" href="#home">WorldWide Movie Reference</Navbar.Brand>
      <Navbar.Toggle aria controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <NavDropdown title="Menu" id="basic-nav-dropdown">
            <NavDropdown.Item href="#movies">Movies</NavDropdown.Item>
            <NavDropdown.Item href="#genres">Genres</NavDropdown.Item>
            <NavDropdown.Item href="#directors">Directors</NavDropdown.Item>
            <NavDropdown.Item href="#actors">Actors</NavDropdown.Item>
          </NavDropdown>
          <Nav.Link href="#login">Log In</Nav.Link>
          <Nav.Link href="#register">Register</Nav.Link>
        </Nav>
        <Form inline>
          <Form.Control type="text" placeholder="Search" className="mr-sm-2" />
          <Button variant="outline-light">Search</Button>
        </Form>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default MyNavbar;