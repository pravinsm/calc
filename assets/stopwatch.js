let s_mins=0;
let s_secs=0;
let s_milli=0;
let laps_list=[];
let diff=[];
let stopwatch_time=document.getElementById("stopwatch");
let lap_btn=document.getElementById("s_lap_btn");
let s_start_btn=document.getElementById("s_start_btn");
let laps=document.getElementById("laps");
let timer_countdown;
stopwatch.innerHTML=`00:00.<span style="color: red">0</span>`;
lap_btn.disabled="true"

function s_start(){
if(s_start_btn.className=="changed"){
    s_start_btn.className= "";
    s_start_btn.innerText="Start";
    lap_btn.innerText="Reset";
    clearInterval(timer_countdown);
}   
else{
    s_start_btn.className="changed";
    s_start_btn.innerText="Pause";
    lap_btn.innerText="Lap";
    lap_btn.disabled=false;
    lap_btn.setAttribute("id","s_lap_btn1");
    s_start_timer();
}
}

function s_start_timer(){
timer_countdown= setInterval(()=>{

if(s_milli >= 9){
  s_milli=0;
  if(s_secs >= 59){
    s_secs=0;
    s_mins+=1;
  }
  else{
    s_secs+=1;
  }
}
else{
s_milli+=1;
stopwatch.innerHTML=`${(s_mins>9)?s_mins:'0'+s_mins}:${(s_secs>9) ? s_secs:'0'+s_secs}<span style="color: red">.${s_milli}</span>`
}
},100)
}


function s_lap(){
if(lap_btn.innerText=="Reset"){
  clearInterval(timer_countdown);
  lap_btn.innerText="Lap";
  lap_btn.disabled=true;
  lap_btn.setAttribute("id","s_lap_btn");
  stopwatch.innerHTML=`00:00.<span style="color: red">0</span>`;
  s_mins=0;
  s_secs=0;
  s_milli=0;
  laps_list=[];
  diff=[];
  laps.innerHTML="";
}

else{
  laps.innerHTML="";
  laps_list.unshift(`${(s_mins>9)?s_mins:'0'+s_mins}:${(s_secs>9) ? s_secs:'0'+s_secs}.${s_milli}`);

  if(laps_list.length <2){
    diff.unshift(`+${(s_mins>9)?s_mins:'0'+s_mins}:${(s_secs>9) ? s_secs:'0'+s_secs}.${s_milli}`);
  }

  else{
    let val1=laps_list[0].split(":");
    let val2=laps_list[1].split(":");
    let v1 = eval(val1[0]-val2[0]);
    let v2 = eval(val1[1]-val2[1]).toFixed(1);
    diff.unshift(`+${(v1>9) ? v1 : '0'+v1}:${(v2>9) ? v2 : '0'+v2}`);
  }

  for(i=0;i<laps_list.length;i++){
    let index=laps_list.length-i;
    laps.innerHTML+=`<tr>
                       <td><span style="color: red">${(index > 9) ? index : '0'+index }</span></td>
                       <td>${laps_list[i]}</td>
		       <td><span style="color: #7d7d7d">${diff[i]}</span></td>
                     </tr>`;
  }
}
}
