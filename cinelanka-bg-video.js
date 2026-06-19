// 1. Dynamic CSS Styles - මූවි ක්ලිප්ස් යන Film Strip එක සහ Overlays නිර්මාණය කිරීම
const style = document.createElement('style');
style.textContent = `
    /* Main Video Wall Container */
    .cinema-video-wall-bg {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        z-index: -9999; /* හැමදේටම යටින් තැබීමට */
        background-color: #050507;
        overflow: hidden;
        pointer-events: none;
    }

    /* Moving Movie Tape/Strip Wrapper */
    .movie-tape-wrapper {
        position: absolute;
        top: 30%; /* සයිට් එකේ මැද හරියට වන්නට */
        left: 0;
        width: 200vw;
        display: flex;
        gap: 20px;
        padding: 15px 0;
        background: rgba(0, 0, 0, 0.6);
        border-top: 6px dashed rgba(255, 255, 255, 0.15); /* Film strip holes effect */
        border-bottom: 6px dashed rgba(255, 255, 255, 0.15);
        transform: rotate(-8deg) scale(1.1); /* තරමක ඇලවීමක් */
        animation: moveTape 45s linear infinite;
        opacity: 0.15; /* සයිට් එකේ Content එක කියවන්න පුළුවන් වෙන්න විනිවිද පෙනෙන ප්‍රමාණය */
    }

    /* Individual Movie Video Item */
    .movie-clip-item {
        width: 320px;
        height: 180px;
        overflow: hidden;
        border-radius: 4px;
        box-shadow: 0 0 15px rgba(0,0,0,0.5);
        background: #111;
    }

    .movie-clip-item video {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    /* Dark Red Vibe එක දීම සඳහා වන Overlay එක */
    .cinema-wall-overlay {
        position: absolute;
        top: 0; left: 0; width: 100%; height: 100%;
        background: radial-gradient(circle at center, rgba(61, 20, 29, 0.5) 0%, rgba(5, 5, 7, 0.96) 85%);
        z-index: 2;
    }

    /* Tape එක වමට ඇදී යන Animation එක */
    @keyframes moveTape {
        0% { transform: rotate(-8deg) translateX(0); }
        100% { transform: rotate(-8deg) translateX(-50vw); }
    }

    /* CRITICAL FIX: පැරණි Backgrounds ඉවත් කිරීම */
    body, html {
        background-color: transparent !important;
        background: transparent !important;
    }
    main, section, .content-wrapper, .container {
        background-color: transparent !important;
    }
`;
document.head.appendChild(style);

// 2. HTML Elements (Movie Clips 4ක් සහ ඒවායේ වීඩියෝ ලින්ක්ස්) ආරක්ෂිතව ඇතුලත් කිරීම
document.addEventListener('DOMContentLoaded', () => {
    if (!document.querySelector('.cinema-video-wall-bg')) {
        const bgContainer = document.createElement('div');
        bgContainer.className = 'cinema-video-wall-bg';

        // උසස් තත්වයේ නොමිලේ ලබාගත හැකි Cinematic වීඩියෝ ක්ලිප්ස් 4ක් එක දිගට Repeat වන ලෙස දමා ඇත
        bgContainer.innerHTML = `
            <div class="cinema-wall-overlay"></div>
            <div class="movie-tape-wrapper">
                <div class="movie-clip-item">
                    <video autoplay loop muted playsinline>
                        <source src="https://vfx.productioncrate.com/stock-hd/sub-downloads/Crate-VFX-Saber_Dual_Red_1_hd.mp4" type="video/mp4">
                    </video>
                </div>
                <div class="movie-clip-item">
                    <video autoplay loop muted playsinline>
                        <source src="https://assets.mixkit.co/videos/preview/mixkit-flying-through-a-futuristic-tunnel-with-neon-lights-42284-large.mp4" type="video/mp4">
                    </video>
                </div>
                <div class="movie-clip-item">
                    <video autoplay loop muted playsinline>
                        <source src="https://assets.mixkit.co/videos/preview/mixkit-vintage-film-projector-in-dark-room-42867-large.mp4" type="video/mp4">
                    </video>
                </div>
                <div class="movie-clip-item">
                    <video autoplay loop muted playsinline>
                        <source src="https://assets.mixkit.co/videos/preview/mixkit-top-aerial-view-of-a-highway-with-cars-at-night-42171-large.mp4" type="video/mp4">
                    </video>
                </div>
                <div class="movie-clip-item"><video autoplay loop muted playsinline><source src="https://vfx.productioncrate.com/stock-hd/sub-downloads/Crate-VFX-Saber_Dual_Red_1_hd.mp4" type="video/mp4"></video></div>
                <div class="movie-clip-item"><video autoplay loop muted playsinline><source src="https://assets.mixkit.co/videos/preview/mixkit-flying-through-a-futuristic-tunnel-with-neon-lights-42284-large.mp4" type="video/mp4"></video></div>
                <div class="movie-clip-item"><video autoplay loop muted playsinline><source src="https://assets.mixkit.co/videos/preview/mixkit-vintage-film-projector-in-dark-room-42867-large.mp4" type="video/mp4"></video></div>
                <div class="movie-clip-item"><video autoplay loop muted playsinline><source src="https://assets.mixkit.co/videos/preview/mixkit-top-aerial-view-of-a-highway-with-cars-at-night-42171-large.mp4" type="video/mp4"></video></div>
            </div>
        `;

        // Body එකේ යටින්ම හිටින්න මුලටම ඇතුල් කිරීම
        document.body.insertBefore(bgContainer, document.body.firstChild);
    }
});