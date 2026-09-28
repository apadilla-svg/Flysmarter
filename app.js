const airports=[{code:"SAN",name:"San Diego",drive:2,fare:236,oneWay:142,stops:"Nonstop",park:92,fuel:44},{code:"LAX",name:"Los Angeles",drive:3.7,fare:198,oneWay:119,stops:"Nonstop",park:126,fuel:72},{code:"PHX",name:"Phoenix",drive:3.3,fare:224,oneWay:134,stops:"Nonstop",park:88,fuel:66},{code:"PSP",name:"Palm Springs",drive:2.2,fare:272,oneWay:163,stops:"1 stop",park:76,fuel:48},{code:"LAS",name:"Las Vegas",drive:4.2,fare:217,oneWay:130,stops:"Nonstop",park:82,fuel:83}];

const destinations=[
["New York, NY (NYC — All Airports)","new york nyc manhattan"],
["John F. Kennedy International (JFK)","new york jfk kennedy"],
["LaGuardia Airport (LGA)","new york lga laguardia"],
["Newark Liberty International (EWR)","new york newark ewr"],
["Los Angeles, CA (LAX)","los angeles lax"],
["Hollywood Burbank Airport (BUR)","los angeles burbank bur"],
["Long Beach Airport (LGB)","los angeles long beach lgb"],
["Chicago, IL (CHI — All Airports)","chicago chi"],
["Chicago O'Hare International (ORD)","chicago ohare ord"],
["Chicago Midway International (MDW)","chicago midway mdw"],
["Dallas–Fort Worth, TX (DFW — Metro Area)","dallas fort worth dfw"],
["Dallas Love Field (DAL)","dallas love dal"],
["Miami, FL (MIA)","miami mia"],
["Fort Lauderdale, FL (FLL)","fort lauderdale miami fll"],
["Orlando, FL (MCO)","orlando mco"],
["Boston, MA (BOS)","boston logan bos"],
["Seattle, WA (SEA)","seattle seatac sea"],
["San Francisco Bay Area (SFO — Metro Area)","san francisco bay area sfo"],
["San Francisco International (SFO)","san francisco sfo"],
["Oakland San Francisco Bay (OAK)","oakland san francisco oak"],
["San Jose Mineta International (SJC)","san jose sjc"],
["Las Vegas, NV (LAS)","las vegas las"],
["Phoenix, AZ (PHX)","phoenix sky harbor phx"],
["Denver, CO (DEN)","denver den"],
["Atlanta, GA (ATL)","atlanta atl"],
["Houston, TX (HOU — Metro Area)","houston hou"],
["George Bush Intercontinental (IAH)","houston iah"],
["William P. Hobby Airport (HOU)","houston hobby hou"],
["Washington, DC (WAS — All Airports)","washington dc was"],
["Ronald Reagan Washington National (DCA)","washington dc reagan dca"],
["Washington Dulles International (IAD)","washington dc dulles iad"],
["Baltimore/Washington International (BWI)","washington baltimore bwi"],
["Philadelphia, PA (PHL)","philadelphia phl"],
["Minneapolis–St. Paul, MN (MSP)","minneapolis saint paul msp"],
["Detroit, MI (DTW)","detroit dtw"],
["Nashville, TN (BNA)","nashville bna"],
["New Orleans, LA (MSY)","new orleans msy"],
["Honolulu, HI (HNL)","honolulu hawaii hnl"],
["Kahului, Maui (OGG)","maui kahului ogg"],
["Mexico City (MEX)","mexico city ciudad de mexico mex"],
["Guadalajara (GDL)","guadalajara gdl"],
["Cancún (CUN)","cancun cun"],
["Tijuana (TIJ)","tijuana tij"],
["Puerto Vallarta (PVR)","puerto vallarta pvr"],
["Monterrey (MTY)","monterrey mty"],
["Toronto (YYZ)","toronto yyz"],
["Vancouver (YVR)","vancouver yvr"],
["London (LON — All Airports)","london lon heathrow gatwick"],
["London Heathrow (LHR)","london heathrow lhr"],
["Paris Charles de Gaulle (CDG)","paris cdg charles de gaulle"],
["Rome Fiumicino (FCO)","rome fco"],
["Madrid (MAD)","madrid mad"],
["Tokyo (TYO — All Airports)","tokyo tyo"],
["Tokyo Haneda (HND)","tokyo haneda hnd"],
["Tokyo Narita (NRT)","tokyo narita nrt"]
];

let tripType="Round trip",flexible=false;
const list=document.querySelector("#airports");
airports.forEach(a=>{let d=document.createElement("label");d.className="airport";d.innerHTML=`<input type="checkbox" data-code="${a.code}" checked><div><strong>${a.code} — ${a.name}</strong><small>Approx. ${a.drive} hr drive</small></div>`;list.appendChild(d)});

document.querySelectorAll(".type").forEach(b=>b.onclick=()=>{document.querySelectorAll(".type").forEach(x=>x.classList.remove("active"));b.classList.add("active");tripType=b.dataset.type;document.querySelector("#returnWrap").classList.toggle("hidden",tripType==="One way")});
document.querySelectorAll(".flex-choice").forEach(b=>b.onclick=()=>{document.querySelectorAll(".flex-choice").forEach(x=>x.classList.remove("active"));b.classList.add("active");flexible=b.dataset.flex==="yes";document.querySelector("#flexOptions").classList.toggle("hidden",!flexible)});

const dest=document.querySelector("#dest"),sug=document.querySelector("#destSuggestions");
function score(item,q){let label=item[0].toLowerCase(),keys=item[1].toLowerCase();if(label.startsWith(q))return 0;if(keys.split(" ").some(k=>k===q))return 1;if(label.includes(q))return 2;if(keys.includes(q))return 3;return 99}
function suggest(){let q=dest.value.toLowerCase().trim();if(!q){sug.classList.add("hidden");return}let found=destinations.filter(x=>score(x,q)<99).sort((a,b)=>score(a,q)-score(b,q)).slice(0,7);if(!found.length){sug.innerHTML='<div class="no-match">No prototype match yet. Try a city or airport code.</div>';sug.classList.remove("hidden");return}sug.innerHTML=found.map(x=>`<button type="button">${x[0]}</button>`).join("");sug.classList.remove("hidden");[...sug.querySelectorAll("button")].forEach((e,i)=>e.onclick=()=>{dest.value=found[i][0];sug.classList.add("hidden")})}
dest.oninput=suggest;dest.onfocus=suggest;document.addEventListener("click",e=>{if(!e.target.closest(".destination-wrap"))sug.classList.add("hidden")});

const money=n=>"$"+Math.round(n).toLocaleString(),fmt=v=>v?new Date(v+"T12:00:00").toLocaleDateString("en-US",{month:"short",day:"numeric"}):"";
document.querySelector("#searchBtn").onclick=()=>{let t=+document.querySelector("#travelers").value,c=[...document.querySelectorAll(".airport input:checked")].map(x=>x.dataset.code);let rows=airports.filter(a=>c.includes(a.code)).map(a=>{let f=tripType==="One way"?a.oneWay:a.fare;return {...a,currentFare:f,partyFare:f*t,driveCosts:a.park+a.fuel,allIn:f*t+a.park+a.fuel}});if(!rows.length){alert("Choose at least one departure airport.");return}let low=[...rows].sort((a,b)=>a.currentFare-b.currentFare)[0],practical=[...rows].sort((a,b)=>a.allIn-b.allIn)[0],short=[...rows].sort((a,b)=>a.drive-b.drive)[0];document.querySelector("#recTitle").textContent=`${low.code} has the lowest ${tripType.toLowerCase()} fare at ${money(low.currentFare)} per traveler.`;let analysis=`For ${t} traveler${t>1?"s":""}, that's ${money(low.partyFare)} in airfare. `;analysis+=practical.code!==low.code?`${practical.code} costs ${money(practical.currentFare-low.currentFare)} more per person to fly, but its shorter drive and lower estimated gas/parking costs make it competitive overall. `:`Even after considering estimated gas and parking, ${low.code} remains a strong value in this demo. `;analysis+="FlySmarter would use live fares to explain whether the extra drive is worth the airfare savings.";document.querySelector("#recText").textContent=analysis;document.querySelector("#party").textContent=`${tripType} • ${t} traveler${t>1?"s":""}`;let ins=[["Lowest flight price",`${low.code} • ${money(low.currentFare)}/person`],["Party airfare",`${low.code} • ${money(low.partyFare)}`],["Shortest drive",`${short.code} • ${short.drive} hr`]];if(flexible)ins.push(["Flexible-date saving","Depart 1 day earlier • save $76/person"]);document.querySelector("#insights").innerHTML=ins.map(x=>`<div class="insight"><small>${x[0]}</small><strong>${x[1]}</strong></div>`).join("");rows.sort((a,b)=>a.currentFare-b.currentFare);let dep=fmt(document.querySelector("#departDate").value),ret=fmt(document.querySelector("#returnDate").value);document.querySelector("#cards").innerHTML=rows.map((a,i)=>`<div class="flight-card ${i===0?"best":""}"><div class="route"><small>Departure airport</small><strong>${a.code} — ${a.name}</strong>${i===0?'<span class="badge">LOWEST FARE</span>':""}</div><div><small>Travel dates</small><strong>${flexible?"Best dates in your window":tripType==="One way"?dep:dep+"–"+ret}</strong></div><div class="fare"><small>${tripType}</small><strong>${money(a.currentFare)}</strong><span>per traveler</span></div><div><small>Stops</small><strong>${a.stops}</strong></div><div><small>Drive</small><strong>${a.drive} hr</strong></div><div class="drive-cost"><small>Est. gas + parking</small><span>${money(a.driveCosts)}</span></div><button class="view" onclick="alert('Prototype only — live flight details will be added after API integration.')">View flights</button></div>`).join("");let sp=document.querySelector("#savingsPanel");sp.classList.toggle("hidden",!flexible);if(flexible)document.querySelector("#savingText").textContent=`Depart Thursday, Oct 9 instead of Friday, Oct 10 and keep the same return date to save up to $76 per traveler — about ${money(76*t)} for your party.`;document.querySelector("#results").classList.remove("hidden");document.querySelector("#results").scrollIntoView({behavior:"smooth"})};