import React from 'react';

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import './director-view.scss';

import { Link } from 'react-router-dom';

export class DirectorView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        console.log('mounted');
    }

    render() {
        const { director } = this.props;
        console.log(director);

        return (
            <Card className="director-info" style={{ width: '18rem' }}>
                <Card.Body>
                    <Card.Title className="director-name">{director[0].name}</Card.Title>
                    <Card.Text>Description: {director[0].bio}</Card.Text>
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