import React, { useEffect, useState } from "react";
import http from "../axios";
import "./HomePage.css";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import SearchBooks from "../components/SearchBooks";
import ReactLoading from 'react-loading';

function Home() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      navigate("/login");
    } else {
      http
        .get("/books", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          setBooks(res.data);
          setLoading(false);
        })
        .catch((err) => {
          alert("Ma'lumotlarni yuklashda xatolik yuz berdi.");
          setLoading(false);
        });
    }
  }, [navigate]);

  function handleClick(id) {
    navigate(`/details/${id}`);
  }

  return (
    <div className="container">
      <Header />
      <div className="Home-inputs">
        <SearchBooks />
      </div>
      {loading ? (
        <div className="loader-container">
          <ReactLoading color={"#123abc"} loading={loading} size={200} />
        </div>
      ) : (
        <div className="books">
          {books.map((book) => (
            <div
              key={book.id}
              className="book-item"
              onClick={() => {
                handleClick(book.id);
              }}
            >
              <img src={book.thumbnailUrl} alt={book.title} />
              <h3>Title: {book.title}</h3>
              <p>Author: {book.categories}</p>
              <p>Pages: {book.pageCount}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
export default Home;