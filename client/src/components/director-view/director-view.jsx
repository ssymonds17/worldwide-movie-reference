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