import "./App.css";
import Sidebar from "./components/Sidebar/Sidebar";
import ListVideo from "./pages/Video/ListVideo";
import DetailVideo from "./pages/Video/DetailVideo";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import ListChannel from "./pages/Channel/ListChannel";

function App() {
  const loggedIn = true;
  return (
    <div className="App">
      {loggedIn ? (
        <Sidebar
          children={
            <Routes>
              <Route path="channel/" element={<ListChannel />} />
              <Route path="video/" element={<ListVideo />} />
              <Route path="video/:videoId" element={<DetailVideo />} />
            </Routes>
          }
        />
      ) : (
        <Routes>
          <Route path="/" element={<Login />} />
        </Routes>
      )}
    </div>
  );
}

export default App;
