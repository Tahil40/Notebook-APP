import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignOut = () => {
  const host = "http://localhost:5000";
  const navigate = useNavigate(); 
  const [credentials, set_credentials] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${host}/api/authentication/signout`, {
        method: "POST",
        // mode: "no-cors", // This bypasses CORS
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: credentials.username,
          email: credentials.email,
          password: credentials.password,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const json = await response.json();
      if (json.success) {
        // Save the auth token and redirect
        localStorage.setItem("auth-token", JSON.stringify(json.authenticate_tocken));
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
    set_credentials({ ...credentials, [e.target.name]: e.target.value });
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
            <h1 style={{ marginBottom: "40px" }}>Create an Account</h1>
            <label htmlFor="exampleInputusername1" className="form-label">
              Enter Your UserName
            </label>
            <input
              type="username"
              className="form-control"
              id="username"
              name="username"
              aria-describedby="usernameHelp"
              onChange={onchange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Enter Your Email address
            </label>
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              name="email"
              aria-describedby="emailHelp"
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
        </form>
      </div>
    </>
  );
};

export default SignOut;
