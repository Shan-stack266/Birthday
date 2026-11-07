import { useState } from 'react';
import { ImagePlus } from 'lucide-react';
import { Star } from '../illustrations/StoryArt';
export function Photo({src,caption,objectPosition='50% 50%'}:{src:string;caption:string;objectPosition?:string}){
 const [failed,setFailed]=useState(false);
 return src&&!failed?<img src={src} alt={caption} style={{objectPosition}} decoding="async" onError={()=>setFailed(true)}/>:<div className="photo-empty"><Star/><ImagePlus size={23}/><span>A little memory goes here</span></div>;
}
