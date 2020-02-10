import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Button from 'react-bootstrap/Button';
import Media from 'react-bootstrap/Media';
import './director-view.scss';

import { Link } from 'react-router-dom';

export class DirectorView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const { director } = this.props;
        console.log(director);

        return (
            <div className="director-view-container mt-5">
                <h1>{director.name}</h1>
                <Media className="d-flex flex-column flex-md-row align-items-center">
                    <Media.Body className="mb-4">
                        <div className="director-birth row justify-content-start">
                            <h6 className="text-muted col-4">Born in {director.birthYear.substring(0, 4)}</h6>
                        </div>
                        <div className="director-death row justify-content-start">
                            { // render the death year (4 chars) if present
                                director.deathYear && <h6 className="text-muted col-4" style={{ display: director.deathYear ? 'block' : 'none' }}>Died in {director.deathYear.substring(0, 4)}</h6>
                            }
                        </div>
                        <h5>Bio</h5>
                        <p>{director.bio}</p>
                    </Media.Body>
                    <img
                        width={220}
                        height={326}
                        className="ml-3"
                        src={director.imagePath}
                        alt="Movie poster"
                    />
                </Media>
                <div>
                    <Link to={`/`}>
                        <Button variant="outline-secondary" className="back-button">Back</Button>
                    </Link>
                </div>
            </div>
        );
    }
}


DirectorView.propTypes = {
    director: PropTypes.shape({
        name: PropTypes.string.isRequired,
        bio: PropTypes.string.isRequired,
        birthYear: PropTypes.string.isRequired,
        deathYear: PropTypes.string,
        imagePath: PropTypes.string
    }).isRequired,
};

export default connect(({ movies }) => ({ movies }))(DirectorView);