import "./App.css";
import Sidebar from "./components/Sidebar/Sidebar";
import ListVideo from "./pages/ListVideo";
import DetailVideo from "./pages/DetailVideo";
import { Routes, Route } from "react-router-dom";

const dummyDetail = {
  title: "Boleh Percaya Ramalan? Ini Kata Abi Quraish Shihab",
  view: "955",
  channel: "Segun Adebayo",
  channel_video: "12",
  desc: "Krisis Ukraina versus Rusia semakin meruncing. Masing-masing pihak dan sekutunya, mulai menyiagakan militernya. Untuk meredakan tensi panas, Presiden Perancis datang ke Moskow bertemu Vladimir Putin. Apa yang diobrolin? Pencegahan perang kah? Yuk, ikuti informasinya, dan simak kabar menarik lainnya di Narasi Pagi.",
  date: "19 Dec 2021",
};

function App() {
  return (
    <div className="App">
      <Sidebar
        children={
          <Routes>
            <Route path="/" element={<ListVideo />} />
            <Route path="channel" element={<DetailVideo {...dummyDetail} />} />
          </Routes>
        }
      />
    </div>
  );
}

export default App;
