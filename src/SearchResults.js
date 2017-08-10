import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Book from './Book.js'

class SearchResults extends Component {
  static propTypes = {
    books: PropTypes.array.isRequired,
    myBooks: PropTypes.array.isRequired,
    handleSelection: PropTypes.func.isRequired
  }

  shelfFinder = (book) => {
    let myBook, shelf

    myBook = this.props.myBooks.find((bookOnShelf) => bookOnShelf.id === book.id)

    if (myBook)
      shelf = myBook.shelf
    else
      shelf = 'none'
  
    return shelf
  }


  render() {
    const { books, query, handleSelection } = this.props

    return (
    <div className="search-books-results">

        { query.length !== 0 && books && (
          
          <ol className="books-grid">
            {books.map((book) => (
              book && (
                <Book key={ book.id } book={ book } handleSelection={ handleSelection }/>
              )
            ))}
          </ol>
          
          )}

        </div>      
    )
  }
} 

export default SearchResults 