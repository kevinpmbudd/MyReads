 import React, { Component } from 'react'
 import { Link } from 'react-router-dom'
 import * as BooksAPI from './BooksAPI'
 import { debounce } from 'throttle-debounce/debounce'

 class SearchBooks extends Component {
  state = {
    query: '',
    foundBooks: [],
  }

  updateQuery = (query) => {
    this.setState({ query })

    this.sendSearch()
  }

  sendSearch = () => {
    debounce(300, BooksAPI.search(this.state.query).then((foundBooks) => {
      this.setState({foundBooks})
    }))
  }

  handleSelection = (book, shelf) => {
    this.props.onUpdateBook(book, shelf)
  }

  valueFinder = (book) => {
  let myBook

  myBook = this.props.books.find((bookOnShelf) => bookOnShelf.id === book.id)
  
  if (myBook)
    return myBook.shelf
  else
    return book.shelf
  }

  
  render() {
    const { query, foundBooks } = this.state
    // const { books } = this.props

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
          {foundBooks.map((book) => (
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
 