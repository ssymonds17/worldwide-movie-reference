import React, { useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { BrowserRouter as Router } from 'react-router-dom';
import { Link } from 'react-router-dom';

import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import './login-view.scss';

import { connect } from 'react-redux';

export function LoginView(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Send a request to the server for authentication
    axios.post('https://worldwide-movie-reference.herokuapp.com/login', {
      username: username,
      password: password
    })
      .then(response => {
        const data = response.data;
        props.onLoggedIn(data);
      })
      .catch(e => {
        console.log('no such user')
      });
  };

  return (

    <Router>
      <Container className="loginContainer">
        <Row className="border rounded pt-3 mt-5 pb-3">
          <Col xs={11} sm={6}>
            <h1>Login</h1>
            <Form className="registration-form" onSubmit={handleSubmit}>
              <Form.Group controlId="formUsername">
                <Form.Label>Username</Form.Label>
                <Form.Control type="text" placeholder="Choppy1999" value={username} onChange={e => setUsername(e.target.value)} />
              </Form.Group>
              <Form.Group controlId="formPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="text" placeholder="abcd1234" value={password} onChange={e => setPassword(e.target.value)} />
              </Form.Group>
              <Button variant="primary" onClick={handleSubmit}>Log In</Button>
            </Form>
          </Col>
          <Col xs={11} sm={6} className="text-center">
            <Form className="mt-5 p-3">
              <Form.Group controlId="newUser">
                <Form.Label>Not a member yet?</Form.Label>
                <br />
                <Link to={`/register`}>
                  <Button variant="secondary" id="registerButton">Register</Button>
                </Link>
              </Form.Group>
            </Form>
          </Col>
        </Row>
      </Container>
    </Router>
  )
}

LoginView.propTypes = {
  onLoggedIn: PropTypes.func.isRequired,
};

export default connect(({ user }) => ({ user }))(LoginView);