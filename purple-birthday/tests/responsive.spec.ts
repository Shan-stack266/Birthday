import { test, expect } from '@playwright/test';
import { gift, personalize } from '../src/data/gift';

test('the story adapts to small phones, tablets, laptops, and landscape touch screens',async({browser},testInfo)=>{
 test.skip(testInfo.project.name!=='desktop','This check creates its own device sizes.');
 test.setTimeout(180000);
 const sizes=[{name:'small-phone',width:320,height:740},{name:'phone',width:390,height:844},{name:'tablet',width:768,height:1024},{name:'tablet-landscape',width:1024,height:768},{name:'phone-landscape',width:844,height:390},{name:'desktop',width:1440,height:1000}];
 for(const size of sizes){await test.step(size.name,async()=>{
  const context=await browser.newContext({baseURL:'http://127.0.0.1:5174',viewport:{width:size.width,height:size.height},hasTouch:size.name!=='desktop',reducedMotion:'reduce'});
  try{
   const page=await context.newPage();
   await page.goto('/');
   const noOverflow=async()=>expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
   const reachable=async(selector:string)=>{
    const button=page.locator(selector).first();await expect(button).toBeVisible();
    expect(await button.evaluate(el=>{const r=el.getBoundingClientRect();const hit=document.elementFromPoint(r.x+r.width/2,r.y+r.height/2);const dock=document.querySelector('.chapter-footer')?.getBoundingClientRect();const clearOfDock=!dock||el.closest('.chapter-footer')||r.bottom<=dock.top-3;return r.top>=0&&r.bottom<=innerHeight&&r.left>=0&&r.right<=innerWidth&&clearOfDock&&(hit===el||el.contains(hit))})).toBe(true);
   };
   const compactChapter=async()=>{
    await expect.poll(()=>page.evaluate(()=>document.documentElement.scrollHeight)).toBeLessThanOrEqual(Math.ceil(size.height*(size.height<500?1.65:1.2)));
    await reachable('.chapter-footer>button:last-child');await reachable('.header-controls>.icon-button');
   };
   await noOverflow();if(size.height>500)await reachable('.pin-panel>.bubble-button');await page.keyboard.type('110907');
   await expect(page.getByRole('heading',{name:'HAPPY BIRTHDAY, MARLISANG!'})).toBeVisible();await noOverflow();
   await compactChapter();
   await page.getByRole('button',{name:'I wrote you something',exact:true}).click();
   await expect(page.locator('.bouquet-art')).toBeVisible();await noOverflow();
   await compactChapter();
   await page.getByRole('button',{name:'Open birthday letter',exact:true}).click();
   await expect(page.getByText(gift.letter[0],{exact:true})).toBeVisible();
   await expect(page.locator('.floating-letter-photo')).toHaveCount(4);await noOverflow();
   await expect(page.locator('.full-letter-actions')).toHaveCount(0);
   for(const caption of await page.locator('figcaption').all())expect(await caption.evaluate(el=>el.scrollHeight<=el.clientHeight+1&&getComputedStyle(el).webkitLineClamp==='none')).toBe(true);
   if(size.width<1050){const track=page.getByRole('region',{name:'Photo memories'});const original=await track.evaluate(el=>el.scrollLeft);await page.getByRole('button',{name:'Next photo',exact:true}).click();await expect.poll(()=>track.evaluate(el=>el.scrollLeft)).toBeGreaterThan(original);await page.getByRole('button',{name:'Previous photo',exact:true}).click();}

   await reachable('.chapter-footer>button:last-child');await reachable('.dock-fold');
   await expect(page.getByRole('button',{name:'Next letter page',exact:true})).toHaveCount(0);
   await expect(page.getByRole('button',{name:'Previous letter page',exact:true})).toHaveCount(0);
   await expect(page.locator('.letter-full-copy>p')).toHaveText([gift.sharedMemory,...gift.letter.slice(1)].filter(Boolean).map(personalize));
   expect(await page.locator('.letter-full-copy').evaluate(el=>el.scrollHeight<=el.clientHeight+1&&getComputedStyle(el).overflowY==='visible')).toBe(true);
   const paper=await page.locator('.letter-sheet').boundingBox();expect(paper).not.toBeNull();
   for(const photo of await page.locator('.floating-photo-inner').all()){
    const box=await photo.boundingBox();expect(box).not.toBeNull();
    const overlapX=Math.min(paper!.x+paper!.width,box!.x+box!.width)-Math.max(paper!.x,box!.x);
    const overlapY=Math.min(paper!.y+paper!.height,box!.y+box!.height)-Math.max(paper!.y,box!.y);
    expect(overlapX>1&&overlapY>1).toBe(false);
   }
   await page.screenshot({path:testInfo.outputPath(`${size.name}-letter.png`),fullPage:true});
   await page.getByRole('button',{name:'Fold My Letter'}).click();
   await expect(page.getByRole('button',{name:'Open birthday letter',exact:true})).toBeEnabled();
   await page.getByRole('button',{name:'A few little reminders',exact:true}).click();
   await expect(page.getByRole('heading',{name:'A Jar Full of Little Reasons'})).toBeVisible();
   await compactChapter();
   await page.getByRole('button',{name:'One last wish',exact:true}).click();
   await expect(page.getByRole('textbox',{name:'What does your heart wish for?'})).toBeVisible();
   await compactChapter();await reachable('.wish-send');await reachable('.chapter-footer>button:last-child');
   await page.getByRole('textbox',{name:'What does your heart wish for?'}).fill('A happy year with the people I love.');
   await page.getByRole('button',{name:'Make a Wish',exact:true}).click();
   await expect(page.getByRole('heading',{name:'all your wish will come true'})).toBeVisible();
   const modal=await page.getByRole('dialog').boundingBox();
   expect(modal!.x).toBeGreaterThanOrEqual(0);expect(modal!.y).toBeGreaterThanOrEqual(0);expect(modal!.x+modal!.width).toBeLessThanOrEqual(size.width);expect(modal!.y+modal!.height).toBeLessThanOrEqual(size.height);
   await page.screenshot({path:testInfo.outputPath(`${size.name}-wish.png`),fullPage:true});
   await page.getByRole('button',{name:'Close wish message'}).click();await noOverflow();
  } finally{await context.close()}
 })}
});
