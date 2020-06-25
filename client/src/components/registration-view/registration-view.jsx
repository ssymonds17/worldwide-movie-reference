/**
 * @requires react
 * @requires axios
 * @requires react-bootstrap/Form
 * @requires react-bootstrap/Button
 * @requires react-bootstrap/Container
 * @requires react-bootstrap/Row
 * @requires react-bootstrap/Col
 * @requires RegistrationView
 * @requires react-router-dom
 */

import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from 'axios';
import './registration-view.scss';

import { BrowserRouter as Router } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

export function RegistrationView() {
  const [name, createName] = useState('');
  const [username, createUsername] = useState('');
  const [password, createPassword] = useState('');
  const [email, createEmail] = useState('');
  const [birthday, createBirthday] = useState('');

  /**
   * User can register themselves
   * @function handleRegister
   * @axios
   * @param {string} username
   * @param {string} password
   * @param {string} email
   * @param {date} birthday
   */
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
        window.open('/client', '_self'); // The second argument is necessary so that 
        // the page will open in the same tab
      })
      .catch(e => {
        console.log('error registering the user')
      });
  }

  return (

    <Router>
      <Container className="registrationContainer mt-5">
        <Row>
          <Col className="mb-5" xs={11} sm={6}>
            <h1>Create account</h1>
            <Form className="registration-form" onSubmit={handleRegister}>
              <Form.Group controlId="form-name">
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" placeholder="Enter full name here" value={name} onChange={e => createName(e.target.value)} />
              </Form.Group>
              <Form.Group controlId="form-username">
                <Form.Label>Username</Form.Label>
                <Form.Control type="text" placeholder="Username" value={username} onChange={e => createUsername(e.target.value)} />
              </Form.Group>
              <Form.Group controlId="form-password">
                <Form.Label>Password</Form.Label>
                <Form.Control type="text" placeholder="Password" value={password} onChange={e => createPassword(e.target.value)} />
              </Form.Group>
              <Form.Group controlId="form-email">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" placeholder="Enter email address here" value={email} onChange={e => createEmail(e.target.value)} />
                <Form.Text className="text-muted">Email addresses are never shared with third parties</Form.Text>
              </Form.Group>
              <Form.Group controlId="form-birthday">
                <Form.Label>Birthday</Form.Label>
                <Form.Control type="date" value={birthday} onChange={e => createBirthday(e.target.value)} />
              </Form.Group>
              <Button variant="primary" type="submit">Register</Button>
            </Form>
          </Col>
          <Col xs={11} sm={6} className="text-center">
            <Form className="mt-5 p-3 border rounded">
              <Form.Group controlId="new-user">
                <Form.Label className="text-center mb-3">Already a member?</Form.Label>
                <br />
                <Link to={`/`}>
                  <Button variant="secondary">Log In</Button>
                </Link>
              </Form.Group>
            </Form>
          </Col>
        </Row>
      </Container>
    </Router>
  )
}

export default connect(({ user }) => ({ user }))(RegistrationView);