import './App.css';
import VideoCard from './components/Video/VideoCardList';


const dummy = {
	id: "1",
	photo: "https://bit.ly/naruto-sage",
	title: "Naruto Sage Mode",
	channel: "OAWKOAKWo",
	view: "192",
  };


function App() {
  return (
    <div className="App">
       <VideoCard {...dummy} />
    </div>
  );
}

export default App;