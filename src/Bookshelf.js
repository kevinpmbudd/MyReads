import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Shelf from './Shelf.js'
import { Link } from 'react-router-dom'

class Bookshelf extends Component {
  static propTypes = {
    books: PropTypes.array.isRequired
  }
  
  handleSelection = (book, shelf) => {
    console.log(book)
    this.props.onUpdateBook(book, shelf)
  }

  render() {
    const { books } = this.props

    let currentlyReading, wantToRead, read
      
    if (books) {
      currentlyReading = books.filter((book) => book.shelf === 'currentlyReading')
      wantToRead = books.filter((book) => book.shelf === 'wantToRead')
      read = books.filter((book) => book.shelf === 'read')
    }
    

    return (

      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">

          { currentlyReading.length > 0 && (
            <Shelf books={currentlyReading} category='Currently Reading' handleSelection={this.handleSelection} />
            )}
          
          <Shelf books={wantToRead} category='Want to Read' handleSelection={this.handleSelection} />
          <Shelf books={read} category='Read' handleSelection={this.handleSelection} />

        </div>

        <div className="open-search">
          <Link to='/search'>Add a book</Link>
        </div>
      </div>
    )
  }
}

export default Bookshelf

