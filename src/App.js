import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { Link } from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
import logo from './Logo64.png';
import loading from './loading.svg';
import './App.css';
import Shelf from './Shelf';
import BookSearch from './BookSearch';
import BookDetail from './BookDetail';
import ShelfDetail from './ShelfDetail';

class App extends Component {

  state = {
    currentlyReading: [],
    wantToRead: [],
    read: [],
    none: [],
    mybooks: [],
    isLoading: true
  }

  componentDidMount() {

    BooksAPI.getAll().then((books) => {
      this.setState({
        currentlyReading: books.filter(book => book.shelf === 'currentlyReading'),
        wantToRead: books.filter(book => book.shelf === 'wantToRead'),
        read: books.filter(book => book.shelf === 'read'),
        mybooks: books,
        isLoading: false
      })
    })
  }

  updateShelf = (toShelf, book) => {

    this.setState({
      isLoading: true
    })
    let fromShelf = typeof book.shelf !== "undefined" ? book.shelf : "none";
    BooksAPI.update(book, toShelf).then(res => {

      book.shelf = toShelf
      this.setState(state => ({
        [toShelf]: state[toShelf].concat(book),
        [fromShelf]: state[fromShelf].filter((b) => b.id !== book.id),
        isLoading: false
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

        {/* Index page shows only 10 books. To see all books, go to the shelf detail page */}
        <Route exact path="/" render={props => (
          <section className="mainContent">

            {this.state.isLoading && (
              <div className="loader">
                <img className="loading-indicator" src={loading} alt="loading icon" />
              </div>
            )}

            {!this.state.isLoading && (
              <div>
                <Shelf books={this.state.currentlyReading} shelfDetail="CurrentlyReading" shelfValue="currentlyReading" shelfName="Currently Reading" updateShelf={this.updateShelf} {...props} />
                <Shelf books={this.state.wantToRead} shelfDetail="WantToRead" shelfValue="wantToRead" shelfName="Wanna Read" updateShelf={this.updateShelf} {...props} />
                <Shelf books={this.state.read} shelfDetail="Read" shelfValue="read" shelfName="Read" updateShelf={this.updateShelf} {...props} />
                <div className="open-search">
                  <Link to="/search">Add a book</Link>
                </div>
              </div>
            )}
          </section>
        )} />

        {/* Shelf Detail Pages */}
        <Route exact path="/CurrentlyReading" render={props => (
          <ShelfDetail books={this.state.currentlyReading} shelfDetail="CurrentlyReading" shelfValue="currentlyReading" shelfName="Currently Reading" updateShelf={this.updateShelf}  {...props} />
        )} />

        <Route exact path="/WantToRead" render={props => (
          <ShelfDetail books={this.state.wantToRead} shelfDetail="WantToRead" shelfValue="wantToRead" shelfName="Wanna Read" updateShelf={this.updateShelf}  {...props} />
        )} />

        <Route exact path="/Read" render={props => (
          <ShelfDetail books={this.state.read} shelfDetail="Read" shelfValue="read" shelfName="Read" updateShelf={this.updateShelf} {...props} />
        )} />

        {/* Book detail page */}
        <Route path="/books/" render={props => (
          <section className="mainContent">
            <BookDetail {...props} />
          </section>
        )} />

        {/* Books search page */}
        <Route path="/search" render={({ history }) => (
          <BookSearch mybooks={this.state.mybooks} updateShelf={this.updateShelf} />
        )} />
      </div>
    );
  }
}

export default App;
