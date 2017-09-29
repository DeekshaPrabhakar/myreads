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
		isLoading: false,
		isError: false
	}

	updateQuery = (query) => {

		this.setState({
			query: query,
			isLoading: true
		})
		const mybooks = this.props.mybooks;

		BooksAPI.search(query, 20).then((books) => {
			console.log(books);

			if (typeof books !== "undefined" && typeof books.error != "undefined") {
				this.setState({
					books: [],
					isLoading: false,
					isError: true
				});
			}
			else if (typeof books !== "undefined" && typeof books.map === "function") {

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
					isError: false,
					books: books,
					isLoading: false
				});
			}
			else {
				this.setState({
					isError: false,
					books: [],
					isLoading: false
				});
			}
		})
	}

	updateShelfLocal = (toShelf, book) => {
		const mybooks = this.props.mybooks.filter((b) => b.id !== book.id).concat(book);//optimistic update
		const books = this.state.books;

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
				books: books
			});
		}

		this.props.updateShelf(toShelf, book);
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
									<ShelfChanger book={book} updateShelf={this.updateShelfLocal} />
								</li>
							))}
						</ol>
					)}

					{!this.state.isLoading && this.state.isError && (
						<p className="error-label">No results available for this search. Try a different search term.</p>
					)}

				</div>
			</div>
		)
	}
}

export default BookSearch