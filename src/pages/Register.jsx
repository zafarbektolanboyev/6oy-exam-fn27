import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import http from "../axios";
import './Register.css'
import './Login.css'

function Register() {
  const emailRef = useRef();
  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const ageRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();
  const navigate = useNavigate();

  function validate(){
    if (!user.email) {
      errors.push("Emailni to'ldiring.");
      emailRef.current.value = "";
    } else if (!/\S+@\S+\.\S+/.test(user.email)) {
      errors.push("Email formatini to'g'ri kiriting.");
      emailRef.current.value = "";
    }

    if (!user.password) {
      errors.push("Parolni to'ldiring.");
      passwordRef.current.value = "";
      confirmPasswordRef.current.value = "";
    } else if (user.password.length < 4) {
      errors.push("Parol kamida 4 ta belgidan iborat bo'lishi kerak.");
      passwordRef.current.value = "";
      confirmPasswordRef.current.value = "";
    }
  }
  function handleRegister() {
    const user = {
      firstName: firstNameRef.current.value,
      lastName: lastNameRef.current.value,
      age: parseInt(ageRef.current.value, 10),
      email: emailRef.current.value,
      password: passwordRef.current.value,
      confirmPassword: confirmPasswordRef.current.value,
    };

    if (user.password !== user.confirmPassword) {
      alert("Parollar mos kelmayapti!");
      return;
    }

    http.post("/register", user)
      .then((res) => {
        if (res.status >= 200 && res.status <= 300) {
          alert("Registratsiya muvaffaqiyatli tugadi");
          navigate("/login");
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }

  return (
    <div className="container w-full mx-auto rounded-md">
      <form className="login-form">
      <h1>Register Page</h1>
        <input className="px-2 py-2" ref={emailRef} type="email" placeholder="Enter email..." />
        <input className="px-2 py-2" ref={firstNameRef} type="text" placeholder="Enter first name..." />
        <input className="px-2 py-2" ref={lastNameRef} type="text" placeholder="Enter last name..." />
        <input className="px-2 py-2" ref={ageRef} type="number" placeholder="Enter age..." />
        <input className="px-2 py-2" ref={passwordRef} type="password" placeholder="Enter password..." />
        <input className="px-2 py-2" ref={confirmPasswordRef} type="password" placeholder="Enter confirm password..." />
      </form>
      <button className="register-btn" type="submit" onClick={handleRegister}>Register</button>
    </div>
  );
}

export default Register;