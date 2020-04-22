import React, { Component, useEffect } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { gettingBooks } from '../store/books'
import {Link} from 'react-router-dom'


class AllBooks extends Component {
  componentDidMount() {
    this.props.onLoadBooks()
  }

  render() {
    if(this.props.books.length > 0) {console.log(this.props.books.map(book => book.bookImageURL))}
    return (
      <div>
        {this.props.books &&
         this.props.books.map(book =>
           <div key={book.id}>
             <Link to={"/book/" + book.id}><img src={book.bookImageURL} width={100} height={120}/></Link>
         </div>)
         }
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  books: state.books
})

const mapDispatchToProps = (dispatch) => ({
  onLoadBooks: () => dispatch(gettingBooks())
})

export default connect(mapStateToProps, mapDispatchToProps)(AllBooks)
