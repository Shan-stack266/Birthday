const flowers = [
 {x:102,y:158,r:-28,c:'#b58ce8'}, {x:166,y:102,r:-13,c:'#d5b2f5'},
 {x:236,y:74,r:5,c:'#ad7cdd'}, {x:303,y:121,r:20,c:'#efb6dc'},
 {x:347,y:184,r:31,c:'#c5a1ef'}, {x:206,y:183,r:-8,c:'#efc2e3'},
 {x:272,y:210,r:12,c:'#bc90e8'}
];
export default function Bouquet(){
 return <svg viewBox="0 0 460 520" className="bouquet-art" role="img" aria-label="A gently swaying bouquet of lavender and pink flowers wrapped with a purple bow">
 <ellipse cx="231" cy="491" rx="112" ry="15" fill="#d7b9ed" opacity=".35"/>
 <g className="bouquet-sway" stroke="#81639d" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
 {flowers.map((f,i)=><g key={i} className={`bouquet-stem bouquet-stem-${i}`} style={{animationDelay:`${i*-.6}s`}}>
 <path d={`M230 398Q${f.x+20} 260 ${f.x} ${f.y}`} fill="none" stroke="#88a18a" strokeWidth="5"/>
 <path d={`M${(230+f.x)/2} 289q-58-57-56-12 12 25 56 12z`} fill="#bad0b0" stroke="#8da689"/>
 <path d={`M${(230+f.x)/2+9} 311q58-58 56-12-12 25-56 12z`} fill="#a9c5a1" stroke="#8da689"/>
 <g transform={`translate(${f.x} ${f.y}) rotate(${f.r})`}>
 <g className="bouquet-bloom" style={{animationDelay:`${i*-.45}s`,animationDuration:`${2.6+i*.18}s`}}>
 {Array.from({length:6},(_,p)=><ellipse key={p} cx="0" cy="-25" rx="19" ry="29" transform={`rotate(${p*60})`} fill={f.c} stroke="#9670b8" strokeWidth="2.7"/>)}
 <circle r="17" fill="#fff0be" stroke="#c1a477" strokeWidth="2"/>
 <path d="M-6-2v2m12-2v2m-9 6q3 4 6 0" fill="none" stroke="#987697" strokeWidth="2"/>
 <path d="M-28-33q-9 3-10 12" fill="none" stroke="#fff5ff" strokeWidth="4" opacity=".65"/>
 </g></g></g>)}
 <path d="M82 276l148 211 154-211-113 49-43-21-40 21z" fill="#ead6fa" stroke="#ad88c7" strokeWidth="3.5"/>
 <path d="M82 276l130 86 18 125-80-164z" fill="#f9edff" stroke="#c8a8df"/>
 <path d="M384 276l-132 86-22 125 83-164z" fill="#d4b6ee" stroke="#b795d2"/>
 <path d="M214 394q-109-72-96-10t100 27m28-17q109-72 96-10t-100 27" fill="#bd91e1" stroke="#9163b6"/>
 <path d="M222 407l-37 57 28-9 9 17 13-59m9-8l32 56-27-10-9 16-7-57" fill="#c39ae6" stroke="#9163b6"/>
 <ellipse cx="231" cy="403" rx="20" ry="15" fill="#e3c4fa" stroke="#9163b6"/>
 </g>
 <g fill="#edb9dd" stroke="#b78ac7" strokeWidth="2" className="bouquet-heart"><path d="M58 222c-25-16-14-36 0-23 14-13 25 7 0 23z"/><path d="M390 91c-21-14-12-30 0-19 12-11 21 6 0 19z"/></g>
 <g stroke="#ba96d4" strokeWidth="3" className="bouquet-sparkles"><path d="M62 90v20m-10-10h20M385 247v20m-10-10h20M314 34v13m-6-6h13"/></g>
 </svg>;
}
