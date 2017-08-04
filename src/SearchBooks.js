 import React, { Component } from 'react'
 import { Link } from 'react-router-dom'
 import * as BooksAPI from './BooksAPI'

 class SearchBooks extends Component {
  state = {
    query: '',
    foundBooks: [],
  }

  updateQuery = (query) => {
    this.setState({ query })

    BooksAPI.search(query).then((foundBooks) => {
      this.setState({foundBooks})
    })
  }

  handleSelection = (book, shelf) => {
    // console.log(book)
    this.props.onUpdateBook(book, shelf)
  }

  valueFinder = (book) => {
  let newbook

  console.log(book)

  newbook = this.props.books.find((bookOnShelf) => bookOnShelf.id === book.id)
  
  if (newbook)
    return newbook.shelf
  else
    return "none"
  }

  
  render() {
    const { query, foundBooks } = this.state
    const { books } = this.props

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to='/'>Close</Link>
          <div className="search-books-input-wrapper">
            {/* 
              NOTES: The search from BooksAPI is limited to a particular set of search terms.
              You can find these search terms here:
              https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md
              
              However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
              you don't find a specific author or title. Every search is limited by search terms.
            */}
            <input 
              type="text" 
              placeholder="Search by title or author"
              value={query}
              onChange={(event) => this.updateQuery(event.target.value)}
            />
            
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
          {foundBooks.length !== 0  && foundBooks.map((book) => (
            <li key={book.id}>
                <div className="book">
                  <div className="book-top">
                    <div className="book-cover" style={{ width: 128, height: 188,
                      backgroundImage: `url(${book.imageLinks.smallThumbnail})` }}/>
                      <div className="book-shelf-changer">
                        <select value={this.valueFinder(book)} onChange={(event) => this.handleSelection(book, event.target.value)} >
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
            ))}
          </ol>
        </div>
       </div>
    )
  }
}

export default SearchBooks
 