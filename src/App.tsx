import "./App.css";
import Sidebar from "./components/Sidebar/Sidebar";
import ListVideo from "./pages/ListVideo";
import DetailVideo from "./pages/DetailVideo";
import { Routes, Route } from "react-router-dom";


function App() {
  return (
    <div className="App">
      <Sidebar
        children={
          <Routes>
            <Route path="/" element={<ListVideo />} />
            <Route path="video/:videoId" element={<DetailVideo />} />
          </Routes>
        }
      />
    </div>
  );
}

export default App;
