import React, { Component } from 'react';
import { connect } from 'react-redux'
import {Row, Col, Button} from 'react-bootstrap';
import * as bookActions from '../../actions/bookActions';


class ReduxTest extends React.Component{


  submitBook(input){
    this.props.createBook(input);
  }

  handleInputChange(event){

  }

  render(){
    let titleInput;
    return(
      <div>
        <h3>Books</h3>
        <ul>
          {this.props.books.map((b, i) => <li key={i}>{b.title}</li> )}
        </ul>
        <div>
          <h3>Books Form</h3>
          <form onSubmit={e => {
            e.preventDefault();
            var input = {title: titleInput.value};
            this.submitBook(input);
            e.target.reset();
          }}>
            <input type="text" name="title" ref={node => titleInput = node}/>
            <input type="submit" />
          </form>
        </div>
      </div>
    )
  }
}

// Maps state from store to props
function mapStateToProps(state, ownProps){
  return {
    // You can now say this.props.books
    books: state.books
  }
}

// Maps actions to props
function mapDispatchToProps(dispatch){
  return {
  // You can now say this.props.createBook
    createBook: (book) => dispatch(bookActions.createBook(book))
  }
};

const ReduxTestConnected = connect(mapStateToProps, mapDispatchToProps)(ReduxTest);

// Use connect to put them together
export default ReduxTestConnected;
