import React from 'react';

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import './director-view.scss';

import { Link } from 'react-router-dom';

export class DirectorView extends React.Component {

    constructor() {
        super();
        this.state = {};
    }

    // Get Directors request function add HERE
    getDirectors(token) {
        axios.get('https://worldwide-movie-reference.herokuapp.com/directors', {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(response => {
                // Assign the result to the state
                this.setState({
                    directors: response.data
                });
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    componentDidMount() {
        let accessToken = localStorage.getItem('token');
        if (accessToken !== null) {
            this.setState({
                user: localStorage.getItem('user')
            });

            this.getDirectors(accessToken);
        }
    }


    render() {
        const { director } = this.props;
        if (!movies) return null;

        return (
            <Card className="director-info" style={{ width: '18rem' }}>
                <Card.Body>
                    <Card.Title className="director-name">{director.name}</Card.Title>
                    <Card.Text>Description: {director.description}</Card.Text>
                    <div>
                        <Link to={`/`}>
                            <Button variant="outline-secondary" className="back-button">Back</Button>
                        </Link>
                    </div>
                </Card.Body>
            </Card>
        )
    }
}