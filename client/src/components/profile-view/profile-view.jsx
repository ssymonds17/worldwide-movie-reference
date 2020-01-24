import React from 'react';
import axios from 'axios';

import Button from 'react-bootstrap/button';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import './profile-view.scss';

import { Link } from 'react-router-dom';

export class ProfileView extends React.Component {

    constructor() {
        super()
        this.state = {
            name: null,
            username: null,
            password: null,
            email: null,
            birthday: null,
            favouriteMovies: []
        }
    }

    componentDidMount() {
        let accessToken = localStorage.getItem('token');
        if (accessToken !== null) {
            this.getUser(accessToken);
        }
    }

    getUser(token) {
        let username = localStorage.getItem('user');
        axios.get(`https://worldwide-movie-reference.herokuapp.com/users/${username}`, {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(response => {
                // Assign the result to the state
                this.setState({
                    userInfo: response.data,
                    name: response.data.name,
                    username: response.data.username,
                    password: response.data.password,
                    email: response.data.email,
                    birthday: response.data.birthday,
                    favouriteMovies: response.data.favouriteMovies
                });
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    // Unauthorized 401 message

    deleteFromFaveList(event) {
        const movie = this.props;
        // event.preventDefault();
        axios.delete(`https://worldwide-movie-reference.herokuapp.com/users/${localStorage.getItem('user')}/movies/${movie._id}`, {
            Username: localStorage.getItem('user')
        }, {
            headers: { Authorization: `Bearer: ${localStorage.getItem('token')}` }
        })
            .then(response => {
                console.log(response);
                alert('Movie was successfully deleted from favourite list')
            })
            .catch(error => {
                alert('Something went wrong. ' + error);
            });
    }

    render() {

        const { name, username, email, birthday, favouriteMovies } = this.state;
        const { movies } = this.props;
        const favouriteList = movies.filter(movie => favouriteMovies.includes(movie._id));

        return (
            <Card>
                <Card.Body>
                    <Card.Title>{name}</Card.Title>
                    <ListGroup>
                        <ListGroup.Item>Username: {username}</ListGroup.Item>
                        <ListGroup.Item>Password: ******</ListGroup.Item>
                        <ListGroup.Item>Email: {email}</ListGroup.Item>
                        <ListGroup.Item>Date of Birth: {birthday && birthday.slice(0, 10)}</ListGroup.Item>
                        <ListGroup.Item>Favourite Movies:
                            <div>
                                {favouriteMovies.length === 0 &&
                                    <div className="value">List is empty</div>
                                }
                                {favouriteMovies.length > 0 &&
                                    <ul>
                                        {favouriteList.map(movie =>
                                            (
                                                <li key={movie._id}>
                                                    <span>
                                                        <Link to={`/movies/${movie._id}`}>
                                                            <h5 className="movie-link link">{movie.title}</h5>
                                                        </Link>
                                                        <Button onClick={event => this.deleteFromFaveList(event)}>Remove</Button>
                                                    </span>
                                                </li>
                                            ))}
                                    </ul>
                                }
                            </div>
                        </ListGroup.Item>
                    </ListGroup>
                    <Link to={`/update/${username}`}>
                        <Button className="updateButton">Update Profile</Button>
                    </Link>
                </Card.Body>
            </Card>
        );
    }
}