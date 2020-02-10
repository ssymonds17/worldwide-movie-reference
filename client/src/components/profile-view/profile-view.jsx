import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

import Button from 'react-bootstrap/button';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import ListGroup from 'react-bootstrap/ListGroup';
import './profile-view.scss';

import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

const mapStateToProps = state => {
    const { movies } = state;
    return { movies };
};

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

    deleteFromFaveList(movieId) {
        let username = localStorage.getItem('user');
        let token = localStorage.getItem('token');
        event.preventDefault();
        axios.delete(`https://worldwide-movie-reference.herokuapp.com/users/${username}/movies/${movieId}`, {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(response => {
                console.log(token);
                // window.open(`/client/users/${localStorage.getItem('user')}`, '_self');
                alert('Movie has been removed from list of favourites');
            })
            .catch(error => {
                console.log('error removing movie from list');
                alert('Something went wrong. ' + error);
            });
    };


    render() {

        const { name, username, email, birthday, favouriteMovies } = this.state;
        const { movies } = this.props;
        const favouriteList = movies.filter(movie => favouriteMovies.includes(movie._id));

        return (
            <div className="profile-container">
                <Row className="mt-5">
                    <Col>
                        <Card>
                            <Card.Body>
                                <Card.Title>Current Information</Card.Title>
                                <ListGroup>
                                    <ListGroup.Item className="listgroup-item">Name: {name}</ListGroup.Item>
                                    <ListGroup.Item className="listgroup-item">Username: {username}</ListGroup.Item>
                                    <ListGroup.Item className="listgroup-item">Password: ******</ListGroup.Item>
                                    <ListGroup.Item className="listgroup-item">Email: {email}</ListGroup.Item>
                                    <ListGroup.Item className="listgroup-item">Date of Birth: {birthday && birthday.slice(0, 10)}</ListGroup.Item>
                                </ListGroup>
                                <br />
                                <Link to={`/update/${username}`}>
                                    <Button className="updateButton">Update Profile</Button>
                                </Link>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col lg={4}>
                    </Col>
                </Row>
                <Container className="pt-5 mt-5">
                    <h3>Favourited Movies</h3>
                    <div>
                        {favouriteMovies.length === 0 &&
                            <div className="value">List is empty</div>
                        }
                        {favouriteMovies.length > 0 &&
                            <Row>
                                {favouriteList.map(movie =>
                                    (
                                        <Col key={movie._id} xs={6} sm={6} md={4} lg={3}>
                                            <Card className="favourite-movie-card mt-3" style={{ maxWidth: '13rem', minWidth: '13rem' }}>
                                                <Card.Img
                                                    className="movie-image"
                                                    width={220}
                                                    height={326}
                                                    variant="top"
                                                    src={movie.imagePath}
                                                />
                                                <Card.Body className="movie-card-body">
                                                    <Card.Title>{movie.title}</Card.Title>
                                                    <Button className="justify-content-center" onClick={e => this.deleteFromFaveList(movie._id)}>Remove</Button>
                                                </Card.Body>
                                            </Card>
                                        </Col>
                                    ))}
                            </Row>
                        }
                    </div>
                </Container>
            </div>
        );
    }
}

ProfileView.propTypes = {
    name: PropTypes.string,
    username: PropTypes.string,
    password: PropTypes.string,
    email: PropTypes.string,
    birthday: PropTypes.string,
    favouriteMovies: PropTypes.array,
}.isRequired

export default connect(mapStateToProps)(ProfileView);