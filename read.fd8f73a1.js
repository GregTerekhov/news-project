!function(){function e(e){return e&&e.__esModule?e.default:e}var t="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},n={},r={},a=t.parcelRequired7c6;null==a&&((a=function(e){if(e in n)return n[e].exports;if(e in r){var t=r[e];delete r[e];var a={id:e,exports:{}};return n[e]=a,t.call(a.exports,a,a.exports),a.exports}var o=new Error("Cannot find module '"+e+"'");throw o.code="MODULE_NOT_FOUND",o}).register=function(e,t){r[e]=t},t.parcelRequired7c6=a),a.register("kMC0W",(function(e,t){"use strict";Object.defineProperty(e.exports,"__esModule",{value:!0}),e.exports.default=function(e){if(Array.isArray(e))return r.default(e)};var n,r=(n=a("8NIkP"))&&n.__esModule?n:{default:n}})),a.register("8NIkP",(function(e,t){"use strict";Object.defineProperty(e.exports,"__esModule",{value:!0}),e.exports.default=function(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}})),a.register("7AJDX",(function(e,t){"use strict";Object.defineProperty(e.exports,"__esModule",{value:!0}),e.exports.default=function(e){if("undefined"!=typeof Symbol&&null!=e[Symbol.iterator]||null!=e["@@iterator"])return Array.from(e)}})),a.register("8CtQK",(function(e,t){"use strict";Object.defineProperty(e.exports,"__esModule",{value:!0}),e.exports.default=function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}})),a.register("auk6i",(function(e,t){"use strict";Object.defineProperty(e.exports,"__esModule",{value:!0}),e.exports.default=function(e,t){if(!e)return;if("string"==typeof e)return r.default(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);"Object"===n&&e.constructor&&(n=e.constructor.name);if("Map"===n||"Set"===n)return Array.from(n);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return r.default(e,t)};var n,r=(n=a("8NIkP"))&&n.__esModule?n:{default:n}}));var o={};Object.defineProperty(o,"__esModule",{value:!0}),o.default=function(e){return i.default(e)||s.default(e)||u.default(e)||c.default()};var i=l(a("kMC0W")),s=l(a("7AJDX")),c=l(a("8CtQK")),u=l(a("auk6i"));function l(e){return e&&e.__esModule?e:{default:e}}var d=a("4Nugj");a("9haEe");var f=[];function p(e,t){try{localStorage.setItem(e,JSON.stringify(t))}catch(e){console.log(e)}}d.refs.accordionListRef.addEventListener("click",(function(t){if(!t.target.hasAttribute("data-info"))return;var n=function(e){try{return JSON.parse(e)}catch(e){console.log(e)}}(t.target.dataset.favorite),r=(0,d.onGetLocaleStorageData)(d.refs.FAVORITES_KEY);if(t.target.classList.contains("js-favorites")){if(t.target.textContent="Add to favorites",t.target.classList.remove("js-favorites"),!r)return;var a=r.find((function(e,t){if(e.link===n.link)return t}));return r.splice(a,1),0===r.length?void localStorage.removeItem("FAVORITES"):void p(d.refs.FAVORITES_KEY,r)}if(t.target.textContent="Add to favorites",t.target.classList.add("js-favorites"),r){if(r.some((function(e){return e.link===n.link})))return;f=e(o)(r)}f.push(n),p(d.refs.FAVORITES_KEY,f),f=[]})),function(e){var t=(0,d.onGetLocaleStorageData)(e);if(!t||0===t.length)return void(0,d.getNoFound)(d.refs.accordionRef);n=t,n.forEach((function(e){var t='<li class="accordion-list_item">\n                <div class="accordion-title_wrapper">\n                    <p class="accordion-list_title">\n                        '.concat(e.whenRead,'\n                    </p>\n                    <div class="accordion-arrow__wraper">\n                        <svg width="14" height="9" viewBox="0 0 15 9" fill="none" xmlns="http://www.w3.org/2000/svg">\n                            <path d="M1.7625 9L-3.18545e-07 7.28745L7.5 3.27835e-07L15 7.28745L13.2375 9L7.5 3.43725L1.7625 9Z" fill="#111321"/>\n                        </svg>\n                    </div>\n                </div>\n                <div class="accordion-list_panel"></div>\n            </li>');d.refs.accordionListRef.insertAdjacentHTML("beforeend",t),document.querySelector(".accordion-list_panel").innerHTML=e.newsArray.map((function(e){var t=e.title,n=e.category,r=e.date,a=e.link,o=e.description,i=e.imageURL,s=JSON.stringify(e),c=function(e,t){if(e&&0!==e.length)return e.some((function(e){return e.link===t}))?{class:"js-favorites",addRemove:"Remove from favorites"}:{class:"zaglushka",addRemove:"Add to favourites"}}((0,d.onGetLocaleStorageData)(d.refs.FAVORITES_KEY),a);return c||(c={class:"zaglushka",addRemove:"Add to favourites"}),'<li class="markup-unit markup-unit__read" name="card">\n    <p class="markup-unit__section">'.concat(n,'</p>\n    \n    <div class="markup-unit__image-wrapper">\n    <img \n        class="markup-unit__card-image" \n        src="').concat(i,'" \n        alt="placeholder"\n        />\n    <button \n        class="markup-unit__add-favorite js-fbutton ').concat(c.class,'" \n        type="button" \n        data-info\n        data-favorite=\'').concat(s,"'\n        data-id='").concat(a,"'\n      >\n      <p \n        class=\"markup-unit__favorite-text js-fbutton\"\n        data-favorite='").concat(s,'\'\n        style="pointer-events: none;"\n      >\n          ').concat(c.addRemove,"\n      </p>\n      <svg \n          data-favorite='").concat(s,'\'  \n          class="markup-unit__favorite-icon markup-unit__favorite-icon--active js-fbutton" \n          width="15" \n          height="15" \n          viewBox="0 0 37 32"\n          style="pointer-events: none;"\n        >\n        <path d="M10.666 2.286c-4.207 0-7.619 3.377-7.619 7.543 0 3.363 1.333 11.345 14.458 19.413 0.235 0.143 0.505 0.219 0.78 0.219s0.545-0.076 0.78-0.219c13.125-8.069 14.458-16.050 14.458-19.413 0-4.166-3.412-7.543-7.619-7.543s-7.619 4.571-7.619 4.571-3.412-4.571-7.619-4.571z"></path>\n      </svg>\n    </button>\n    </div>\n    <a class="markup-unit__global-link"\n      href="').concat(a,'" \n      name="read_more"\n      target="_blank"\n      data-favorite=\'').concat(s,'\'\n    >\n    <div class="markup-unit__details">\n      <div class="markup-unit__subdetails">\n       <h2 class="markup-unit__card-header" name="card_header">\n        ').concat(t,'\n    </h2>\n    <p class="markup-unit__card-text" name="card_text">\n        ').concat(o,'\n    </p>\n        <div class="markup-unit__card-footer">\n          <p class="markup-unit__card-date">').concat(r,'</p>\n          <p \n            class="markup-unit__read-more" \n          >\n            Read more\n          </p>\n        </div>\n      </div>\n    </div>\n  </a>\n    </li>')})).join(" ")}));var n}(d.refs.READ_KEY)}();
//# sourceMappingURL=read.fd8f73a1.js.map