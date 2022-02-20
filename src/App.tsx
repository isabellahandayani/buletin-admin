import "./App.css";
import ListVideo from "./pages/Video/ListVideo";
import DetailVideo from "./pages/Video/DetailVideo";
import Login from "./pages/Auth/Login";
import ListChannel from "./pages/Channel/ListChannel";
import Register from "./pages/Auth/Register";
import ListCategory from "./pages/Category/ListCategory";
import ListPlaylist from "./pages/Playlist/ListPlaylist";

import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import jwt_decode from "jwt-decode";

function App() {
  const [currentUser] = useState(localStorage.getItem("token"));

  useEffect(() => {
    try {
      if (currentUser) {
        let data: any = jwt_decode(currentUser);
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
        <Routes>
          <Route path="register" element={<Register />} />
          <Route path="category" element={<ListCategory />} />
          <Route path="channel" element={<ListChannel />} />
          <Route path="video/" element={<ListVideo />} />
          <Route path="video/:videoId" element={<DetailVideo />} />
          <Route path="playlist" element={<ListPlaylist />} />
        </Routes>
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
