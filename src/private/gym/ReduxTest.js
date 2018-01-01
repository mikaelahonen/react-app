import React, { Component } from 'react';
import { connect } from 'react-redux'
import {Row, Col, Button} from 'react-bootstrap';
import {FormInput} from 'components/Components';
import { Link } from 'react-router-dom';
import * as bookActions from '../../actions/bookActions';


class ReduxTest extends React.Component{

  state = {
    form: [],
  }

  handleBookCreateClick(event){
    //this.state.form['book']
    const payload = {
      title: this.state.form['bookTitle']
    }
    this.props.createBook(payload);
  }

  handleInputChange(event){
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.id;

    var inputs = this.state.form;
    inputs[name] = value

    var state = {form: inputs};
    this.setState(state);
  }

  render(){
    return(
      <Row>
        <Col xs={12}>
          <h2>Create and view</h2>
          <p>Send books to global storage.</p>
          <Link to={'/gym/reduxtest2'}>Go to view only</Link>
        </Col>
        <Col md={6}>
          <h3>Create Book</h3>
          <FormInput label="Title" id="bookTitle"
          value={this.state.form['bookTitle']}
          onChange={(e) => this.handleInputChange(e)}/>
          <Button onClick={(e) => this.handleBookCreateClick(e)} >
            Add
          </Button>
        </Col>
        <Col md={6}>
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

// Maps actions to props
// To send data to Redux store
function mapDispatchToProps(dispatch){
  return {
  // You can now say this.props.createBook
    createBook: (book) => dispatch(bookActions.createBook(book))
  }
};

const ReduxTestConnected = connect(mapStateToProps, mapDispatchToProps)(ReduxTest);

// Use connect to put them together
export default ReduxTestConnected;
