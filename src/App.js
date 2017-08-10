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

  addBook(book, shelf, history) {
    BooksAPI.update(book, shelf).then(history.push('/'))
    book.shelf = shelf
    this.setState( (prevState, props) => {
      prevState.books.push(book)
      return { books: prevState.books }
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
                        }} 
            />
        )}/>
        
        <Route path='/search' render={({ history }) => (
          <SearchBooks onAddBook={(book,shelf) => {
                          this.addBook(book, shelf, history)
                        }} 
                       books={books} 
            />
        )}/>  
      </div>
    )
  }
}

export default BooksApp
