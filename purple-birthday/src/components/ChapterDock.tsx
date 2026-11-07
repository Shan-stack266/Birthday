import { ArrowLeft, ArrowRight, Heart, RotateCcw } from 'lucide-react';
import type { Page } from '../sections/Adventure';
import { pages } from '../sections/Adventure';

export type LetterControls={onFold:()=>void;folding:boolean};

export default function ChapterDock({page,go,letterControls}:{page:Page;go:(page:Page)=>void;letterControls:LetterControls|null}){
 const index=pages.indexOf(page);
 const nextLabels:Record<Page,string>={home:'Your birthday bouquet',letter:'A few little reminders',jar:'One last wish',wish:'Replay the Magic'};
 return <div className={`chapter-footer ${letterControls?'has-letter-action':''}`} role="group" aria-label="Chapter controls">
  {index>0?<button type="button" className="dock-previous" onClick={()=>go(pages[index-1])}><ArrowLeft size={16}/><span>Previous chapter</span></button>:<span className="dock-start"/>}
  <span className="dock-progress" aria-label={`Chapter ${index+1} of ${pages.length}`}>{index+1}<span aria-hidden="true"> / </span>{pages.length}</span>
  {letterControls&&<button type="button" className="dock-fold" onClick={letterControls.onFold} disabled={letterControls.folding}>{letterControls.folding?'Folding…':'Fold My Letter'}<Heart size={14}/></button>}
  <button type="button" className="dock-next" onClick={()=>go(index<pages.length-1?pages[index+1]:'home')}><span>{nextLabels[page]}</span>{index<pages.length-1?<ArrowRight size={16}/>:<RotateCcw size={16}/>}</button>
 </div>;
}
