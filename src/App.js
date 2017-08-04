import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import Bookshelf from './Bookshelf.js'

import SearchBooks from './SearchBooks.js'
import * as BooksAPI from './BooksAPI'
import './App.css'

class BooksApp extends Component {
  state = {
   books: []
  }
  componentWillMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books })
    })
  }

  updateBook(book, shelf) {
    BooksAPI.update(book, shelf).then((books) => {
      this.setState({ books })
    })
  }

  render() {
    return (
      <div className="app">
        <Route exact path='/' render={() => (
          <Bookshelf books={this.state.books} 
          onUpdateBook={(book,shelf) => {
            this.updateBook(book, shelf)
            // history.push('/')
          }} />
         
        )}/>
        <Route path='/search' render={({ history }) => (
          <SearchBooks onUpdateBook={(book,shelf) => {
            this.updateBook(book, shelf)
            // history.push('/')
          }} 
          books={this.state.books} />
        )}/>  
      </div>
    )
  }
}

export default BooksApp
