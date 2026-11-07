import { useRef, useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { ArrowLeft, ArrowRight, Heart } from 'lucide-react';
import { gift } from '../data/gift';
import { Photo } from './Photo';
import { spring } from './UI';

export default function LetterPhotos({folding}:{folding:boolean}){
 const gallery=useRef<HTMLDivElement>(null);const [active,setActive]=useState(0);const reduced=useReducedMotion();
 function show(index:number){
  const node=gallery.current;const next=Math.max(0,Math.min(gift.letterPhotos.length-1,index));
  const card=node?.children[next] as HTMLElement|undefined;
  if(!node||!card)return;
  const step=(node.children[0] as HTMLElement).getBoundingClientRect().width+18;
  const max=node.scrollWidth-node.clientWidth;const left=Math.max(0,Math.min(max,node.scrollLeft+(next-active)*step));
  node.scrollTo({left,behavior:reduced?'instant':'smooth'});setActive(left>=max-1?gift.letterPhotos.length-1:Math.round(left/step));
 }
 function track(){const node=gallery.current;if(!node)return;if(node.scrollLeft>=node.scrollWidth-node.clientWidth-1){setActive(gift.letterPhotos.length-1);return}let closest=0;let distance=Infinity;Array.from(node.children).forEach((card,i)=>{const delta=Math.abs((card as HTMLElement).offsetLeft-node.offsetLeft-18-node.scrollLeft);if(delta<distance){closest=i;distance=delta}});setActive(closest)}
 return <aside className="letter-photo-gallery" aria-label="Five little reasons">
  <div className="photo-gallery-intro"><Heart size={14}/><span>little things that make you, you</span></div>
  <div ref={gallery} className="photo-gallery-track" role="region" aria-label="Photo memories" tabIndex={0} onScroll={track} onKeyDown={e=>{if(e.key==='ArrowRight'){e.preventDefault();show(active+1)}if(e.key==='ArrowLeft'){e.preventDefault();show(active-1)}}}>
   {gift.letterPhotos.map((photo,i)=><motion.figure key={photo.id} className={`floating-letter-photo floating-photo-${i+1}`} initial={{opacity:0,y:reduced?0:12}} animate={{opacity:folding?0:1,y:0}} transition={folding?{duration:reduced?0:.2}:{...spring,delay:reduced?0:.85+i*.13}}>
    <div className="floating-photo-inner" style={{'--photo-angle':`${i%2?2:-2}deg`} as React.CSSProperties}>
     <span className="scrapbook-tape" aria-hidden="true"/>
     <div className="floating-photo-image"><Photo src={photo.src} caption={photo.caption} objectPosition={photo.objectPosition}/></div>
     <figcaption>{photo.caption}</figcaption><Heart className="floating-photo-heart" size={14} aria-hidden="true"/>
    </div>
   </motion.figure>)}
  </div>
  <div className="photo-gallery-controls"><button type="button" onClick={()=>show(active-1)} disabled={active===0} aria-label="Previous photo"><ArrowLeft size={16}/></button><span>{active+1} of {gift.letterPhotos.length} · swipe to explore</span><button type="button" onClick={()=>show(active+1)} disabled={active===gift.letterPhotos.length-1} aria-label="Next photo"><ArrowRight size={16}/></button></div>
 </aside>;
}
