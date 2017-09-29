import React, { Component } from 'react';

class Book extends Component {
    render() {
        const book = this.props.book;
        return (
            <div className="book">
                <div className="book-top">
                    <div className={typeof book.imageLinks === "undefined" ? "book-cover no-book-cover" : "book-cover"} style={{
                        width: 128,
                        height: 193,
                        backgroundImage: typeof book.imageLinks === "undefined" ? "none" : `url(${book.imageLinks.thumbnail})`
                    }}>
                    {typeof book.imageLinks === "undefined" && (
                        <span>No Cover Available</span>
                    )}
                    </div>
                </div>
                <div className="book-title">{typeof book.title === "undefined" ? "" : book.title}</div>
                <div className="book-authors">{typeof book.authors === "undefined" ? "" : book.authors.join(', ')}</div>
            </div>
        )
    }
}

export default Book