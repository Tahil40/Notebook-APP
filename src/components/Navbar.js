import React, {useEffect, useState} from "react";
// import { Link, useLocation} from "react-router-dom";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  // let location = useLocation();
  // useEffect(()=>{
  //   // console.log(location.pathname);
  // }, [location]);
  const [user, set_user] = useState(null); 
  const navigate = useNavigate();

  useEffect(()=>{
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      set_user(storedUser);
    }
  }, [])

  const handleLogout = () => {
    // Clear user data from state and localStorage....
    set_user(null);
    localStorage.removeItem('user');
    localStorage.removeItem('auth-token');
    navigate('/login'); // Redirect to login page....
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-dark navbar-dark fixed-top">
        <div className="container-fluid">
          <big className="text-white">
            Notebook-APP
            </big> 
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                {/* <Link className={`nav-link ${location.pathname==="/home"?"active": ""}`} to="/home">
                  Home
                </Link>
              </li> 
              <li className="nav-item">
                <Link className={`nav-link ${location.pathname==="/"? "active": ""}`} to="/">
                  
                </Link>                          */}
              </li>
            </ul>
            {
              user ? (
                <>
                <button className="btn btn-outline-success mx-2" type="text">{user.username}</button>
                <Link className="btn btn-outline-success mx-2" role="button" to={"/"} onClick={handleLogout}>Logout</Link>
                </>
              ) : (
                <Link className="btn btn-outline-success mx-2" role="button" to={"/login"}>Login</Link>
              )
            }
            </div>
        </div>
      </nav>
    </>
  );
}