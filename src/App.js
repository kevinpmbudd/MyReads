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

    let booksCopy = this.state.books.map((_book) => {
      if (_book.id === book.id) {
        _book.shelf = shelf
      }

      return _book
    })

    this.setState( {books: booksCopy} )
  }

  addBook(book, shelf) {
    // BooksAPI.update(book, shelf).then(BooksAPI.getAll().then((books) => this.setState( {books }) ))
    BooksAPI.update(book, shelf)

    book.shelf = shelf

    // let booksCopy = this.state.books.slice()
    // booksCopy.push(book)
    // this.setState( {books: booksCopy })

    console.log(book)
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
          <SearchBooks onAddBook={(book,shelf) => {
            this.addBook(book, shelf)
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
