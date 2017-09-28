import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import loading from './loading.svg';
import Shelf from './Shelf';

class Home extends Component {
    render() {
        return (
            <section className="mainContent">
                {this.props.isLoading && (
                    <div className="loader">
                        <img className="loading-indicator" src={loading} alt="loading icon" />
                    </div>
                )}
                {!this.props.isLoading && (
                    <div>
                        <Shelf books={this.props.currentlyReading} shelfDetail="CurrentlyReading" shelfValue="currentlyReading" shelfName="Currently Reading" updateShelf={this.updateShelf} {...this.props} />
                        <Shelf books={this.props.wantToRead} shelfDetail="WantToRead" shelfValue="wantToRead" shelfName="Wanna Read" updateShelf={this.updateShelf} {...this.props} />
                        <Shelf books={this.props.read} shelfDetail="Read" shelfValue="read" shelfName="Read" updateShelf={this.props.updateShelf} {...this.props} />
                        <div className="open-search">
                            <Link to="/search">Add a book</Link>
                        </div>
                    </div>
                )}
            </section>
        )
    }
}

export default Home