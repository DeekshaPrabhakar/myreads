# MyReads Project

Is a bookshelf app that allows you to select and categorize books you have read, are currently reading, or want to read. 

The project emphasizes using React to build the application and provides an API server and client library that you will use to persist information as you interact with the application.

## Walkthrough

<img src="https://github.com/DeekshaPrabhakar/myreads/blob/master/public/myReads1.gif" alt="app walkthrough" />

## Project Specifications

### Required
#### Application Setup
- [x] Application easy to install and start.
  - install all project dependencies with `npm install`
  - start the development server with `npm start`
- [x] Application includes README with clear installation and launch instructions

#### Main Page
- [x] The main page shows 3 shelves for books.
- [x] The main page shows a control that allows users to move books between shelves. The control should be tied to each book instance.
- [x] Information persist between page refreshes i.e. when the browser is refreshed, the same information is displayed on the page.

#### Search Page
- [x] The search page has a search input field. As the user types into the search field, books that match the query are displayed on the page.
- [x] Search results on the search page allow the user to select “currently reading”, “want to read”, or “read” to place the book in a certain shelf.
- [x] When an item is categorized on the search page, and the user navigates to the main page, it appears on that shelf in the main page.

#### Routing
- [x] The main page contains a link to the search page. When the link is clicked, the search page is displayed and the URL in the browser’s address bar is /search.
- [x] The search page contains a link to the main page. When the link is clicked, the main page is displayed and the URL in the browser’s address bar is /.

#### Code Functionality
- [x] Component state is passed down from parent components to child components. The state variable is not modified directly - setState() function is used correctly.
- [x] Books have the same state on both the search page and the main application page: If a book is on a bookshelf, that is reflected in both locations.
- [x] All JSX code is formatted properly and functional.

### Optional
#### Main Page
- [x] Each book is a link and when it is clicked, it goes to a book details page
- [x] Each shelf displays only 10 books. There is a "See All" link for each shelf, when clicked takes to shelf detail page.
- [x] Loading indicator between server request and response.

### Backend Server

To simplify your development process, we've provided a backend server for you to develop against. The provided file [`BooksAPI.js`](src/BooksAPI.js) contains the methods you will need to perform necessary operations on the backend:

* [`getAll`](#getall)
* [`update`](#update)
* [`search`](#search)

### `getAll`

Method Signature:

```js
getAll()
```

* Returns a Promise which resolves to a JSON object containing a collection of book objects.
* This collection represents the books currently in the bookshelves in your app.

### `update`

Method Signature:

```js
update(book, shelf)
```

* book: `<Object>` containing at minimum an `id` attribute
* shelf: `<String>` contains one of ["wantToRead", "currentlyReading", "read"]  
* Returns a Promise which resolves to a JSON object containing the response data of the POST request

### `search`

Method Signature:

```js
search(query, maxResults)
```

* query: `<String>`
* maxResults: `<Integer>` Due to the nature of the backend server, search results are capped at 20, even if this is set higher.
* Returns a Promise which resolves to a JSON object containing a collection of book objects.
* These books do not know which shelf they are on. They are raw results only. You'll need to make sure that books have the correct state while on the search page.

## Important
The backend API uses a fixed set of cached search results and is limited to a particular set of search terms, which can be found in [SEARCH_TERMS.md](SEARCH_TERMS.md). That list of terms are the _only_ terms that will work with the backend, so don't be surprised if your searches for Basket Weaving or Bubble Wrap don't come back with any results.

## Create React App

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app). You can find more information on how to perform common tasks [here](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md).

### Acknowledgements:
<ol>
  <li>
This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).You can find the most recent version of this guide [here](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md).
  </li>
  <li>
  App Icon made by <a href="https://www.flaticon.com/authors/smashicons" title="Smashicons">Smashicons</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0" target="_blank">CC 3.0.</a>
  </li>
  <li>
    Themes from <a href="https://color.adobe.com/chocolate-color-theme-9887282/">Adobe.</a>
  </li>
  <li>Loading Indicator from <a href="http://articles.dappergentlemen.com/2015/01/13/svg-spinner/">Ryan Allen.</li>
  </ol>

