import React, { Component } from 'react';

class ShelfChanger extends Component {
    render() {
        const book = this.props.book;
        return (
            <div className="book-shelf-changer">
                <select value={book.shelf} onChange={(event) => {
                    this.props.updateShelf(event.target.value, book);
                }
                } >
                    <option value="none" disabled>Move to...</option>
                    <option value="currentlyReading">Currently Reading</option>
                    <option value="wantToRead">Want to Read</option>
                    <option value="read">Read</option>
                    <option value="none">None</option>
                </select>
            </div>
        )
    }
}

export default ShelfChanger