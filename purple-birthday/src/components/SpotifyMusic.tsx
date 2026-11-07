import { useState } from 'react';
import { createPortal } from 'react-dom';
import { ExternalLink, Music2, X } from 'lucide-react';
import { gift } from '../data/gift';

export default function SpotifyMusic(){
 const [visible,setVisible]=useState(false);
 const [loaded,setLoaded]=useState(false);
 const song=gift.spotify;
 function toggle(){setLoaded(true);setVisible(v=>!v)}
 return <>
  <button type="button" className="music-button" onClick={toggle} aria-label={visible?'Minimize Spotify player':'Open Spotify player'} aria-expanded={visible} aria-controls={loaded?'spotify-music-panel':undefined}><Music2 size={17}/><span>Music</span></button>
  {loaded&&createPortal(<aside id="spotify-music-panel" className="spotify-music-panel" aria-label="Birthday soundtrack" hidden={!visible}>
   <div className="spotify-panel-heading"><span><Music2 size={14}/> a little soundtrack for you</span><button type="button" className="icon-button" onClick={()=>setVisible(false)} aria-label="Minimize Spotify player"><X size={16}/></button></div>
   <iframe title={`${song.title} — ${song.artist} on Spotify`} src={`https://open.spotify.com/embed/track/${song.trackId}?utm_source=generator&theme=0`} width="100%" height="152" style={{border:0,borderRadius:12}} allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" allowFullScreen loading="eager"/>
   <p className="music-dedication">{gift.musicDedication}</p>
   <p>Press play in Spotify. Minimize this card to keep exploring.</p>
   <a href={`https://open.spotify.com/track/${song.trackId}`} target="_blank" rel="noopener noreferrer">{song.title} · {song.artist} <ExternalLink size={11}/></a>
  </aside>,document.body)}
 </>;
}
