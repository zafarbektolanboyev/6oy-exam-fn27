import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import http from "../axios";
import Header from "../components/Header";
import "./Details.css";
import { Oval } from "react-loader-spinner";

function Details() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      http
        .get(`/books/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          setBook(res.data);
          setLoading(false);
        })
        .catch((err) => {
          alert("Ma'lumotlarni yuklashda xatolik yuz berdi.");
          setLoading(false);
        });
    }
  }, [id]);

  function handleHome(event) {
    event.preventDefault();
    navigate("/");
  }

  return (
    <div className="container">
      <Header />
      <button className="details-btn" onClick={handleHome}>
        Exit
      </button>
      <div className="details-container">
        {loading ? (
          <div className="loader-container">
            <Oval color={"#123abc"} height={80} width={80} />
          </div>
        ) : (
          <div className="book">
            <div className="img">
              <img src={book?.thumbnailUrl} alt={book?.title} />
            </div>
            <div className="info">
              <h1>{book?.title}</h1>
              <h1>Authors: {book?.authors.join(", ")}</h1>
              <p>Categories: {book?.categories.join(", ")}</p>
              <p>Pages: {book?.pageCount}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Details;
