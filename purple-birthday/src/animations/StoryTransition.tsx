import { motion, useReducedMotion } from 'motion/react';
import type { ReactNode } from 'react';

export default function StoryTransition({children,direction,onReady}:{children:ReactNode;direction:number;onReady:()=>void}){
 const reduced=useReducedMotion();
 return <motion.div custom={direction} variants={{
  enter:(d:number)=>({opacity:0,x:reduced?0:d*22,y:reduced?0:8}),
  settled:{opacity:1,x:0,y:0},
  leave:(d:number)=>({opacity:0,x:reduced?0:d*-16,y:0})
 }} initial="enter" animate="settled" exit="leave" transition={{duration:reduced ? .12 : .4,ease:[.22,1,.36,1]}} onAnimationComplete={definition=>{if(definition==='settled')onReady()}}>{children}</motion.div>;
}
