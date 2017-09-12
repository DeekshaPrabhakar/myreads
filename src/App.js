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
    wantToRead:[],
    read:[]
  }

  componentDidMount(){

    BooksAPI.getAll().then((books) => {
      console.log(books)
      this.setState({
        currentlyReading: books.filter(book => book.shelf === 'currentlyReading'),
        wantToRead: books.filter(book => book.shelf === 'wantToRead'),
        read: books.filter(book => book.shelf === 'read')
      })
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
            <Shelf books={this.state.currentlyReading} shelfName="Currently Reading"/>
            <Shelf books={this.state.wantToRead} shelfName="Wanna Read"/>
            <Shelf books={this.state.read} shelfName="Read"/>
            <div className="open-search">
              <Link to="/search">Add a book</Link>
            </div>
          </section>
          )} />

          <Route path="/search" render={({ history }) => (
            <BookSearch />
          )}/>
      </div>
    );
  }
}

export default App;
