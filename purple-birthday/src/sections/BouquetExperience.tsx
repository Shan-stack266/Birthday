import { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { Heart } from 'lucide-react';
import LetterPhotos from '../components/LetterPhotos';
import type { LetterControls } from '../components/ChapterDock';
import { gift, personalize } from '../data/gift';
import Bouquet from '../illustrations/Bouquet';
import { EnvelopeArt } from '../illustrations/StoryArt';
import { SectionHeading, spring } from '../components/UI';

type Phase='bouquet'|'lifting'|'open'|'folding'|'returning';

export default function BouquetExperience({onControlsChange}:{onControlsChange:(controls:LetterControls|null)=>void}){
 const [phase,setPhase]=useState<Phase>('bouquet');
 const reduced=useReducedMotion();
 const paper=useRef<HTMLElement>(null);
 const envelope=useRef<HTMLButtonElement>(null);
 const timer=useRef<ReturnType<typeof setTimeout>|undefined>(undefined);
 const open=phase==='open'||phase==='folding';
 const paragraphs=[gift.sharedMemory,...gift.letter.slice(1)].filter(Boolean);

 useEffect(()=>()=>clearTimeout(timer.current),[]);
 useEffect(()=>{
  if(phase!=='open')return;
  const focus=setTimeout(()=>paper.current?.focus({preventScroll:true}),reduced?0:1100);
  return()=>clearTimeout(focus);
 },[phase,reduced]);

 function unfold(){
  if(phase!=='bouquet')return;
  if(reduced){setPhase('open');return}
  setPhase('lifting');
  timer.current=setTimeout(()=>setPhase('open'),700);
 }
 const fold=useCallback(()=>{
  if(phase!=='open')return;
  setPhase('folding');
  timer.current=setTimeout(()=>{setPhase(reduced?'bouquet':'returning');if(reduced)timer.current=setTimeout(()=>envelope.current?.focus({preventScroll:true}),100)},reduced?0:900);
 },[phase,reduced]);
 useEffect(()=>{onControlsChange(open?{onFold:fold,folding:phase==='folding'}:null)},[open,fold,phase,onControlsChange]);
 useEffect(()=>()=>onControlsChange(null),[onControlsChange]);

 return <section className={`story-section letter-section ${open?'full-letter':''}`}>
  <SectionHeading eyebrow="CHAPTER 01 · FLOWERS & A BIRTHDAY NOTE" title="A Bouquet Just for You" description={open?`${gift.recipient}, a birthday note, just for you.`:'A little note is tucked into your flowers. Shall we open it?'}/>
  <AnimatePresence mode="wait">
   {!open?<motion.div key="bouquet" className="bouquet-stage" initial={{opacity:0,scale:reduced?1:.97}} animate={{opacity:1,scale:1}} exit={{opacity:0,scale:reduced?1:.96,y:reduced?0:15}} transition={{duration:reduced?0:.25}}>
    <div className="bouquet-visual">
    <Bouquet/>
    <motion.button ref={envelope} className="bouquet-letter-button" aria-label="Open birthday letter" disabled={phase!=='bouquet'} onClick={unfold}
     initial={phase==='returning'&&!reduced?{y:-118,scale:1.2,rotate:0}:{y:0,scale:1,rotate:-9}}
     animate={phase==='lifting'?{y:-118,scale:1.2,rotate:0}:{y:0,scale:1,rotate:-9}}
     transition={{duration:reduced?0:.65,ease:[.22,1,.36,1]}}
     whileHover={phase==='bouquet'?{scale:1.06,rotate:-5}:undefined} whileTap={phase==='bouquet'?{scale:.97}:undefined}
     onAnimationComplete={()=>{if(phase==='returning'){setPhase('bouquet');envelope.current?.focus({preventScroll:true})}}}>
     <EnvelopeArt open={phase==='lifting'}/><span>{phase==='lifting'?'a little note, unfolding…':'psst… a letter for you ♡'}</span>
    </motion.button>
    </div>
    <span className="hand-note bouquet-caption">a handful of flowers to brighten your day.</span>
   </motion.div>:<motion.div key="letter" className={`letter-stage letter-open bouquet-letter-open ${phase==='folding'?'is-folding':''}`} initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} transition={{duration:reduced?0:.18}}>
    <LetterPhotos folding={phase==='folding'}/>
    <motion.article id="birthday-letter" ref={paper} tabIndex={-1} className="letter-sheet folding-stationery" initial={reduced?{opacity:0}:{opacity:0,scaleY:.2,rotateX:55,y:65}} animate={{opacity:1,scaleY:1,rotateX:0,y:0}} transition={{...spring,duration:reduced?0:.85}}>
     <div className="paper-fold paper-fold-top" aria-hidden="true"><Heart size={25}/></div><div className="paper-fold paper-fold-bottom" aria-hidden="true"/>
     <div className="letter-writing"><span className="letter-corner" aria-hidden="true">♡</span><span className="eyebrow">FOR THE BIRTHDAY GIRL</span>
      <p className="letter-salutation">{personalize(gift.letter[0])}</p>
      <div className="letter-full-copy">{paragraphs.map((line,i)=><motion.p key={`${i}-${line}`} initial={{opacity:0}} animate={{opacity:1}} transition={{delay:reduced?0:.75+i*.13,duration:reduced?0:.35}}>{gift.letterEmphasis.includes(gift.letter.indexOf(line))?<strong>{personalize(line)}</strong>:personalize(line)}</motion.p>)}</div>
      <p className="letter-signature">{gift.sender} ♡</p>
     </div>
    </motion.article>
   </motion.div>}
  </AnimatePresence>
  <p className="section-footnote">A bouquet that never fades. A letter you can always come back to.</p>
 </section>;
}
