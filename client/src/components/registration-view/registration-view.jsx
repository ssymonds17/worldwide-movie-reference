import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import axios from 'axios';
import './registration-view.scss';

import { BrowserRouter as Router } from 'react-router-dom';
import { Link } from 'react-router-dom';

export function RegistrationView() {
  const [name, createName] = useState('');
  const [username, createUsername] = useState('');
  const [password, createPassword] = useState('');
  const [email, createEmail] = useState('');
  const [birthday, createBirthday] = useState('');

  const handleRegister = (e) => {
    e.preventDefault();
    // Send a request to the server for authentication
    axios.post('https://worldwide-movie-reference.herokuapp.com/users', {
      name: name,
      username: username,
      password: password,
      email: email,
      birthday: birthday
    })
      .then(response => {
        const data = response.data;
        console.log(data);
        window.open('/', '_self'); // The second argument is necessary so that 
        // the page will open in the same tab
      })
      .catch(e => {
        console.log('error registering the user')
      });
  }

  return (

    <Router>
      <div>
        <Container className="registrationContainer">
          <h1>Create account</h1>
          <Form className="registrationForm">
            <Form.Group controlId="formName">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" placeholder="Enter full name here" value={name} onChange={e => createName(e.target.value)} />
            </Form.Group>
            <Form.Group controlId="formUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control type="text" placeholder="Username" value={username} onChange={e => createUsername(e.target.value)} />
            </Form.Group>
            <Form.Group controlId="formPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="text" placeholder="Password" value={password} onChange={e => createPassword(e.target.value)} />
            </Form.Group>
            <Form.Group controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" placeholder="Enter email address here" value={email} onChange={e => createEmail(e.target.value)} />
              <Form.Text className="text-muted">Email addresses are never shared with third parties</Form.Text>
            </Form.Group>
            <Form.Group controlId="formBirthday">
              <Form.Label>Birthday</Form.Label>
              <Form.Control type="date" value={birthday} onChange={e => createBirthday(e.target.value)} />
            </Form.Group>
            <Button variant="primary" type="submit" onClick={handleRegister}>Register</Button>
          </Form>
          <br />
          <Form>
            <Form.Group controlId="newUser">
              <Form.Text>Already a member?</Form.Text>
              <Link to={`/`}>
                <Button variant="secondary">Log In</Button>
              </Link>
            </Form.Group>
          </Form>
        </Container>
      </div>
    </Router>
  )
}