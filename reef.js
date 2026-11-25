'use strict';
(() => {
 const canvas=document.querySelector('#ocean'), ctx=canvas.getContext('2d');
 const W=480,H=184; canvas.width=W;canvas.height=H;
 const backdrop=document.createElement('canvas');backdrop.width=W;backdrop.height=H;
 let c=backdrop.getContext('2d'),seed=94762;
 const rand=()=>((seed=(Math.imul(seed,1664525)+1013904223)>>>0)/4294967296);
 const int=(a,b)=>Math.floor(a+rand()*(b-a+1));
 function box(x,y,w,h,color){c.fillStyle=color;c.fillRect(Math.round(x),Math.round(y),w,h)}
 function line(x,y,X,Y,col,width=1){const n=Math.max(Math.abs(X-x),Math.abs(Y-y),1);for(let i=0;i<=n;i++) box(x+(X-x)*i/n,y+(Y-y)*i/n,width,width,col)}
 function ridge(base,amp,col,scale){for(let x=0;x<W;x++){let y=base+amp*(Math.sin(x/scale)+.36*Math.sin(x/9)+.16*Math.cos(x/3.2));box(x,y,1,H,col)}}
 const water=c.createLinearGradient(0,0,0,H);water.addColorStop(0,'#2b97ab');water.addColorStop(.21,'#236f98');water.addColorStop(.64,'#164677');water.addColorStop(1,'#112951');box(0,0,W,H,water);
 for(let i=0;i<54;i++){let x=int(-40,540),w=int(2,15),end=int(70,173);for(let y=0;y<end;y++)box(x-y*.41,y,w+Math.floor(y/17),1,'rgba(137,245,231,'+(.055*(1-y/end))+')')}
 for(let i=0;i<1050;i++){let y=Math.pow(rand(),2)*18;box(int(0,W),y,int(1,17),1,'rgba(146,246,229,'+(.2*(1-y/19))+')')}
 ridge(122,16,'#20577b',39);ridge(137,14,'#20486c',27);
 function kelp(x,y,h,col,light){let prev=x;for(let j=1;j<h;j++){let xx=x+Math.sin(j*.108+x)*3+j*.05;line(prev,y-j+1,xx,y-j,col,2);if(j%5===0){let side=j%10===0?1:-1,len=(1-j/h)*6+2;line(xx,y-j,xx+side*len,y-j-5,light,2)}prev=xx}}
 for(let i=0;i<98;i++){let x=int(0,W);kelp(x,int(146,180),int(10,32),'#195576','#205e78')}
 ridge(165,7,'#1d3658',26);
 function rock(x,y,w,h,pal){const heights=[];for(let j=0;j<w;j++){let top=Math.floor((1-Math.pow(Math.abs((j-w*.49)/(w*.52)),2.1))*h*.94+Math.sin(j*.38)*1.3);heights.push(top);box(x+j,y-top,1,Math.max(0,top),pal[0]);if(top>2)box(x+j,y-top,1,Math.max(1,Math.floor(top*(.22+.13*Math.sin(j*.24)))),pal[1]);if(top>5&&j<w*.72)box(x+j,y-top,1,2,pal[2])}for(let k=0;k<w*h/17;k++){let j=int(1,w-2),v=int(0,Math.max(0,heights[j]-2));box(x+j,y-v,int(1,3),1,rand()<.4?pal[2]:pal[1])}}
 const slate=['#202e52','#354760','#536681'],purple=['#312e56','#484567','#676480'];
 for(let i=0;i<110;i++){let x=int(-10,W),y=int(163,187);rock(x,y,int(6,25),int(3,9),rand()<.5?slate:purple)}
 function branch(x,y,len,angle,depth,palette,thick){let X=x+Math.cos(angle)*len,Y=y+Math.sin(angle)*len;line(x,y,X,Y,palette[0],thick);line(x,y,X,Y,palette[1],Math.max(1,thick-1));if(depth===0){box(X,Y,2,2,palette[2]);return}branch(X,Y,len*(.59+rand()*.24),angle-.35-rand()*.38,depth-1,palette,Math.max(1,thick-1));branch(X,Y,len*(.58+rand()*.25),angle+.28+rand()*.45,depth-1,palette,Math.max(1,thick-1));if(depth>2)branch((X+x)/2,(Y+y)/2,len*.7,angle+(rand()<.5?-.88:.88),depth-2,palette,2)}
 const pink=['#9b406f','#e46891','#ffa8af'],lilac=['#69488d','#a674c8','#d9a6e4'],red=['#ae545e','#f48379','#ffc19b'];
 for(let i=0;i<34;i++){let x=int(-5,W),h=int(10,31);kelp(x,168,h,'#167a7b','#23928c')}
 function ribbon(x,y,h,phase){for(let j=0;j<h;j++){let a=j/h,w=(Math.sin(Math.PI*a)*3+1),xx=x+Math.sin(a*6+phase)*(2+a*5)+a*Math.sin(phase)*7;box(xx,y-j,Math.ceil(w),1,'#167c77');box(xx+1,y-j,Math.max(1,Math.floor(w/2)),1,'#49b79b')}}
 for(let x of [8,35,73,124,328,394,445,468])for(let i=0;i<8;i++)ribbon(x+int(-8,8),173,int(23,69),rand()*6);
 for(let [x,y,w,h] of [[-12,174,63,40],[18,180,67,24],[61,171,39,25],[96,179,38,12],[339,180,53,20],[382,174,54,26],[420,175,60,42],[461,170,42,49]])rock(x,y,w,h,slate);
 for(let [x,y,len,p] of [[13,148,13,lilac],[58,165,17,pink],[89,166,9,red],[117,177,9,lilac],[347,170,10,pink],[372,167,13,lilac],[413,161,18,red],[456,146,12,pink],[477,153,18,lilac]])for(let k=-1;k<=1;k++)branch(x+k*2,y,len*(.9+rand()*.2),-1.57+k*.53,3,p,3);
 for(let i=0;i<500;i++){let x=int(0,W),y=int(167,184);box(x,y,int(1,4),1,['#445571','#58657c','#46516e','#746780'][int(0,3)])}
 for(let x of [0,20,77,133,159,310,353,429,474]){for(let i=0;i<5;i++)kelp(x+int(-5,6),int(178,185),int(6,18),'#196e70','#389989')}
 const fishes=[
 ['    aa       ','   aaaa      ','  abbbbba   a',' abwbbwbba aa','abwewbwbbbaaa',' abwbbwbba aa','  abbbbba   a','    aa       '],
 ['    aa       ','   abbaa     ','  abbbbbba  a',' abwbbbbwbaaa','abebwwbwbbbaa',' abbbbwbba aa','  abbbbba   a','    aa       '],
 ['   aa      ','  abba     ',' abbbbbba a','abebwwbbbaa',' abbbbbaa a','   aaa     ']
 ];
 const colors=[{a:'#d96547',b:'#ffa445',w:'#fff0c0',e:'#172b46'},{a:'#5357ac',b:'#8badff',w:'#5ee3df',e:'#1b2953'},{a:'#c59c41',b:'#ffe279',w:'#fff0ae',e:'#26395a'},{a:'#b8527d',b:'#fc99ac',w:'#ffcbb0',e:'#26395a'}];
 const swimmers=[[64,47,0,0,1.65],[154,82,1,1,1.35],[313,53,0,0,1.6],[392,96,1,3,1.45],[228,112,2,2,1.25],[277,78,1,1,1.05],[110,118,2,2,1],[174,45,2,2,.85],[188,50,2,2,.8],[199,42,2,2,.8],[365,34,2,1,.77],[378,40,2,1,.8],[353,42,2,1,.7]];
 const bubbles=Array.from({length:64},()=>[rand()*W,rand()*H,.45+rand(),rand()*6]);
 const scenes = {
  reef:['Coral Reef','熱帯魚の泳ぐ珊瑚礁'],
  forest:['Planted Forest','淡水の水草林を泳ぐネオンテトラの群れ'],
  deep:['Deep Sea','濃紺の海で触手を揺らすクラゲ'],
  river:['Mountain Stream','山と針葉樹を背にした岩場の早瀬。その下を泳ぐ川魚'],
  marsh:['Marsh','夕暮れのガマの穂とトンボ。沈んだ枝の間を泳ぐオタマジャクシ'],
  pond:['Lily Pond','岸辺の柳と水面のスイレン。葉の下を泳ぐ錦鯉']
 };
 let habitat='reef';
 function buildScenery(id){
  const surface=document.createElement('canvas');surface.width=W;surface.height=H;c=surface.getContext('2d');
  const forest=id==='forest', water=c.createLinearGradient(0,0,0,H);
  water.addColorStop(0,forest?'#699e79':'#222349');water.addColorStop(.35,forest?'#2d7163':'#131e42');water.addColorStop(1,forest?'#153d43':'#07152b');box(0,0,W,H,water);
  if(forest){
   for(let i=0;i<48;i++){
    const x=int(-40,W+100),end=int(65,170),width=int(2,13);
    for(let y=0;y<end;y++)box(x-y*.65,y,width,1,'rgba(223,244,169,'+(.092*(1-y/end))+')')
   }
   ridge(145,8,'#2b6255',34);
   for(let i=0;i<160;i++)kelp(int(0,W),int(151,184),int(14,66),'#306e5b','#39785c');
   ridge(167,7,'#504c43',48);
   const wood=['#413e38','#706047','#917b50'];
   for(const [x,y,len,angle] of [[18,181,81,-.67],[77,148,31,-1.1],[118,133,29,-.27],[455,182,87,-2.7],[385,153,28,-2.0]]){
    const X=x+Math.cos(angle)*len,Y=y+Math.sin(angle)*len;
    line(x,y,X,Y,wood[0],6);line(x,y,X,Y,wood[1],3);line(x,y,X,Y,wood[2])
   }
   for(let i=0;i<950;i++)box(int(0,W),int(166,184),int(1,3),1,['#6e6654','#839075','#514f43'][int(0,2)]);
   for(const x of [8,49,124,181,331,388,453,475])for(let i=0;i<10;i++){
    const base=x+int(-9,9),y=int(170,183),h=int(19,73),lean=int(-14,14);
    for(let j=0;j<h;j++){const q=j/h,l=base+q*lean+4*Math.sin(q*5+x),w=1+Math.round(Math.sin(Math.PI*q)*3);
     box(l,y-j,w,1,'#38794d');box(l,y-j,1,1,'#8eb66b')}
   }
   for(let i=0;i<54;i++){const x=int(0,W),y=int(0,6);box(x,y,int(3,10),2,'#669861');box(x+1,y,int(1,5),1,'#a2b87a')}
  } else {
   for(let i=0;i<440;i++)box(int(0,W),int(0,H),1,1,['#293851','#253954','#334961'][int(0,2)]);
   ridge(155,12,'#1c2946',40);ridge(174,10,'#111d33',29);
   for(let i=0;i<38;i++){let x=int(0,W);rock(x,int(180,194),int(9,42),int(4,22),['#111a32','#222940','#34344f'])}
   for(let i=0;i<52;i++){
    const x=int(0,W),y=int(170,183),h=int(2,11);
    line(x,y,x+2,y-h,'#45506a');box(x+1,y-h-1,2,2,'#69a7ae')
   }
  }
  return surface
 }
 const scenery={reef:backdrop,forest:buildScenery('forest'),deep:buildScenery('deep')};
 // Distances are canvas pixels; velocities and steering rates use seconds.
 const clamp=(value,low,high)=>Math.max(low,Math.min(high,value));
 const range=(low,high)=>low+rand()*(high-low);
 function makeFish(x,y,pace,school=-1){
  const direction=rand()<.5?-1:1;
  return {x,y,homeX:x,homeY:y,pace,school,vx:direction*pace*.5,vy:0,
   targetX:x,targetY:y,goalTime:0,strokeTime:0,power:.5,tail:range(0,6.28),
   facing:direction,pitch:0,rest:0,food:null,reaction:range(.22,1.1)};
 }
 const stocks={
  reef:swimmers.map(([x,y],i)=>makeFish(x,y,range(5,10),i<7?-1:i<10?0:1)),
  forest:Array.from({length:27},(_,i)=>{
   const school=Math.floor(i/9);
   return makeFish(61+school*146+(i%5)*8,53+(school%2)*34+Math.sin(i*4)*12,range(12,17),school)
  }),
  pond:[],river:[]
 };
 for(let i=0;i<8;i++){
  const x=28+(i*59)%413,y=105+(i*19)%44;
  stocks.pond.push(makeFish(x,y,range(5,9)));
  const trout=makeFish(x,y,range(10,15));trout.vx=-1;trout.facing=-1;
  stocks.river.push(trout)
 }
 stocks.reef.forEach((fish,i)=>fish.nose=5*swimmers[i][4]);
 const pellets=[];
 const jellies=[[64,71,1.1],[138,108,.75],[217,63,1.4],[294,105,.75],[370,62,1.08],[432,105,.62]];
 stocks.deep=jellies.map(([x,y])=>makeFish(x,y,range(2,4)));
 stocks.marsh=Array.from({length:17},(_,i)=>makeFish(28+(i*59)%413,105+(i*19)%44,range(4,7)));
 function waterline(){return ['marsh','river','pond'].includes(habitat)?82:1}
 function dropFood(x,y){
  const surface=waterline();
  for(let i=0;i<4;i++){
   // Each flake enters the water separately and loses its falling speed.
   pellets.push({x:clamp(x+range(-4,4),4,W-4),y:Math.min(y-8,surface-2)-i*2,
    vy:range(10,22),sink:range(3.7,6.7),phase:range(0,6.28),age:0,owner:null})
  }
  while(pellets.length>48)pellets.shift();
  if(!request&&!document.hidden){last=0;request=requestAnimationFrame(frame)}
 }
 function fall(dt){
  const surface=waterline();
  for(let i=pellets.length-1;i>=0;i--){
   const p=pellets[i];p.age+=dt;
   if(p.y<surface)p.vy+=dt*125;
   else{
    p.vy+=(p.sink-p.vy)*(1-Math.exp(-dt*6));
    p.x=clamp(p.x+dt*(Math.sin(p.age*1.5+p.phase)*1.8+(habitat==='river'?2.2:0)),4,W-4)
   }
   p.y=Math.min(166,p.y+p.vy*dt);
   if(p.age>55)pellets.splice(i,1)
  }
 }
 function drawFood(){
  for(const p of pellets){
   box(p.x,p.y,1,1,'#998369')
  }
 }
 function findFood(fish){
  if(fish.food&&!pellets.includes(fish.food))fish.food=null;
  if(fish.food||fish.rest>0)return fish.food;
  let nearest=null,distance=Infinity;
  for(const p of pellets){
   if(p.owner||p.y<waterline()||p.age<fish.reaction)continue;
   const d=Math.hypot(p.x-fish.x,p.y-fish.y);
   if(d<distance&&d<42+p.age*9){nearest=p;distance=d}
  }
  if(nearest){
   nearest.owner=fish;fish.food=nearest;
   fish.approach=nearest.x>=fish.x?1:-1;
   if(nearest.x<18)fish.approach=-1;
   if(nearest.x>W-18)fish.approach=1
  }
  return nearest
 }
 function swim(dt){
  const stock=stocks[habitat];if(!stock||dt<=0)return;
  const river=habitat==='river',shore=waterline()>1;
  const low=shore?99:24,high=shore?151:130;
  for(const fish of stock){
   fish.goalTime-=dt;fish.strokeTime-=dt;
   if(fish.goalTime<=0){
    const reach=river?16:habitat==='pond'?112:78;
    fish.targetX=clamp(fish.homeX+range(-reach,reach),20,W-20);
    fish.targetY=clamp(fish.homeY+range(-18,18),low,high);
    fish.goalTime=range(4,12)
   }
   if(fish.strokeTime<=0){
    fish.power=range(.65,1);fish.strokeTime=range(.65,2.8)
   }
   fish.power*=Math.exp(-dt*(river?1.5:2.2));
   let tx=fish.targetX,ty=fish.targetY,avoidX=0,avoidY=0;
   const leader=fish.school<0?null:stock.find(peer=>peer.school===fish.school);
   if(leader&&leader!==fish){
    // Follow a moving shoalmate while keeping room to turn independently.
    tx=leader.x+(fish.homeX-leader.homeX)*.75+leader.vx*.85;
    ty=leader.y+(fish.homeY-leader.homeY)*.85+leader.vy*.8
   }
   for(const other of stock){
    if(other===fish)continue;
    const dx=fish.x-other.x,dy=fish.y-other.y,d=Math.hypot(dx,dy);
    const spacing=habitat==='forest'?9:16;
    if(d>0&&d<spacing){
     avoidX+=dx/d*(spacing-d);avoidY+=dy/d*(spacing-d)
    }
   }
   fish.rest=Math.max(0,fish.rest-dt);
   const food=findFood(fish),jelly=habitat==='deep';
   const nose=habitat==='pond'?10:river?8:habitat==='marsh'?2:habitat==='reef'?fish.nose||5:5;
   const reachY=jelly?10:0;
   if(food){
    tx=food.x-(jelly?0:fish.approach*nose);
    ty=food.y-reachY+food.sink*.22;
   }
   const dx=tx-fish.x,dy=ty-fish.y,d=Math.max(12,Math.hypot(dx,dy));
   const speed=fish.pace*(.48+fish.power*1.25);
   let desiredX=dx/d*speed+avoidX,desiredY=dy/d*speed*.65+avoidY;
   if(food){
    const pace=jelly?10+fish.power*7:fish.pace+16+fish.power*12;
    const distance=Math.max(6,Math.hypot(dx,dy));
    desiredX=dx/distance*pace+avoidX*.22;
    desiredY=dy/distance*pace+avoidY*.22
   }else if(river){
    // The current carries resting trout downstream until a stroke corrects them.
    desiredX=clamp(dx*.28,-7,7)+2.5-fish.power*7+avoidX;
    desiredY=dy*.23+avoidY
   }
   const easing=1-Math.exp(-dt*(habitat==='pond'?.8:1.7));
   fish.vx+=(desiredX-fish.vx)*easing;fish.vy+=(desiredY-fish.vy)*easing;
   fish.x=clamp(fish.x+fish.vx*dt,4,W-4);fish.y=clamp(fish.y+fish.vy*dt,waterline()+4,169);
   const facing=food&&Math.abs(dx)<14?fish.approach:river&&!food?-1:Math.abs(fish.vx)>.45?Math.sign(fish.vx):Math.sign(fish.facing);
   fish.facing+=(facing-fish.facing)*(1-Math.exp(-dt*3.7));
   const slope=clamp(fish.vy/(4+Math.abs(fish.vx)),-.38,.38);
   fish.pitch+=(slope-fish.pitch)*(1-Math.exp(-dt*3));
   if(food){
    const mouthX=fish.x+(jelly?0:fish.facing*nose*Math.cos(fish.pitch));
    const mouthY=fish.y+reachY+(jelly?0:nose*Math.abs(fish.facing)*Math.sin(fish.pitch));
    if(Math.hypot(food.x-mouthX,food.y-mouthY)<(jelly?4.5:3.7)){
     pellets.splice(pellets.indexOf(food),1);fish.food=null;fish.rest=range(.8,2.2);fish.power*=.4
    }
   }
   fish.tail+=dt*(3+fish.power*17+(river?3:0))
  }
 }
 function fishTransform(fish,size,artDirection=1){
  c.save();c.translate(Math.round(fish.x),Math.round(fish.y));
  c.rotate(fish.pitch*(fish.facing>=0?1:-1));
  const width=.19+.81*Math.abs(fish.facing);
  c.scale(size*artDirection*(fish.facing>=0?width:-width),size)
 }
 function tailBend(fish){
  return Math.sin(fish.tail)*(.38+1.9*fish.power)
 }
 function renderTetras(){
  for(const fish of stocks.forest){
   fishTransform(fish,1);
   box(-7,-2+tailBend(fish),2,4,'#bd806e');box(-5,-1,10,3,'#365bc7');
   box(-4,0,6,2,'#e6685e');box(-5,-1,10,1,'#1685ff');box(-2,-1,3,1,'#59b7ff');box(3,-1,1,1,'#123c44');
   box(-1,-3,3,2,'#496bb1');c.restore()
  }
 }
 function renderJellies(){
  stocks.deep.forEach(({x,y},i)=>{
   const size=jellies[i][2];
   const beat=time*.65+i*2.3, fill=i%2?'#a78cc2':'#87b7d7',rim=i%2?'#edbbdd':'#beeced';
   c.save();c.translate(Math.round(x),Math.round(y));c.scale(size,size);
   for(let strand=0;strand<6;strand++){
    const h=13+Math.floor(7*(1+Math.sin(strand*3+i)));
    for(let k=0;k<h;k++)box(-9+strand*3.5+Math.sin(k*.25-beat+strand)*k/9,k+1,1,1,strand%2?'#787eae':'#6898b8')
   }
   const width=11+Math.round(Math.sin(beat)*1.4);
   for(let k=-10;k<=0;k++){
    const w=Math.max(2,Math.round(width*Math.sqrt(1-(k/10.2)**2)));
    box(-w,k,w*2,1,k< -6?rim:fill);box(-w,k,1,1,rim)
   }
   for(let k=-width;k<width;k+=4)box(k,0,3,2,rim);
   box(-5,-6,3,1,'#e4e0ee');box(0,-4,2,2,rim);c.restore()
  })
 }
 const shoreArt = {};
 for(const id of ['river','marsh','pond']){
  const art=new Image();
  shoreArt[id]=art;
  art.onload=()=>{if(habitat===id)draw()};
  art.src='scenery/'+id+'.png';
 }
 function shoreFish(fish,kind){
  fishTransform(fish,kind==='river'?1:1.3);
  const trout=kind==='river',base=trout?'#697f75':'#efebcc';
  const accent=trout?'#b79978':'#dd7646';
  box(-8,-2,14,4,base);box(-5,-3,8,1,base);box(-6,2,10,1,trout?'#c6c7a4':'#c5c4a5');
  box(4,-1,5,3,base);box(6,-1,1,1,'#304549');
  const bend=tailBend(fish);
  box(-11,-2+bend,3,4,accent);box(-9,-1+bend*.45,3,2,base);
  box(-2,-4,3,2,trout?'#526863':accent);box(1,2,3,2,accent);
  if(trout){box(-6,0,9,1,accent);for(let j=0;j<4;j++)box(-5+j*3,-2+j%2,1,1,'#405655')}
  else{box(-5,-2,3,3,accent);box(1,-2,2,4,accent);box(4,0,2,1,'#675c53')}
  c.restore()
 }
 function drawShore(id){
  const art=shoreArt[id];
  if(!art.complete||!art.naturalWidth){box(0,0,W,H,'#436771');return}
  c.drawImage(art,0,0);
  const river=id==='river',marsh=id==='marsh';
  for(let i=0;i<(river?75:27);i++){
   const x=(i*67+time*(river?11+i%8:1.7))%W,y=82+i%6;
   if(Math.sin(time*1.2+i)>.05)box(x,y,2+i%6,1,river?'#c6e6da':marsh?'#b3af8b':'#c3d2af')
  }
  if(river){
   for(const anchor of [61,376]){
    for(let j=0;j<15;j++){
     const q=(time*.75+j/15)%1;
     box(anchor+q*24,82+q*6-Math.sin(q*Math.PI)*4+(j%3),2,1,'#e0ede0')
    }
   }
  }
  if(!marsh){
   for(const fish of stocks[id])shoreFish(fish,id);
   return
  }
  for(const tadpole of stocks.marsh){
   const {x,y,facing:sign,tail}=tadpole;
    box(x,y,4,3,'#303e32');box(x+1,y-1,2,1,'#475440');
    for(let k=1;k<=5;k++)box(x+2-k*sign,y+1+Math.sin(k*.6+tail),1,1,'#43543e')
  }
  if(marsh){
   const x=236+Math.sin(time*.21)*27,y=65+Math.sin(time*.9)*2;
   box(x-3,y,8,1,'#4e615d');box(x+4,y-1,2,2,'#596b61');
   for(const sign of [-1,1])line(x,y,x+sign*4,y-2-Math.abs(Math.sin(time*6))*2,'#d2cbbb')
  }
 }
 let time=0,last=0,request=0;
 const reducedMotion=matchMedia('(prefers-reduced-motion: reduce)');
 function draw(){drawAnimals();drawFood()}
 function drawAnimals(){c=ctx;if(shoreArt[habitat])return drawShore(habitat);c.drawImage(scenery[habitat],0,0);for(let [x,y,s,p] of bubbles){let yy=(y+H-(time*s*3)%H)%H,xx=x+Math.sin(time*.5+p+yy*.07)*2;box(xx,yy,1,1,'#8dd7df');if(s>1.23){box(xx+1,yy-1,2,1,'#68b6cd');box(xx+3,yy,1,2,'#59a8c2');box(xx+1,yy+2,2,1,'#5297b7')}}
 if(habitat==="forest")return renderTetras();
 if(habitat==="deep")return renderJellies();
 stocks.reef.forEach((fish,i)=>{
  const [, ,id,palette,size]=swimmers[i],rows=fishes[id],map=colors[palette];
  fishTransform(fish,size,-1);
  const bend=tailBend(fish);
  for(let j=0;j<rows.length;j++)for(let k=0;k<rows[j].length;k++){
   const color=map[rows[j][k]];
   if(color)box(k-6,j-4+bend*Math.max(0,(k-7)/5),1,1,color)
  }
  c.restore()
 })}
 function frame(now){
  request=0;
  if(now-last>=32){
   const dt=last?Math.min(.1,(now-last)/1000):0;
   time+=dt;fall(dt);swim(dt);last=now;draw()
  }
  if((!reducedMotion.matches||pellets.length)&&!document.hidden)request=requestAnimationFrame(frame)
 }
 function sync(){
  cancelAnimationFrame(request);request=0;last=0;draw();
  if((!reducedMotion.matches||pellets.length)&&!document.hidden)request=requestAnimationFrame(frame)
 }
 canvas.addEventListener('click',event=>{
  const rect=canvas.getBoundingClientRect();
  const scale=Math.max(rect.width/W,rect.height/H);
  const x=W/2+(event.clientX-rect.left-rect.width/2)/scale;
  const y=H/2+(event.clientY-rect.top-rect.height/2)/scale;
  dropFood(x,y)
 });
 canvas.addEventListener('keydown',event=>{
  if(event.key==='Enter'||event.key===' '){event.preventDefault();if(!event.repeat)dropFood(W/2,waterline()+12)}
 });
 reducedMotion.addEventListener('change',sync);
 function chooseHabitat(id){
  if(habitat!==id)pellets.length=0;
  habitat=id;
  const [name,description]=scenes[id];
  document.title='Lo-fi Fish — '+name;
  canvas.setAttribute('aria-label',description+'。タップして餌をあげる');
  document.getElementById('habitat-name').textContent=name;
  draw()
 }
 const habitatOrder=Object.keys(scenes);
 document.getElementById('next-habitat').onclick=()=>{
  const nextIndex=(habitatOrder.indexOf(habitat)+1)%habitatOrder.length;
  chooseHabitat(habitatOrder[nextIndex]);
  try{localStorage.setItem('aqua-habitat',habitat)}catch{}
 };
 try{const stored=localStorage.getItem('aqua-habitat');if(Object.hasOwn(scenes,stored))chooseHabitat(stored)}catch{}
 document.addEventListener('visibilitychange',sync);sync();
})();
