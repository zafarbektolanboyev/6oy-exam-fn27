// import React, { useState, useEffect } from "react";
// import http from "../axios";
// import "./SearchBook.css";
// import "../pages/HomePage.css";
// import FilterCount from "./FilterCount";
// import { useNavigate } from "react-router-dom";

// function debounce(func, delay) {
//   let debounceTimer;
//   return function (...args) {
//     const context = this;
//     clearTimeout(debounceTimer);
//     debounceTimer = setTimeout(() => func.apply(context, args), delay);
//   };
// }
// function SearchBook() {
//   const [query, setQuery] = useState("");
//   const [books, setBooks] = useState([]);
//   const navigate = useNavigate()
//   const [filteredBooks, setFilteredBooks] = useState([]);

//   function filterBooks(searchQuery) {
//     if (searchQuery.trim() === "") {
//       setFilteredBooks(books);
//     } else {
//       const lowercasedQuery = searchQuery.toLowerCase();
//       const filtered = books.filter((book) =>
//         book.title.toLowerCase().includes(lowercasedQuery)
//       );
//       setFilteredBooks(filtered);
//     }
//   }

//   function handleInputChange(e) {
//     const value = e.target.value;
//     http
//       .get("/books")
//       .then((response) => {
//         setBooks(response.data);
//         setFilteredBooks(response.data);
//       })
//       .catch((error) => {
//         console.error("Error while fetching all books:", error);
//       });
//     setQuery(value);
//     debounceFilterBooks(value);
//   }
//   function handleClick(id){
//     navigate(`/details/${id}`)
//   }
//   const debounceFilterBooks = debounce(filterBooks, 100);
//   return (
//     <div className="search-book-container">
//       <div className="search-book-input">
//         <div>
//           <input
//             type="text"
//             placeholder="Search books"
//             onChange={handleInputChange}
//             value={query}
//             className="search-input"
//           />
//         </div>
//           <FilterCount></FilterCount>
//       </div>
//       <div className="books-container">
//         {filteredBooks.length > 0 &&
//           filteredBooks.map((book) => (
//             <div key={book.id} className="book-card" onClick={() => {handleClick(book.id)}}>
//               <img src={book.thumbnailUrl} alt="" />
//               <h3>{book.title}</h3>
//               <p>Authors: {book.authors}</p>
//               <p>Categories: {book.categories}</p>
//               <p>Pages: {book.pageCount}</p>
//             </div>
//           ))}
//       </div>
//     </div>
//   );
// }
// export default SearchBook;



import React, { useState, useEffect } from "react";
import http from "../axios";
import "./SearchBook.css";
import "../pages/HomePage.css";
import FilterCount from "./FilterCount";
import { useNavigate } from "react-router-dom";
import { Oval } from "react-loader-spinner";

function debounce(func, delay) {
  let debounceTimer;
  return function (...args) {
    const context = this;
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => func.apply(context, args), delay);
  };
}

function SearchBook() {
  const [query, setQuery] = useState("");
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [loading, setLoading] = useState(false); // Loader uchun state
  const navigate = useNavigate();

  function filterBooks(searchQuery) {
    if (searchQuery.trim() === "") {
      setFilteredBooks(books);
    } else {
      const lowercasedQuery = searchQuery.toLowerCase();
      const filtered = books.filter((book) =>
        book.title.toLowerCase().includes(lowercasedQuery)
      );
      setFilteredBooks(filtered);
    }
  }

  function handleInputChange(e) {
    const value = e.target.value;
    setQuery(value);
    debounceFilterBooks(value);
  }

  const debounceFilterBooks = debounce((value) => {
    setLoading(true); // Loaderni ko‘rsatish
    http
      .get("/books")
      .then((response) => {
        setBooks(response.data);
        setFilteredBooks(response.data);
        filterBooks(value);
        setLoading(false); // Loaderni yashirish
      })
      .catch((error) => {
        console.error("Error while fetching all books:", error);
        setLoading(false); // Loaderni yashirish
      });
  }, 100);

  function handleClick(id) {
    navigate(`/details/${id}`);
  }

  return (
    <div className="search-book-container">
      <div className="search-book-input">
        <div>
          <input
            type="text"
            placeholder="Search books"
            onChange={handleInputChange}
            value={query}
            className="search-input"
          />
        </div>
        <FilterCount></FilterCount>
      </div>

      {loading ? (
        <div className="loader-container">
          <Oval color={"#123abc"} height={80} width={80} />
        </div>
      ) : (
        <div className="books-container">
          {filteredBooks.length > 0 &&
            filteredBooks.map((book) => (
              <div
                key={book.id}
                className="book-card"
                onClick={() => {
                  handleClick(book.id);
                }}
              >
                <img src={book.thumbnailUrl} alt="" />
                <h3>{book.title}</h3>
                <p>Authors: {book.authors}</p>
                <p>Categories: {book.categories}</p>
                <p>Pages: {book.pageCount}</p>
              </div>
            ))}
        </div>
      )}
    </div>
  );
}

export default SearchBook;
