export const playAudio=(isPlaying,audioRef)=>{
    if(isPlaying){
        const playPromise = audioRef.current.play();
        if(playPromise !== undefined){
            playPromise.then((_)=>{
                audioRef.current.play();
            }).catch((e)=>console.log(e));
        }
    }
}
export const activeLibraryHandler=(currentSong,songs,setSongs)=>{
    const newsongs = songs.map((song)=>{
      if(song.id===currentSong.id){
          return {...song,active:true};
      }
      else{
          return {...song,active:false};
      }
  });
  setSongs(newsongs); 
  }