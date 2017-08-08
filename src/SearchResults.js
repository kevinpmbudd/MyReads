import React, { Component } from 'react'
import PropTypes from 'prop-types'

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
                <li key={book.id}>
                <div className="book">
                  <div className="book-top">
                    <div className="book-cover" style={{ width: 128, height: 188,
                      backgroundImage: `url(${book.imageLinks.smallThumbnail})` }}/>
                      <div className="book-shelf-changer">
                        <select value={this.shelfFinder(book)} onChange={(event) => handleSelection(book, event.target.value)} >
                          <option value="none" disabled>Move to...</option>
                          <option value="currentlyReading">Currently Reading</option>
                          <option value="wantToRead">Want to Read</option>
                          <option value="read">Read</option>
                          <option value="none">None</option>
                        </select>
                      </div>
                    </div>
                    <div className="book-title">{book.title}</div>
                  <div className="book-authors"></div>
                </div>
              </li>
              )
            ))}
          </ol>
          
          )}

        </div>      
    )
  }
} 

export default SearchResults 