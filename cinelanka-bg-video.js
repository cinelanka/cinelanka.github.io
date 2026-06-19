// cinelanka-bg-video.js
// 100% SAFE / ADDITIVE. Does NOT touch, edit, or delete index.html.

(function () {
  function safe(fn, label) {
    try { fn(); } catch (e) { console.error("cinelanka-bg-video [" + label + "]:", e); }
  }

  // YouTube ප්‍රශ්න නැති, සෘජුවම වැඩ කරන High-Quality Cinematic Film Reel වීඩියෝව
  var NATIVE_VIDEO_URL = "https://assets.mixkit.co/videos/preview/mixkit-vintage-film-projector-in-dark-room-42867-large.mp4";

  function injectBackgroundVideo() {
    if (document.getElementById("cl-bg-video-wrap")) return;

    // 🚨 FORCE OVERRIDE: සයිට් එකේ තියෙන හැම Root element එකකම කළු පසුබිම ඉවත් කිරීම
    var style = document.createElement('style');
    style.textContent = `
      html, body, #root, #app, #__next, main, .min-h-screen, [class*="bg-background"], [class*="bg-neutral"] {
        background: transparent !important;
        background-color: transparent !important;
      }
      
      /* මුළු සයිට් එකටම Base Background එකක් විදිහට තද කළු පාටක් දීම (වීඩියෝව ලෝඩ් වෙනකන්) */
      html {
        background-color: #060608 !important;
      }

      /* මූවි කාඩ්ස් ලස්සනට මතු වෙලා පේන්න ඒවා ඇතුලට පොඩි Dark Glassmorphism Effect එකක් දීම */
      .movie-card, .card, [class*="rounded-"] {
        background-color: rgba(20, 20, 25, 0.65) !important;
        backdrop-filter: blur(8px);
        border: 1px solid rgba(255, 255, 255, 0.03) !important;
      }
    `;
    document.head.appendChild(style);

    // මුළු සයිට් එකටම පිටුපසින් ස්ථාවරව සිටින පරිදි Wrapper එක සැකසීම
    var wrap = document.createElement("div");
    wrap.id = "cl-bg-video-wrap";
    wrap.style.cssText =
      "position:fixed;top:0;left:0;width:100vw;height:100vh;" +
      "z-index:-9999 !important;overflow:hidden;pointer-events:none;";

    var clipper = document.createElement("div");
    clipper.style.cssText = "position:absolute;inset:0;overflow:hidden;pointer-events:none;";

    // Native Video Element එක සෑදීම
    var video = document.createElement("video");
    video.src = NATIVE_VIDEO_URL;
    video.autoplay = true;
    video.loop = true;
    video.muted = true;
    video.playsInline = true;
    video.setAttribute("muted", "");
    video.setAttribute("autoplay", "");
    video.setAttribute("loop", "");
    video.setAttribute("playsinline", "");
    
    // වීඩියෝවේ බ්‍රයිට්නස් එක (Opacity 0.16) මූවිස් ලස්සනට පෙනෙන ලෙස සැකසීම
    video.style.cssText =
      "position:absolute;top:50%;left:50%;" +
      "min-width:100%;min-height:100%;width:auto;height:auto;" +
      "transform:translate(-50%,-50%) scale(1.05);object-fit:cover;border:none;pointer-events:none;" +
      "opacity: 0.16 !important;"; 

    // මූවි කාඩ්ස් වල අකුරු සුපිරියටම පේන්න වීඩියෝව වටේට දමන තද සිනමා Overlay එක
    var overlay = document.createElement("div");
    overlay.style.cssText =
      "position:absolute;inset:0;" +
      "background: radial-gradient(circle at center, rgba(35, 7, 12, 0.35) 0%, rgba(6, 6, 8, 0.95) 80%) !important;" +
      "z-index:2;pointer-events:none;";

    clipper.appendChild(video);
    wrap.appendChild(clipper);
    wrap.appendChild(overlay);
    document.body.appendChild(wrap);
  }

  // සයිට් එකේ Navbar එකත් ලස්සනට බ්ලර් වී පෙනෙන්නට සැලැස්වීම
  function makeMainBgTransparent() {
    var bgEl = document.querySelector(".navbar") || document.querySelector("header");
    if (bgEl && bgEl.getAttribute("data-bg-tweaked") !== "1") {
      bgEl.setAttribute("data-bg-tweaked", "1");
      bgEl.style.setProperty("background", "rgba(6, 6, 8, 0.75)", "important");
      bgEl.style.setProperty("backdrop-filter", "blur(12px)", "important");
    }
  }

  function start() {
    safe(injectBackgroundVideo, "inject-video");
    setInterval(function () { safe(makeMainBgTransparent, "navbar-bg"); }, 1000);
  }

  if (document.readyState === "complete") {
    setTimeout(start, 300);
  } else {
    window.addEventListener("load", function () { setTimeout(start, 300); });
  }
})();