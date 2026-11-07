import { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { Heart, Sparkles, X } from 'lucide-react';
import { gift } from '../data/gift';
import { NightScene } from '../illustrations/StoryArt';
import { Button } from '../components/UI';

export default function Wish({celebrate}:{celebrate:()=>void}){
 const [text,setText]=useState('');const [phase,setPhase]=useState<'writing'|'dust'|'sent'>('writing');const [error,setError]=useState('');const [wish,setWish]=useState(0);
 const [dustSize,setDustSize]=useState({width:400,height:150});const wishPaper=useRef<HTMLDivElement>(null);const sending=useRef(false);
 const reduced=useReducedMotion();const timer=useRef<ReturnType<typeof setTimeout>|undefined>(undefined);const popup=useRef<HTMLDialogElement>(null);const textarea=useRef<HTMLTextAreaElement>(null);const another=useRef<HTMLButtonElement>(null);
 useEffect(()=>()=>clearTimeout(timer.current),[]);
 useEffect(()=>{if(phase==='sent')popup.current?.showModal()},[phase]);
 function send(){if(phase!=='writing'||sending.current)return;if(!text.trim()){setError('Write a little wish first, lovely.');textarea.current?.focus();return}sending.current=true;const bounds=wishPaper.current?.getBoundingClientRect();if(bounds)setDustSize({width:bounds.width,height:bounds.height});setError('');setPhase('dust');setWish(v=>v+1);timer.current=setTimeout(()=>{setText('');setPhase('sent');celebrate()},reduced?150:2650)}
 function dismiss(){popup.current?.close();another.current?.focus({preventScroll:true})}
 function again(){popup.current?.close();sending.current=false;setText('');setPhase('writing');requestAnimationFrame(()=>textarea.current?.focus())}
 return <section className="story-section wish-section"><div className="wish-copy"><span className="eyebrow">CHAPTER 03 · A LITTLE WISH FOR THE STARS</span><h1>One Last Birthday Wish…</h1><p>{gift.finalWish}</p>
 <div className="wish-card"><span className="wish-card-label"><Sparkles size={14}/> a little wish, just for you</span><div className="wish-ritual" aria-busy={phase==='dust'}>
 <svg className={`wish-guiding-moon ${phase==='dust'?'receiving-wish':''}`} viewBox="0 0 80 90" aria-hidden="true"><path d="M59 6C3 0-5 75 53 80 24 62 32 22 59 6z" fill="#fff0c1" stroke="#c8a0d8" strokeWidth="3"/><path d="M24 38v3m-3 10q6 6 12 0" fill="none" stroke="#a986ae" strokeWidth="2" strokeLinecap="round"/><path d="M66 40v14m-7-7h14" stroke="#c7a3dc" strokeWidth="2"/></svg>
 {phase!=='sent'?<form onSubmit={event=>{event.preventDefault();send()}}>
  <label htmlFor="birthday-wish">What does your heart wish for?</label>
  <div ref={wishPaper} className={`wish-paper ${phase==='dust'?'turning-to-dust':''}`}>
   {phase==='writing'?<textarea ref={textarea} id="birthday-wish" value={text} onChange={e=>{setText(e.target.value);setError('')}} maxLength={500} placeholder="Dear stars, my wish is…" aria-describedby="wish-hint wish-error" aria-invalid={!!error} rows={4}/>:<motion.div className="departing-wish" initial={{opacity:1,filter:'blur(0px)',clipPath:'inset(0 0 0 0%)'}} animate={{opacity:0,filter:reduced?'blur(0px)':'blur(5px)',clipPath:reduced?'inset(0 0 0 0%)':'inset(0 0 0 100%)',y:reduced?0:-12}} transition={{duration:reduced ? .15 : 1.75,ease:'easeInOut'}}>{text}</motion.div>}
   {phase==='dust'&&!reduced&&<div className="wish-dust" aria-hidden="true">{Array.from({length:65},(_,i)=>{
    const startX=(5+(i*17)%90)/100;const startY=(12+(i*23)%70)/100;
    const dx=dustSize.width*(.98-startX);const dy=-dustSize.height*startY-65;
    return <motion.i key={i} style={{left:`${startX*100}%`,top:`${startY*100}%`,background:['#b183dd','#dcb0e5','#f0cf99','#af9aea'][i%4]}} initial={{opacity:0,scale:.2,x:0,y:0}} animate={{opacity:[0,1,1,0],scale:[.2,1,.7,0],x:[0,dx*.25+((i%5)-2)*7,dx],y:[0,-25-(i%7)*4,dy],rotate:i*21}} transition={{duration:1.85,delay:.12+(i%9)*.05,ease:'easeInOut'}}/>;
   })}</div>}
  </div>
  <p id="wish-hint" className="wish-hint">{phase==='writing'?`${text.length}/500 · A little wish, just between you and the stars.`:'Your wish is turning into stardust…'}</p>
  <p id="wish-error" className="wish-error" role="status">{error}</p>
  <Button className="wish-send" onClick={send} disabled={phase==='dust'}>{phase==='dust'?'Off to the stars…':'Make a Wish'} <Sparkles size={18}/></Button>
 </form>:<div className="wish-sent"><Heart size={38}/><p>Your little wish is dancing among the stars.</p><button ref={another} className="bubble-button secondary" onClick={again}>Make Another Wish <Sparkles size={17}/></button></div>}
 </div>
 </div>
 <div className="story-closing"><p>{gift.closingLine}</p><p className="closing-signature">{gift.sender} ♡</p></div>
 </div><NightScene key={wish} wishing={wish>0}/>
 <dialog ref={popup} className="wish-popup" aria-labelledby="wish-popup-title" onCancel={e=>{e.preventDefault();dismiss()}} onClick={e=>{e.stopPropagation();if(e.target===e.currentTarget)dismiss()}}><div><button type="button" className="icon-button modal-close" aria-label="Close wish message" onClick={e=>{e.preventDefault();e.stopPropagation();dismiss()}}><X size={18}/></button><Sparkles className="wish-popup-stars" size={45}/><h2 id="wish-popup-title">all your wish will come true</h2><p>A little faith, a little magic, and good things ahead.</p><button type="button" className="bubble-button" onClick={e=>{e.preventDefault();e.stopPropagation();dismiss()}}>Keep it in my heart <Heart size={17}/></button></div></dialog>
 </section>;
}
