import React, { Component } from 'react';
import { connect } from 'react-redux'
import {Row, Col, Button} from 'react-bootstrap';
import {FormInput} from 'components/Components';
import { Link } from 'react-router-dom';
import * as bookActions from '../../actions/bookActions';

class ReduxTest2 extends React.Component{

  state = {
    form: [],
  }

  render(){
    return(
      <Row>
        <Col xs={12}>
          <h2>View only</h2>
          <p>Get state from global storage.</p>
          <Link to={'/gym/reduxtest'}>Go to form</Link>
        </Col>
        <Col md={12}>
          <h3>Book List</h3>
          <ul>
            {this.props.books.map((book, i) => <li key={i}>{book.title}</li> )}
          </ul>
        </Col>
      </Row>
    )
  }
}

// Maps state from store to props
// To fetch data from Redux store
function mapStateToProps(state, ownProps){
  return {
    // You can now say this.props.books
    books: state.books
  }
}

const ReduxTest2Connected = connect(mapStateToProps)(ReduxTest2);

// Use connect to put them together
export default ReduxTest2Connected;
