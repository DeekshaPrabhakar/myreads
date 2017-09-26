import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class Shelf extends Component {

	state = {
		isIndexPage: this.props.location.pathname === "/"
	}

	shelfChanger = (event, book) => {
		event.nativeEvent.preventDefault();
		event.nativeEvent.stopPropagation();
		this.props.updateShelf(event.target.value, book);
		return false;
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
									<li key={book.id}>
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
													<div className="book-shelf-changer">
														<select value={book.shelf} onChange={(event) => {
															this.shelfChanger(event,book);
														}
														} >
															<option value="none" disabled>Move to...</option>
															<option value="currentlyReading">Currently Reading</option>
															<option value="wantToRead">Want to Read</option>
															<option value="read">Read</option>
															<option value="none">None</option>
														</select>
													</div>
												</div>
												<div className="book-title">{typeof book.title === "undefined" ? "" : book.title}</div>
												<div className="book-authors">{typeof book.authors === "undefined" ? "" : book.authors.join(', ')}</div>
											</div>
										</Link>
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