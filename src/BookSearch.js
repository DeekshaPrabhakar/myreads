import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'

class BookSearch extends Component {

	state = {
		query: '',
		books: []
	}

	updateQuery = (query) => {

		this.setState({ query: query })
		const mybooks = this.props.mybooks;

		BooksAPI.search(this.state.query, 20).then((books) => {

			if (typeof books !== "undefined" && typeof books.map === "function") {

				//compare with my books in shelves and update the shelf property
				books.forEach(function (book) {
					var mybook = mybooks.filter(x => x.id === book.id);
					if (mybook.length > 0) {
						book.shelf = mybook[0].shelf;
					}
					else {
						book.shelf = "none";
					}
				});

				this.setState({ books: books });
			}
		})
	}

	render() {
		return (
			<div className="search-books">
				<div className="search-books-bar">
					<Link className="close-search" to="/">Close</Link>
					<div className="search-books-input-wrapper">
						<input type="text" placeholder="Search by title or author" value={this.state.query} onChange={(event) => this.updateQuery(event.target.value)} />
					</div>
				</div>
				<div className="search-books-results">
					<ol className="books-grid-detail">
						{this.state.books.map((book) => (
							<li key={book.id} className="book-grid">
								<Link to={{
									pathname: '/books/' + book.id,
									state: { book: book }
								}}>
									<div className="book">
										<div className="book-top">
											<div className="book-cover" style={{
												width: 128,
												height: 193,
												backgroundImage: typeof book.imageLinks === "undefined" ? "none" : `url(${book.imageLinks.thumbnail})`
											}}>
											</div>
										</div>
										<div className="book-title">{typeof book.title === "undefined" ? "" : book.title}</div>
										<div className="book-authors">{typeof book.authors === "undefined" ? "" : book.authors.join(', ')}</div>
									</div>
								</Link>
								<div className="book-shelf-changer">
									<select value={book.shelf} onChange={(event) => {
										this.props.updateShelf(event.target.value, book);
									}} >
										<option value="none" disabled>Move to...</option>
										<option value="currentlyReading">Currently Reading</option>
										<option value="wantToRead">Want to Read</option>
										<option value="read">Read</option>
										<option value="none">None</option>
									</select>
								</div>
							</li>
						))}
					</ol>
				</div>
			</div>
		)
	}
}

export default BookSearch