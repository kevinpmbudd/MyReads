 import React, { Component } from 'react'
 import { Link } from 'react-router-dom'
 import PropTypes from 'prop-types'
 import SearchResults from './SearchResults.js'
 import * as BooksAPI from './BooksAPI'
 import { debounce } from 'throttle-debounce/debounce'
 // import { Debounce } from 'react-throttle';

 class SearchBooks extends Component {
  constructor(props) {
    super(props)

    this.state = {
      query: '',
      foundBooks: [],
    }

    this.updateQuery = this.updateQuery.bind(this)
  }

  static propTypes = {
    onAddBook: PropTypes.func.isRequired,
    books: PropTypes.array.isRequired
  }

  // state = {
  //   query: '',
  //   foundBooks: [],
  // }

  updateQuery = (e) => {
    this.setState({ query: e.target.value })

    if (this.state.query !== ' ')
      this.sendSearch()
  }

  sendSearch() {
    // debugger
    if (this.state.query.length !== 0) {
      debounce(500, BooksAPI.search(this.state.query).then((searchResults) => {
          this.setState({ foundBooks: searchResults })
      }))
    }
  }

  handleSelection = (book, shelf) => {
    this.props.onAddBook(book, shelf)
  }
  
  render() {
    const { query, foundBooks } = this.state

    return (

      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to='/'>Close</Link>
          <div className="search-books-input-wrapper">
              <input 
                type="text" 
                placeholder="Search by title or author"
                value={ query }
                onChange={this.updateQuery}
              />
          </div>
        </div>
        <SearchResults books={ foundBooks } myBooks={ this.props.books } query={ query } handleSelection={this.handleSelection}/>
       </div>
    )
  }
}

export default SearchBooks
 