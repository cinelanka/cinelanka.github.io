// 1. Dynamic CSS Styles - අනිවාර්යයෙන්ම මතු වී පෙනෙන සේ සැකසූ Styles
const style = document.createElement('style');
style.textContent = `
    /* Main Background Container */
    .cinema-premium-bg-wall {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        z-index: -1 !important; /* සයිට් එකේ content එකට යටින්ම තැබීමට */
        background-color: #050507 !important;
        background: radial-gradient(circle at center, #250a10 0%, #050507 80%) !important;
        overflow: hidden;
        pointer-events: none;
    }

    /* Film Strip පටිය */
    .moving-film-strip-wrapper {
        position: absolute;
        top: 35%; /* සයිට් එකේ මැද හරියට වන්නට */
        left: 0;
        width: 300vw;
        display: flex;
        gap: 25px;
        padding: 20px 0;
        background: rgba(0, 0, 0, 0.85) !important;
        border-top: 6px dashed rgba(255, 255, 255, 0.3) !important; /* Film holes */
        border-bottom: 6px dashed rgba(255, 255, 255, 0.3) !important;
        transform: rotate(-7deg) scale(1.1);
        animation: moveFilmTape 30s linear infinite !important;
        box-shadow: 0 0 50px rgba(0,0,0,0.8);
    }

    /* Film එක ඇතුලේ තියෙන චූටි මූවි ක්ලිප් කොටස් (Boxes) */
    .animated-movie-box {
        width: 280px;
        height: 160px;
        border-radius: 6px;
        position: relative;
        overflow: hidden;
        background-size: cover;
        background-position: center;
        box-shadow: inset 0 0 30px rgba(0,0,0,0.7), 0 0 15px rgba(255,255,255,0.05);
        display: flex;
        align-items: center;
        justify-content: center;
    }

    /* මූවි ක්ලිප් වගේ පෙනෙන්න දාලා තියෙන CSS Animations */
    .animated-movie-box::before {
        content: "";
        position: absolute;
        top: 0; left: 0; width: 100%; height: 100%;
        background: linear-gradient(45deg, rgba(220, 38, 38, 0.2), transparent);
        animation: clipGlow 3s ease-in-out infinite alternate;
    }

    /* Play Icon එකක් (Movie clip එකක් වගේ පෙනුම තවත් වැඩි කරන්න) */
    .animated-movie-box::after {
        content: "▶";
        color: rgba(255, 255, 255, 0.25);
        font-size: 2rem;
        text-shadow: 0 0 10px rgba(0,0,0,0.5);
    }

    /* Film පටිය වමට ඇදී යන සුපිරි ඇනිමේෂන් එක */
    @keyframes moveFilmTape {
        0% { transform: rotate(-7deg) translateX(0); }
        100% { transform: rotate(-7deg) translateX(-100vw); }
    }

    @keyframes clipGlow {
        0% { opacity: 0.3; }
        100% { opacity: 0.8; }
    }

    /* FORCE FIX: සයිට් එකේ දැනට තියෙන පරණ බැක්ග්‍රවුන්ඩ්ස් ඔක්කොම විනිවිද පෙනෙන ලෙස සකස් කිරීම */
    html, body {
        background: transparent !important;
        background-color: transparent !important;
    }

    /* ඔයාගේ සයිට් එකේ ප්‍රධාන කොටස් වල background එක නිසා මේක වැහෙන එක 100%ක්ම නැති කිරීම */
    #app, .main-content, main, section, .hero, .movies-container, .container, .wrapper {
        background: transparent !important;
        background-color: transparent !important;
    }
`;
document.head.appendChild(style);

// 2. HTML Elements ටික සයිට් එකට එකතු කිරීම
document.addEventListener('DOMContentLoaded', () => {
    if (!document.querySelector('.cinema-premium-bg-wall')) {
        const bgContainer = document.createElement('div');
        bgContainer.className = 'cinema-premium-bg-wall';

        // Unsplash එකේ තියෙන ප්‍රසිද්ධ මූවි පෝස්ටර්/සිනමා ඉමේජ් ලින්ක්ස් (මේවා කිසිම වෙලාවක බ්ලොක් වෙන්නේ නැහැ)
        bgContainer.innerHTML = `
            <div class="moving-film-strip-wrapper">
                <div class="animated-movie-box" style="background-image: url('https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=400');"></div>
                <div class="animated-movie-box" style="background-image: url('https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=400');"></div>
                <div class="animated-movie-box" style="background-image: url('https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?q=80&w=400');"></div>
                <div class="animated-movie-box" style="background-image: url('https://images.unsplash.com/photo-1478720143023-154ed96bcbd9?q=80&w=400');"></div>
                <div class="animated-movie-box" style="background-image: url('https://images.unsplash.com/photo-1542204172-e7052809f852?q=80&w=400');"></div>
                <div class="animated-movie-box" style="background-image: url('https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=400');"></div>
                <div class="animated-movie-box" style="background-image: url('https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=400');"></div>
                <div class="animated-movie-box" style="background-image: url('https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?q=80&w=400');"></div>
            </div>
        `;

        // Body එකේ මුලටම සේෆ් විදිහට ඇතුල් කිරීම
        document.body.insertBefore(bgContainer, document.body.firstChild);
    }
});