/**
 * @requires react
 * @requires react-redux
 * @requires react-bootstrap/Form
 * @requires actions
 */

import React from 'react';
import { connect } from 'react-redux';

import Form from 'react-bootstrap/Form';

import { setFilter } from '../../actions/actions';

function VisibilityFilterInput(props) {
  return (
    <Form.Control
      className="filter mt-5"
      onChange={e => props.setFilter(e.target.value)}
      value={props.visibilityFilter}
      placeholder="Search"
    />
  )
}

export default connect(
  null,
  { setFilter }
)(VisibilityFilterInput);