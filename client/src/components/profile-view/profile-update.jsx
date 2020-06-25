/**
 * @requires React
 * @requires axios
 * @requires propTypes
 * @requires react-bootstrap/Form
 * @requires react-bootstrap/Button
 * @requires react-bootstrap/Container
 * @requires react-bootstrap/Row
 * @requires react-bootstrap/Col
 * @requires react-redux
 */

import React, { useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { connect } from 'react-redux';

export function UpdateView(props) {
  const { user } = props;

  const [name, updateName] = useState(user.name !== null ? user.name : '');
  const [username, updateUsername] = useState(user.username !== null ? user.username : '');
  const [password, updatePassword] = useState(user.password !== null ? user.password : '');
  const [email, updateEmail] = useState(user.email !== null ? user.email : '');
  const [birthday, updateBirthday] = useState(user.birthday !== null ? user.birthday : '');


  /**
   * Allows user to update their information
   * @function handleUpdate
   * @param {*} event 
   */
  const handleUpdate = (e) => {
    e.preventDefault();
    // Send a request to the server for authentication
    axios.put(`https://worldwide-movie-reference.herokuapp.com/users/${user}`, {
      name: name,
      username: username,
      password: password,
      email: email,
      birthday: birthday
    }, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    })
      .then(response => {
        const data = response.data;
        alert('Your profile data was successfully updated');
        localStorage.setItem('user', data.username);
        window.open(`/users/${localStorage.getItem('user')}`, '_self'); // The second argument is necessary so that 
        // the page will open in the same tab
      })
      .catch(error => {
        alert('error updating user ' + error);
      });
  }

  /**
   * Allows user to delete their account
   * @function handleDelete
   * @param {*} event 
   */
  const handleDelete = (e) => {
    e.preventDefault();
    axios.delete(`https://worldwide-movie-reference.herokuapp.com/users/${user}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    })
      .then(response => {
        alert('Your account has been successfully deleted');
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.open('/client', '_self');
      })
      .catch(error => {
        alert('Error deleting your account.');
      });
  }

  return (
    <Container className="update-container mt-5">
      <Row>
        <Col className="mb-5" xs={11} sm={6}>
          <Form className="update-form" onSubmit={handleUpdate}>
            <Form.Group controlId="form-name">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" placeholder="Enter full name here" value={name} onChange={e => updateName(e.target.value)} />
            </Form.Group>
            <Form.Group controlId="form-username">
              <Form.Label>Username</Form.Label>
              <Form.Control type="text" placeholder="Username" value={username} onChange={e => updateUsername(e.target.value)} />
            </Form.Group>
            <Form.Group controlId="form-password">
              <Form.Label>Password</Form.Label>
              <Form.Control type="text" placeholder="Password" value={password} onChange={e => updatePassword(e.target.value)} />
            </Form.Group>
            <Form.Group controlId="form-email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" placeholder="Enter email address here" value={email} onChange={e => updateEmail(e.target.value)} />
            </Form.Group>
            <Form.Group controlId="form-birthday">
              <Form.Label>Date of Birth</Form.Label>
              <Form.Control type="date" value={birthday} onChange={e => updateBirthday(e.target.value)} />
            </Form.Group>
            <Button variant="primary" type="submit">Update</Button>
          </Form>
        </Col>
        <Col xs={11} sm={6} className="text-center">
          <Form>
            <Form.Group controlId="delete-user">
              <Form.Text>Want to delete your account?</Form.Text>
              <Button className="delete-button" variant="danger" type="submit" onClick={handleDelete}>Delete account</Button>
            </Form.Group>
          </Form>
        </Col>
      </Row>
    </Container>
  )
}

UpdateView.propTypes = {
  name: PropTypes.string,
  username: PropTypes.string,
  password: PropTypes.string,
  email: PropTypes.string,
  birthday: PropTypes.string
}.isRequired

export default connect()(UpdateView);