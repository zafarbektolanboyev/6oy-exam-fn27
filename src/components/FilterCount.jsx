import React, { useRef, useState } from "react";
import "./FilterCount.css";
import http from "../axios";
import { useNavigate } from "react-router-dom";
import { Oval } from "react-loader-spinner";

function FilterCount() {
  const minRef = useRef();
  const maxRef = useRef();
  const navigate = useNavigate();
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [loading, setLoading] = useState(false);

  function handleFilter(event) {
    event.preventDefault();

    const maxPage = maxRef.current.value;
    const minPage = minRef.current.value;

    setFilteredBooks([]);
    setLoading(true);

    http
      .get(`/books/filter?minPages=${minPage}&maxPages=${maxPage}`)
      .then((res) => {
        setFilteredBooks(res.data); 
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
      });
  }

  function handleClick(id) {
    navigate(`/details/${id}`);
  }

  return (
    <>
      <div className="input">
        <input
          className="filter-input"
          ref={minRef}
          type="number"
          placeholder="Min page"
          width={400}
        />
        <input
          className="filter-input"
          ref={maxRef}
          type="number"
          placeholder="Max page"
          width={400}
        />
        <button className="count-btn" onClick={handleFilter}>
          Filter
        </button>
      </div>

      {loading ? (
        <div className="loader-container">
          <Oval color={"#123abc"} height={80} width={80} />
        </div>
      ):
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
                <img src={book.thumbnailUrl} alt={book.title} />
                <h3>{book.title}</h3>
                <p>Authors: {book.authors}</p>
                <p>Categories: {book.categories}</p>
                <p>Pages: {book.pageCount}</p>
              </div>
            ))}
        </div>
      }
    </>
  );
}

export default FilterCount;
