import "./App.css";
import Sidebar from "./components/Sidebar/Sidebar";
import ListVideo from "./pages/ListVideo";
import DetailVideo from "./pages/DetailVideo";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";

function App() {
  const loggedIn = true;
  return (
    <div className="App">
      {loggedIn ? (
        <Sidebar
          children={
            <Routes>
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
