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
    none: [],
    mybooks: []
  }

  componentDidMount() {

    BooksAPI.getAll().then((books) => {
      //console.log(books)
      this.setState({
        currentlyReading: books.filter(book => book.shelf === 'currentlyReading'),
        wantToRead: books.filter(book => book.shelf === 'wantToRead'),
        read: books.filter(book => book.shelf === 'read'),
        mybooks: books
      })
    })
  }

  updateShelf = (toShelf, book) => {
    console.log(book);
    let fromShelf = typeof book.shelf !== "undefined" ? book.shelf : "none";
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
            <Shelf books={this.state.currentlyReading} shelfDetail="CurrentlyReading" shelfValue="currentlyReading" shelfName="Currently Reading" updateShelf={this.updateShelf} />
            <Shelf books={this.state.wantToRead} shelfDetail="WantToRead" shelfValue="wantToRead" shelfName="Wanna Read" updateShelf={this.updateShelf} />
            <Shelf books={this.state.read} shelfDetail="Read" shelfValue="read" shelfName="Read" updateShelf={this.updateShelf} />
            <div className="open-search">
              <Link to="/search">Add a book</Link>
            </div>
          </section>
        )} />

        <Route exact path="/CurrentlyReading" render={() => (
          <section className="mainContent">
            <Shelf books={this.state.currentlyReading} shelfDetail="CurrentlyReading" shelfValue="currentlyReading" shelfName="Currently Reading" updateShelf={this.updateShelf} />
            <div className="open-search">
              <Link to="/search">Add a book</Link>
            </div>
          </section>
        )} />

        <Route exact path="/WantToRead" render={() => (
          <section className="mainContent">
            <Shelf books={this.state.wantToRead} shelfDetail="WantToRead" shelfValue="wantToRead" shelfName="Wanna Read" updateShelf={this.updateShelf} />
            <div className="open-search">
              <Link to="/search">Add a book</Link>
            </div>
          </section>
        )} />

        <Route exact path="/Read" render={() => (
          <section className="mainContent">
            <Shelf books={this.state.read} shelfDetail="Read" shelfValue="read" shelfName="Read" updateShelf={this.updateShelf} />
            <div className="open-search">
              <Link to="/search">Add a book</Link>
            </div>
          </section>
        )} />

        <Route path="/search" render={({ history }) => (
          <BookSearch mybooks={this.state.mybooks} updateShelf={this.updateShelf} />
        )} />
      </div>
    );
  }
}

export default App;
