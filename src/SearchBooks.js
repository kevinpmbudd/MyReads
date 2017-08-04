 import React, { Component } from 'react'
 import { Link } from 'react-router-dom'
 import PropTypes from 'prop-types'
 import SearchResults from './SearchResults.js'
 import * as BooksAPI from './BooksAPI'
 import { debounce } from 'throttle-debounce/debounce'

 class SearchBooks extends Component {
  static propTypes = {
    books: PropTypes.array.isRequired
  }

  state = {
    query: '',
    foundBooks: [],
  }

  updateQuery = (e) => {
    this.setState({ query: e.target.value })

    this.sendSearch()
  }

  sendSearch = () => {
    debounce(300, BooksAPI.search(this.state.query).then((foundBooks) => {
      this.setState({ foundBooks })
    }))
  }

  handleSelection = (book, shelf) => {
    this.props.onUpdateBook(book, shelf)
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
                value={query}
                onChange={this.updateQuery}
              />
          </div>
        </div>
        <SearchResults books={ foundBooks } query={ query }handleSelection={this.handleSelection}/>
       </div>
    )
  }
}

export default SearchBooks
 