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
  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books })
    })
  }

  updateBook(book, shelf) {
    BooksAPI.update(book, shelf)
    
    BooksAPI.getAll().then((books) => {
      this.setState({ books })
    })
  }

  render() {
    const { books } = this.state

    return (
      <div className="app">

          <Route exact path='/' render={() => (
            <Bookshelf books={ books } 
          onUpdateBook={(book,shelf) => {
            this.updateBook(book, shelf)
            // history.push('/')
            }} />
        )}/>
        
        <Route path='/search' render={({ history }) => (
          <SearchBooks onUpdateBook={(book,shelf) => {
            this.updateBook(book, shelf)
            history.push('/')
          }} 
          books={books} 
         />
        )}/>  
      </div>
    )
  }
}

export default BooksApp
