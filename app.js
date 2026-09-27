const airports=[
 {code:'SAN',name:'San Diego',drive:2.0,fare:236,oneWay:142,dates:'Oct 10–15',stops:'Nonstop',park:92,fuel:44},
 {code:'LAX',name:'Los Angeles',drive:3.7,fare:198,oneWay:119,dates:'Oct 9–14',stops:'Nonstop',park:126,fuel:72},
 {code:'PHX',name:'Phoenix',drive:3.3,fare:224,oneWay:134,dates:'Oct 11–16',stops:'Nonstop',park:88,fuel:66},
 {code:'PSP',name:'Palm Springs',drive:2.2,fare:272,oneWay:163,dates:'Oct 8–13',stops:'1 stop',park:76,fuel:48},
 {code:'LAS',name:'Las Vegas',drive:4.2,fare:217,oneWay:130,dates:'Oct 10–15',stops:'Nonstop',park:82,fuel:83}
];
let tripType='Round trip';
const list=document.querySelector('#airports');
airports.forEach(a=>{const d=document.createElement('label');d.className='airport';d.innerHTML=`<input type="checkbox" data-code="${a.code}" checked><div><strong>${a.code} — ${a.name}</strong><small>Approx. ${a.drive} hr drive</small></div>`;list.appendChild(d)});
document.querySelectorAll('.type').forEach(b=>b.addEventListener('click',()=>{document.querySelectorAll('.type').forEach(x=>x.classList.remove('active'));b.classList.add('active');tripType=b.dataset.type;}));
function money(n){return '$'+Math.round(n).toLocaleString()}
function run(){
 const t=+document.querySelector('#travelers').value;
 const chosen=[...document.querySelectorAll('.airport input:checked')].map(x=>x.dataset.code);
 let rows=airports.filter(a=>chosen.includes(a.code)).map(a=>{const fare=tripType==='One way'?a.oneWay:a.fare;return {...a,currentFare:fare,partyFare:fare*t,driveCosts:a.park+a.fuel,allIn:fare*t+a.park+a.fuel}});
 if(!rows.length){alert('Choose at least one departure airport.');return}
 const lowFare=[...rows].sort((a,b)=>a.currentFare-b.currentFare)[0];
 const practical=[...rows].sort((a,b)=>a.allIn-b.allIn)[0];
 const short=[...rows].sort((a,b)=>a.drive-b.drive)[0];
 const label=tripType.toLowerCase();
 document.querySelector('#recTitle').textContent=`${lowFare.code} has the lowest ${label} fare at ${money(lowFare.currentFare)} per traveler.`;
 let analysis=`For ${t} traveler${t>1?'s':''}, that's ${money(lowFare.partyFare)} in airfare. `;
 if(practical.code!==lowFare.code){analysis+=`${practical.code} costs ${money(practical.currentFare-lowFare.currentFare)} more per person to fly, but its shorter drive and lower estimated gas/parking costs make it competitive overall. `}else{analysis+=`Even after considering estimated gas and parking, ${lowFare.code} remains a strong value in this demo. `}
 analysis+=`FlySmarter would use live fares to tell you whether the extra drive is worth the airfare savings.`;
 document.querySelector('#recText').textContent=analysis;
 document.querySelector('#party').textContent=`${tripType} • ${t} traveler${t>1?'s':''}`;
 const ins=[['Lowest flight price',`${lowFare.code} • ${money(lowFare.currentFare)}/person`],['Party airfare',`${lowFare.code} • ${money(lowFare.partyFare)}`],['Shortest drive',`${short.code} • ${short.drive} hr`],['Date opportunity','Shift 1 day • save up to $76/person']];
 document.querySelector('#insights').innerHTML=ins.map(x=>`<div class="insight"><small>${x[0]}</small><strong>${x[1]}</strong></div>`).join('');
 rows.sort((a,b)=>a.currentFare-b.currentFare);
 document.querySelector('#cards').innerHTML=rows.map((a,i)=>`<div class="flight-card ${i===0?'best':''}"><div class="route"><small>Departure airport</small><strong>${a.code} — ${a.name}</strong>${i===0?'<span class="badge">LOWEST FARE</span>':''}</div><div><small>Best dates</small><strong>${a.dates}</strong></div><div class="fare"><small>${tripType}</small><strong>${money(a.currentFare)}</strong><span>per traveler</span></div><div><small>Stops</small><strong>${a.stops}</strong></div><div><small>Drive</small><strong>${a.drive} hr</strong></div><div class="drive-cost"><small>Est. gas + parking</small><span>${money(a.driveCosts)}</span></div><button class="view" onclick="alert('Prototype only — live flight details will be added after API integration.')">View flights</button></div>`).join('');
 document.querySelector('#savingText').textContent=`In the demo data, moving your departure by one day can reduce airfare by as much as $76 per traveler — about ${money(76*t)} for your party. A live version would scan the full date window automatically and surface the cheapest combinations.`;
 document.querySelector('#results').classList.remove('hidden');document.querySelector('#results').scrollIntoView({behavior:'smooth'});
}
document.querySelector('#searchBtn').addEventListener('click',run);