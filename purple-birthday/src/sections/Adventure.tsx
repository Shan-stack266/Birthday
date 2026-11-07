import { useRef, useState } from 'react';
import { motion } from 'motion/react';
import { Heart, Sparkles } from 'lucide-react';
import { gift, personalize } from '../data/gift';
import { BirthdayScene, JarArt } from '../illustrations/StoryArt';
import { Button, SectionHeading, spring } from '../components/UI';
export type Page = 'home'|'letter'|'jar'|'wish';
export const pages:Page[]=['home','letter','jar','wish'];
export function Home({go}:{go:(p:Page)=>void}){
 return <section className="story-section home-section"><SectionHeading eyebrow="A VERY SPECIAL DAY, FOR A VERY SPECIAL YOU" title={personalize(gift.title).toUpperCase()} description={personalize(gift.greeting)}/><BirthdayScene/><div className="home-bottom"><span className="hand-note">another year of being wonderfully you</span><Button onClick={()=>go('letter')}>I wrote you something <Heart size={18} fill="currentColor"/></Button><small>four little surprises, waiting to be opened</small></div></section>
}
export function Jar(){
 const messages=[...gift.jarMessages,...gift.insideJokes];
 const [current,setCurrent]=useState(-1);const [draw,setDraw]=useState(0);const last=useRef(-1);
 function pick(){const count=messages.length;let next=Math.floor(Math.random()*(count-(last.current<0?0:1)));if(last.current>=0&&next>=last.current)next++;last.current=next;setCurrent(next);setDraw(v=>v+1)}
 return <section className="story-section jar-section"><SectionHeading eyebrow="CHAPTER 02 · LITTLE REASONS TO SMILE" title="A Jar Full of Little Reasons" description="Click the jar to receive a little message!"/><div className="jar-layout"><div className="jar-side"><button className="jar-button" onClick={pick} aria-label="Draw a message from the happiness jar"><JarArt key={draw} popping={draw>0}/></button><span className="hand-note">a little pick-me-up, whenever you need one</span></div><div className="jar-message-area" aria-live="polite">{current<0?<div className="jar-invitation"><Heart size={46}/><h2>A heart full of reasons.<br/>One little jar.</h2><p>For happy days, rainy days,<br/>and all the days in between.</p><Button onClick={pick}>Pick My First Heart <Sparkles size={17}/></Button></div>:<motion.article className="jar-message" key={draw} initial={{y:60,scale:.6,rotate:-12,opacity:0}} animate={{y:0,scale:1,rotate:2,opacity:1}} transition={spring}><motion.span className="paper-heart" initial={{y:0,scale:0}} animate={{y:[0,-55,-25],scale:[0,1.2,1]}} transition={{duration:.7}}>♡</motion.span><span className="eyebrow">A LITTLE REMINDER FOR YOU</span><h2>{messages[current]}</h2><span className="hand-note">a little reminder, just for you.</span><Button onClick={pick}>Get Another! <Heart size={17}/></Button></motion.article>}</div></div><p className="section-footnote">{messages.length} little reasons. A little boost for your day.</p></section>
}
