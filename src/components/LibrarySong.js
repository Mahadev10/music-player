import React from "react";
import { playAudio,activeLibraryHandler} from "../util";
const LibrarySong = ({
  setCurrentSong,
  song,
  songs,
  setSongs,
  id,
  isPlaying,
  audioRef,
}) => {
  const songSelectHandler = () => {
    const selectedSong = songs.filter((state) => state.id === song.id);
    setCurrentSong(selectedSong[0]);
    // Add active state
    activeLibraryHandler(selectedSong[0],songs,setSongs);
    playAudio(isPlaying, audioRef);
  };
  return (
    <div
      onClick={songSelectHandler}
      className={`library-song ${song.active ? "selected" : ""}`}
    >
      <img src={song.cover} alt={song.name} />
      <div className="song-description">
        <h3>{song.name}</h3>
        <h4>{song.artist}</h4>
      </div>
    </div>
  );
};

export default LibrarySong;
