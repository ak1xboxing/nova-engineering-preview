'use strict';
const regionRoot=document.getElementById('partners');
if(regionRoot){
 const marketBlock=document.createElement('div');marketBlock.className='home-markets';marketBlock.innerHTML='<div class="region-tabs" aria-label="Partner market"><button type="button" data-home-region="eg" aria-pressed="true">Egypt</button><button type="button" data-home-region="gcc" aria-pressed="false">GCC</button><button type="button" data-home-region="amu" aria-pressed="false">Arab Maghreb</button></div><div class="home-region-grid" aria-live="polite"></div>';
 const anchor=regionRoot.querySelector('.partners-heading,.partners-compact-head');(anchor||regionRoot.firstElementChild).after(marketBlock);
 const original=[...regionRoot.querySelectorAll('.logo-rows,.partner-strips,.logo-marquee,.partners-marquees,.partners-compact-bottom')];
 const grid=marketBlock.querySelector('.home-region-grid'),buttons=[...marketBlock.querySelectorAll('button')];
 Promise.resolve(window.NOVA_PARTNERS).then(partners=>{
  // Keep the original animated compact strips for Egypt, filtering their logo list to the published market roster.
  const allowed=new Set(partners.filter(p=>p.regions.includes('eg')).map(p=>p.logo));
  regionRoot.querySelectorAll('li').forEach(li=>{const image=li.querySelector('img');if(image&&!allowed.has(image.getAttribute('src')))li.hidden=true});
  const strips=[...regionRoot.querySelectorAll('.partners-logo-rows,.logo-rows,.partner-strips,.logo-marquee,.partners-marquees,.logo-strip,.partner-row,.marquee,.partners-rows')];
  const regionContainers=[...regionRoot.children].filter(el=>el!==marketBlock&&!el.contains(marketBlock)&&el.querySelector('ul'));
  function show(region){buttons.forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.homeRegion===region)));regionContainers.forEach(e=>e.hidden=region!=='eg');original.forEach(e=>e.hidden=region!=='eg');grid.replaceChildren();grid.hidden=region==='eg';if(region==='amu'){const p=document.createElement('p');p.textContent='De Lama · Sterilization and decontamination technologies for Morocco, Tunisia and Libya.';grid.append(p)}else if(region==='gcc'){partners.filter(p=>p.regions.includes('gcc')).forEach(p=>{const a=document.createElement('a');a.href='partners.html?region=gcc';a.setAttribute('aria-label',p.name);const img=document.createElement('img');img.src=p.logo;img.alt=p.name;img.loading='lazy';a.append(img);grid.append(a)})}const link=regionRoot.querySelector('a[href^="partners.html"]');if(link)link.href='partners.html?region='+region;const count=regionRoot.querySelector('.partners-compact-bottom span');if(count)count.textContent=partners.filter(p=>p.regions.includes('eg')).length+' partners listed for Egypt · 7 solution areas';}
  buttons.forEach(b=>b.addEventListener('click',()=>show(b.dataset.homeRegion)));show('eg');
 }).catch(()=>{marketBlock.remove()});
}
