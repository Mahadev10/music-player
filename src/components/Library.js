import { library } from "@fortawesome/fontawesome-svg-core";
import React from "react";
import LibrarySong from "./LibrarySong";
const Library = ({
  audioRef,
  songs,
  setSongs,
  setCurrentSong,
  isPlaying,
  libraryStatus,
}) => {
  return (
    <div className={`library ${libraryStatus ? "active-library" : ""} `}>
      <h2>Library</h2>
      <div className="library-songs">
        {songs.map((song) => (
          <LibrarySong
            audioRef={audioRef}
            isPlaying={isPlaying}
            setCurrentSong={setCurrentSong}
            song={song}
            songs={songs}
            id={song.id}
            key={song.id}
            setSongs={setSongs}
          />
        ))}
      </div>
    </div>
  );
};

export default Library;
