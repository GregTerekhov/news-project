!function(){var e={READ_URL_KEY:"READ_URL",FAVORITES_KEY:"FAVORITES",bodyContainerEl:document.querySelector(".js-body-container"),switcher:document.querySelectorAll(".toggle-mode__checkbox"),switchSlider:document.querySelectorAll(".toggle-mode__slider"),body:document.querySelector("body"),footer:document.querySelector(".footer"),darkText:document.querySelectorAll(".toggle-mode__dark"),lightText:document.querySelectorAll(".toggle-mode__light"),articles:document.querySelector(".articles"),categories:document.querySelector(".categories"),date:document.querySelector("#input-picker")};function t(e){try{return JSON.parse(localStorage.getItem(e))}catch(e){console.log(e)}}var n=localStorage.getItem("darkMode");!function(){if(n){for(var t=0;t<e.switcher.length;t+=1)e.switcher[t].checked=!0;e.footer.classList.add("darkmode-footer")}}();for(var r=0;r<e.switcher.length;r+=1)e.switcher[r].addEventListener("click",o),e.switcher[r].addEventListener("click",a,{once:!0});function a(){e.body.style.transition="1s"}function o(){if(!(n=localStorage.getItem("darkMode")))return!0!==e.switcher[0].checked?e.switcher[0].checked=!0:!0!==e.switcher[1].checked&&(e.switcher[1].checked=!0),e.body.classList.add("darkmode"),e.footer.classList.add("darkmode-footer"),void localStorage.setItem("darkMode",!0);!1!==e.switcher[0].checked?e.switcher[0].checked=!1:!1!==e.switcher[1].checked&&(e.switcher[1].checked=!1),e.body.classList.remove("darkmode"),e.footer.classList.remove("darkmode-footer"),localStorage.removeItem("darkMode")}document.querySelector(".toggle-mode").addEventListener("submit",(function(e){try{e.preventDefault()}catch(e){console.log(e)}}));var c="HAVE_READ",i="READ_URL",s="FAVORITES",d=t(i),u=document.querySelector(".js-articles-favourites");function l(e){e.remove()}function f(e){return String(e).padStart(2,"0")}function t(e){try{return JSON.parse(localStorage.getItem(e))}catch(e){console.log(e)}}function m(e,t){try{localStorage.setItem(e,JSON.stringify(t))}catch(e){console.log(e)}}u.addEventListener("click",(function(e){if(!e.target.hasAttribute("data-info"))return;var n=e.target.closest(".markup-unit"),r=e.target.dataset.id,a=t(s);if(!a)return;var o=a.find((function(e,t){if(e.link===r)return t}));if(a.splice(o,1),0===a.length)return localStorage.removeItem("FAVORITES"),void l(n);m(s,a),l(n)})),function(e){var n=t(e);if(!n||0===n.length)return void(u.innerHTML='<div class="no-found">\n  <h1 class="no-found__text">We haven\'t found news from this category</h1>\n  <div class="no-found__image"></div>\n  </div>');r=n,a=r.map((function(e){var n=e.title,r=e.category,a=e.date,o=e.link,c=e.description,s=e.imageURL,d=JSON.stringify(e),u="display: none;",l=t(i);return(u=function(e,t){if(e&&0!==e.length)return e.some((function(e){return e===t}))?"display: flex;":"display: none;"}(l,o))||(u="display: none;"),'<li class="markup-unit markup-unit__read" name="card">\n    <p class="markup-unit__section">'.concat(r,"</p>\n      ").concat((null==l?void 0:l.find((function(e){return e===o})))?'<p class="markup-unit__already-read" style=\''.concat(u,'\'>Already read\n      <svg class="markup-unit__icon-check" width="18" height="18" viewBox="0 0 37 32">\n        <path stroke="#00DD73" stroke-linejoin="miter" stroke-linecap="square" stroke-miterlimit="4" stroke-width="2.2857" d="M28.779 6.389c-0.288 0.009-0.546 0.131-0.732 0.323l-16.313 16.313-6.713-6.713c-0.195-0.209-0.473-0.339-0.78-0.339-0.589 0-1.067 0.478-1.067 1.067 0 0.308 0.13 0.585 0.339 0.78l0.001 0.001 7.467 7.467c0.193 0.193 0.459 0.312 0.754 0.312s0.561-0.119 0.754-0.312v0l17.067-17.067c0.199-0.194 0.323-0.465 0.323-0.765 0-0.589-0.478-1.067-1.067-1.067-0.011 0-0.022 0-0.033 0l0.002-0z"></path>\n      </svg>\n      </p>'):"",'\n    <img \n        class="markup-unit__card-image" \n        src="').concat(s,'" \n        alt="placeholder"\n        />\n    <button \n        class="markup-unit__add-favorite js-fbutton js-favorites" \n        type="button" \n        data-info\n        data-favorite=\'').concat(d,"'\n        data-id='").concat(o,"'\n      >\n      <p \n        class=\"markup-unit__favorite-text js-fbutton\"\n        data-favorite='").concat(d,"'\n        style=\"pointer-events: none;\"\n      >\n          Remove from favourites\n      </p>\n      <svg \n          data-favorite='").concat(d,'\'  \n          class="markup-unit__favorite-icon markup-unit__favorite-icon--active js-fbutton" \n          width="15" \n          height="15" \n          viewBox="0 0 37 32"\n          style="pointer-events: none;"\n        >\n        <path style="stroke: var(--color1, #4440f7)" stroke-linejoin="round" stroke-linecap="round" stroke-miterlimit="4" stroke-width="2.2857" d="M10.666 2.286c-4.207 0-7.619 3.377-7.619 7.543 0 3.363 1.333 11.345 14.458 19.413 0.235 0.143 0.505 0.219 0.78 0.219s0.545-0.076 0.78-0.219c13.125-8.069 14.458-16.050 14.458-19.413 0-4.166-3.412-7.543-7.619-7.543s-7.619 4.571-7.619 4.571-3.412-4.571-7.619-4.571z"></path>\n      </svg>\n    </button>\n    <a class="markup-unit__global-link"\n      href="').concat(o,'" \n      name="read_more"\n      target="_blank"\n      data-favorite=\'').concat(d,'\'\n    >\n    <div class="markup-unit__details">\n      <div class="markup-unit__subdetails">\n       <h2 class="markup-unit__card-header" name="card_header">\n        ').concat(n,'\n    </h2>\n    <p class="markup-unit__card-text" name="card_text">\n        ').concat(c,'\n    </p>\n        <div class="markup-unit__card-footer">\n          <p class="markup-unit__card-date">').concat(a,'</p>\n          <p \n            class="markup-unit__read-more" \n          >\n            Read more\n          </p>\n        </div>\n      </div>\n    </div>\n  </a>\n    </li>')})).join(" "),u.innerHTML=a;var r,a}(s),u.addEventListener("click",(function(e){if(!e.target.classList.contains("markup-unit__read-more"))return;var n=(o=new Date,s=f(o.getDate()),u=f(o.getMonth()+1),l=f(o.getFullYear()),"".concat(s,"/").concat(u,"/").concat(l)),r=function(e){try{return JSON.parse(e)}catch(e){console.log(e)}}(e.target.dataset.favorite),a=t(c);var o,s,u,l;(function(e,t,n){if(e){return void(e.some((function(e){return e===t}))||(e.push(t),m(n,e)))}m(n,[t])})(d,r.link,i),function(e,t,n,r){if(e){var a=[];if(e.forEach((function(e){var n=e.newsArray.some((function(e){return e.link===t.link}));a.push(n)})),!a.some((function(e){return e}))){if(e.some((function(e){return e.whenRead===n})))return void m(r,e.map((function(e){var r=e.whenRead,a=e.newsArray;if(r===n)return a.push(t),{whenRead:r,newsArray:a}})));var o={whenRead:n,newsArray:[t]};e.push(o),m(r,e)}return}var c=[],i={whenRead:n,newsArray:[t]};c.push(i),m(r,c)}(a,r,n,c)}))}();
//# sourceMappingURL=favourite.520fd259.js.map