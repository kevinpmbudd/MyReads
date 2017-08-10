import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Book from './Book.js'

class SearchResults extends Component {
  static propTypes = {
    books: PropTypes.array.isRequired,
    myBooks: PropTypes.array.isRequired,
    handleSelection: PropTypes.func.isRequired
  }

  render() {
    const { books, myBooks, query, handleSelection } = this.props

    return (
    <div className="search-books-results">

        { query.length !== 0 && books && (
          
          <ol className="books-grid">
            {books.map((book) => (
              book && (
                <Book key={ book.id } book={ book } myBooks={ myBooks } handleSelection={ handleSelection }/>
              )
            ))}
          </ol>
          
          )}

        </div>      
    )
  }
} 

export default SearchResults 