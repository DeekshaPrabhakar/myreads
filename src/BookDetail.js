import React, { Component } from 'react';

class BookDetail extends Component {

    formatDate = (dateString) => {
        var monthNames = [
            "Jan", "Feb", "Mar",
            "Apr", "May", "Jun", "Jul",
            "Aug", "Sep", "Oct",
            "Nov", "Dec"
        ];

        var date = new Date(dateString);
        var newDate = new Date(date.toISOString());

        var day = newDate.getUTCDate();
        var monthIndex = newDate.getUTCMonth();
        var year = newDate.getUTCFullYear();

        return monthNames[monthIndex] + ' ' + day + ', ' + year;
    }

    render() {
        const book = this.props.location.state.book;
        console.log(book);
        return (
            <div className="detail">
                <div className="detail-cover" style={{
                    width: 128,
                    height: 193,
                    backgroundImage: typeof book.imageLinks === "undefined" ? "none" : `url(${book.imageLinks.thumbnail})`
                }}>
                </div>
                <div className="detail-title-author">
                    <div className="detail-title">{typeof book.title === "undefined" ? "" : book.title}</div>
                    <div className="detail-authors">{typeof book.authors === "undefined" ? "" : book.authors.join(', ')}</div>
                </div>
                <h2>About the book</h2>
                <div className="detail-description">{typeof book.description === "undefined" ? "" : book.description}</div>

                <h2>Information</h2>
                <div className="detail-info">
                    <label>Date Published</label>
                    <span>
                        {typeof book.publishedDate === "undefined" ? "" : this.formatDate(book.publishedDate)}
                    </span>
                </div>

                <div className="detail-info">
                    <label>Pages</label>
                    <span>
                        {typeof book.pageCount === "undefined" ? "" : book.pageCount}
                    </span>
                </div>
            </div>
        )
    }
}

export default BookDetail