import React, { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import axios from 'axios';

export function UpdateView(props) {
  const { user } = props;

  const [name, updateName] = useState(user.name !== null ? user.name : '');
  const [username, updateUsername] = useState(user.username !== null ? user.name : '');
  const [password, updatePassword] = useState(user.password !== null ? user.name : '');
  const [email, updateEmail] = useState(user.email !== null ? user.name : '');
  const [birthday, updateBirthday] = useState(user.birthday !== null ? user.name : '');


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

  const handleDelete = (e) => {
    e.preventDefault();
    axios.delete(`https://worldwide-movie-reference.herokuapp.com/users/${user}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    })
      .then(response => {
        alert('Your account has been successfully deleted');
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.open('/', '_self');
      })
      .catch(error => {
        alert('Error deleting your account.');
      });
  }

  return (
    <Container className="update-container">
      <h1>Update {user}'s account</h1>
      <Form className="update-form">
        <Form.Text>Please fill in all fields</Form.Text>
        <Form.Group controlId="form-name">
          <Form.Label>Name</Form.Label>
          <Form.Control type="text" placeholder="Enter full name here" value={name} onChange={e => updateName(e.target.value)} />
        </Form.Group>
        <Form.Group controlId="form-username">
          <Form.Label>Username</Form.Label>
          <Form.Control type="text" placeholder="Username" value={username} onChange={e => updateUsername(e.target.value)} />
        </Form.Group>
        <Form.Group controlId="form-password">
          <Form.Label>Password:</Form.Label>
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
        <Button variant="primary" type="submit" onClick={handleUpdate}>Update</Button>
      </Form>
      <br />
      <Form>
        <Form.Group controlId="delete-user">
          <Form.Text>Want to delete your account?</Form.Text>
          <Button className="delete-button" variant="danger" type="submit" onClick={handleDelete}>Delete account</Button>
        </Form.Group>
      </Form>
    </Container>
  )

}