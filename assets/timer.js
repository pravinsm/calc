let pr_btn =document.getElementById("pause");
let countdown;
var time;

var hours_2= document.getElementById('hour_2');
var minutes_2 = document.getElementById('minutes_2');
var seconds_2 = document.getElementById('seconds_2');

var ch=`<div class = 'item prev1' id='23h'><p>23</p></div>
        <div class = 'item active1' id='0h'><p>00</p></div>
    <div class = 'item next1' id='1h'><p>01</p></div>`;

var cm=`<div class = 'item active2' id='0m'><p>00</p></div>
        <div class = 'item next2' id='1m'><p>01</p></div>`;

var cs="<div class = 'item next3' id='1s'><p>01</p></div>";

for(i=2;i<23;i++){
  ch += `<div class = 'item' id='${i}h'><p>${(i>9) ? i : '0'+i}</p></div>`;
}
hours_2.innerHTML = ch;

for(i=2;i<59;i++){
  cm += `<div class = 'item' id='${i}m'><p>${(i>9) ? i : '0'+i}</p></div>`;
  cs += `<div class = 'item' id='${i}s'><p>${(i>9) ? i : '0'+i}</p></div>`;
}
minutes_2.innerHTML = cm+"<div class = 'item prev2' id='59m'><p>59</p></div>";
seconds_2.innerHTML = cs+"<div class = 'item prev3' id='59s'><p>59</p></div><div class = 'item active3' id='0s'><p>00</p></div>";


function hr_val(temp,i,a){
  var top_prev;
  var top_next;
  var top = document.querySelector(temp).style.top;
  top= top.replace('px','');
  top=Math.abs(top)

  if(i=='m'){
    top += 35;
    top=eval(top/35)%60;
    top_prev = top-1;
      top_prev = (top_prev < 0)? 59 : top_prev;
    top_next = top+1;
      top_next = (top_next > 59)? 0 : top_next;
  }

  if(i=='s'){
    top+= 70;
    top=eval(top/35)%60;
    top_prev = top-1;
      top_prev = (top_prev < 0)? 59 : top_prev;
    top_next = top+1;
      top_next = (top_next > 59)? 0 : top_next;
  }
  if(i=='h'){
    top=eval(top/35)%24;
    top_prev = top-1;
      top_prev = (top_prev < 0)? 23 : top_prev;
    top_next = top+1;
      top_next = (top_next > 23)? 0 : top_next;
  }
  

  var elem = document.getElementById(top+i);
  var prev = document.getElementById(top_prev+i);
  var next = document.getElementById(top_next+i);
  if(typeof elem !== 'undefined' && elem !== null) {
    var pre = document.getElementsByClassName(`prev${a}`);
    pre[0].className = pre[0].className.replace(`prev${a}`,'');

    var act = document.getElementsByClassName(`active${a}`);
    act[0].className = act[0].className.replace(`active${a}`,'');
    
    var nxt = document.getElementsByClassName(`next${a}`);
    nxt[0].className = nxt[0].className.replace(`next${a}`,'');

    elem.className += ` active${a}`;
    prev.className += ` prev${a}`;
    next.className += ` next${a}`; 
  }
}
setInterval(function(){
    hr_val('#hour_2','h','1');
    hr_val('#minutes_2','m','2');
    hr_val('#seconds_2','s','3');
  },100);



function display_timer(){
  document.getElementById("cont_timer").style.display="inline-block";
  document.getElementById("cont_stopwatch").style.display="none";
}

function display_stopwatch(){
  document.getElementById("cont_stopwatch").style.display="inline-block";
  document.getElementById("cont_timer").style.display="none";
}

function timer_cd(){
  document.getElementById("start").style.display=`none`;
  document.getElementById("restart").style.display=`flex`;
  pr_btn.style.display=`flex`;
  time=( (document.querySelector('.active1').innerText*60*60) + (document.querySelector('.active2').innerText*60) + +document.querySelector('.active3').innerText);
  countdown_time(); 
}

function countdown_time(){
  countdown= setInterval(()=>{
  time-=1;
  if(time == -1){
    clearInterval(countdown);
    var audio = new Audio('https://media.geeksforgeeks.org/wp-content/uploads/20190531135120/beep.mp3'); 
    audio.play(); 
    reset();
    return;
  }
  let seconds= time % 60;
  let minutes= Math.floor(time/60);
  let hours = Math.floor(minutes/60);
  minutes %= 60;
  hours %=60;
  document.getElementById("timer").innerHTML=`${(hours>9)?hours:'0'+hours}:${(minutes>9) ? minutes:'0'+minutes}<span style="color: red">:${(seconds>9) ? seconds:'0'+seconds}</span>`
  document.getElementById("timer_set").style.display=`none`;
  document.getElementById("timer").style.display=`flex`;
  },1000,time)
}

function reset(){
  clearInterval(countdown);
  pr_btn.className= "";
  pr_btn.innerText="Pause";
  document.getElementById("timer_set").style.display=`flex`;
  document.getElementById("start").style.display=`inherit`;
  document.getElementById("restart").style.display=`none`;
  pr_btn.style.display=`none`;
  document.getElementById("timer").style.display=`none`;
}

function pause(){
  if(pr_btn.className=="changed"){
    pr_btn.className= "";
    pr_btn.innerText="Pause";
    countdown_time();   
  }
  else{
    pr_btn.className="changed";
    pr_btn.innerText="Resume";
    clearInterval(countdown);
  }
}

window.onload = function () {
  display_stopwatch();
}
