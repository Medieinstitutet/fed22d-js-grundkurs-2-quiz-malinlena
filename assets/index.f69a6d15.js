(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))i(e);new MutationObserver(e=>{for(const n of e)if(n.type==="childList")for(const u of n.addedNodes)u.tagName==="LINK"&&u.rel==="modulepreload"&&i(u)}).observe(document,{childList:!0,subtree:!0});function o(e){const n={};return e.integrity&&(n.integrity=e.integrity),e.referrerpolicy&&(n.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?n.credentials="include":e.crossorigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function i(e){if(e.ep)return;e.ep=!0;const n=o(e);fetch(e.href,n)}})();function f(t){return t.sort(()=>.5-Math.random())}function l(t){t.classList.remove("hidden")}function s(t){t.classList.add("hidden")}const A=[{questionText:"Det svenska bandet Kent har ett album med en vit tiger p\xE5 omslaget, vad heter albumet?",answerOptions:["Hagnesta Hill","Vapen och ammunition","Tigerdrottningen"],correctAnswer:"Vapen och ammunition",category:"Medel",image:"/public/images/bengal-tiger.jpg"},{questionText:'Vilket band har gjort l\xE5ten "Master of puppets"?',answerOptions:["Judas Priest","Slayer","Metallica"],correctAnswer:"Metallica",category:"L\xE4tt",image:"/public/images/puppet-master.jpg"},{questionText:'Vilken manlig artist fr\xE5n G\xF6teborg har ett album som heter "Stj\xE4rnorna finns h\xE4r"?',answerOptions:["H\xE5kan Hellstr\xF6m","Kapten R\xF6d","Albin Lee Meldau"],correctAnswer:"Kapten R\xF6d",category:"Sv\xE5r",image:"/public/images/goteborg-kyrka.jpg"},{questionText:'Prince, som \xE4r mest k\xE4nd f\xF6r sin l\xE5t "Purple rain" gick ur tiden \xE5r 2016. Vilket datum dog han?',answerOptions:["21 April","17 Maj","5 Juni"],correctAnswer:"21 April",category:"Sv\xE5r",image:"/public/images/prince-2016.jpg"},{questionText:'Duon "Hooja" fr\xE5n G\xE4llivare har en l\xE5t med diverse frukter med i titeln. Vilken av dessa frukter finns INTE med i l\xE5tens titel?',answerOptions:["Melon","Citron","P\xE4ron"],correctAnswer:"P\xE4ron",category:"L\xE4tt",image:"/public/images/fruits-music.png"},{questionText:'Norska musiker har f\xE5tt ett uppsving p\xE5 svenska topplistan p\xE5 Spotify senaste tiden. Vem/vilka av dessa har gjort l\xE5tarna "Valhalla" "Polisen" samt "Vil ha dig"?',answerOptions:["Ringnes-Ronny","Kuselofte","Ylvis"],correctAnswer:"Ringnes-Ronny",category:"Medel",image:"/public/images/norway-music.jpg"},{questionText:"Vilket artistnamn \xE4r Marshall Bruce Mathers III mer k\xE4nd som?",answerOptions:["Dr. Dre","Eminem","50 Cent"],correctAnswer:"Eminem",category:"Medel",image:"/public/images/marshall-music.jpg"},{questionText:'Vad heter rapparen som har gjort l\xE5ten "Gangstas Paradise"?',answerOptions:["Coolio","Eazy-E","2Pac"],correctAnswer:"Coolio",category:"Medel",image:"/public/images/hip-hop-music.jpg"}],O=document.getElementById("game-description"),x=document.querySelector(".question-text"),j=document.querySelector(".start-game-button"),I=document.querySelector(".restart-game-button"),d=document.querySelector(".game-over"),B=document.querySelector(".next-question-button"),N=document.querySelectorAll(".highscore-button"),p=document.querySelector(".question-container"),C=document.querySelector(".player-details"),y=document.querySelector(".quiz-container"),w=document.querySelector(".highscore-container"),H=document.querySelector(".highscore-list"),h=document.querySelector(".back-button");let a=0,c=0,m=f(A),q="",b="",g=null,v=null;j.addEventListener("click",S);I.addEventListener("click",G);B.addEventListener("click",T);N.forEach(t=>t.addEventListener("click",R));h.addEventListener("click",P);function P(){E(),l(y)}function S(){const t=document.getElementById("playerNameInput");v=setTimeout(L,5*60*1e3),q=t.value,s(O),s(C),l(p),k()}function V(){const t=m[a].correctAnswer;b===t?c++:c--}function D(t){b=t.currentTarget.nextSibling.textContent,g===null&&(g=setTimeout(T,5e3))}function k(){if(a>=m.length){L();return}const t=document.querySelector(".answer-container"),r=m[a],o=f(r.answerOptions);x.innerHTML=m[a].questionText,t.innerHTML="",o.forEach(e=>{t.innerHTML+=`<div class="button">
    <input type="radio" name="answerButton" class="answer-button"><label>${e}</label>
    </div>`}),document.querySelectorAll(".answer-button").forEach(e=>{e.addEventListener("change",D)})}function T(){clearTimeout(g),g=null,V(),a++,k()}function G(){s(d),l(p),a=0,c=0,S()}function L(){var e;const t=document.getElementById("pointsContainer");clearTimeout(v),t.innerHTML=`Du fick ${c} po\xE4ng!`;const r=(e=JSON.parse(localStorage.getItem("highscore")))!=null?e:[];console.log("highscore",r);const o=r.map(n=>n.score),i=Math.min(...o);if(c>i||r.length<10){const n=[...r,{name:q,score:c}].sort((u,M)=>M.score-u.score);n.length>10&&n.pop(),localStorage.setItem("highscore",JSON.stringify(n))}l(d),s(p)}function E(){s(d),s(y),s(w),s(h)}function R(){var r;E(),l(w);const t=(r=JSON.parse(localStorage.getItem("highscore")))!=null?r:[];H.innerHTML=t.map((o,i)=>`
    <div class="highscore-record">
      <span>${i+1}. ${o.name}</span> <span>${o.score} p</span>
    </div>
  `).join(""),l(h)}