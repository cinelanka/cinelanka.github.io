// tmdb-posters.js
// Fetches real movie posters from TMDB and swaps them into CineLanka's poster
// boxes after the page renders. Loaded as a separate file - does not touch
// index.html's existing code.

(function () {
  var TMDB_API_KEY = "7b4c9174531b7e8770e7b887ce7de165";
  var TMDB_SEARCH_URL = "https://api.themoviedb.org/3/search/movie";
  var TMDB_IMG_BASE = "https://image.tmdb.org/t/p/w500";

  var cache = {};

  function fetchPoster(title, year) {
    var key = title + "_" + year;
    if (cache[key] !== undefined) return Promise.resolve(cache[key]);

    var url = TMDB_SEARCH_URL + "?api_key=" + TMDB_API_KEY +
      "&query=" + encodeURIComponent(title) +
      (year ? "&year=" + year : "");

    return fetch(url)
      .then(function (res) { return res.json(); })
      .then(function (data) {
        var posterPath = (data.results && data.results[0] && data.results[0].poster_path) || null;
        var fullUrl = posterPath ? TMDB_IMG_BASE + posterPath : null;
        cache[key] = fullUrl;
        return fullUrl;
      })
      .catch(function () { return null; });
  }

  function extractTitleYear(card) {
    var titleEl = card.querySelector(".poster-title, .card-title, .modal-title, .hero-title");
    var yearEl = card.querySelector(".poster-year, .card-sub");
    var title = titleEl ? titleEl.textContent.trim() : null;
    var year = null;
    if (yearEl) {
      var match = yearEl.textContent.match(/\d{4}/);
      if (match) year = match[0];
    }
    return { title: title, year: year };
  }

  function applyPosterToBox(box, url) {
    if (!url || box.dataset.posterApplied) return;
    box.style.backgroundImage = "url('" + url + "')";
    box.style.backgroundSize = "cover";
    box.style.backgroundPosition = "center";
    var emojiLayer = box.querySelector(":scope > div");
    if (emojiLayer) emojiLayer.style.opacity = "0";
    box.dataset.posterApplied = "true";
  }

  function processCard(card) {
    var box = card.querySelector(".poster-bg, .modal-hero, .hero-bg");
    if (!box || box.dataset.posterRequested) return;
    box.dataset.posterRequested = "true";

    var info = extractTitleYear(card);
    if (!info.title) return;

    fetchPoster(info.title, info.year).then(function (url) {
      if (url) applyPosterToBox(box, url);
    });
  }

  function scanAndApply() {
    document.querySelectorAll(".card, .modal, .hero").forEach(processCard);
  }

  // Initial scan after the React app has rendered.
  setTimeout(scanAndApply, 800);

  // Re-scan periodically to catch newly opened modals / filtered grids,
  // since this app re-renders via React without a route change.
  setInterval(scanAndApply, 1500);
})();
