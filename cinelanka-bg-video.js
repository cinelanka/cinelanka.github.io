// cinelanka-bg-video.js
// 100% SAFE / ADDITIVE. Does NOT touch, edit, or delete index.html.

(function () {
  function safe(fn, label) {
    try { fn(); } catch (e) { console.error("cinelanka-bg-video [" + label + "]:", e); }
  }

  var YOUTUBE_VIDEO_ID = "f_7JcXeQOdM"; 

  function injectBackgroundVideo() {
    if (document.getElementById("cl-bg-video-wrap")) return;

    // 🚨 FORCE FIX: සයිට් එකේ කන්ටෙන්ට් එක සුපිරියටම මතු කරවන CSS Styles
    var style = document.createElement('style');
    style.textContent = `
      html, body {
        background: #060608 !important; /* කළු පසුබිම base එක විදිහට තැබීම */
      }
      /* සයිට් එකේ ප්‍රධාන containers වල පරණ backgrounds ඉවත් කිරීම */
      #app, main, section, .hero, .movies-container, .container, .wrapper {
        background: transparent !important;
        background-color: transparent !important;
      }
      /* මූවි කාඩ්ස් තවදුරටත් කැපී පෙනෙන්න පසුබිම තද කළු කිරීම (Solid blur effect) */
      .movie-card, .card, .trending-now, .top-rated, .movie-grid {
        background-color: rgba(10, 10, 14, 0.85) !important;
        backdrop-filter: blur(12px) !important;
        border-radius: 12px;
        box-shadow: 0 10px 30px rgba(0,0,0,0.5) !important;
      }
      /* ටෙක්ස්ට් ඔක්කොම සුදු පාටින් ලස්සනට පේන්න සැලැස්වීම */
      h1, h2, h3, h4, p, span, a {
        text-shadow: 0 2px 4px rgba(0,0,0,0.8) !important;
      }
    `;
    document.head.appendChild(style);

    var wrap = document.createElement("div");
    wrap.id = "cl-bg-video-wrap";
    wrap.style.cssText =
      "position:fixed;top:0;left:0;width:100vw;height:100vh;" +
      "z-index:-9999 !important;overflow:hidden;pointer-events:none;background:#060608;";

    var clipper = document.createElement("div");
    clipper.style.cssText = "position:absolute;inset:0;overflow:hidden;pointer-events:none;";

    var iframe = document.createElement("iframe");
    // 🛠️ PLAY BUTTON FIX: YouTube parameters තවදුරටත් දැඩි කර autoplay, mute සහ loop බලෙන් ක්‍රියාත්මක කිරීම
    iframe.src =
      "https://www.youtube.com/embed/" + YOUTUBE_VIDEO_ID +
      "?autoplay=1&mute=1&loop=1&playlist=" + YOUTUBE_VIDEO_ID +
      "&controls=0&unmute=0&loop=1&showinfo=0&rel=0&modestbranding=1&iv_load_policy=3&disablekb=1&fs=0&playsinline=1&enablejsapi=1";
    iframe.title = "Background";
    iframe.setAttribute("allow", "autoplay; encrypted-media");
    iframe.setAttribute("tabindex", "-1");
    iframe.style.cssText =
      "position:absolute;top:50%;left:50%;" +
      "width:100vw;height:177.78vw;min-height:100vh;min-width:177.78vh;" +
      "transform:translate(-50%,-50%) scale(1.4);border:none;pointer-events:none;" +
      "opacity: 0.12 !important;"; // 🛠️ BRIGHTNESS FIX: වීඩියෝවේ සුදු පාට අඩු කරන්න opacity එක 0.12 දක්වා අඩු කලා

    // 🛠️ OVERLAY FIX: වීඩියෝව හොඳටම ඩිම් (Dark) කර, මැදින් තද රතු සිනමා වයිබ් එකක් දීමට තද Overlay එකක් දීම
    var overlay = document.createElement("div");
    overlay.style.cssText =
      "position:absolute;inset:0;" +
      "background: radial-gradient(circle at center, rgba(35, 7, 12, 0.4) 0%, rgba(6, 6, 8, 0.96) 80%) !important;" +
      "z-index:2;";

    var clickBlocker = document.createElement("div");
    clickBlocker.style.cssText = "position:absolute;inset:0;z-index:5;background:transparent;";

    clipper.appendChild(iframe);
    wrap.appendChild(clipper);
    wrap.appendChild(overlay);
    wrap.appendChild(clickBlocker);
    document.body.appendChild(wrap);

    document.body.style.background = "transparent";
  }

  function makeMainBgTransparent() {
    var bgEl = document.querySelector(".navbar");
    if (bgEl && bgEl.getAttribute("data-bg-tweaked") !== "1") {
      bgEl.setAttribute("data-bg-tweaked", "1");
      bgEl.style.background = "rgba(6, 6, 8, 0.85)";
      bgEl.style.backdropFilter = "blur(12px)";
    }
  }

  function start() {
    safe(injectBackgroundVideo, "inject-video");
    setInterval(function () { safe(makeMainBgTransparent, "navbar-bg"); }, 1500);
  }

  if (document.readyState === "complete") {
    setTimeout(start, 800);
  } else {
    window.addEventListener("load", function () { setTimeout(start, 800); });
  }
})();