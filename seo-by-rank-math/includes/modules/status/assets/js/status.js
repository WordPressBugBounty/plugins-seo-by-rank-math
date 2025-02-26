!function(){"use strict";var e={n:function(t){var a=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(a,{a:a}),a},d:function(t,a){for(var o in a)e.o(a,o)&&!e.o(t,o)&&Object.defineProperty(t,o,{enumerable:!0,get:a[o]})},o:function(e,t){return Object.prototype.hasOwnProperty.call(e,t)}},t=jQuery,a=e.n(t),o=lodash,n=wp.i18n,r=wp.hooks,s=rankMathAnalyzer,i={};(0,o.isUndefined)(rankMath.assessor)||(0,o.forEach)(rankMath.assessor.diacritics,(function(e,t){return i[t]=new RegExp(e,"g")}));var c,d=function(e){if((0,o.isUndefined)(e))return e;for(var t in i)e=e.replace(i[t],t);return e};function l(e){return l="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},l(e)}(c=a())((function(){var e=c(".rank-math-tab-nav");function t(t,a){var o=arguments.length>2&&void 0!==arguments[2]?arguments[2]:5e3;a=a||"error";var n=c('<div class="notice is-dismissible rank-math-tool-notice"><p></p></div>');n.hide().addClass("notice-"+a).find("p").text(t),e.prev(".notice").remove(),e.before(n),n.slideDown(),c("html,body").animate({scrollTop:n.offset().top-50},"slow"),c(document).trigger("wp-updates-notice-added"),o&&setTimeout((function(){n.fadeOut()}),o)}var a=0,i=rankMath.batchSize,u=!c("#update_all_posts").length||c("#update_all_posts").is(":checked")?rankMath.totalPosts:rankMath.totalPostsWithoutScore,p=u?100/u:0,h=[],f=0;function m(e,t){var l={};return t.addClass("disabled"),c("#update_all_scores").prop("disabled",!0),"complete"===e?(c(".progress-bar span").css("width","100%"),c(".count span.update-posts-done").text(u),void c(".rank-math-modal-footer").removeClass("hidden")):new Promise((function(t){(0,o.forEach)(e,(function(e,t){if(-1===h.indexOf(t)){(0,r.doAction)("rank_math_pre_update_seo_score",e,t);var a=d(e.keyword);h.push(t);var n=new s.ResultManager,i=wp.i18n,c=new s.Paper("",{locale:rankMath.localeFull});c.setTitle(e.title),c.setDescription(e.description),c.setText(e.content),c.setKeyword(a),c.setKeywords(e.keywords),c.setPermalink(e.url),c.setUrl(d(e.url)),e.thumbnail&&(c.setThumbnail(e.thumbnail),c.setThumbnailAltText(e.thumbnailAlt)),c.setContentAI(e.hasContentAi),e.schemas&&c.setSchema(e.schemas);var u=function(e){var t=rankMath.assessor.researchesTests;return t=(0,o.difference)(t,["keywordNotUsed"]),(0,r.applyFilters)("rank_math_update_score_researches_tests",t,e)}(e);new s.Analyzer({i18n:i,analysis:u}).analyzeSome(u,c).then((function(e){n.update(c.getKeyword(),e,!0),l[t]=n.getScore(c.getKeyword())}))}})),t()})).then((function(){c.ajax({url:rankMath.api.root+"rankmath/v1/updateSeoScore",method:"POST",beforeSend:function(e){e.setRequestHeader("X-WP-Nonce",rankMath.restNonce)},data:{action:"rank_math_update_seo_score",postScores:l},success:function(e){if(1==e)if(f+=i,a+=p*i,c(".progress-bar span").css("width",a+"%"),c(".count span.update-posts-done").text(f),f>=u)c(".progress-bar span").css("width","100%"),c(".count span.update-posts-done").text(u),c(".rank-math-modal-footer").removeClass("hidden");else{var o=t.data("args")||{};o.offset=f,t.data("args",o),k(t)}},error:function(e){c(".rank-math-modal-footer").removeClass("hidden").find("p").text((0,n.__)("Something went wrong. Please refresh the page and try again.","rank-math"))}})}))}function k(e){var a=e.data("action"),o=e.data("args");c.ajax({url:rankMath.api.root+"rankmath/v1/toolsAction",method:"POST",beforeSend:function(e){e.setRequestHeader("X-WP-Nonce",rankMath.restNonce)},data:{action:a,args:o}}).always((function(){e.removeAttr("disabled")})).fail((function(e){e&&(e.responseJSON&&e.responseJSON.message?t(e.responseJSON.message):t(e.statusText))})).done((function(o){if(o){if("update_seo_score"===a)return void m(o,e);if("string"==typeof o)return void t(o,"success",!1);if("object"===l(o)&&o.status&&o.message)return void t(o.message,o.status,!1)}t((0,n.__)("Something went wrong. Please try again later.","rank-math"))}))}c(".tools-action").on("click",(function(e){e.preventDefault();var t=c(this);return t.data("confirm")&&!confirm(t.data("confirm"))||(t.attr("disabled","disabled"),"update_seo_score"===t.data("action")&&c(".rank-math-modal-update-score").addClass("show"),k(t)),!1})),c(".rank-math-modal .rank-math-modal-close").on("click",(function(){if(void 0!==rankMath.startUpdateScore&&rankMath.startUpdateScore)return window.close(),!0;c(this).closest(".rank-math-modal").css("display","none")})),void 0!==rankMath.startUpdateScore&&rankMath.startUpdateScore&&c('.tools-action[data-action="update_seo_score"]').trigger("click");var _=c("tr.update_seo_score");if(_.length){var v=(0,n.__)("Include posts/pages where the score is already set","rank-math");rankMath.totalPostsWithoutScore>0&&_.find("td").append('<div class="update_all_scores"><label><input type="checkbox" name="update_all_scores" id="update_all_scores" value="1" checked="checked" /> '.concat(v,"</label></div>")),c("#update_all_scores").on("change",(function(){var e=c(this),t=_.find("a.button"),a=t.data("args")||{};a.update_all_scores=e.is(":checked")?1:0,t.data("args",a),u=e.is(":checked")?rankMath.totalPosts:rankMath.totalPostsWithoutScore,p=100/u,c(".count span.update-posts-total").text(u)})).trigger("change")}}))}();