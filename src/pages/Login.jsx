import React, { useRef } from "react";
import http from "../axios";
import { useNavigate } from "react-router-dom";
import './Register.css'
import './Login.css'

function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const navigate = useNavigate();

  function handleLogin(event) {
    event.preventDefault();
    const user = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };

    http
      .post("/login", user)
      .then((res) => {
        console.log(res.data);
        if (res.status === 200) {
          const token = res.data.accessToken;
          localStorage.setItem("accessToken", token);
          alert("Muvaffaqiyatli tugadi");
          navigate("/");
        }
      })
      .catch((err) => {
        if (err.response) {
          alert("Xato: " + err.response.data.message);
        } else {
          console.log("Error:", err);
        }
      });
  }

  function handleRegister(e) {
    e.preventDefault();
    navigate("/register");
  }

  return (
    <div className="container mx-auto justify-center">
      <form onSubmit={handleLogin} className="login-form">
        <h1>Login Page</h1>
        <input
          ref={emailRef}
          type="email"
          placeholder="Enter email..."
          required
        />
        <input
          ref={passwordRef}
          type="password"
          placeholder="Enter password..."
          required
        />
        <button type="submit" className="login-btn1">Login</button>
        <button onClick={handleRegister} className="login-btn1">Register</button>
      </form>
    </div>
  );
}

export default Login;
