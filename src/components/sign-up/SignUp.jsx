import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./SignUp.css";

export const SignUp = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({ title: "",  name: "", email: "", password: "" });
  const [formError, setFormError] = useState(false);

  const handleOnChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleUserRegistration = (e) => {
    e.preventDefault();
    if (
      user.title.trim().length === 0 ||
      user.name.trim().length === 0 ||
      user.email.trim().length === 0 ||
      user.password.trim().length === 0
    ) {
      setFormError(true);
      return;
    }
    setFormError(false);
    axios
      .post("http://localhost:4001/auth/users/register", user, {
        headers: {
          "content-type": "application/json",
        },
      })
      .then((response) => {
        if (response.data.success) {
          setUser({ title: "", name: "", email: "", password: "" });
          navigate("/sign-in");
        }
      })
      .catch((error) => {
        setFormError(true);
      });
  };

  return (
    <div className="sign-up auth-container">
      <form
        className="auth-form sign-up-form spaced-form"
        onSubmit={handleUserRegistration}
      >
        <h1 className="text-center page-title">Sign Up</h1>
        
        <div className="input-group">
          <label htmlFor="title">TITLE</label>
          <input
            type="text"
            name="title"
            id="title"
            placeholder=" ms, mrs, miss"
            className="input-control"
            value={user.title}
            onChange={handleOnChange}
          />
         </div>

        <div className="input-group">
          <label htmlFor="email">Enter your name</label>
          <input
            type="text"
            name="name"
            id="name"
            placeholder="Please enter your Good Name here"
            className="input-control"
            value={user.name}
            onChange={handleOnChange}
          />
        </div>
        <div className="input-group">
          <label htmlFor="email">Enter your email</label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Please Enter your Email here"
            className="input-control"
            value={user.email}
            onChange={handleOnChange}
          />
        </div>
        <div className="input-group">
          <label htmlFor="password">Enter your secret password</label>
          <input
            placeholder="Please Enter your Password here"
            type="password"
            name="password"
            id="password"
            className="input-control"
            value={user.password}
            onChange={handleOnChange}
          />
        </div>
        <div className="input-group">
          <button type="submit" className="btn btn-primary">
            I'm ready! Sign me Up
          </button>
        </div>
      </form>
      {formError ? (
        <div className="alert alert-danger">
          <p className="alert-message">
            Invalid user details. Please verify once and resubmit.
          </p>
        </div>
      ) : null}
    </div>
  );
};
