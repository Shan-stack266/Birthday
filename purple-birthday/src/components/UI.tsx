import { motion, useReducedMotion } from 'motion/react';
import type { ReactNode } from 'react';
import { Cloud, Star } from '../illustrations/StoryArt';

export const spring = { type: 'spring' as const, stiffness: 180, damping: 19 };
export function Button({children,onClick,className='',disabled=false}:{children:ReactNode;onClick?:()=>void;className?:string;disabled?:boolean}){
  return <motion.button type="button" className={`bubble-button ${className}`} onClick={onClick} disabled={disabled} whileHover={{y:-3,rotate:-1}} whileTap={{scale:.95}} transition={spring}>{children}</motion.button>;
}
export function SectionHeading({eyebrow,title,description}:{eyebrow:string;title:string;description:string}){
  return <div className="section-heading"><span className="eyebrow">{eyebrow}</span><h1>{title}</h1><p>{description}</p></div>;
}
export function Decorations(){return <div className="decorations" aria-hidden="true"><Cloud className="decor-cloud cloud-one"/><Cloud className="decor-cloud cloud-two"/><Star className="decor-star decor-star-one"/><Star className="decor-star decor-star-two"/><span className="decor-heart heart-one">♡</span><span className="decor-heart heart-two">♡</span><span className="spark spark-one">✧</span><span className="spark spark-two">✧</span><div className="hill hill-one"/><div className="hill hill-two"/></div>}
export function Celebration({burst}:{burst:number}){
  const reduced=useReducedMotion();
  if(!burst || reduced)return null;
  return <div className="celebration" aria-hidden="true" key={burst}>{Array.from({length:30},(_,i)=><motion.span key={i} initial={{top:'-8%',left:`${(i*37)%100}%`,rotate:0,opacity:1}} animate={{top:'110%',rotate:i%2?380:-340,opacity:0}} transition={{duration:2.5+i%4*.25,delay:i%6*.07}} style={{color:['#a875ff','#ee9bcb','#c9a7ff','#d8ac65'][i%4]}}>{i%3===0?'♡':i%3===1?'✦':'✿'}</motion.span>)}</div>;
}
