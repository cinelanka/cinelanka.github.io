// 1. Dynamic CSS Styles - `Gemini_Generated_Image_qzwjccqzwjccqzwj.png` පෙනුම ලබා දීම සඳහා
const style = document.createElement('style');
style.textContent = `
    /* Main Animation Container */
    .cinema-premium-bg {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        z-index: -2;
        background: radial-gradient(circle at top right, #2d0b13 0%, #070708 70%);
        overflow: hidden;
        pointer-events: none;
    }

    /* Ambient Cinematic Glow */
    .ambient-glow {
        position: absolute;
        width: 140vw;
        height: 140vh;
        top: -20vh;
        left: -20vw;
        background: radial-gradient(circle at 30% 40%, rgba(220, 38, 38, 0.05) 0%, transparent 50%),
                    radial-gradient(circle at 80% 80%, rgba(147, 51, 234, 0.03) 0%, transparent 40%);
        filter: blur(40px);
        animation: slowGlow 15s infinite alternate ease-in-out;
    }

    /* Huge Cinematic Film Reel - Bottom Right (රූපයේ දකුණු පස ඇති ලොකු රීල් එක) */
    .big-film-reel {
        position: absolute;
        bottom: -150px;
        right: -200px;
        width: 650px;
        height: 650px;
        border: 24px solid rgba(255, 255, 255, 0.02);
        border-radius: 50%;
        background: radial-gradient(circle, transparent 30%, rgba(0, 0, 0, 0.4) 31%, transparent 70%);
        box-shadow: inset 0 0 100px rgba(0,0,0,0.8), 0 0 50px rgba(0,0,0,0.5);
        opacity: 0.15;
        animation: spinReel 120s linear infinite;
    }
    
    /* Film Reel Inside Spokes */
    .big-film-reel::before {
        content: "";
        position: absolute;
        top: 0; left: 0; right: 0; bottom: 0;
        border-radius: 50%;
        background: repeating-conic-gradient(
            from 0deg,
            transparent 0deg,
            transparent 30deg,
            rgba(255, 255, 255, 0.03) 31deg,
            rgba(255, 255, 255, 0.03) 45deg
        );
    }

    /* Curved Film Strip Top Right (රූපයේ ඉහළින්ම ඇති Film Strip එක) */
    .curved-strip-top {
        position: absolute;
        top: -50px;
        right: -10%;
        width: 120vw;
        height: 280px;
        background: linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.5));
        border-top: 4px solid rgba(255,255,255,0.03);
        border-bottom: 4px solid rgba(255,255,255,0.03);
        transform: rotate(-15deg);
        opacity: 0.12;
        box-shadow: 0 20px 40px rgba(0,0,0,0.6);
    }

    /* Curved Film Strip Middle (රූපයේ මැදින් යන Film Strip එක) */
    .curved-strip-mid {
        position: absolute;
        top: 35%;
        right: -300px;
        width: 150vw;
        height: 320px;
        background: linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.8));
        border-top: 4px solid rgba(255,255,255,0.02);
        border-bottom: 4px solid rgba(255,255,255,0.02);
        transform: rotate(18deg);
        opacity: 0.08;
        box-shadow: 0 -20px 50px rgba(0,0,0,0.7);
        animation: floatStrip 20s infinite alternate ease-in-out;
    }

    /* Film Strips වල සිදුරු (Holes) හැදීම */
    .curved-strip-top::before, .curved-strip-mid::before {
        content: "";
        position: absolute;
        top: 12px; left: 0; width: 100%; height: 16px;
        background-image: repeating-linear-gradient(90deg, rgba(255,255,255,0.08) 0px, rgba(255,255,255,0.08) 20px, transparent 20px, transparent 35px);
    }
    .curved-strip-top::after, .curved-strip-mid::after {
        content: "";
        position: absolute;
        bottom: 12px; left: 0; width: 100%; height: 16px;
        background-image: repeating-linear-gradient(90deg, rgba(255,255,255,0.08) 0px, rgba(255,255,255,0.08) 20px, transparent 20px, transparent 35px);
    }

    /* Animations - සයිට් එකට බාධාවක් නොවන ලෙස ඉතා සෙමින් චලනය වීම */
    @keyframes spinReel {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }

    @keyframes floatStrip {
        0% { transform: rotate(18deg) translateY(0px); }
        100% { transform: rotate(17deg) translateY(-15px); }
    }

    @keyframes slowGlow {
        0% { opacity: 0.6; transform: scale(1); }
        100% { opacity: 1; transform: scale(1.05); }
    }
`;
document.head.appendChild(style);

// 2. DOM එක ලෝඩ් වූ පසු බැක්ග්‍රවුන්ඩ් එක ආරක්ෂිතව ඇතුලත් කිරීම
document.addEventListener('DOMContentLoaded', () => {
    if (!document.querySelector('.cinema-premium-bg')) {
        const bgContainer = document.createElement('div');
        bgContainer.className = 'cinema-premium-bg';

        bgContainer.innerHTML = `
            <div class="ambient-glow"></div>
            <div class="curved-strip-top"></div>
            <div class="curved-strip-mid"></div>
            <div class="big-film-reel"></div>
        `;

        // සයිට් එකේ බොඩි එකේ මුලටම සේෆ් විදිහට ඉන්ජෙක්ට් කිරීම
        document.body.insertBefore(bgContainer, document.body.firstChild);
    }
});