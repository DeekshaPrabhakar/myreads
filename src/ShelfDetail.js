import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Shelf from './Shelf';

class ShelfDetail extends Component {
    render() {
        return (
            <section className="mainContent">
            <Shelf books={this.props.books} shelfDetail={this.props.shelfDetail} shelfValue={this.props.shelfValue} shelfName={this.props.shelfName} updateShelf={this.props.updateShelf} {...this.props} />
            <div className="open-search">
              <Link to="/search">Add a book</Link>
            </div>
          </section>
        )
    }
}

export default ShelfDetail