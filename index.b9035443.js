function e(e){return e&&e.__esModule?e.default:e}var t="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},o={},n={},r=t.parcelRequired7c6;null==r&&((r=function(e){if(e in o)return o[e].exports;if(e in n){var t=n[e];delete n[e];var r={id:e,exports:{}};return o[e]=r,t.call(r.exports,r,r.exports),r.exports}var l=new Error("Cannot find module '"+e+"'");throw l.code="MODULE_NOT_FOUND",l}).register=function(e,t){n[e]=t},t.parcelRequired7c6=r),(()=>{const e=document.querySelector(".js-menu-container"),t=document.querySelector(".js-open-menu"),o=document.querySelector(".js-close-menu"),n=document.querySelector(".toggle-mode"),r=()=>{const o="true"===t.getAttribute("aria-expanded")||!1;t.setAttribute("aria-expanded",!o),e.classList.toggle("is-open"),document.body.classList.toggle("_lock"),n.classList.contains("mobile")?n.classList.remove("mobile"):n.classList.contains("mobile")||n.classList.add("mobile")};t.addEventListener("click",r),o.addEventListener("click",r),window.matchMedia("(min-width: 768px)").addEventListener("change",(o=>{o.matches&&(document.body.classList.remove("_lock"),e.classList.remove("is-open"),t.setAttribute("aria-expanded",!1))}))})(),r("ahUsk");var l=r("7Y9D8");let i="";function a(e){i=e}const d=document.querySelector(".calendar-form"),c=document.querySelector(".days"),s=document.querySelector(".current-date"),u=document.querySelectorAll(".calendar-icons span"),m=document.getElementById("input-picker"),g={openModalBtn:document.querySelector("[data-modal-open]"),modal:document.querySelector("[data-modal]"),inputField:document.querySelector(".calendar-input"),toggleBtn:document.querySelector(".calendar__button-down"),calendarBtn:document.querySelector(".form-container__icon-calendar")};let f=new Date,y=(f.getDate(),f.getMonth()),h=f.getFullYear();const b=["January","February","March","April","May","June","July","August","September","October","November","December"];function w(e){const{modal:t,inputField:o,toggleBtn:n,calendarBtn:r}=g;t.classList.toggle("hidden"),o.classList.toggle("isActive"),n.classList.toggle("switched"),r.classList.toggle("switchedColor")}g.openModalBtn.addEventListener("click",w),document.addEventListener("click",(function(e){if(e.target.closest(".calendar-form"))return;g.inputField.classList.contains("isActive")&&w()}));let v=2;const S=()=>{const e=new Date(h,y+1,1).getDay()-1,t=new Date(h,y+1,0).getDate(),o=new Date(h,y,t).getDay(),n=new Date(h,y,0).getDate();console.log(h),function(e,t,o){let n="";for(let o=e;o>0;o--)n+=`<li class="inactive">${t-o+1}</li>`;for(let e=1;e<=t;e++){const t=new Date(h,y,e);n+=`<li class="${e===f.getDate()&&y===f.getMonth()&&h===f.getFullYear()?"active":""} ${t>f?"future":""}" id="date-${e}" data-art="num-${e}">${e}</li>`}for(let e=o;e<7;e++)n+=`<li class="inactive">${e-o+1}</li>`;s.innerText=`${b[y]} ${h}`,c.innerHTML=n}(e,n,o);document.querySelector(".days").addEventListener("click",p);[...document.querySelector(".js-days").children].forEach((e=>{e.dataset.art!==`num-${v}`||e.classList.add("active")}))};function p(e){if(e.target.classList.contains("inactive"))return;[...e.currentTarget.children].forEach((e=>{e.classList.remove("active")})),e.target.classList.add("active"),v=e.target.textContent,console.log(v);let t=e.target.textContent;if(t.length>10)return;const o=(y+1).toString();m.value=`${t.padStart(2,"0")}/${o.padStart(2,"0")}/${h}`,E()}let L=!1;const E=async()=>{const t=document.querySelector(".days .active").textContent,o=(y+1).toString(),n=`${h}-${o}-${t.padStart(2,"0")}`,r=new Date(n);try{if(r>f)throw L||(e(l).Notify.failure("Invalid date. Select an earlier date "),L=!0),new Error(err);a(`${n}`),d.querySelector("[data-modal]").classList.add("hidden"),d.classList.remove("isActive"),d.querySelector(".calendar__button-down").classList.remove("switched"),d.querySelector(".form-container__icon-calendar").classList.remove("switchedColor"),L=!1}catch(e){console.log(e)}};a(`${f.getFullYear()}-${(f.getMonth()+1).toString().padStart(2,"0")}-${f.getDate().toString().padStart(2,"0")}`);const x=document.getElementById("prev-years"),k=document.getElementById("next-years");x.addEventListener("click",(()=>{const e=h-1;e<f.getFullYear()&&(h=e,S())})),k.addEventListener("click",(()=>{const t=h+1;t<=(new Date).getFullYear()?(h=t,S()):e(l).Notify.failure("Next year is beyond the current year")})),u.forEach((t=>{t.addEventListener("click",(()=>{if(nextMonth="prev"===t.id?y-1:y+1,nextMonth<0||nextMonth>11){const t=nextMonth<0?h-1:h+1;if(t>(new Date).getFullYear())return void e(l).Notify.failure("Next month is beyond the current month");h=t,y=nextMonth<0?11:0}else{if(h===(new Date).getFullYear()&&nextMonth>(new Date).getMonth())return void e(l).Notify.failure("Next month is beyond the current month");y=nextMonth}S()}))})),S();var q=r("dH5wN");r("2nhTy"),r("bSZzY");q=r("dH5wN");const M=document.querySelector(".lift-buttons");M.addEventListener("click",(function(e){if("BUTTON"!==e.target.nodeName)return;const{top:t}=q.bodyArticles.getBoundingClientRect();e.target.classList.contains("up-button")?(D=window.scrollY,window.scrollBy({top:-t*t,behavior:"smooth"}),M.firstElementChild.nextElementSibling.removeAttribute("disabled")):e.target.classList.contains("down-button")?(D=window.scrollY,window.scrollBy({top:t*t,behavior:"smooth"}),M.firstElementChild.nextElementSibling.removeAttribute("disabled")):(M.firstElementChild.nextElementSibling.setAttribute("disabled",!0),window.scrollTo({top:0*window.scrollY+D,behavior:"smooth"}))})),document.addEventListener("scroll",(function(){let e=window.pageYOffset,t=0;const o=window.scrollY;0!==e||e>100?M.firstElementChild.removeAttribute("disabled"):M.firstElementChild.setAttribute("disabled",!0);window.innerHeight+window.scrollY>=document.body.offsetHeight?(t=window.scrollY,M.lastElementChild.setAttribute("disabled",!0)):t!==o&&M.lastElementChild.removeAttribute("disabled")})),M.firstElementChild.setAttribute("disabled",!0),M.firstElementChild.nextElementSibling.setAttribute("disabled",!0);let D=0;q=r("dH5wN"),q=r("dH5wN");let _=localStorage.getItem("darkMode");const $={switcher:document.querySelector(".toggle-mode__checkbox"),switchSlider:document.querySelector(".toggle-mode__slider"),body:document.querySelector("body"),footer:document.querySelector(".footer"),darkText:document.querySelector(".toggle-mode__dark"),lightText:document.querySelector(".toggle-mode__light")};_&&($.switcher.checked=!0,$.footer.classList.add("darkmode-footer"),console.log("onstart")),$.switcher.addEventListener("click",(function(){if(_=localStorage.getItem("darkMode"),!_)return $.body.classList.add("darkmode"),$.footer.classList.add("darkmode-footer"),void localStorage.setItem("darkMode",!0);$.body.classList.remove("darkmode"),$.footer.classList.remove("darkmode-footer"),localStorage.removeItem("darkMode")})),$.switcher.addEventListener("click",(function(){$.body.style.transition="1s",console.log("animation")}),{once:!0}),q.formEl.addEventListener("submit",q.onInputSubmit);
//# sourceMappingURL=index.b9035443.js.map