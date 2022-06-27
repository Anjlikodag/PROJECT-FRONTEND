import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./SignIn.css";

export const SignIn = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({ email: "", password: "" });
  const [formError, setFormError] = useState(false);

  const handleOnChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleUserLogin = (e) => {
    e.preventDefault();
    if (user.email.trim().length === 0 || user.password.trim().length === 0) {
      setFormError(true);
      return;
    }
    setFormError(false);
    axios
      .post("http://localhost:4001/auth/users/login", user, {
        headers: { "content-type": "application/json" },
      })
      .then((response) => {
        if (response.data.success) {
          setUser({ email: "", password: "" });
          const token = response.data.data.token;
          localStorage.setItem("accessToken", token);
          localStorage.setItem("user", JSON.stringify(response.data.data.user))
          sessionStorage.setItem("accessToken", token);
          navigate("/products");
        }
      })
      .catch((error) => {
        console.error(error.response.data.message);
        setFormError(true);
      });
  };

  return (
    <div className="auth-container sign-in">
      <form
        className="auth-form sign-in-form spaced-form"
        onSubmit={handleUserLogin}
      >
        <h1 className="text-center page-title">Sign In</h1>
        <div className="input-group">
          <label htmlFor="email">Enter your email</label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Enter your Email"
            className="input-control"
            value={user.email}
            onChange={handleOnChange}
          />
        </div>
        <div className="input-group">
          <label htmlFor="password">Enter your secret password</label>
          <input
            placeholder="Enter your Password"
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
            Sign In
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
