import React, { useState, useRef } from "react";
// import styles
import "./styles/app.scss";
// Import data
import chillHop from "./data";
// import components
import Player from "./components/Player";
import Song from "./components/Song";
import Library from "./components/Library";
import Nav from "./components/Nav";
import { playAudio,activeLibraryHandler } from "./util";
function App() {
  const timeUpdateHandler = (e) => {
    const current = e.target.currentTime;
    const duration = e.target.duration;
    const roundedCurrent = Math.round(current);
    const roundedDuration = Math.round(duration);
    const animation = Math.round((roundedCurrent / roundedDuration) * 100);
    setSongInfo({
      ...songInfo,
      currentTime: current,
      duration,
      animationPercentage: animation,
    });
  };
  // states
  const [songs, setSongs] = useState(chillHop());
  const [currentSong, setCurrentSong] = useState(songs[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [songInfo, setSongInfo] = useState({
    currentTime: 0,
    duration: 0,
    animationPercentage: 0,
  });
  const [libraryStatus, setLibraryStatus] = useState(false);
  // Ref
  const audioRef = useRef(null);
  const songEndHandler = async() => {
    let currentIndex = songs.findIndex((song) => song.id === currentSong.id);
    const index=(currentIndex + 1) % songs.length;
    await setCurrentSong(songs[index]);
    activeLibraryHandler(songs[index],songs,setSongs);
    playAudio(isPlaying, audioRef);
  };
  return (
    <div className={`App ${libraryStatus ? 'library-active':""}`}>
      <Nav libraryStatus={libraryStatus} setLibraryStatus={setLibraryStatus} />
      <Song currentSong={currentSong} />
      <Player
        audioRef={audioRef}
        setIsPlaying={setIsPlaying}
        isPlaying={isPlaying}
        currentSong={currentSong}
        setCurrentSong={setCurrentSong}
        songInfo={songInfo}
        setSongInfo={setSongInfo}
        songs={songs}
        setSongs={setSongs}
      />
      <Library
        isPlaying={isPlaying}
        audioRef={audioRef}
        songs={songs}
        setSongs={setSongs}
        setCurrentSong={setCurrentSong}
        libraryStatus={libraryStatus}
      />
      <audio
        onTimeUpdate={timeUpdateHandler}
        onLoadedMetadata={timeUpdateHandler}
        ref={audioRef}
        src={currentSong.audio}
        onEnded={songEndHandler}
        preload="none"
      ></audio>
    </div>
  );
}

export default App;
