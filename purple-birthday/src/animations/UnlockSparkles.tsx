import { motion, useReducedMotion } from 'motion/react';

export default function UnlockSparkles(){
 const reduced=useReducedMotion();
 if(reduced)return null;
 return <div className="unlock-sparkles" aria-hidden="true">{Array.from({length:18},(_,i)=>{
  const angle=i*Math.PI*2/18;
  return <motion.span key={i} initial={{opacity:0,x:0,y:0,scale:0}} animate={{opacity:[0,1,0],x:Math.cos(angle)*(100+i%3*20),y:Math.sin(angle)*(100+i%3*20),scale:[0,1.2,.6],rotate:i*30}} transition={{duration:.85,delay:.15+(i%3)*.07}}>{i%3===0?'♡':'✦'}</motion.span>;
 })}</div>;
}
