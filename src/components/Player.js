import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faPause,
  faAngleLeft,
  faAngleRight,
} from "@fortawesome/free-solid-svg-icons";
import {playAudio,activeLibraryHandler} from "../util";
const Player = ({currentSong,setCurrentSong,isPlaying,setIsPlaying,audioRef,songInfo,setSongInfo,songs,setSongs}) => {
  // Event Handlers
  
      const playSongHandler = ()=>{
      if(isPlaying){
        audioRef.current.pause();
        setIsPlaying(false);
      }
      else{
        audioRef.current.play();
        setIsPlaying(true);
      }
  }
  
  const getTime= (time)=>{
    return (
      Math.floor(time/60)+":"+("0"+Math.floor(time%60)).slice(-2)
    )
  }
  const dragHandler = (e)=>{
    audioRef.current.currentTime = e.target.value;
    setSongInfo({...songInfo,currentTime:e.target.value})
  }
  const skipTrackHandler=async(direction)=>{
    let currentIndex = songs.findIndex((song)=>song.id === currentSong.id);
    if(direction==='skip-forward'){
      const index = (currentIndex+1)%songs.length;
      await setCurrentSong(songs[index]);
      activeLibraryHandler(songs[index],songs,setSongs);
    }
    else{
      const index = currentIndex-1 >=0?currentIndex-1:songs.length-1;
     await setCurrentSong(songs[index]);
     activeLibraryHandler(songs[index]);
    }
    playAudio(isPlaying,audioRef);
  }
  // styles
  const trackAnim ={
    transform: `translateX(${songInfo.animationPercentage}%)`
  }
  return (
    <div className="player">
      <div className="time-control">
        <p>{getTime(songInfo.currentTime)}</p>
        <div className="track" style={{background:`linear-gradient(to right, ${currentSong.color[0]},${currentSong.color[1]})`}}>
          <input min={0} max={songInfo.duration?songInfo.duration:0} value={songInfo.currentTime} onChange={dragHandler} type="range" />
          <div className="animate-track" style={trackAnim}></div>
        </div>
        <p>{getTime(songInfo.duration?songInfo.duration:"")}</p>
      </div>
      <div className="play-control">
        <FontAwesomeIcon onClick={()=>skipTrackHandler('skip-back')} className="skip-back" size="2x" icon={faAngleLeft} />
        <FontAwesomeIcon  onClick={playSongHandler} className="play" size="2x" icon={isPlaying?faPause:faPlay} />
        <FontAwesomeIcon
          onClick={()=>skipTrackHandler('skip-forward')}
          className="skip-forward"
          size="2x"
          icon={faAngleRight}
        />
      </div>
    </div>
  );
};

export default Player;
