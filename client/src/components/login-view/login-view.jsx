import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import PropTypes from 'prop-types';
import MyNavbar from '../navbar/navbar';
import './login-view.scss';

export function LoginView(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(username, password);
    // Send a request to the server for authentication
    // then call props.onLoggedIn(username)
    props.onLoggedIn(username);
  };

  return (

    <div>
      <MyNavbar />
      <Container className="loginContainer">
        <h1>Login</h1>
        <Form>
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
        <br />
        <Form>
          <Form.Group controlId="newUser">
            <Form.Text>Not a member yet?</Form.Text>
            <Button variant="secondary" id="registerButton" onClick={() => props.onClick()}>Register</Button>
          </Form.Group>
        </Form>
      </Container>
    </div>
  )
}

LoginView.propTypes = {
  onLoggedIn: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired
};