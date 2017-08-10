import React, { Component } from 'react'
import Book from './Book.js'

class Shelf extends Component {

  render() {
    const { books, category, handleSelection } = this.props

    return (
      
        <div className="bookshelf">
        <h2 className="bookshelf-title">{category}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
             {books.map((book) => (
              <Book key={ book.id } book={ book } handleSelection={ handleSelection }/>
            ))}
          </ol>
        </div>
      </div>      
    )
  }
} 

export default Shelf 