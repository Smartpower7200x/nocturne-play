(function(){
'use strict';
const CFG=window.RITUAL_CONFIG; if(!CFG || !Array.isArray(CFG.themes)) throw new Error('config.js not loaded');
const $=id=>document.getElementById(id);
const els={intro:$('introScreen'),ritual:$('ritualScreen'),reveal:$('revealScreen'),story:$('storyScreen'),tabs:$('templateTabs'),fieldA:$('fieldA'),fieldB:$('fieldB'),wheelZone:$('wheelZone'),wheel:$('cardWheel'),shuffling:$('shuffling'),rail:$('selectedRail'),stage:$('resultStage'),toast:$('toast')};
let theme=CFG.themes[0],state='intro',selected=[],nameA='',nameB='',hookIndex=0,lastOriginal=null,redrawUsed=false,endingIndex=-1,hostEndingIndex=null,wheelRotation=0,wheelCards=[],shuffleTimers=[],shuffleEpoch=0,suppressUntil=0,rafId=0,pointerStart=null,stageFlipTimers=[],wheelGeometry=null;
const esc=s=>String(s).replace(/[&<>"']/g,ch=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
const randInt=n=>{if(window.crypto && window.crypto.getRandomValues){const a=new Uint32Array(1);crypto.getRandomValues(a);return a[0]%n}return Math.floor(Math.random()*n)};
function shuffled(n){let a=Array.from({length:n},(_,i)=>i);for(let i=n-1;i>0;i--){const j=randInt(i+1);[a[i],a[j]]=[a[j],a[i]]}return a}
function showScreen(which){Object.entries({intro:els.intro,ritual:els.ritual,reveal:els.reveal,story:els.story}).forEach(([k,v])=>v.classList.toggle('active',k===which));state=which;window.scrollTo({top:0,left:0,behavior:'auto'});$('homeBtn').style.visibility=which==='intro'?'hidden':'visible'}
function toast(s){els.toast.textContent=s;els.toast.hidden=false;clearTimeout(toast._t);toast._t=setTimeout(()=>els.toast.hidden=true,3000)}
function backMarkup(){return '<div class="card-back"><span class="back-axial"></span><span class="back-axial bottom"></span><div class="card-back-inner"><div class="back-orbit"></div></div></div>'}
function iconSvg(symbol){const v={
  letter:'<rect x="52" y="79" width="116" height="88" rx="2"/><path d="M52 79l58 49 58-49M52 167l39-36m77 36l-39-36"/>',
  rain:'<path d="M52 134C59 86 90 72 110 72c21 0 51 14 58 62H52Z M110 134v52q0 22 21 22"/><path d="M66 155l-5 16m21-15-5 16m75-15-5 16"/>',
  sun:'<circle cx="110" cy="126" r="32"/><path d="M110 62v20m0 88v20m-64-64h20m88 0h20m-117-53 15 15m75 75-15-15m0-60 15-15m-75 75 15-15"/>',
  flower:'<path d="M110 212v-67m0 32c-35 0-43-22-43-22 27-7 43 9 43 22m0-13c37 0 45-23 45-23-27-5-45 9-45 23"/><circle cx="110" cy="118" r="19"/><ellipse cx="110" cy="89" rx="16" ry="24"/><ellipse cx="110" cy="147" rx="16" ry="24"/><ellipse cx="81" cy="118" rx="24" ry="16"/><ellipse cx="139" cy="118" rx="24" ry="16"/>',
  wave:'<path d="M38 105q36-28 72 0t72 0M38 132q36-28 72 0t72 0M38 159q36-28 72 0t72 0"/>',
  star:'<path d="M110 57l16 48 50 1-40 29 15 48-41-30-41 30 15-48-40-29 50-1Z"/>',
  flame:'<path d="M110 65q-35 47-29 66 8 19 6 25c-27-11-21-42-21-42-38 43-8 103 44 103s77-65 40-109c-1 25-21 39-21 39 6-42-19-82-19-82Z"/><path d="M110 137q26 29 14 51-6 11-16 11c-18 0-23-19-13-36Z"/>',
  moon:'<path d="M141 71c-44 5-73 61-41 96 19 21 42 25 63 20-10 15-37 31-68 19-41-16-56-73-25-109 22-26 50-30 71-26Z"/><path d="M150 84l3 11 11 3-11 3-3 11-3-11-11-3 11-3Z"/>',
  orbit:'<circle cx="110" cy="137" r="30"/><ellipse cx="110" cy="137" rx="79" ry="37" transform="rotate(-30 110 137)"/><circle cx="170" cy="102" r="7"/>',
  music:'<path d="M97 169V92l65-16v75M97 92l65-16m-65 33 65-16"/><ellipse cx="79" cy="174" rx="18" ry="10" transform="rotate(-16 79 174)"/><ellipse cx="144" cy="155" rx="18" ry="10" transform="rotate(-16 144 155)"/>',
  key:'<circle cx="89" cy="111" r="28"/><circle cx="89" cy="111" r="12"/><path d="M110 132l60 60v-26h-18v-17h-18l-20-20"/>',
  mirror:'<path d="M65 72Q110 48 155 72V166Q110 190 65 166Z"/><path d="M78 83Q110 65 142 83V154Q110 173 78 154Z"/><path d="M91 113l37-29m-22 58 28-23"/>',
  lamp:'<path d="M85 73h50l20 64H65l20-64Zm25 64v51m-33 0h66M80 195h60"/><path d="M97 160h26"/>',
  wind:'<path d="M42 98h98q22 0 21-19t-24-17M32 129h151q20 0 21 18t-24 20M49 159h87q22 0 24 19t-22 18"/>',
  ring:'<circle cx="110" cy="136" r="45"/><circle cx="110" cy="136" r="34"/><path d="M88 92l22-30 22 30m-22-30v30"/>'
}[symbol]||'<circle cx="110" cy="130" r="45"/>';
return v;}
function cardSVG(card,index,canvasMode=false){
  // Engraved illustration style: gold folio, double frame, botanical star-chart texture.
  // No heavy filters: the same SVG remains fast on mid-range Android browsers.
  const palettes=[
    ['#f2ead9','#476c67','#ae9373'],['#e8eee5','#456d6a','#b29a77'],
    ['#eee3de','#66677e','#b9997c'],['#eee9db','#5e756c','#b19a75']
  ];
  const [paper,ink,foil]=palettes[index%palettes.length];
  const rays=Array.from({length:16},(_,i)=>{const a=i*Math.PI/8;const x1=110+72*Math.cos(a),y1=153+72*Math.sin(a);const x2=110+80*Math.cos(a),y2=153+80*Math.sin(a);return `<path d="M${x1.toFixed(1)} ${y1.toFixed(1)}L${x2.toFixed(1)} ${y2.toFixed(1)}"/>`}).join('');
  return `<svg class="card-art" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 220 344" role="img" aria-label="${esc(card.title)}">`+
  `<rect width="220" height="344" rx="8" fill="${paper}"/>`+
  `<rect x="7.5" y="8" width="205" height="328" rx="3" fill="none" stroke="${foil}" stroke-width="1.5"/>`+
  `<rect x="12" y="12.5" width="196" height="319" rx="2" fill="none" stroke="${ink}" stroke-opacity=".35" stroke-width=".5"/>`+
  `<g stroke="${foil}" stroke-opacity=".75" stroke-width=".8" fill="none"><path d="M22 32h44M154 32h44M22 312h44M154 312h44"/><path d="M23 22h16M23 22v16M197 22h-16M197 22v16M23 322h16M23 322v-16M197 322h-16M197 322v-16"/><path d="M110 54v16"/><path d="M110 245v9"/></g>`+
  `<text x="110" y="31" font-family="Georgia,serif" font-size="9" letter-spacing="2" text-anchor="middle" fill="${ink}">NOCTURNE</text>`+
  `<g stroke="${foil}" stroke-width=".6" stroke-opacity=".5" fill="none">${rays}<ellipse cx="110" cy="153" rx="71" ry="92"/><ellipse cx="110" cy="153" rx="59" ry="79"/><path d="M110 70c-23 27-35 55-35 83s12 56 35 83M110 70c23 27 35 55 35 83s-12 56-35 83"/><path d="M39 153h142"/></g>`+
  `<g fill="${foil}" opacity=".75"><circle cx="45" cy="72" r="1.6"/><circle cx="177" cy="72" r="1.6"/><circle cx="45" cy="232" r="1.6"/><circle cx="177" cy="232" r="1.6"/><circle cx="110" cy="53" r="3"/></g>`+
  `<g stroke="${ink}" stroke-width="2.8" stroke-linecap="round" stroke-linejoin="round" fill="none" transform="translate(11 24) scale(.90)">${iconSvg(card.symbol)}</g>`+
  `<rect x="35" y="261" width="150" height=".8" fill="${foil}"/>`+
  `<path d="M110 259l5 5-5 5-5-5Z" fill="${foil}"/>`+
  `<text x="110" y="288" font-size="19" font-family="Songti SC,Noto Serif CJK SC,serif" fill="#344d44" text-anchor="middle">${esc(card.title)}</text>`+
  `<text x="110" y="316" font-size="9" letter-spacing="1.8" fill="${ink}" font-family="Georgia,serif" text-anchor="middle">${String(index+1).padStart(2,'0')}  /  STORY CARD</text></svg>`;
}
function renderTemplates(){els.tabs.replaceChildren();for(const t of CFG.themes){const b=document.createElement('button');b.className='segment'+(t.id===theme.id?' active':'');b.setAttribute('aria-pressed',t.id===theme.id?'true':'false');b.textContent=t.title;b.type='button';b.addEventListener('click',()=>{theme=t;hookIndex=0;hostEndingIndex=null;$('inviteNotice').hidden=true;setIntro();renderTemplates()});els.tabs.appendChild(b)}}
function setIntro(){ $('introEyebrow').textContent=theme.eyebrow;$('heroTitle').textContent=theme.title;$('introDescription').textContent=theme.intro;$('labelA').textContent=theme.inputA;$('labelB').textContent=theme.inputB;els.fieldA.value=theme.defaultA;els.fieldB.value=theme.defaultB;$('startBtnText').textContent=theme.startLabel;renderHooks()}
function renderHooks(){
 const wrap=$('hookChoices');wrap.replaceChildren();$('hookQuestion').textContent=theme.hookQuestion||'你想玩哪种情境？';
 const options=theme.hooks||[];
 options.forEach((h,i)=>{const b=document.createElement('button');b.type='button';b.className='hook-choice'+(i===hookIndex?' active':'');b.setAttribute('aria-pressed',i===hookIndex?'true':'false');b.textContent=h.label;b.addEventListener('click',()=>{hookIndex=i;renderHooks()});wrap.append(b)});
}
function getHook(){return (theme.hooks||[])[hookIndex]||{label:'随便试试',plot:'先抽牌，再挑你喜欢的细节。'}}
function makePlot(){return replaceTokens(getHook().plot)}

function replaceTokens(pattern){const values={A:nameA,B:nameB,first:selected[0]?.card.title||'',middle:selected[1]?.card.title||'',last:selected[2]?.card.title||'',hook:getHook().label};return String(pattern).replace(/{{(A|B|first|middle|last|hook)}}/g,(_,k)=>values[k])}
function getEnding(){return (theme.endings||[])[endingIndex]||null}
function endingLabel(){return getEnding()?replaceTokens(getEnding().label):''}
function endingNarrative(){return getEnding()?replaceTokens(getEnding().plot):''}
function comparisonText(){if(hostEndingIndex===null||endingIndex<0)return '';const original=theme.endings[hostEndingIndex];if(!original)return '';return hostEndingIndex===endingIndex?'你和朋友选了一样的结局：'+endingLabel()+'。':'朋友选了「'+replaceTokens(original.label)+'」，你选了「'+endingLabel()+'」。'}
function renderEndingChoices(){const wrap=$('endingChoices');wrap.replaceChildren();$('endingQuestion').textContent=theme.endingQuestion||'你想怎么收尾？';
 (theme.endings||[]).forEach((ending,i)=>{const b=document.createElement('button');b.type='button';b.className='ending-choice';b.setAttribute('aria-pressed',i===endingIndex?'true':'false');b.textContent=replaceTokens(ending.label);b.addEventListener('click',()=>{endingIndex=i;renderEndingChoices()});wrap.append(b)});
 $('interpretBtn').disabled=endingIndex<0;$('interpretBtn').innerHTML=endingIndex<0?'先选一个结局 <span class="btn-symbol">✦</span>':'看看结果 <span class="btn-symbol">✦</span>';
}
function makeInviteCode(){return ['N4',theme.id,hookIndex,encodeURIComponent(nameA).replace(/~/g,'%7E'),encodeURIComponent(nameB).replace(/~/g,'%7E'),endingIndex].join('|')}
function parseInvite(str){const m=String(str).match(/N4\|([a-z]+)\|(\d+)\|([^|\s]+)\|([^|\s]+)\|(\d+)/);if(!m)return null;const t=CFG.themes.find(t=>t.id===m[1]),hi=Number(m[2]),ei=Number(m[5]);if(!t||hi<0||hi>=t.hooks.length||ei<0||ei>=t.endings.length)return null;
 try{return{theme:t,hook:hi,A:decodeURIComponent(m[3]).slice(0,18),B:decodeURIComponent(m[4]).slice(0,18),host:ei}}catch(_){return null}}
function loadInvite(str){const obj=parseInvite(str);if(!obj){toast('口令好像不对，再检查一下');return false}theme=obj.theme;hookIndex=obj.hook;hostEndingIndex=obj.host;renderTemplates();setIntro();els.fieldA.value=obj.A;els.fieldB.value=obj.B;
 const msg='已载入。你们用的是同样的人物和情境，但各自随机抽牌。';$('inviteNotice').textContent=msg;$('inviteNotice').hidden=false;$('inviteLoader').open=true;toast('朋友的题目载入好了，开始抽牌吧');return true}
async function copyText(value,success){try{if(navigator.clipboard&&window.isSecureContext){await navigator.clipboard.writeText(value);toast(success);return true}}catch(e){}
 const area=document.createElement('textarea');area.value=value;area.setAttribute('readonly','');area.style.cssText='position:fixed;left:-9999px;top:0;opacity:0';document.body.append(area);area.focus();area.select();let ok=false;try{ok=document.execCommand('copy')}catch(e){}area.remove();if(ok){toast(success);return true}window.prompt('请手动复制以下内容',value);return false}
function inviteMessage(){let msg='我玩了这个抽卡，你也来试试：'+theme.title+' / '+getHook().label+'\n'+nameA+' × '+nameB+'\n我选了「'+endingLabel()+'」，你呢？\n';const code=makeInviteCode();
 if(window.location&&/^https?:$/.test(window.location.protocol)&&window.location.hostname&&window.location.hostname!=='localhost'){const url=window.location.origin+window.location.pathname+'?invite='+encodeURIComponent(code);msg+='点这里一起玩：'+url+'\n'}
 else{msg+='在 NOCTURNE 首页打开「朋友发来一局？」并粘贴口令：\n'+code+'\n（没有在线网址时，需要双方打开同一个网页。）'}return msg}

function shareText(){let lines=[theme.title+'｜'+getHook().label,theme.id==='cp'?nameA+' × '+nameB:nameA+' · '+nameB,makePlot(),'你选的结局｜'+endingLabel()+'：'+endingNarrative()];if(comparisonText())lines.push('朋友的选择｜'+comparisonText());selected.forEach((o,i)=>lines.push(theme.stages[i]+'｜'+o.card.title+'：'+o.card.quote));if(redrawUsed&&lastOriginal)lines.push('换卡记录｜第三张从「'+lastOriginal.title+'」换成了「'+selected[2].card.title+'」');lines.push('NOCTURNE · 原创故事卡（不是塔罗牌）');return lines.join('\n\n')}
function redrawEnding(){
 if(state!=='story'||redrawUsed||selected.length<3)return;
 const old=selected[2].card,last=selected[2].cardId;
 const exclude=new Set(selected.map(e=>e.cardId));const candidates=Array.from({length:theme.cards.length},(_,i)=>i).filter(i=>!exclude.has(i));
 if(!candidates.length){toast('没有可替换的牌了');return}
 const id=candidates[randInt(candidates.length)];lastOriginal=old;redrawUsed=true;
 selected[2]={cardId:id,card:theme.cards[id],index:id};renderStoryContent();toast('第三张已换成「'+theme.cards[id].title+'」');
}
async function copyStory(){if(state==='story')await copyText(shareText(),'已复制，直接发给朋友就行')}
function cancelAsync(){shuffleEpoch++;for(const t of shuffleTimers)clearTimeout(t);shuffleTimers=[];for(const t of stageFlipTimers)clearTimeout(t);stageFlipTimers=[];cancelAnimationFrame(rafId);rafId=0;pointerStart=null}
function start(){cancelAsync();selected=[];wheelCards=[];lastOriginal=null;redrawUsed=false;endingIndex=-1;nameA=(els.fieldA.value||theme.defaultA).trim().slice(0,18);nameB=(els.fieldB.value||theme.defaultB).trim().slice(0,18);wheelRotation=0;showScreen('ritual');$('skipBtn').hidden=false;$('wheelControls').hidden=true;els.wheel.replaceChildren();els.shuffling.replaceChildren();$('ritualEyebrow').textContent='第 1 步 / 洗牌';$('ritualTitle').textContent='洗牌';$('ritualTip').textContent='洗完就可以抽了';renderSlots();beginShuffle();}
function beginShuffle(){if(window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches){prepareWheel();return;}const epoch=shuffleEpoch, cards=Array.from({length:17},(_,i)=>{const div=document.createElement('div');div.className='shuffle-card';div.innerHTML=backMarkup();div.style.zIndex=i;els.shuffling.append(div);return div});const spread=()=>{if(epoch!==shuffleEpoch)return;cards.forEach((c,i)=>{const ang=i*Math.PI*2/cards.length;const rx=Math.min(innerWidth*.33,220),ry=Math.min(innerHeight*.21,150);c.style.setProperty('--tx',Math.cos(ang)*rx+'px');c.style.setProperty('--ty',Math.sin(ang)*ry+'px');c.style.setProperty('--ta',((i*137)%270-135)+'deg');c.classList.add('spread')})};requestAnimationFrame(()=>requestAnimationFrame(spread));shuffleTimers.push(setTimeout(()=>{if(epoch!==shuffleEpoch)return;cards.forEach(c=>{c.classList.remove('spread');c.classList.add('gather')});},900));shuffleTimers.push(setTimeout(()=>{if(epoch!==shuffleEpoch)return;cards.forEach(c=>c.classList.add('vanish'));prepareWheel();},1830));shuffleTimers.push(setTimeout(()=>{if(epoch!==shuffleEpoch)return;els.shuffling.replaceChildren();},2450))}
function prepareWheel(){
 $('ritualEyebrow').textContent='第 2 步 / 抽卡';
 $('ritualTitle').textContent=theme.drawLabel+' · 0/3';
 $('ritualTip').textContent='想选哪张点哪张；抽到的是写作线索，不是算命结果。';
 $('skipBtn').hidden=true;$('wheelControls').hidden=false;
 const perm=shuffled(theme.cards.length);
 els.wheel.replaceChildren();wheelCards=[];
 // V0.2: 视觉牌背数量不代表卡组大小。减少同时渲染的 DOM 以提升移动端性能。
 const N=26;
 for(let i=0;i<N;i++){
   const btn=document.createElement('button');btn.type='button';btn.className='wheel-card';
   btn.setAttribute('aria-label','选择牌轮上的第 '+(i+1)+' 张卡');
   btn.innerHTML=backMarkup();btn.dataset.i=i;
   btn.addEventListener('click',()=>{if(Date.now()<suppressUntil)return;choose(i)});
   els.wheel.append(btn);wheelCards.push({btn,index:i,cardId:perm[i%perm.length],visible:true,layer:null});
 }
 refreshWheelGeometry();positionWheel();
}
function refreshWheelGeometry(){
 const btn=wheelCards[0]?.btn;
 if(!btn)return;
 // DOM 尺寸只读取一次：避免拖动时每帧 32 次 layout read。
 wheelGeometry={w:els.wheelZone.clientWidth,h:els.wheelZone.clientHeight,cw:btn.offsetWidth,ch:btn.offsetHeight};
}
function scheduleWheel(){
 if(rafId)return;
 rafId=requestAnimationFrame(()=>{rafId=0;positionWheel()});
}
function renderSlots(){els.rail.replaceChildren();theme.stages.forEach((s,i)=>{const sl=document.createElement('div');sl.className='slot'+(i<selected.length?' active':'');sl.innerHTML=`<div class="slot-mini">${i<selected.length?'✦':'0'+(i+1)}</div><div class="slot-desc"><strong>${esc(s)}</strong><small>${i<selected.length?'抽好了':'还没抽'}</small></div>`;els.rail.append(sl)})}
function positionWheel(){
 if(state!=='ritual'||!wheelCards.length||!wheelGeometry)return;
 const {w,h,cw,ch}=wheelGeometry;
 const mobile=w<780;
 const radius=mobile?Math.min(w*.73,315):Math.min(w*.38,h*.71,520);
 const cx=w*(mobile?.96:.77),cy=h*(mobile?.56:.55);
 const step=2*Math.PI/wheelCards.length;
 for(let i=0;i<wheelCards.length;i++){
   const wc=wheelCards[i],a=i*step+wheelRotation-Math.PI;
   const x=cx+radius*Math.cos(a)-cw/2,y=cy+radius*Math.sin(a)-ch/2;
   const visible=x>-cw-12&&x<w+12&&y>-ch-12&&y<h+12;
   if(visible!==wc.visible){wc.visible=visible;wc.btn.style.visibility=visible?'visible':'hidden'}
   if(!visible)continue;
   wc.btn.style.transform=`translate3d(${x.toFixed(1)}px,${y.toFixed(1)}px,0) rotate(${(a*180/Math.PI+90).toFixed(1)}deg)`;
   // 降低 z-index 写入频率，减少每帧重叠卡牌的重绘。
   const layer=Math.round((1-Math.cos(a))*20);
   if(wc.layer!==layer){wc.layer=layer;wc.btn.style.zIndex=String(100+layer)}
 }
}
function choose(i){if(selected.length>=3||state!=='ritual'||!wheelCards.length)return;const selectedIds=new Set(selected.map(x=>x.cardId));let wc=wheelCards[i],id=wc.cardId;if(selectedIds.has(id)){const available=shuffled(theme.cards.length).find(n=>!selectedIds.has(n));if(available===undefined)return;id=available}selected.push({cardId:id,card:theme.cards[id],index:id});wc.btn.classList.add('picked');renderSlots();$('ritualTitle').textContent=theme.drawLabel+' · '+selected.length+'/3';if(selected.length===3){$('ritualTip').textContent='抽好了，看看你拿到了什么';$('wheelControls').hidden=true;setTimeout(showReveal,650)}}
function showReveal(){if(state!=='ritual')return;showScreen('reveal');renderEndingChoices();els.stage.replaceChildren();selected.forEach((entry,i)=>{const col=document.createElement('div');col.className='result-column';col.style.setProperty('--delay',(i*.12)+'s');col.innerHTML=`<button class="flip-card" aria-label="翻看${esc(theme.stages[i])}卡牌"><div class="flip-inner"><div class="flip-face back">${backMarkup()}</div><div class="flip-face front">${cardSVG(entry.card,entry.index)}</div></div></button><div class="card-caption"><strong>${esc(entry.card.title)}</strong><span>${esc(theme.stages[i])} · ${esc(entry.card.tag)}</span></div>`;col.querySelector('.flip-card').addEventListener('click',()=>col.querySelector('.flip-card').classList.toggle('flipped'));els.stage.append(col);const timer=setTimeout(()=>col.querySelector('.flip-card').classList.add('flipped'),420+i*640);stageFlipTimers.push(timer)})}
function showStory(){if(state!=='reveal'||endingIndex<0)return;showScreen('story');renderStoryContent()}
function renderStoryContent(){
 $('storyEyebrow').textContent=theme.eyebrow;$('storyTitle').textContent=theme.resultTitle;$('storySubtitle').textContent=theme.resultSubtitle;
 $('legalNote').textContent=theme.disclaimer+' · 名字只在当前页面使用';
 $('chosenHookLabel').textContent=getHook().label;$('hookNarrative').textContent=makePlot();$('endingLabel').textContent=endingLabel();$('endingNarrative').textContent=endingNarrative();const comp=comparisonText();$('compareNote').hidden=!comp;$('compareNote').textContent=comp;
 const cards=$('storyCards'),reading=$('storyReading');cards.replaceChildren();reading.replaceChildren();
 selected.forEach((entry,i)=>{let el=document.createElement('div');el.className='story-card';el.innerHTML=`${cardSVG(entry.card,entry.index)}<span class="story-label">${esc(theme.stages[i])}</span><strong>${esc(entry.card.title)}</strong>`;cards.append(el);
  const article=document.createElement('article');article.className='reading-item';const h=document.createElement('h3'),p=document.createElement('p');h.textContent=theme.stages[i]+' · '+entry.card.tag;p.textContent=entry.card.quote;article.append(h,p);reading.append(article)});
 $('redrawBtn').disabled=redrawUsed;$('redrawBtn').textContent=redrawUsed?'第三张已换过 ✓':'换第三张卡 ↻';
 $('choiceAfterTitle').textContent=redrawUsed?'已经换过一次了':'第三张不满意？';
 $('rerollNote').textContent=redrawUsed&&lastOriginal?'第三张从「'+lastOriginal.title+'」换成了「'+selected[2].card.title+'」。':'可以换第三张，前两张不动。只能换一次。';
}
function downloadCard(){if(state!=='story')return;try{const W=1080,H=1600,scale=2,canvas=document.createElement('canvas');canvas.width=W;canvas.height=H;let c=canvas.getContext('2d');if(!c){toast('浏览器暂不支持保存图片');return}const bg=c.createLinearGradient(0,0,W,H);bg.addColorStop(0,'#0b1514');bg.addColorStop(1,'#183530');c.fillStyle=bg;c.fillRect(0,0,W,H);c.lineWidth=2;c.strokeStyle='#2b4f49';[380,570,820].forEach((r,idx)=>{c.beginPath();c.arc(W*.72,H*.40,r,0,2*Math.PI);c.stroke()});for(let i=0;i<46;i++){c.fillStyle=i%2?'#557f74':'#9ccac0';c.globalAlpha=.18+(i%5)*.07;c.fillRect((i*217+59)%W,(i*373+17)%H,2,2)}c.globalAlpha=1;c.textAlign='center';c.fillStyle='#acd8c9';c.font='28px Georgia';c.fillText('✦   N O C T U R N E   ✦',W/2,99);c.fillStyle='#faf9ea';c.font='68px "Songti SC",serif';c.fillText(theme.resultTitle,W/2,205);c.fillStyle='#aec3b8';c.font='30px "Songti SC",serif';c.fillText(theme.id==='cp'?(nameA+' × '+nameB):(nameA+' · '+nameB),W/2,268);c.fillStyle='#9bd9c9';c.font='26px "Songti SC",serif';c.fillText('你选的情境 / '+getHook().label,W/2,322);const cardW=280,cardH=430,spacing=26,startX=(W-(cardW*3+spacing*2))/2;selected.forEach((entry,i)=>{const x=startX+i*(cardW+spacing),y=360;drawCanvasCard(c,x,y,cardW,cardH,entry.card,entry.index);c.fillStyle='#a4d0c2';c.font='25px "Songti SC",serif';c.fillText(theme.stages[i],x+cardW/2,y+475);c.fillStyle='#f5f2e6';c.font='30px "Songti SC",serif';c.fillText(entry.card.title,x+cardW/2,y+522)});c.textAlign='center';c.fillStyle='#abe0cf';c.font='29px "Songti SC",serif';c.fillText('你选的结局 / '+endingLabel(),W/2,940);c.textAlign='left';c.fillStyle='#e1eee2';c.font='24px "Songti SC",serif';wrapText(c,endingNarrative(),95,995,890,36,2);const sy=1160;selected.forEach((entry,i)=>{let y=sy+i*98;c.fillStyle='#96d4be';c.font='28px "Songti SC",serif';c.fillText('0'+(i+1)+'  '+theme.stages[i]+'  /  '+entry.card.tag,93,y);c.fillStyle='#e1e5d7';c.font='25px "Songti SC",serif';wrapText(c,entry.card.quote,93,y+34,900,36,1)});if(redrawUsed&&lastOriginal){c.fillStyle='#9bd9c9';c.textAlign='center';c.font='23px "Songti SC",serif';c.fillText('第三张换卡：「'+lastOriginal.title+'」 → 「'+selected[2].card.title+'」',W/2,1460)}c.strokeStyle='#6d8f81';c.lineWidth=1;c.beginPath();c.moveTo(90,1490);c.lineTo(990,1490);c.stroke();c.fillStyle='#82a99a';c.font='22px "Songti SC",serif';c.textAlign='center';c.fillText(theme.disclaimer,W/2,1540);let url=canvas.toDataURL('image/png'),link=document.createElement('a');link.download='NOCTURNE_'+theme.id+'_share.png';link.href=url;document.body.append(link);link.click();link.remove();toast('图片已保存到浏览器下载文件夹')}catch(e){console.error(e);toast('图片生成失败，可尝试在其他浏览器打开')}}
function wrapText(c,txt,x,y,maxWidth,lineH,maxLines){let current='',n=0;for(const ch of txt){let next=current+ch;if(c.measureText(next).width>maxWidth && current){c.fillText(current,x,y+n*lineH);n++;if(n>=maxLines)return;current=ch}else current=next}if(current)c.fillText(current,x,y+n*lineH)}
function drawCanvasCard(c,x,y,w,h,card,i){c.save();c.shadowColor='#0009';c.shadowBlur=25;c.shadowOffsetY=15;c.fillStyle=['#ece7dc','#dce9e3','#e9dfdb','#eee8d9'][i%4];c.fillRect(x,y,w,h);c.shadowColor='transparent';c.strokeStyle='#a48e6a';c.lineWidth=2;c.strokeRect(x+12,y+12,w-24,h-24);c.strokeRect(x+21,y+21,w-42,h-42);c.textAlign='center';c.fillStyle='#5b8278';c.font='110px Georgia';const syms={letter:'✉',rain:'☂',sun:'☀',flower:'✿',wave:'≈',star:'✧',flame:'♨',moon:'☾',orbit:'◎',music:'♫',key:'⚿',mirror:'◇',lamp:'♧',wind:'≋',ring:'◉'};c.fillText(syms[card.symbol]||'✧',x+w/2,y+265);c.strokeStyle='#9b947b';c.beginPath();c.moveTo(x+43,y+316);c.lineTo(x+w-43,y+316);c.stroke();c.fillStyle='#435d53';c.font='27px "Songti SC",serif';c.fillText(card.title,x+w/2,y+363);c.font='15px Georgia';c.fillText('NOCTURNE  ·  '+String(i+1).padStart(2,'0'),x+w/2,y+400);c.restore()}
$('startBtn').addEventListener('click',start);$('skipBtn').addEventListener('click',()=>{if(state!=='ritual'||wheelCards.length)return;cancelAsync();els.shuffling.replaceChildren();prepareWheel()});$('interpretBtn').addEventListener('click',showStory);$('againBtn').addEventListener('click',start);$('downloadBtn').addEventListener('click',downloadCard);$('redrawBtn').addEventListener('click',redrawEnding);$('copyBtn').addEventListener('click',copyStory);$('challengeBtn').addEventListener('click',()=>{if(state==='story')copyText(inviteMessage(),'邀请已复制，可以发给朋友了')});$('loadInviteBtn').addEventListener('click',()=>{loadInvite($('inviteInput').value)});$('homeBtn').addEventListener('click',()=>{cancelAsync();wheelCards=[];showScreen('intro')});
els.wheelZone.addEventListener('pointerdown',e=>{if(state!=='ritual'||!wheelCards.length)return;pointerStart={x:e.clientX,y:e.clientY,angle:wheelRotation,id:e.pointerId};});
window.addEventListener('pointermove',e=>{if(!pointerStart||state!=='ritual')return;let dx=e.clientX-pointerStart.x,dy=e.clientY-pointerStart.y;if(Math.abs(dx)+Math.abs(dy)>6){wheelRotation=pointerStart.angle+(dx+dy*.32)*.008;suppressUntil=Date.now()+250;scheduleWheel()}});
function finishPointer(e){if(!pointerStart)return;const d=Math.abs(e.clientX-pointerStart.x)+Math.abs(e.clientY-pointerStart.y);if(d>12)suppressUntil=Date.now()+280;pointerStart=null}window.addEventListener('pointerup',finishPointer);window.addEventListener('pointercancel',finishPointer);
els.wheelZone.addEventListener('wheel',e=>{if(state!=='ritual'||!wheelCards.length)return;e.preventDefault();wheelRotation+=Math.sign(e.deltaY)*.125;scheduleWheel()},{passive:false});
window.addEventListener('resize',()=>{if(state==='ritual'&&wheelCards.length){refreshWheelGeometry();scheduleWheel()}});
$('brandText').textContent=CFG.brand;document.title=CFG.brand+' — 故事抽卡';setIntro();renderTemplates();showScreen('intro');if(window.location&&window.location.search){const params=new URLSearchParams(window.location.search);if(params.has('invite'))loadInvite(params.get('invite'));}
window.__RITUAL_DEBUG__={getState:()=>state,getTheme:()=>theme.id,getSelected:()=>selected.map(x=>x.card.title),getWheelCount:()=>wheelCards.length,getHook:()=>getHook().label,getPlot:()=>makePlot(),getRedrawUsed:()=>redrawUsed,getShareText:()=>shareText(),getEnding:()=>endingLabel(),getEndingNarrative:()=>endingNarrative(),getCompare:()=>comparisonText(),getInviteCode:()=>makeInviteCode(),getInviteMessage:()=>inviteMessage(),loadInvite:(str)=>loadInvite(str),redraw:()=>redrawEnding(),forceReveal:()=>{if(state==='ritual'&&wheelCards.length){for(let i=0;i<wheelCards.length&&selected.length<3;i++)choose(i)}}};
})();
