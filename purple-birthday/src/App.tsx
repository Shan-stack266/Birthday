import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Heart, LockKeyhole, Stars } from 'lucide-react';
import Brand from './components/Brand';
import PinLock from './sections/PinLock';
import { Home, Jar, pages } from './sections/Adventure';
import BouquetExperience from './sections/BouquetExperience';
import ChapterDock from './components/ChapterDock';
import type { LetterControls } from './components/ChapterDock';
import StoryTransition from './animations/StoryTransition';
import Wish from './sections/Wish';
import type { Page } from './sections/Adventure';
import { Celebration, Decorations } from './components/UI';
const chapterLabels:Record<Page,string>={home:'Home',letter:'Bouquet',jar:'Jar',wish:'Final Wish'};
function readSession(){try{return sessionStorage.getItem('purple-world-unlocked')==='yes'}catch{return false}}
export default function App(){
 const [letterControls,setLetterControls]=useState<LetterControls|null>(null);
 const [unlocked,setUnlocked]=useState(readSession);const [page,setPage]=useState<Page>('home');const [direction,setDirection]=useState(1);const [burst,setBurst]=useState(0);const heading=useRef<HTMLDivElement>(null);
 function celebrate(){setBurst(v=>v+1)}
 function unlock(){try{sessionStorage.setItem('purple-world-unlocked','yes')}catch{/* Browsing still works when storage is disabled. */}setUnlocked(true);celebrate()}
 function go(next:Page){if(next===page)return;setDirection(pages.indexOf(next)>=pages.indexOf(page)?1:-1);setPage(next);window.scrollTo({top:0,behavior:'instant'})}
 useEffect(()=>{if(unlocked)heading.current?.focus({preventScroll:true})},[page,unlocked]);
 function relock(){try{sessionStorage.removeItem('purple-world-unlocked')}catch{}setUnlocked(false);setPage('home')}
 return <><AnimatePresence mode="wait">{!unlocked?<PinLock key="lock" onUnlock={unlock}/>:<motion.div key="world" className={`world-shell ${page==='wish'?'night-world':''} ${page==='letter'&&letterControls?'letter-is-open':''}`} initial={{opacity:0}} animate={{opacity:1}}><Decorations/><header className="world-header"><a className="wordmark" href="#home" onClick={e=>{e.preventDefault();go('home')}}><Brand/></a><div className="header-controls"><button className="icon-button" onClick={relock} aria-label="Lock your purple world"><LockKeyhole size={17}/></button></div></header><main ref={heading} tabIndex={-1} className="chapter-main" aria-label={`${chapterLabels[page]} birthday chapter`}><AnimatePresence mode="wait" custom={direction}><StoryTransition key={page} direction={direction} onReady={()=>heading.current?.focus({preventScroll:true})}>{page==='home'?<Home go={go}/>:page==='letter'?<BouquetExperience onControlsChange={setLetterControls}/>:page==='jar'?<Jar/>:<Wish celebrate={celebrate}/>}</StoryTransition></AnimatePresence></main><ChapterDock page={page} go={go} letterControls={page==='letter'?letterControls:null}/><footer className="world-footer"><Stars size={14}/><span>a tiny website. a big birthday hug. all for you.</span><Heart size={14}/></footer></motion.div>}</AnimatePresence><Celebration burst={burst}/></>;
}
