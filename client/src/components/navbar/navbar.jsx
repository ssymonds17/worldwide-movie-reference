import React, { useState } from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Button from 'react-bootstrap/Button';
import './navbar.scss';

import { connect } from 'react-redux';

function MyNavbar(props) {
  const { username } = props
  console.log(props);

  const [user] = useState(user);

  const onLoggedOut = () => {
    this.setState({
      user: null
    });

    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.open('/', '_self');
  }

  return (
    <div>
      <Navbar className="navbarContainer mb-5" bg="primary" expand="md" fixed="top">
        <Navbar.Brand className="nav-brand" href="/">WorldWide Movie Reference</Navbar.Brand>
        <Button href={`/users/${username}`}>{username}</Button>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Button className="logout-button" onClick={onLoggedOut}>Log Out</Button>
            <Button href="/register">Register</Button>
            <NavDropdown title="Menu" id="basic-nav-dropdown">
              <NavDropdown.Item href="#movies">Movies</NavDropdown.Item>
              <NavDropdown.Item href="#genres">Genres</NavDropdown.Item>
              <NavDropdown.Item href="#directors">Directors</NavDropdown.Item>
              <NavDropdown.Item href="#actors">Actors</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <br />
    </div>
  )
}

export default connect()(MyNavbar);