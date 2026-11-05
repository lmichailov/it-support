
'use strict';
(()=>{
const tabs=[...document.querySelectorAll('.product-switcher [role="tab"]')];
const keys=tabs.map(tab=>tab.id.replace(/^tab-/,''));
function select(key,focus=false){
 if(!keys.includes(key))return;
 document.body.dataset.product=key;
 for(const item of keys){const active=item===key;const tab=document.getElementById('tab-'+item);tab.setAttribute('aria-selected',String(active));tab.tabIndex=active?0:-1;document.getElementById('product-'+item).hidden=!active;}
 if(key!=='outlook')document.querySelectorAll('#product-outlook video').forEach(video=>video.pause());
 const faq=document.getElementById('outlook-fragen');if(faq)faq.hidden=key!=='outlook';
 if(focus)document.getElementById('tab-'+key).focus({preventScroll:true});
}
for(const key of keys){const tab=document.getElementById('tab-'+key);tab.onclick=()=>{select(key);history.replaceState(null,'','#'+key);};tab.onkeydown=event=>{if(['ArrowRight','ArrowLeft','Home','End'].includes(event.key)){event.preventDefault();const next=event.key==='Home'?keys[0]:event.key==='End'?keys[keys.length-1]:keys[(keys.indexOf(key)+(event.key==='ArrowRight'?1:-1)+keys.length)%keys.length];select(next,true);history.replaceState(null,'','#'+next);}};}
function fromHash(){const key=location.hash.slice(1);if(keys.includes(key))select(key);else {const target=document.getElementById(key);const panel=target?.closest('[role="tabpanel"]');if(panel){select(panel.id.replace(/^product-/,''));requestAnimationFrame(()=>target.scrollIntoView({block:'start'}));}}}
select('outlook');
window.addEventListener('hashchange',fromHash);fromHash();
})();
