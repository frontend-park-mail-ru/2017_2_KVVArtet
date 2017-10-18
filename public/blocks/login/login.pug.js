function pug_attr(t,e,n,f){return e!==!1&&null!=e&&(e||"class"!==t&&"style"!==t)?e===!0?" "+(f?t:t+'="'+t+'"'):("function"==typeof e.toJSON&&(e=e.toJSON()),"string"==typeof e||(e=JSON.stringify(e),n||e.indexOf('"')===-1)?(n&&(e=pug_escape(e))," "+t+'="'+e+'"'):" "+t+"='"+e.replace(/'/g,"&#39;")+"'"):""}
function pug_escape(e){var a=""+e,t=pug_match_html.exec(a);if(!t)return e;var r,c,n,s="";for(r=t.index,c=0;r<a.length;r++){switch(a.charCodeAt(r)){case 34:n="&quot;";break;case 38:n="&amp;";break;case 60:n="&lt;";break;case 62:n="&gt;";break;default:continue}c!==r&&(s+=a.substring(c,r)),c=r+1,s+=n}return c!==r?s+a.substring(c,r):s}
var pug_match_html=/["&<>]/;
function pug_rethrow(n,e,r,t){if(!(n instanceof Error))throw n;if(!("undefined"==typeof window&&e||t))throw n.message+=" on line "+r,n;try{t=t||require("fs").readFileSync(e,"utf8")}catch(e){pug_rethrow(n,null,r)}var i=3,a=t.split("\n"),o=Math.max(r-i,0),h=Math.min(a.length,r+i),i=a.slice(o,h).map(function(n,e){var t=e+o+1;return(t==r?"  > ":"    ")+t+"| "+n}).join("\n");throw n.path=e,n.message=(e||"Pug")+":"+r+"\n"+i+"\n\n"+n.message,n}function loginTemplate(locals) {var pug_html = "", pug_mixins = {}, pug_interp;var pug_debug_filename, pug_debug_line;try {var pug_debug_sources = {".\u002Fpublic\u002Fblocks\u002F\u002Flogin\u002Flogin.pug":"html\n    head\n    link(rel='stylesheet', href='css\u002Flogin.css')\n    script(src=\"\u002Fmain.js\")\n    body\n        a#buttonBack(href=\"\u002F\")\n        .form\n            form.login-form\n                input(type='username', name = username, placeholder='username', required='')\n                input(type='password', placeholder='password', required='')\n                input(type='submit', formmethod='post', style='background :purple', value='LOG IN')\n                p.message\n                    a#regButton(href=\"\u002Fregistration\") Create an account\n                    | Not registered?\n\n"};
;var locals_for_with = (locals || {});(function (username) {;pug_debug_line = 1;pug_debug_filename = ".\u002Fpublic\u002Fblocks\u002F\u002Flogin\u002Flogin.pug";
pug_html = pug_html + "\u003Chtml\u003E";
;pug_debug_line = 2;pug_debug_filename = ".\u002Fpublic\u002Fblocks\u002F\u002Flogin\u002Flogin.pug";
pug_html = pug_html + "\u003Chead\u003E\u003C\u002Fhead\u003E";
;pug_debug_line = 3;pug_debug_filename = ".\u002Fpublic\u002Fblocks\u002F\u002Flogin\u002Flogin.pug";
pug_html = pug_html + "\u003Clink rel=\"stylesheet\" href=\"css\u002Flogin.css\"\u002F\u003E";
;pug_debug_line = 4;pug_debug_filename = ".\u002Fpublic\u002Fblocks\u002F\u002Flogin\u002Flogin.pug";
pug_html = pug_html + "\u003Cscript src=\"\u002Fmain.js\"\u003E\u003C\u002Fscript\u003E";
;pug_debug_line = 5;pug_debug_filename = ".\u002Fpublic\u002Fblocks\u002F\u002Flogin\u002Flogin.pug";
pug_html = pug_html + "\u003Cbody\u003E";
;pug_debug_line = 6;pug_debug_filename = ".\u002Fpublic\u002Fblocks\u002F\u002Flogin\u002Flogin.pug";
pug_html = pug_html + "\u003Ca id=\"buttonBack\" href=\"\u002F\"\u003E\u003C\u002Fa\u003E";
;pug_debug_line = 7;pug_debug_filename = ".\u002Fpublic\u002Fblocks\u002F\u002Flogin\u002Flogin.pug";
pug_html = pug_html + "\u003Cdiv class=\"form\"\u003E";
;pug_debug_line = 8;pug_debug_filename = ".\u002Fpublic\u002Fblocks\u002F\u002Flogin\u002Flogin.pug";
pug_html = pug_html + "\u003Cform class=\"login-form\"\u003E";
;pug_debug_line = 9;pug_debug_filename = ".\u002Fpublic\u002Fblocks\u002F\u002Flogin\u002Flogin.pug";
pug_html = pug_html + "\u003Cinput" + (" type=\"username\""+pug_attr("name", username, true, false)+" placeholder=\"username\" required=\"\"") + "\u002F\u003E";
;pug_debug_line = 10;pug_debug_filename = ".\u002Fpublic\u002Fblocks\u002F\u002Flogin\u002Flogin.pug";
pug_html = pug_html + "\u003Cinput type=\"password\" placeholder=\"password\" required=\"\"\u002F\u003E";
;pug_debug_line = 11;pug_debug_filename = ".\u002Fpublic\u002Fblocks\u002F\u002Flogin\u002Flogin.pug";
pug_html = pug_html + "\u003Cinput type=\"submit\" formmethod=\"post\" style=\"background :purple;\" value=\"LOG IN\"\u002F\u003E";
;pug_debug_line = 12;pug_debug_filename = ".\u002Fpublic\u002Fblocks\u002F\u002Flogin\u002Flogin.pug";
pug_html = pug_html + "\u003Cp class=\"message\"\u003E";
;pug_debug_line = 13;pug_debug_filename = ".\u002Fpublic\u002Fblocks\u002F\u002Flogin\u002Flogin.pug";
pug_html = pug_html + "\u003Ca id=\"regButton\" href=\"\u002Fregistration\"\u003E";
;pug_debug_line = 13;pug_debug_filename = ".\u002Fpublic\u002Fblocks\u002F\u002Flogin\u002Flogin.pug";
pug_html = pug_html + "Create an account\u003C\u002Fa\u003E";
;pug_debug_line = 14;pug_debug_filename = ".\u002Fpublic\u002Fblocks\u002F\u002Flogin\u002Flogin.pug";
pug_html = pug_html + "Not registered?\u003C\u002Fp\u003E\u003C\u002Fform\u003E\u003C\u002Fdiv\u003E\u003C\u002Fbody\u003E\u003C\u002Fhtml\u003E";}.call(this,"username" in locals_for_with?locals_for_with.username:typeof username!=="undefined"?username:undefined));} catch (err) {pug_rethrow(err, pug_debug_filename, pug_debug_line, pug_debug_sources[pug_debug_filename]);};return pug_html;}