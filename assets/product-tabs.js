
'use strict';
(()=>{
const keys=['outlook','bewerbungscoach'];
function select(key,focus=false){
 if(!keys.includes(key))return;
 document.body.dataset.product=key;
 for(const item of keys){const active=item===key;const tab=document.getElementById('tab-'+item);tab.setAttribute('aria-selected',String(active));tab.tabIndex=active?0:-1;document.getElementById('product-'+item).hidden=!active;}
 if(key==='bewerbungscoach')document.querySelectorAll('#product-outlook video').forEach(video=>video.pause());
 if(focus)document.getElementById('tab-'+key).focus();
}
for(const key of keys){const tab=document.getElementById('tab-'+key);tab.onclick=()=>{select(key);history.replaceState(null,'','#'+key);};tab.onkeydown=event=>{if(['ArrowRight','ArrowLeft','Home','End'].includes(event.key)){event.preventDefault();const next=event.key==='Home'?'outlook':event.key==='End'?'bewerbungscoach':keys[1-keys.indexOf(key)];select(next,true);history.replaceState(null,'','#'+next);}};}
function fromHash(){const key=location.hash.slice(1);if(keys.includes(key))select(key);else if(document.getElementById(key)?.closest('#product-outlook'))select('outlook');}
window.addEventListener('hashchange',fromHash);fromHash();
})();
