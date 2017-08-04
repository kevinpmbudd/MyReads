import React, { Component } from 'react'
import Shelf from './Shelf.js'
import { Link } from 'react-router-dom'

class Bookshelf extends Component {
  
  handleSelection = (book, shelf) => {
    console.log(book)
    this.props.onUpdateBook(book, shelf)
  }

  render() {
    const { books } = this.props
    console.log(books)

    let currentlyReading, wantToRead, read

    if (books !== 'undefined')
      currentlyReading = books.filter((book) => book.shelf === 'currentlyReading')
      wantToRead = books.filter((book) => book.shelf === 'wantToRead')
      read = books.filter((book) => book.shelf === 'read')

    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">

          <Shelf books={currentlyReading} category='Currently Reading' handleSelection={this.handleSelection} />
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

