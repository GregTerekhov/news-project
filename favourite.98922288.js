const t=document.querySelector(".js-articles");t.addEventListener("click",(function(t){if(!t.target.classList.contains("markup-unit__read-more"))return;const n=function(){const t=new Date,n=o(t.getDate()),e=o(t.getMonth()+1),r=o(t.getFullYear());return`${n}/${e}/${r}`}(),i=r(t.target.dataset.favorite),s=e("READ_URL"),c=e("HAVE_READ");(function(t,n,e){if(t){return void(t.some((t=>t===n))||(t.push(n),a(e,t)))}a(e,[n])})(s,i.link,"READ_URL"),function(t,n,e,r){if(t){let o=[];t.forEach((t=>{const{newsArray:e}=t,r=e.some((t=>t.link===n.link));o.push(r)}));const i=o.some((t=>t));if(o=[],!i){if(t.some((t=>t.whenRead===e))){return void a(r,t.map((t=>{const{whenRead:r,newsArray:a}=t;if(r===e)return a.push(n),{whenRead:r,newsArray:a}})))}const o={whenRead:e,newsArray:[n]};t.push(o),a(r,t)}return}const o=[],i={whenRead:e,newsArray:[n]};o.push(i),a(r,o)}(c,i,n,"HAVE_READ")}));let n=[];function e(t){try{return JSON.parse(localStorage.getItem(t))}catch(t){console.log(t)}}function r(t){try{return JSON.parse(t)}catch(t){console.log(t)}}function a(t,n){try{localStorage.setItem(t,JSON.stringify(n))}catch(t){console.log(t)}}function o(t){return String(t).padStart(2,"0")}t.addEventListener("click",(function(t){if(!t.target.hasAttribute("data-info"))return;const o=r(t.target.dataset.favorite),i=e("FAVORITES");if(t.target.classList.contains("js-favorites")){if(t.target.textContent="Add to favorites",t.target.classList.remove("js-favorites"),!i)return void console.log("News isn't in favorites");const n=i.find(((t,n)=>{if(t.link===o.link)return n}));return i.splice(n,1),0===i.length?void localStorage.removeItem("FAVORITES"):void a("FAVORITES",i)}if(t.target.textContent="Remove from favorites",t.target.classList.add("js-favorites"),i){if(i.some((t=>t.link===o.link)))return void console.log("It's allredy in Favorites");n=[...i]}n.push(o),a("FAVORITES",n),n=[]}));const i=document.querySelector(".js-articles-favourites");function s(t){t.remove()}function c(t){return String(t).padStart(2,"0")}function u(t){try{return JSON.parse(localStorage.getItem(t))}catch(t){console.log(t)}}function l(t,n){try{localStorage.setItem(t,JSON.stringify(n))}catch(t){console.log(t)}}i.addEventListener("click",(function(t){if(!t.target.hasAttribute("data-info"))return;const n=t.target.closest(".markup-unit"),e=t.target.dataset.id,r=u("FAVORITES");if(!r)return void console.log("News isn't in favorites");const a=r.find(((t,n)=>{if(t.link===e)return n}));if(r.splice(a,1),0===r.length)return localStorage.removeItem("FAVORITES"),void s(n);l("FAVORITES",r),s(n)})),function(t){const n=u(t);if(!n||0===n.length)return void alert("Добавьте страницу заглушку пожалуйста. Файл favourite.js, 19-строка");!function(t){const n=t.map((t=>{const{title:n,category:e,date:r,link:a,description:o,imageURL:i}=t,s=JSON.stringify(t);let c="display: none;";return c=function(t,n){if(!t||0===t.length)return;return t.some((t=>t===n))?"display: flex;":"display: none;"}(u("READ_URL"),a),c||(c="display: none;"),`<li class="markup-unit markup-unit__read" name="card">\n    <p class="markup-unit__section">${e}</p>\n    <p class="markup-unit__already-read" style='${c}'>Already read\n    <svg class="markup-unit__icon-check" width="18" height="18" viewBox="0 0 37 32">\n      <path stroke="#00DD73" stroke-linejoin="miter" stroke-linecap="square" stroke-miterlimit="4" stroke-width="2.2857" d="M28.779 6.389c-0.288 0.009-0.546 0.131-0.732 0.323l-16.313 16.313-6.713-6.713c-0.195-0.209-0.473-0.339-0.78-0.339-0.589 0-1.067 0.478-1.067 1.067 0 0.308 0.13 0.585 0.339 0.78l0.001 0.001 7.467 7.467c0.193 0.193 0.459 0.312 0.754 0.312s0.561-0.119 0.754-0.312v0l17.067-17.067c0.199-0.194 0.323-0.465 0.323-0.765 0-0.589-0.478-1.067-1.067-1.067-0.011 0-0.022 0-0.033 0l0.002-0z"></path>\n    </svg>\n    </p>\n    <img \n        class="markup-unit__card-image" \n        src="${i}" \n        alt="placeholder"\n        />\n    <button \n        class="markup-unit__add-favorite js-fbutton js-favorites" \n        type="button" \n        data-info\n        data-favorite='${s}'\n        data-id='${a}'\n      >\n      <p \n        class="markup-unit__favorite-text js-fbutton"\n        data-favorite='${s}'\n        style="pointer-events: none;"\n      >\n          Remove from favourites\n      </p>\n      <svg \n          data-favorite='${s}'  \n          class="markup-unit__favorite-icon markup-unit__favorite-icon--active js-fbutton" \n          width="15" \n          height="15" \n          viewBox="0 0 37 32"\n          style="pointer-events: none;"\n        >\n        <path style="stroke: var(--color1, #4440f7)" stroke-linejoin="round" stroke-linecap="round" stroke-miterlimit="4" stroke-width="2.2857" d="M10.666 2.286c-4.207 0-7.619 3.377-7.619 7.543 0 3.363 1.333 11.345 14.458 19.413 0.235 0.143 0.505 0.219 0.78 0.219s0.545-0.076 0.78-0.219c13.125-8.069 14.458-16.050 14.458-19.413 0-4.166-3.412-7.543-7.619-7.543s-7.619 4.571-7.619 4.571-3.412-4.571-7.619-4.571z"></path>\n      </svg>\n    </button>\n    <h2 class="markup-unit__card-header" name="card_header">\n        ${n}\n    </h2>\n    <p class="markup-unit__card-text" name="card_text">\n        ${o}\n    </p>\n    <div class="markup-unit__card-footer">\n        <p class="markup-unit__card-date">${r}</p>\n      <a \n        class="markup-unit__read-more" \n        href="${a}" \n        name="read_more"\n        data-favorite='${s}'\n      >\n          Read more\n      </a>\n    </div>\n    </li>`})).join(" ");i.innerHTML=n}(n)}("FAVORITES"),i.addEventListener("click",(function(t){if(!t.target.classList.contains("markup-unit__read-more"))return;const n=function(){const t=new Date,n=c(t.getDate()),e=c(t.getMonth()+1),r=c(t.getFullYear());return`${n}/${e}/${r}`}(),e=function(t){try{return JSON.parse(t)}catch(t){console.log(t)}}(t.target.dataset.favorite),r=u("READ_URL"),a=u("HAVE_READ");(function(t,n,e){if(t){return void(t.some((t=>t===n))||(t.push(n),l(e,t)))}l(e,[n])})(r,e.link,"READ_URL"),function(t,n,e,r){if(t){const a=[];t.forEach((t=>{const{newsArray:e}=t,r=e.some((t=>t.link===n.link));a.push(r)}));if(!a.some((t=>t))){if(t.some((t=>t.whenRead===e))){const a=t.map((t=>{const{whenRead:r,newsArray:a}=t;if(r===e)return a.push(n),{whenRead:r,newsArray:a}}));return console.log(a),void l(r,a)}const a={whenRead:e,newsArray:[n]};t.push(a),l(r,t)}return}const a=[],o={whenRead:e,newsArray:[n]};a.push(o),l(r,a)}(a,e,n,"HAVE_READ")}));
//# sourceMappingURL=favourite.98922288.js.map
