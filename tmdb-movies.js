// tmdb-movies.js
// SAFE, ADDITIVE ONLY. Does not touch, hide, or modify any existing
// elements created by the React app in index.html.
// It waits for the page to finish loading, then inserts a brand new
// section (with its own container) right after the existing <main>,
// showing thousands of real movies with real posters fetched live from TMDB.
//
// If anything fails, it fails silently (console.error only) and never
// throws an uncaught error that could affect the rest of the page.

(function () {
  try {
    var TMDB_KEY = "7b4c9174531b7e8770e7b887ce7de165";
    var IMG_BASE = "https://image.tmdb.org/t/p/w342";
    var PAGE_SIZE_FETCH = 1; // TMDB pages, 20 movies each, fetched per click

    var state = {
      category: "world", // 'world' or 'srilanka'
      page: 1,
      loading: false
    };

    function injectStyles() {
      if (document.getElementById("tmdb-extra-styles")) return;
      var style = document.createElement("style");
      style.id = "tmdb-extra-styles";
      style.textContent = [
        "#tmdb-extra-section{max-width:1280px;margin:0 auto;padding:24px 16px;font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,sans-serif;color:#fff;}",
        "#tmdb-extra-section h2{font-size:20px;font-weight:800;margin-bottom:14px;display:flex;align-items:center;gap:8px;}",
        ".tmdb-tabs{display:flex;gap:8px;margin-bottom:16px;}",
        ".tmdb-tab{padding:8px 16px;border-radius:999px;font-size:13px;font-weight:600;background:rgba(255,255,255,0.05);color:#a1a1aa;border:1px solid rgba(255,255,255,0.1);cursor:pointer;}",
        ".tmdb-tab.active{background:linear-gradient(90deg,#a855f7,#ec4899);color:#fff;border-color:transparent;}",
        ".tmdb-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(120px,1fr));gap:12px;}",
        ".tmdb-card{cursor:pointer;}",
        ".tmdb-poster{position:relative;aspect-ratio:2/3;border-radius:10px;overflow:hidden;border:1px solid rgba(255,255,255,0.1);background:#18181b;}",
        ".tmdb-poster img{width:100%;height:100%;object-fit:cover;display:block;}",
        ".tmdb-rating{position:absolute;top:6px;right:6px;background:rgba(0,0,0,0.65);border-radius:999px;padding:2px 6px;font-size:10px;font-weight:700;color:#fbbf24;}",
        ".tmdb-title{font-size:12px;font-weight:600;margin-top:6px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}",
        ".tmdb-year{font-size:11px;color:#a1a1aa;}",
        ".tmdb-loadmore{display:block;margin:20px auto 0;padding:10px 24px;border-radius:8px;background:linear-gradient(90deg,#a855f7,#ec4899);color:#fff;font-weight:700;font-size:13px;border:none;cursor:pointer;}",
        ".tmdb-loadmore:disabled{opacity:0.5;}",
        ".tmdb-empty-note{font-size:12px;color:#71717a;margin-bottom:12px;}"
      ].join("\n");
      document.head.appendChild(style);
    }

    function buildSectionShell() {
      if (document.getElementById("tmdb-extra-section")) {
        return document.getElementById("tmdb-extra-section");
      }
      var section = document.createElement("div");
      section.id = "tmdb-extra-section";
      section.innerHTML =
        '<h2>ðŸŽ¥ More Movies (Live from TMDB)</h2>' +
        '<p class="tmdb-empty-note">Browse thousands more titles with real posters, updated live.</p>' +
        '<div class="tmdb-tabs">' +
          '<button class="tmdb-tab active" id="tmdb-tab-world">ðŸŒ World Cinema</button>' +
          '<button class="tmdb-tab" id="tmdb-tab-srilanka">ðŸ‡±ðŸ‡° Sri Lankan / Asian</button>' +
        '</div>' +
        '<div class="tmdb-grid" id="tmdb-grid"></div>' +
        '<button class="tmdb-loadmore" id="tmdb-loadmore">Load More Movies</button>';

      // Insert after <main> if it exists, else just append to body's end safely.
      var main = document.querySelector("main");
      if (main && main.parentNode) {
        main.parentNode.insertBefore(section, main.nextSibling);
      } else {
        document.body.appendChild(section);
      }
      return section;
    }

    function cardHTML(movie) {
      var poster = movie.poster_path
        ? IMG_BASE + movie.poster_path
        : "";
      var rating = movie.vote_average ? movie.vote_average.toFixed(1) : "N/A";
      var year = (movie.release_date || "").slice(0, 4) || "â€”";
      var title = (movie.title || movie.name || "Untitled").replace(/</g, "&lt;");

      return (
        '<div class="tmdb-card">' +
          '<div class="tmdb-poster">' +
            (poster ? '<img src="' + poster + '" loading="lazy" alt="' + title + '">' : '') +
            '<div class="tmdb-rating">â­ ' + rating + '</div>' +
          '</div>' +
          '<div class="tmdb-title">' + title + '</div>' +
          '<div class="tmdb-year">' + year + '</div>' +
        '</div>'
      );
    }

    function fetchMovies() {
      if (state.loading) return;
      state.loading = true;

      var loadBtn = document.getElementById("tmdb-loadmore");
      if (loadBtn) { loadBtn.disabled = true; loadBtn.textContent = "Loading..."; }

      var endpoint;
      if (state.category === "srilanka") {
        // TMDB doesn't have a Sri-Lanka-only catalog; use discover with
        // South Asian origin country + popularity sort as a reasonable proxy.
        endpoint = "https://api.themoviedb.org/3/discover/movie?api_key=" + TMDB_KEY +
          "&with_origin_country=LK|IN&sort_by=popularity.desc&page=" + state.page;
      } else {
        endpoint = "https://api.themoviedb.org/3/movie/popular?api_key=" + TMDB_KEY +
          "&page=" + state.page;
      }

      fetch(endpoint)
        .then(function (res) { return res.json(); })
        .then(function (data) {
          var grid = document.getElementById("tmdb-grid");
          if (!grid) return;
          var results = data.results || [];
          var html = "";
          for (var i = 0; i < results.length; i++) {
            html += cardHTML(results[i]);
          }
          grid.insertAdjacentHTML("beforeend", html);
          state.page += 1;
        })
        .catch(function (err) {
          console.error("TMDB fetch error:", err);
        })
        .finally(function () {
          state.loading = false;
          if (loadBtn) { loadBtn.disabled = false; loadBtn.textContent = "Load More Movies"; }
        });
    }

    function switchCategory(cat) {
      state.category = cat;
      state.page = 1;
      var grid = document.getElementById("tmdb-grid");
      if (grid) grid.innerHTML = "";

      var worldTab = document.getElementById("tmdb-tab-world");
      var slTab = document.getElementById("tmdb-tab-srilanka");
      if (worldTab && slTab) {
        worldTab.classList.toggle("active", cat === "world");
        slTab.classList.toggle("active", cat === "srilanka");
      }
      fetchMovies();
    }

    function init() {
      injectStyles();
      buildSectionShell();

      var worldTab = document.getElementById("tmdb-tab-world");
      var slTab = document.getElementById("tmdb-tab-srilanka");
      var loadBtn = document.getElementById("tmdb-loadmore");

      if (worldTab) worldTab.addEventListener("click", function () { switchCategory("world"); });
      if (slTab) slTab.addEventListener("click", function () { switchCategory("srilanka"); });
      if (loadBtn) loadBtn.addEventListener("click", fetchMovies);

      fetchMovies();
    }

    // Wait until the React app has had time to render, and until the
    // document is fully loaded, before touching anything.
    if (document.readyState === "complete") {
      setTimeout(init, 1000);
    } else {
      window.addEventListener("load", function () {
        setTimeout(init, 1000);
      });
    }
  } catch (err) {
    console.error("tmdb-movies.js fatal error (safely caught):", err);
  }
})();
