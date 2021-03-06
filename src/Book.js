import React, { Component } from 'react'

class Book extends Component {

  shelfFinder (book) {
      let myBook, shelf

      myBook = this.props.myBooks.find((bookOnShelf) => bookOnShelf.id === book.id)

      if (myBook)
        shelf = myBook.shelf
      else
        shelf = 'none'
    
      return shelf
  }

  render() {
    const { book, handleSelection } = this.props

    return (
      
        <li>
          <div className="book">
            <div className="book-top">
              <div className="book-cover" style={{ width: 128, height: 188,
                backgroundImage: `url(${book.imageLinks.smallThumbnail})` }}/>
                <div className="book-shelf-changer">
                  <select value={book.shelf || this.shelfFinder(book)} onChange={(event) => handleSelection(book, event.target.value)}>
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
  }
} 

export default Book