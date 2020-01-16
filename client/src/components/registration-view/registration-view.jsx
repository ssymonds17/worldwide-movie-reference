import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

export function RegistrationView(props) {
  const [name, createName] = useState('');
  const [username, createUsername] = useState('');
  const [password, createPassword] = useState('');
  const [email, createEmail] = useState('');
  const [birthday, createBirthday] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(name, username, password, email, birthday);
    props.onLoggedIn(username);
  }

  return (
    <Container className="registration-container">
      <h1>WorldWide Movie Reference</h1>
      <h2>Fill out the form and click the button below to register!</h2>
      <Form>
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
          <Form.Control type="date" placeholder="Date of Birth DD/MM/YYYY" value={birthday} onChange={e => createBirthday(e.target.value)} />
        </Form.Group>
        <Button variant="primary" type="submit" onClick={handleSubmit}>Register</Button>
      </Form>
    </Container>
  )

  // return (
  //   <form>
  //     <label>
  //       Name:
  //       <input type="text" value={name} onChage={e => createName(e.target.value)} />
  //     </label>
  //     <label>
  //       Username:
  //       <input type="text" value={username} onChange={e => createUsername(e.target.value)} />
  //     </label>
  //     <label>
  //       Password:
  //       <input type="password" value={password} onChange={e => createPassword(e.target.value)} />
  //     </label>
  //     <label>
  //       Email:
  //       <input type="email" value={email} onChange={e => createEmail(e.target.value)} />
  //     </label>
  //     <label>
  //       Birthday:
  //       <input type="date" value={birthday} onChange={e => createBirthday(e.target.value)} />
  //     </label>
  //     <button type="button" onClick={handleSubmit}>Register</button>
  //   </form>
  // )
}

// RegistrationView.propTypes = {
//   onLoggedIn: PropTypes.func.isRequired,
//   onClick: PropTypes.func.isRequired
// };