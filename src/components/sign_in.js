import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const host = "http://localhost:5000";
  const navigate = useNavigate();
  const [login_credentials, set_login_credentials] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${host}/api/authentication/login`, {
        method: "POST",
        // mode: "no-cors", // This bypasses CORS
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: login_credentials.email,
          password: login_credentials.password,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const json = await response.json();
      if (json.success) {
        // Save the auth token and redirect
        localStorage.setItem("auth-token", JSON.stringify(json.authenticate_tocken1));
        localStorage.setItem("user", JSON.stringify(json.user));
        navigate("/");
        // window.location.href = "/";
        // history.push("/");
      } else {
        // alert("Invalid credentials");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const onchange = (e) => {
    set_login_credentials({
      ...login_credentials,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      <div
        className="mx-4"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <form>
          <div className="mb-3">
            <h1 style={{ marginBottom: "40px" }}>Login To Continue</h1>
            <label htmlFor="exampleInputEmail1" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              name="email"
              onChange={onchange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              name="password"
              onChange={onchange}
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary"
            onClick={handleSubmit}
          >
            Submit
          </button>
          <p className="m-4">
            Don't Have Account Sign up -{" "}
            <Link to={"/signup"} style={{ textDecoration: "none" }}>
              {" "}
              Sign Up
            </Link>
          </p>
        </form>
      </div>
    </>
  );
};

export default SignIn;
