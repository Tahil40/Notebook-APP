import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import Layout from "./components/Layout";
import SignIn from "./components/sign_in";
import SignOut from "./components/sign_out";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      {/* Adding router......... */}
      <Router>
          <Routes>
            <Route exact path="/" element={<Layout />} />
            <Route exact path="/login" element={<SignIn />} />
            <Route exact path="/signup" element={<SignOut />} />
          </Routes>
        </Router>
    </>
  );
}

export default App;
