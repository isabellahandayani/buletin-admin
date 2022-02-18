import "./App.css";
import Sidebar from "./components/Sidebar/Sidebar";
import ListVideo from "./pages/Video/ListVideo";
import DetailVideo from "./pages/Video/DetailVideo";
import Login from "./pages/Auth/Login";
import ListChannel from "./pages/Channel/ListChannel";
import Register from "./pages/Auth/Register";
import ListCategory from "./pages/Category/ListCategory";

import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import jwt_decode, { JwtPayload } from "jwt-decode";

function App() {
  const [currentUser] = useState(localStorage.getItem("token"));

  useEffect(() => {
    try {
      if (currentUser) {
        let data: JwtPayload = jwt_decode(currentUser);
        if (Date.now() >= data.exp! * 1000) {
          localStorage.removeItem("token");
          window.location.reload();
        }
      }
    } catch (e) {}
  }, [currentUser]);

  return (
    <div className="App">
      {currentUser ? (
        <Sidebar
          children={
            <Routes>
              <Route path="/" element={<ListVideo />} />
              <Route path="channel/" element={<ListChannel />} />
              <Route path="video/" element={<ListVideo />} />
              <Route path="video/:videoId" element={<DetailVideo />} />
              <Route path="register" element={<Register />} />
              <Route path="category" element={<ListCategory />} />
            </Routes>
          }
        />
      ) : (
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="*" element={<Login />} />
        </Routes>
      )}
    </div>
  );
}

export default App;
