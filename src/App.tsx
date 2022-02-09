import './App.css';
import Sidebar from './components/Sidebar/Sidebar';
import ListVideo from './pages/ListVideo';
import DetailVideo from './pages/DetailVideo';

function App() {
  return (
    <div className="App">
       <Sidebar children={<ListVideo />} />
    </div>
  );
}

export default App;