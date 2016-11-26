function toggle (ev, id) {
  var on = !find($(id), collapsed());
  (on ? addClass : remClass)($(id), 'coll');
  recoll();
  new Image().src = 'collapse?id=' + id + (on ? '' : '&un=true');
  ev.stopPropagation();
  return false;
}

function expand (tr) {
  show(tr);
  show(byClass(tr, 'comment')[0]);
  vis(byClass(tr, 'votelinks')[0], true);
  byClass(tr, 'togg')[0].innerHTML = '[-]';
}

function squish (tr) {
  if (hasClass(tr, 'noshow')) return;
  each(noshow, kids(tr.id));
  var el = byClass(tr, 'togg')[0];
  el.innerHTML = '[+' + el.getAttribute('n') + ']';
  noshow(byClass(tr, 'comment')[0]);
  vis(byClass(tr, 'votelinks')[0], false);
}

function recoll() {
  each(expand, comments());
  each(squish, collapsed());
}

function onready () {
  if (!localStorage.getItem('collapsingnewfeatures')) {
    show($('newfeatures'));
  }
  recoll();
}

document.addEventListener("DOMContentLoaded", onready);

function ajax (fn, url) {
  var req = new XMLHttpRequest();
  req.open('GET', url, true);
  req.onreadystatechange = function () {
    if (req.readyState === 4 && req.status === 200) {
      fn(req.responseText)
    }
  }
  return req.send();
}

function onop () { return attr(byTag(document,'html')[0],'op') }
function ranknum (el) { var s = html(el); return s ? tonum(s.match(/[0-9]+/)[0]) : null }
var n1 = ranknum(allof('rank')[0]);

function newstory (json) {
  if (json) {
    var pair = JSON.parse(json);
    var sp = last(allof('spacer'));
    sp.insertAdjacentHTML('afterend', pair[0] + sp.outerHTML);
    fixranks();
    if (onop() == 'newest') {
      var n = ranknum(last(allof('rank')));
      allof('morelink')[0].href = 'newest?next=' + pair[1] + '&n=' + (n + 1);
    }
  }
}

function fixranks () {
  var rks = allof('rank');
  each (function (rk) { rk.innerHTML = (pos(rk,rks) + n1) + '.' }, rks);
}

function moreurl() { return allof('morelink')[0].href }
function morenext () { return tonum(moreurl().split('next=')[1]) }

function hidestory (ev, el, id) {
  for (var i=0; i < 3; i++) { kill($(id).nextSibling) }
  kill($(id));
  fixranks();
  var next = (onop() == 'newest' && morenext()) ? ('&next=' + morenext()) : ''
  var url = el.href.replace('hide', 'snip-story').replace('goto', 'onop')
  ajax(newstory, url + next);
  ev.stopPropagation();
  return false;
}

function closefeat (ev) {
  noshow($('newfeatures'));
  localStorage.setItem('collapsingnewfeatures', 'seen');
  ev.stopPropagation();
}
