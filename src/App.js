import React, { Component } from 'react';
import logo from './Logo64.png';
import './App.css';
import { Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import Shelf from './Shelf'
import BookSearch from './BookSearch'
import { Link } from 'react-router-dom'

class App extends Component {

  state = {
    currentlyReading: [],
    wantToRead: [],
    read: [],
    none:[]
  }

  componentDidMount() {

    BooksAPI.getAll().then((books) => {
      console.log(books)
      this.setState({
        currentlyReading: books.filter(book => book.shelf === 'currentlyReading'),
        wantToRead: books.filter(book => book.shelf === 'wantToRead'),
        read: books.filter(book => book.shelf === 'read')
      })
    })
  }

  updateShelf = (toShelf, book) => {
    let fromShelf = book.shelf;
    BooksAPI.update(book, toShelf).then(res => {
      book.shelf = toShelf

      this.setState(state => ({
          [toShelf]: state[toShelf].concat(book),
          [fromShelf]: state[fromShelf].filter((b) => b.id !== book.id)
      }))
  })
	}

  render() {
    return (
      <div className="App">

        <header className="App-header">
          <nav>
            <ul>
              <li>
                <Link to="/"><img src={logo} className="App-logo" alt="logo" />My Books</Link>
              </li>
            </ul>
          </nav>
        </header>

        <Route exact path="/" render={() => (
          <section className="mainContent">
            <Shelf books={this.state.currentlyReading} shelfValue="currentlyReading" shelfName="Currently Reading" updateShelf={this.updateShelf} />
            <Shelf books={this.state.wantToRead} shelfValue="wantToRead" shelfName="Wanna Read" updateShelf={this.updateShelf} />
            <Shelf books={this.state.read} shelfValue="read" shelfName="Read" updateShelf={this.updateShelf} />
            <div className="open-search">
              <Link to="/search">Add a book</Link>
            </div>
          </section>
        )} />

        <Route path="/search" render={({ history }) => (
          <BookSearch />
        )} />
      </div>
    );
  }
}

export default App;
