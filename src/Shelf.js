import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Book from './Book';
import ShelfChanger from './ShelfChanger';

class Shelf extends Component {

	state = {
		isIndexPage: this.props.location.pathname === "/"
	}

	render() {
		const shelfBooks = this.state.isIndexPage ? this.props.books.slice(0, 10) : this.props.books;

		return (
			<div className="list-books-content">
				<div>
					<div className="bookshelf">
						<h2 className="bookshelf-title">
							<span>
								{this.props.shelfName}
							</span>
							<span className="shelf-allbooks">
								{this.state.isIndexPage && (
									<Link to={`/${this.props.shelfDetail}`}>See All ></Link>
								)}
							</span>
						</h2>
						<div className="bookshelf-books">
							<ol className={this.state.isIndexPage ? "books-grid-index" : "books-grid-detail"}>
								{shelfBooks.map((book) => (
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
						</div>
					</div>
				</div>
			</div>
		)
	}
}

export default Shelf