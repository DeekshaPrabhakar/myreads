import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'

class BookSearch extends Component {

	state = {
		query: '',
		books:[]
	}

	updateQuery = (query) => {
		this.setState({ query: query })
		BooksAPI.search(this.state.query, 20).then((books) => {
			console.log(typeof books);
			if(typeof books !== "undefined" && typeof books.map === "function"){
			this.setState({ books: books});
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
					<ol className="books-grid">
						{this.state.books.map((book) => (
							<li key={book.id}>
								
								<div className="book">
									<div className="book-top">
										<div className="book-cover" style={{
											width: 128,
											height: 193,
											backgroundImage: typeof book.imageLinks === "undefined" ? "none" : `url(${book.imageLinks.thumbnail})`
										}}>
										</div>
										<div className="book-shelf-changer">
											<select value={book.shelf} onChange={(event) => this.props.updateShelf(event.target.value, book)} >
												<option value="none" disabled>Move to...</option>
												<option value="currentlyReading">Currently Reading</option>
												<option value="wantToRead">Want to Read</option>
												<option value="read">Read</option>
												<option value="none">None</option>
											</select>
										</div>
									</div>
									<div className="book-title">{typeof book.title === "undefined" ? "" : book.title}</div>
									<div className="book-authors">{typeof book.authors === "undefined" ? "": book.authors.join(', ')}</div>
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