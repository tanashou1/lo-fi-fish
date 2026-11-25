'use strict';
const el=id=>document.getElementById(id);
const tracks=[['Lagoon Drift','Lo-fi · Electric Piano'],['Moonlit Tides','Ambient · Soft Keys'],['Coral Breeze','Lo-fi · Mellow Beats']];
const audio=new Audio();audio.loop=true;audio.preload='metadata';
let index=0,savedVolume=45;
try{const pref=JSON.parse(localStorage.getItem('aqua-drift')||'{}');if(Number.isInteger(pref.index)&&tracks[pref.index])index=pref.index;if(Number.isFinite(pref.volume))savedVolume=Math.min(100,Math.max(0,pref.volume))}catch{}
function save(){try{localStorage.setItem('aqua-drift',JSON.stringify({index,volume:audio.volume*100}))}catch{}}
const icon=path=>'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="'+path+'"/></svg>';
el('prev').innerHTML=icon('M6 5h2v14H6zm12 0L9 12l9 7z');el('next').innerHTML=icon('M16 5h2v14h-2zM6 5l9 7-9 7z');
function playUI(){el('tank-bgm').textContent=audio.paused?'♫ OFF':'♫ ON';el('tank-bgm').setAttribute('aria-pressed',String(!audio.paused));el('play').innerHTML=icon(audio.paused?'M8 4l13 8-13 8z':'M6 5h4v14H6zm8 0h4v14h-4z');el('play').title=audio.paused?'BGMを再生':'BGMを一時停止';el('play').setAttribute('aria-label',el('play').title)}
function volumeUI(){let v=audio.muted?0:Math.round(audio.volume*100);el('volume').value=v;el('level').textContent=v+'%';el('mute').title=v?'消音':'消音を解除';el('mute').setAttribute('aria-label',el('mute').title);el('mute').style.opacity=v?1:.55}
audio.volume=savedVolume/100;let audible=savedVolume||45;
el('volume').oninput=e=>{audio.muted=false;audio.volume=Number(e.target.value)/100;if(audio.volume)audible=Number(e.target.value);volumeUI();save()};
el('mute').onclick=()=>{if(!audio.volume){audio.volume=audible/100;audio.muted=false}else audio.muted=!audio.muted;volumeUI();save()};
function cover(){const c=el('cover').getContext('2d');const palettes=[['#233058','#a297bf','#f5c9bd','#39527d','#48779a'],['#171e44','#586299','#e6e4c9','#2d4269','#526c99'],['#624668','#e9a08a','#ffe7af','#4c5a80','#6d899b']];const p=palettes[index],g=c.createLinearGradient(0,0,0,31);g.addColorStop(0,p[0]);g.addColorStop(1,p[1]);c.fillStyle=g;c.fillRect(0,0,48,48);c.fillStyle=p[2];for(let y=-5;y<=5;y++){let w=Math.floor(Math.sqrt(26-y*y));c.fillRect(32-w,15+y,w*2,1)}for(let x=0;x<48;x++){const y=24+Math.round(3*Math.sin(x/7)+2*Math.cos(x/4));c.fillStyle=p[3];c.fillRect(x,y,1,48-y)}for(let i=0;i<50;i++){c.fillStyle=i%5?p[4]:p[1];c.fillRect((i*31)%48,30+(i*13)%18,1+i%6,1)}c.fillStyle=p[0];for(let x=0;x<48;x++){let h=Math.max(0,9-x*.4+2*Math.sin(x));c.fillRect(x,48-h,1,h)}}
async function start(){el('error').hidden=true;try{await audio.play()}catch(e){if(e.name!=='AbortError'){el('error').textContent='音源を再生できませんでした。もう一度再生してください。';el('error').hidden=false}}playUI()}
function select(n,resume){index=(n+tracks.length)%tracks.length;audio.src='audio/'+index+'.mp3';el('track').textContent=tracks[index][0];el('genre').textContent=tracks[index][1];cover();el('error').hidden=true;playUI();save();if(resume)start()}
el('prev').onclick=()=>select(index-1,!audio.paused);el('next').onclick=()=>select(index+1,!audio.paused);el('tank-bgm').onclick=el('play').onclick=()=>audio.paused?start():audio.pause();audio.onplay=audio.onpause=playUI;select(index,false);volumeUI();
function clock(){el('clock').textContent=new Date().toLocaleTimeString('ja-JP',{hour:'2-digit',minute:'2-digit',hour12:false})}clock();setInterval(clock,10000);
const tank=el('tank'),expand=el('expand');
const habitats=document.querySelector('.habitats');
const hideTools=el('hide-tools'),ocean=el('ocean');
function expandUI(){
 const full=document.fullscreenElement===tank||tank.classList.contains('expanded');
 if(full&&habitats.parentNode!==tank)tank.append(habitats);
 if(!full){
  ocean.title='タップして餌をあげる';
  if(habitats.parentNode===tank)tank.before(habitats);
  tank.classList.remove('controls-hidden');
 }
 hideTools.hidden=!full;
 expand.title=full?'全画面表示を終了':'水槽を全画面表示';
 expand.setAttribute('aria-label',expand.title)
}
hideTools.onclick=()=>{
 tank.classList.add('controls-hidden');
 ocean.focus({preventScroll:true});
 ocean.title='タップして操作を表示';
};
function restoreTools(event){
 if(!tank.classList.contains('controls-hidden'))return;
 if(event.type==='keydown'&&![' ','Enter'].includes(event.key))return;
 event.preventDefault();event.stopImmediatePropagation();
 tank.classList.remove('controls-hidden');
 ocean.title='タップして餌をあげる';
 if(event.type==='keydown')hideTools.focus();
}
ocean.addEventListener('click',restoreTools,true);
ocean.addEventListener('keydown',restoreTools,true);
expand.onclick=async()=>{if(document.fullscreenElement)await document.exitFullscreen();else if(tank.classList.contains('expanded'))tank.classList.remove('expanded');else try{await tank.requestFullscreen()}catch{tank.classList.add('expanded')}expandUI()};
document.onfullscreenchange=expandUI;document.addEventListener('keydown',e=>{if(e.key==='Escape'){tank.classList.remove('expanded');expandUI()}});
