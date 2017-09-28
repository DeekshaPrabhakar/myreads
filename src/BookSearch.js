import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
import loading from './loading.svg';
import Book from './Book';
import ShelfChanger from './ShelfChanger';

class BookSearch extends Component {

	state = {
		query: '',
		books: [],
		isLoading: false
	}

	updateQuery = (query) => {

		this.setState({
			query: query,
			isLoading: true
		})
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

				this.setState({
					books: books,
					isLoading: false
				});
			}
			else {
				this.setState({
					isLoading: false
				});
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
					{this.state.isLoading && (
						<div className="loader">
							<img className="loading-indicator" src={loading} alt="loading icon" />
						</div>
					)}
					{!this.state.isLoading && (
						<ol className="books-grid-detail">
							{this.state.books.map((book) => (
								<li key={book.id} className="book-grid">
									<Link to={{
										pathname: '/books/' + book.id,
										state: { book: book }
									}}>
										<Book book={book} />
									</Link>
									<ShelfChanger book={book} updateShelf={this.props.updateShelf} />
								</li>
							))}
						</ol>
					)}
				</div>
			</div>
		)
	}
}

export default BookSearch