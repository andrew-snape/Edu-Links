/* Site-wide link search.
 *
 * Progressive enhancement: every link is already in the rendered HTML, so if
 * this script fails to load the site still works - you just browse by page
 * instead of searching. The index is fetched once, on the first keystroke.
 */
(function () {
  'use strict';

  var input = document.getElementById('search');
  var clearBtn = document.querySelector('.search-clear');
  var main = document.getElementById('content');
  if (!input || !main) return;

  var indexUrl = document.currentScript
    ? document.currentScript.src.replace(/assets\/js\/search\.js.*$/, 'search.json')
    : 'search.json';

  var index = null;
  var loading = null;
  var resultsEl = null;

  function loadIndex() {
    if (index) return Promise.resolve(index);
    if (loading) return loading;
    loading = fetch(indexUrl)
      .then(function (r) {
        if (!r.ok) throw new Error('HTTP ' + r.status);
        return r.json();
      })
      .then(function (data) {
        index = data;
        return index;
      })
      .catch(function () {
        // Leave index null; render() falls back to a plain message.
        return null;
      });
    return loading;
  }

  function ensureResultsEl() {
    if (resultsEl) return resultsEl;
    resultsEl = document.createElement('div');
    resultsEl.className = 'search-results';
    resultsEl.hidden = true;
    main.parentNode.insertBefore(resultsEl, main.nextSibling);
    return resultsEl;
  }

  function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  /* Every term must appear somewhere in the record, so multi-word queries
     narrow results instead of widening them. */
  function matches(item, terms) {
    var hay = (
      item.name + ' ' + item.description + ' ' + item.domain + ' ' +
      item.subject + ' ' + item.subarea
    ).toLowerCase();
    return terms.every(function (t) { return hay.indexOf(t) !== -1; });
  }

  function cardHtml(item) {
    var letter = (item.name || '?').trim().charAt(0).toUpperCase();
    var favicon = 'https://www.google.com/s2/favicons?sz=64&domain=' +
      encodeURIComponent(item.domain);
    return '' +
      '<a class="card" href="' + escapeHtml(item.url) + '" target="_blank" rel="noopener">' +
        '<span class="card-top">' +
          '<span class="card-logo-wrap" data-letter="' + escapeHtml(letter) + '">' +
            '<img class="card-logo" src="' + escapeHtml(favicon) + '" alt="" ' +
              'onerror="this.parentNode.classList.add(\'no-logo\');this.remove();">' +
          '</span>' +
          '<span class="card-title">' + escapeHtml(item.name) + '</span>' +
        '</span>' +
        '<span class="card-desc">' + escapeHtml(item.description) + '</span>' +
        '<span class="card-meta">' + escapeHtml(item.icon) + ' ' +
          escapeHtml(item.subject) + ' · ' + escapeHtml(item.subarea) + '</span>' +
        '<span class="card-url">' + escapeHtml(item.domain) + '</span>' +
      '</a>';
  }

  function render(query) {
    var el = ensureResultsEl();
    var terms = query.toLowerCase().split(/\s+/).filter(Boolean);

    if (!terms.length) {
      el.hidden = true;
      el.innerHTML = '';
      main.hidden = false;
      return;
    }

    main.hidden = true;
    el.hidden = false;

    if (!index) {
      el.innerHTML = '<p class="search-status">Loading links…</p>';
      return;
    }

    var hits = index.filter(function (item) { return matches(item, terms); });

    if (!hits.length) {
      el.innerHTML = '<p class="search-status">No links match <strong>' +
        escapeHtml(query) + '</strong>.</p>';
      return;
    }

    el.innerHTML =
      '<h1 class="page-heading">' + hits.length +
        (hits.length === 1 ? ' result' : ' results') + '</h1>' +
      '<div class="card-grid">' + hits.map(cardHtml).join('') + '</div>';
  }

  function update() {
    var q = input.value.trim();
    if (clearBtn) clearBtn.hidden = !q;
    if (q) {
      loadIndex().then(function () { render(input.value.trim()); });
    }
    render(q);
  }

  input.addEventListener('input', update);

  input.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      input.value = '';
      update();
      input.blur();
    }
  });

  if (clearBtn) {
    clearBtn.addEventListener('click', function () {
      input.value = '';
      update();
      input.focus();
    });
  }

  /* "/" focuses search, the way most docs sites behave - but not while the
     user is already typing somewhere. */
  document.addEventListener('keydown', function (e) {
    if (e.key !== '/' || e.metaKey || e.ctrlKey || e.altKey) return;
    var tag = (e.target.tagName || '').toLowerCase();
    if (tag === 'input' || tag === 'textarea' || e.target.isContentEditable) return;
    e.preventDefault();
    input.focus();
    input.select();
  });
})();
