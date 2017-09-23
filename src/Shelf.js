import React, { Component } from 'react'

class Shelf extends Component {
	render() {
		return (
			<div className="list-books-content">
				<div>
					<div className="bookshelf">
						<h2 className="bookshelf-title">{this.props.shelfName}</h2>
						<div className="bookshelf-books">
							<ol className="books-grid">
								{this.props.books.map((book) => (
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
											<div className="book-authors">{typeof book.authors === "undefined" ? "" : book.authors.join(', ')}</div>
										</div>
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