import React, { Component } from 'react'
import Shelf from './Shelf.js'

class ListBooks extends Component {
  
  render() {
    const { books } = this.props

    let currentlyReading, wantToRead, read
    currentlyReading = books.filter((book) => book.shelf === 'currentlyReading')
    wantToRead = books.filter((book) => book.shelf === 'wantToRead')
    read = books.filter((book) => book.shelf === 'read')


    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <Shelf className="bookshelf" books={currentlyReading} category='currently reading'/>
          <Shelf className="bookshelf" books={wantToRead} category='want to read'/>
          <Shelf className="bookshelf" books={read} category='read'/>
        </div>

        <div className="open-search">
          <a onClick={() => this.setState({ showSearchPage: true })}>Add a book</a>
        </div>
      </div>
    )
  }
}

export default ListBooks

