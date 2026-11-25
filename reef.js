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
 let time=0,last=0,request=0,running=!matchMedia('(prefers-reduced-motion: reduce)').matches;
 function draw(){c=ctx;c.drawImage(backdrop,0,0);for(let [x,y,s,p] of bubbles){let yy=(y+H-(time*s*3)%H)%H,xx=x+Math.sin(time*.5+p+yy*.07)*2;box(xx,yy,1,1,'#8dd7df');if(s>1.23){box(xx+1,yy-1,2,1,'#68b6cd');box(xx+3,yy,1,2,'#59a8c2');box(xx+1,yy+2,2,1,'#5297b7')}}
 swimmers.forEach(([x,y,id,p,s],i)=>{const speed=.044+(i%4)*.008,phase=time*speed+i*.8,dx=Math.sin(phase)*21,dir=Math.cos(phase)>0?-1:1,rows=fishes[id],map=colors[p];c.save();c.translate(Math.round(x+dx),Math.round(y+Math.sin(time*.37+i)*2.2));c.scale(dir*s,s);for(let j=0;j<rows.length;j++)for(let k=0;k<rows[j].length;k++){const color=map[rows[j][k]];if(color)box(k-6,j-4+(k>9?Math.round(Math.sin(time*4+i)*.55):0),1,1,color)}c.restore()})}
 function frame(now){request=0;if(now-last>=55){time+=last?Math.min(.12,(now-last)/1000):0;last=now;draw()}if(running&&!document.hidden)request=requestAnimationFrame(frame)}
 const motion=document.querySelector('#motion');
 function sync(){cancelAnimationFrame(request);last=0;draw();if(running&&!document.hidden)request=requestAnimationFrame(frame);motion.textContent=running?'Ⅱ':'▷';motion.title=running?'水槽の動きを止める':'水槽を動かす';motion.setAttribute('aria-label',motion.title);document.querySelector('#state').textContent=running?'LIVE':'STILL'}
 motion.onclick=()=>{running=!running;sync()};document.addEventListener('visibilitychange',sync);sync();
})();
