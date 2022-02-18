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
import jwt_decode from "jwt-decode";

function App() {
  const [currentUser] = useState(localStorage.getItem("token"));
  const [role, setRole] = useState("");

  useEffect(() => {
    try {
      if (currentUser) {
        let data: any = jwt_decode(currentUser);
        setRole(data.role);
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
        <Sidebar role={role}>
          <Routes>
            {role && role === "superadmin" ? (
              <>
                <Route path="register" element={<Register />} />
                <Route path="category" element={<ListCategory />} />
              </>
            ) : (
              <>
                <Route path="channel/" element={<ListChannel />} />
                <Route path="video/" element={<ListVideo />} />
                <Route path="video/:videoId" element={<DetailVideo />} />
              </>
            )}
          </Routes>
        </Sidebar>
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
