!function(){function t(t){return t&&t.__esModule?t.default:t}var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},n={},r={},a=e.parcelRequired7c6;null==a&&((a=function(t){if(t in n)return n[t].exports;if(t in r){var e=r[t];delete r[t];var a={id:t,exports:{}};return n[t]=a,e.call(a.exports,a,a.exports),a.exports}var o=new Error("Cannot find module '"+t+"'");throw o.code="MODULE_NOT_FOUND",o}).register=function(t,e){r[t]=e},e.parcelRequired7c6=a),a.register("kMC0W",(function(t,e){"use strict";Object.defineProperty(t.exports,"__esModule",{value:!0}),t.exports.default=function(t){if(Array.isArray(t))return r.default(t)};var n,r=(n=a("8NIkP"))&&n.__esModule?n:{default:n}})),a.register("8NIkP",(function(t,e){"use strict";Object.defineProperty(t.exports,"__esModule",{value:!0}),t.exports.default=function(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,r=new Array(e);n<e;n++)r[n]=t[n];return r}})),a.register("7AJDX",(function(t,e){"use strict";Object.defineProperty(t.exports,"__esModule",{value:!0}),t.exports.default=function(t){if("undefined"!=typeof Symbol&&null!=t[Symbol.iterator]||null!=t["@@iterator"])return Array.from(t)}})),a.register("8CtQK",(function(t,e){"use strict";Object.defineProperty(t.exports,"__esModule",{value:!0}),t.exports.default=function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}})),a.register("auk6i",(function(t,e){"use strict";Object.defineProperty(t.exports,"__esModule",{value:!0}),t.exports.default=function(t,e){if(!t)return;if("string"==typeof t)return r.default(t,e);var n=Object.prototype.toString.call(t).slice(8,-1);"Object"===n&&t.constructor&&(n=t.constructor.name);if("Map"===n||"Set"===n)return Array.from(n);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return r.default(t,e)};var n,r=(n=a("8NIkP"))&&n.__esModule?n:{default:n}}));var o={};Object.defineProperty(o,"__esModule",{value:!0}),o.default=function(t){return i.default(t)||u.default(t)||c.default(t)||s.default()};var i=l(a("kMC0W")),u=l(a("7AJDX")),s=l(a("8CtQK")),c=l(a("auk6i"));function l(t){return t&&t.__esModule?t:{default:t}}var f=document.querySelector(".js-articles"),d="HAVE_READ",p="READ_URL";f.addEventListener("click",(function(t){if(!t.target.classList.contains("markup-unit__read-more"))return;var e=(o=new Date,i=y(o.getDate()),u=y(o.getMonth()+1),s=y(o.getFullYear()),"".concat(i,"/").concat(u,"/").concat(s)),n=h(t.target.dataset.favorite),r=g(p),a=g(d);var o,i,u,s;(function(t,e,n){if(t){return void(t.some((function(t){return t===e}))||(t.push(e),_(n,t)))}_(n,[e])})(r,n.link,p),function(t,e,n,r){if(t){var a=[];t.forEach((function(t){var n=t.newsArray.some((function(t){return t.link===e.link}));a.push(n)}));var o=a.some((function(t){return t}));if(a=[],!o){if(t.some((function(t){return t.whenRead===n})))return void _(r,t.map((function(t){var r=t.whenRead,a=t.newsArray;if(r===n)return a.push(e),{whenRead:r,newsArray:a}})));var i={whenRead:n,newsArray:[e]};t.push(i),_(r,t)}return}var u=[],s={whenRead:n,newsArray:[e]};u.push(s),_(r,u)}(a,n,e,d)}));var v="FAVORITES",m=[];function g(t){try{return JSON.parse(localStorage.getItem(t))}catch(t){console.log(t)}}function h(t){try{return JSON.parse(t)}catch(t){console.log(t)}}function _(t,e){try{localStorage.setItem(t,JSON.stringify(e))}catch(t){console.log(t)}}function y(t){return String(t).padStart(2,"0")}f.addEventListener("click",(function(e){if(!e.target.hasAttribute("data-info"))return;var n=h(e.target.dataset.favorite),r=g(v);if(e.target.classList.contains("js-favorites")){if(e.target.textContent="Add to favorites",e.target.classList.remove("js-favorites"),!r)return void console.log("News isn't in favorites");var a=r.find((function(t,e){if(t.link===n.link)return e}));return r.splice(a,1),0===r.length?void localStorage.removeItem("FAVORITES"):void _(v,r)}if(e.target.textContent="Remove from favorites",e.target.classList.add("js-favorites"),r){if(r.some((function(t){return t.link===n.link})))return void console.log("It's allredy in Favorites");m=t(o)(r)}m.push(n),_(v,m),m=[]}));var k="HAVE_READ",w="READ_URL",A="FAVORITES",S=document.querySelector(".js-articles-favourites");function b(t){t.remove()}function R(t){return String(t).padStart(2,"0")}function x(t){try{return JSON.parse(localStorage.getItem(t))}catch(t){console.log(t)}}function j(t,e){try{localStorage.setItem(t,JSON.stringify(e))}catch(t){console.log(t)}}S.addEventListener("click",(function(t){if(!t.target.hasAttribute("data-info"))return;var e=t.target.closest(".markup-unit"),n=t.target.dataset.id,r=x(A);if(!r)return void console.log("News isn't in favorites");var a=r.find((function(t,e){if(t.link===n)return e}));if(r.splice(a,1),0===r.length)return localStorage.removeItem("FAVORITES"),void b(e);j(A,r),b(e)})),function(t){var e=x(t);if(!e||0===e.length)return void alert("Добавьте страницу заглушку пожалуйста. Файл favourite.js, 19-строка");n=e,r=n.map((function(t){var e=t.title,n=t.category,r=t.date,a=t.link,o=t.description,i=t.imageURL,u=JSON.stringify(t),s="display: none;";return(s=function(t,e){if(t&&0!==t.length)return t.some((function(t){return t===e}))?"display: flex;":"display: none;"}(x(w),a))||(s="display: none;"),'<li class="markup-unit markup-unit__read" name="card">\n    <p class="markup-unit__section">'.concat(n,'</p>\n    <p class="markup-unit__already-read" style=\'').concat(s,'\'>Already read\n    <svg class="markup-unit__icon-check" width="18" height="18" viewBox="0 0 37 32">\n      <path stroke="#00DD73" stroke-linejoin="miter" stroke-linecap="square" stroke-miterlimit="4" stroke-width="2.2857" d="M28.779 6.389c-0.288 0.009-0.546 0.131-0.732 0.323l-16.313 16.313-6.713-6.713c-0.195-0.209-0.473-0.339-0.78-0.339-0.589 0-1.067 0.478-1.067 1.067 0 0.308 0.13 0.585 0.339 0.78l0.001 0.001 7.467 7.467c0.193 0.193 0.459 0.312 0.754 0.312s0.561-0.119 0.754-0.312v0l17.067-17.067c0.199-0.194 0.323-0.465 0.323-0.765 0-0.589-0.478-1.067-1.067-1.067-0.011 0-0.022 0-0.033 0l0.002-0z"></path>\n    </svg>\n    </p>\n    <img \n        class="markup-unit__card-image" \n        src="').concat(i,'" \n        alt="placeholder"\n        />\n    <button \n        class="markup-unit__add-favorite js-fbutton js-favorites" \n        type="button" \n        data-info\n        data-favorite=\'').concat(u,"'\n        data-id='").concat(a,"'\n      >\n      <p \n        class=\"markup-unit__favorite-text js-fbutton\"\n        data-favorite='").concat(u,"'\n        style=\"pointer-events: none;\"\n      >\n          Remove from favourites\n      </p>\n      <svg \n          data-favorite='").concat(u,'\'  \n          class="markup-unit__favorite-icon markup-unit__favorite-icon--active js-fbutton" \n          width="15" \n          height="15" \n          viewBox="0 0 37 32"\n          style="pointer-events: none;"\n        >\n        <path style="stroke: var(--color1, #4440f7)" stroke-linejoin="round" stroke-linecap="round" stroke-miterlimit="4" stroke-width="2.2857" d="M10.666 2.286c-4.207 0-7.619 3.377-7.619 7.543 0 3.363 1.333 11.345 14.458 19.413 0.235 0.143 0.505 0.219 0.78 0.219s0.545-0.076 0.78-0.219c13.125-8.069 14.458-16.050 14.458-19.413 0-4.166-3.412-7.543-7.619-7.543s-7.619 4.571-7.619 4.571-3.412-4.571-7.619-4.571z"></path>\n      </svg>\n    </button>\n    <h2 class="markup-unit__card-header" name="card_header">\n        ').concat(e,'\n    </h2>\n    <p class="markup-unit__card-text" name="card_text">\n        ').concat(o,'\n    </p>\n    <div class="markup-unit__card-footer">\n        <p class="markup-unit__card-date">').concat(r,'</p>\n      <a \n        class="markup-unit__read-more" \n        href="').concat(a,'" \n        name="read_more"\n        data-favorite=\'').concat(u,"'\n      >\n          Read more\n      </a>\n    </div>\n    </li>")})).join(" "),S.innerHTML=r;var n,r}(A),S.addEventListener("click",(function(t){if(!t.target.classList.contains("markup-unit__read-more"))return;var e=(o=new Date,i=R(o.getDate()),u=R(o.getMonth()+1),s=R(o.getFullYear()),"".concat(i,"/").concat(u,"/").concat(s)),n=function(t){try{return JSON.parse(t)}catch(t){console.log(t)}}(t.target.dataset.favorite),r=x(w),a=x(k);var o,i,u,s;(function(t,e,n){if(t){return void(t.some((function(t){return t===e}))||(t.push(e),j(n,t)))}j(n,[e])})(r,n.link,w),function(t,e,n,r){if(t){var a=[];if(t.forEach((function(t){var n=t.newsArray.some((function(t){return t.link===e.link}));a.push(n)})),!a.some((function(t){return t}))){if(t.some((function(t){return t.whenRead===n}))){var o=t.map((function(t){var r=t.whenRead,a=t.newsArray;if(r===n)return a.push(e),{whenRead:r,newsArray:a}}));return console.log(o),void j(r,o)}var i={whenRead:n,newsArray:[e]};t.push(i),j(r,t)}return}var u=[],s={whenRead:n,newsArray:[e]};u.push(s),j(r,u)}(a,n,e,k)}))}();
//# sourceMappingURL=favourite.a8c43789.js.map
