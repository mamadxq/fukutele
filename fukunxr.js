(function () {
    const style = document.createElement('style');
    style.textContent = `
        /* ================= QUANTUM EARTH LOADER ================= */
        .cyber-loader-overlay {
            position: fixed;
            inset: 0;
            z-index: 1000000;
            display: flex;
            align-items: center;
            justify-content: center;
            background: radial-gradient(circle at center, rgba(10, 15, 30, 0.65) 0%, rgba(3, 7, 18, 0.85) 100%);
            backdrop-filter: blur(20px) saturate(180%);
            -webkit-backdrop-filter: blur(20px) saturate(180%);
            opacity: 1;
            transition: opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), visibility 0.8s;
            pointer-events: all;
            user-select: none;
        }

        .cyber-loader-overlay.fade-out {
            opacity: 0;
            visibility: hidden;
            pointer-events: none;
        }

        .cyber-loader-container {
            position: relative;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
        }

        .cyber-stage {
            position: relative;
            width: 180px;
            height: 180px;
            perspective: 900px;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        /* Lingkaran HUD Kompas */
        .hud-radar {
            position: absolute;
            inset: 0;
            border-radius: 50%;
            border: 1px dashed rgba(56, 189, 248, 0.25);
            animation: radarSpin 12s linear infinite;
        }
        .hud-radar::after {
            content: '';
            position: absolute;
            inset: -8px;
            border-radius: 50%;
            border: 1px solid rgba(45, 212, 191, 0.12);
        }

        @keyframes radarSpin {
            to { transform: rotate(360deg); }
        }

        /* Kubus Magnetik 3D yang Menghambur & Mengkristal */
        .mag-cube {
            position: absolute;
            width: 16px;
            height: 16px;
            border-radius: 4px;
            background: rgba(14, 165, 233, 0.85);
            box-shadow: 0 0 16px #38bdf8, inset 0 0 6px #fff;
            transform-style: preserve-3d;
            animation: collapseIntoCore 2.6s cubic-bezier(0.7, 0, 0.2, 1) infinite;
        }

        .mag-cube:nth-child(1) { --x: -65px; --y: -60px; --z: 40px;  --rx: 60deg;  --ry: 45deg;  animation-delay: 0.04s; background: rgba(56, 189, 248, 0.9); }
        .mag-cube:nth-child(2) { --x: 65px;  --y: -55px; --z: -30px; --rx: -45deg; --ry: 90deg;  animation-delay: 0.12s; background: rgba(45, 212, 191, 0.9); box-shadow: 0 0 16px #2dd4bf; }
        .mag-cube:nth-child(3) { --x: -75px; --y: 35px;  --z: -40px; --rx: 120deg; --ry: -30deg; animation-delay: 0.08s; background: rgba(14, 165, 233, 0.9); }
        .mag-cube:nth-child(4) { --x: 70px;  --y: 50px;  --z: 30px;  --rx: -60deg; --ry: 60deg;  animation-delay: 0.16s; background: rgba(20, 184, 166, 0.9); box-shadow: 0 0 16px #14b8a6; }
        .mag-cube:nth-child(5) { --x: 0px;   --y: -85px; --z: 50px;  --rx: 90deg;  --ry: 0deg;   animation-delay: 0.06s; }
        .mag-cube:nth-child(6) { --x: 0px;   --y: 85px;  --z: -50px; --rx: -90deg; --ry: 45deg;  animation-delay: 0.18s; background: rgba(56, 189, 248, 0.9); }
        .mag-cube:nth-child(7) { --x: -85px; --y: 0px;   --z: 20px;  --rx: 30deg;  --ry: -90deg; animation-delay: 0.10s; }
        .mag-cube:nth-child(8) { --x: 85px;  --y: 0px;   --z: -20px; --rx: -45deg; --ry: 45deg;  animation-delay: 0.14s; background: rgba(45, 212, 191, 0.9); box-shadow: 0 0 16px #2dd4bf; }

        @keyframes collapseIntoCore {
            0% {
                transform: translate3d(var(--x), var(--y), var(--z)) rotateX(var(--rx)) rotateY(var(--ry)) scale(1);
                border-radius: 4px;
                opacity: 0.95;
            }
            40% {
                transform: translate3d(0, 0, 0) rotateX(0deg) rotateY(0deg) scale(0.6);
                border-radius: 50%;
                opacity: 0.8;
            }
            60%, 100% {
                transform: translate3d(0, 0, 0) scale(0);
                opacity: 0;
            }
        }

        /* Ledakan Gelombang Syok (Shockwave) */
        .shockwave {
            position: absolute;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            border: 2px solid rgba(56, 189, 248, 0.9);
            box-shadow: 0 0 20px rgba(56, 189, 248, 0.6);
            transform: scale(0);
            opacity: 0;
            animation: shockwavePulse 2.6s cubic-bezier(0.1, 0.9, 0.2, 1) infinite;
        }

        @keyframes shockwavePulse {
            0%, 40% { transform: scale(0); opacity: 0; }
            45% { opacity: 1; border-color: rgba(255, 255, 255, 0.9); }
            70% { transform: scale(2.8); opacity: 0; }
            100% { transform: scale(3); opacity: 0; }
        }

        /* Planet Bumi Holografik */
        .holo-earth {
            position: relative;
            width: 58px;
            height: 58px;
            border-radius: 50%;
            background: 
                radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.8), transparent 30%),
                radial-gradient(circle at 70% 70%, rgba(2, 44, 75, 0.95), transparent 70%),
                linear-gradient(135deg, #0284c7 0%, #0d9488 40%, #0369a1 70%, #082f49 100%);
            box-shadow: 0 0 35px rgba(56, 189, 248, 0.8),
                        0 0 60px rgba(45, 212, 191, 0.3),
                        inset 0 0 15px rgba(255, 255, 255, 0.5);
            animation: earthEmerge 2.6s cubic-bezier(0.34, 1.56, 0.64, 1) infinite;
            overflow: hidden;
        }

        /* Tekstur Kontur Grid Benua Berputar */
        .holo-earth::after {
            content: '';
            position: absolute;
            inset: 0;
            border-radius: 50%;
            background-image: 
                repeating-linear-gradient(0deg, rgba(255,255,255,0.12) 0px, rgba(255,255,255,0.12) 1px, transparent 1px, transparent 8px),
                radial-gradient(circle at 50% 50%, rgba(34, 211, 238, 0.3) 10%, transparent 60%);
            animation: earthRotate 4s linear infinite;
        }

        @keyframes earthEmerge {
            0%, 38% { transform: scale(0); opacity: 0; }
            52% { transform: scale(1.3); opacity: 1; }
            72% { transform: scale(0.95); }
            85%, 100% { transform: scale(1); opacity: 1; }
        }

        @keyframes earthRotate {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
        }

        /* Dual Orbital Rings */
        .orbital-ring {
            position: absolute;
            border-radius: 50%;
            border: 1.5px solid transparent;
            pointer-events: none;
        }

        .ring-1 {
            width: 105px;
            height: 105px;
            border-top-color: #38bdf8;
            border-right-color: rgba(56, 189, 248, 0.4);
            filter: drop-shadow(0 0 6px #38bdf8);
            transform: rotateX(72deg) rotateY(15deg);
            animation: ringSpin1 3s linear infinite;
        }

        .ring-2 {
            width: 125px;
            height: 125px;
            border-bottom-color: #2dd4bf;
            border-left-color: rgba(45, 212, 191, 0.4);
            filter: drop-shadow(0 0 6px #2dd4bf);
            transform: rotateX(68deg) rotateY(-25deg);
            animation: ringSpin2 4.5s linear infinite reverse;
        }

        @keyframes ringSpin1 {
            to { transform: rotateX(72deg) rotateY(15deg) rotateZ(360deg); }
        }
        @keyframes ringSpin2 {
            to { transform: rotateX(68deg) rotateY(-25deg) rotateZ(360deg); }
        }

        /* HUD Scanner Label */
        .hud-status {
            margin-top: 22px;
            font-family: 'JetBrains Mono', 'Courier New', monospace;
            font-size: 11px;
            letter-spacing: 3px;
            text-transform: uppercase;
            color: #7dd3fc;
            text-shadow: 0 0 8px rgba(56, 189, 248, 0.6);
            display: flex;
            align-items: center;
            gap: 8px;
        }

        .hud-dot {
            width: 6px;
            height: 6px;
            border-radius: 50%;
            background: #38bdf8;
            box-shadow: 0 0 8px #38bdf8;
            animation: blinkDot 1s infinite alternate;
        }

        @keyframes blinkDot {
            from { opacity: 0.3; }
            to { opacity: 1; }
        }

        /* ================= MODERN TOASTS ================= */
        .modern-toast {
            position: fixed;
            bottom: 24px;
            right: 24px;
            z-index: 999999;
            background: rgba(15, 23, 42, 0.85);
            backdrop-filter: blur(18px) saturate(180%);
            -webkit-backdrop-filter: blur(180%);
            color: #f8fafc;
            padding: 16px 20px;
            border-radius: 16px;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            font-size: 13.5px;
            box-shadow: 0 16px 40px rgba(0, 0, 0, 0.5), 
                        0 0 0 1px rgba(255, 255, 255, 0.08),
                        inset 0 1px 0 rgba(255, 255, 255, 0.15);
            transform: translateY(30px) scale(0.96);
            opacity: 0;
            transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.35s;
            max-width: 360px;
            display: flex;
            align-items: flex-start;
            gap: 14px;
            overflow: hidden;
            pointer-events: none;
        }

        .modern-toast.show {
            transform: translateY(0) scale(1);
            opacity: 1;
            pointer-events: auto;
        }

        .toast-icon {
            font-size: 22px;
            line-height: 1;
            padding: 8px;
            border-radius: 12px;
            flex-shrink: 0;
        }

        .greeting-popup .toast-icon {
            background: linear-gradient(135deg, rgba(20, 184, 166, 0.2), rgba(6, 182, 212, 0.1));
            border: 1px solid rgba(45, 212, 191, 0.3);
        }

        .vpn-popup .toast-icon {
            background: linear-gradient(135deg, rgba(239, 68, 68, 0.2), rgba(249, 115, 22, 0.1));
            border: 1px solid rgba(248, 113, 113, 0.3);
        }

        .toast-content {
            flex-grow: 1;
            padding-right: 18px;
        }

        .modern-toast .title {
            font-weight: 600;
            font-size: 14.5px;
            letter-spacing: -0.2px;
            margin-bottom: 3px;
            color: #ffffff;
        }

        .modern-toast .sub {
            color: #94a3b8;
            font-size: 12.5px;
            line-height: 1.45;
        }

        .modern-toast .close-btn {
            position: absolute;
            top: 12px;
            right: 12px;
            background: transparent;
            border: none;
            color: #64748b;
            cursor: pointer;
            width: 24px;
            height: 24px;
            border-radius: 6px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 16px;
            transition: all 0.2s;
        }

        .modern-toast .close-btn:hover {
            color: #f1f5f9;
            background: rgba(255, 255, 255, 0.08);
        }

        .toast-progress {
            position: absolute;
            bottom: 0;
            left: 0;
            height: 3px;
            width: 100%;
            background: rgba(255, 255, 255, 0.08);
        }

        .toast-progress-bar {
            height: 100%;
            width: 100%;
            transform-origin: left;
            transition: transform linear;
        }

        .greeting-popup .toast-progress-bar {
            background: linear-gradient(90deg, #14b8a6, #38bdf8);
        }

        .vpn-popup .toast-progress-bar {
            background: linear-gradient(90deg, #ef4444, #f97316);
        }

        /* ================= SCROLL TO TOP ================= */
        .scroll-top-btn {
            position: fixed;
            bottom: 92px;
            right: 24px;
            z-index: 999998;
            width: 46px;
            height: 46px;
            border-radius: 14px;
            background: rgba(15, 23, 42, 0.8);
            backdrop-filter: blur(14px);
            -webkit-backdrop-filter: blur(14px);
            color: #f8fafc;
            border: 1px solid rgba(255, 255, 255, 0.12);
            box-shadow: 0 8px 24px rgba(0, 0, 0, 0.35);
            cursor: pointer;
            opacity: 0;
            transform: translateY(12px) scale(0.9);
            transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
            display: flex;
            align-items: center;
            justify-content: center;
            pointer-events: none;
        }

        .scroll-top-btn svg {
            width: 20px;
            height: 20px;
            fill: none;
            stroke: currentColor;
            stroke-width: 2.2;
            stroke-linecap: round;
            stroke-linejoin: round;
            transition: transform 0.2s ease;
        }

        .scroll-top-btn.show {
            opacity: 1;
            transform: translateY(0) scale(1);
            pointer-events: auto;
        }

        .scroll-top-btn:hover {
            background: rgba(30, 41, 59, 0.95);
            border-color: rgba(56, 189, 248, 0.4);
            box-shadow: 0 10px 30px rgba(56, 189, 248, 0.2);
        }

        .scroll-top-btn:hover svg {
            transform: translateY(-2px);
        }
    `;
    document.head.appendChild(style);

    function createCyberLoader() {
        const overlay = document.createElement('div');
        overlay.className = 'cyber-loader-overlay';
        overlay.innerHTML = `
            <div class="cyber-loader-container">
                <div class="cyber-stage">
                    <div class="hud-radar"></div>
                    <div class="mag-cube"></div>
                    <div class="mag-cube"></div>
                    <div class="mag-cube"></div>
                    <div class="mag-cube"></div>
                    <div class="mag-cube"></div>
                    <div class="mag-cube"></div>
                    <div class="mag-cube"></div>
                    <div class="mag-cube"></div>
                    <div class="shockwave"></div>
                    <div class="orbital-ring ring-1"></div>
                    <div class="orbital-ring ring-2"></div>
                    <div class="holo-earth"></div>
                </div>
                <div class="hud-status">
                    <span class="hud-dot"></span>
                    <span>Tunggu sebentar...</span>
                </div>
            </div>
        `;
        document.body.appendChild(overlay);

        return {
            dismiss: function () {
                overlay.classList.add('fade-out');
                setTimeout(() => overlay.remove(), 800);
            }
        };
    }

    function showPopup(icon, title, subtitle, className, duration = 5000) {
        const existing = document.querySelector('.' + className);
        if (existing) existing.remove();

        const popup = document.createElement('div');
        popup.className = `modern-toast ${className}`;
        popup.innerHTML = `
            <div class="toast-icon">${icon}</div>
            <div class="toast-content">
                <div class="title">${title}</div>
                <div class="sub">${subtitle}</div>
            </div>
            <button class="close-btn" aria-label="Tutup">✕</button>
            <div class="toast-progress">
                <div class="toast-progress-bar"></div>
            </div>
        `;
        document.body.appendChild(popup);

        const closeBtn = popup.querySelector('.close-btn');
        const progressBar = popup.querySelector('.toast-progress-bar');

        const dismiss = () => {
            popup.classList.remove('show');
            setTimeout(() => popup.remove(), 400);
        };

        closeBtn.addEventListener('click', dismiss);

        requestAnimationFrame(() => {
            popup.classList.add('show');
            if (duration > 0) {
                progressBar.style.transitionDuration = `${duration}ms`;
                progressBar.style.transform = 'scaleX(0)';
                setTimeout(dismiss, duration);
            }
        });

        return popup;
    }

    function getGreeting() {
        const hour = new Date().getHours();
        let greeting, emoji;
        if (hour >= 5 && hour < 11) { greeting = 'Selamat Pagi'; emoji = '🌅'; }
        else if (hour >= 11 && hour < 15) { greeting = 'Selamat Siang'; emoji = '☀️'; }
        else if (hour >= 15 && hour < 18) { greeting = 'Selamat Sore'; emoji = '🌤️'; }
        else { greeting = 'Selamat Malam'; emoji = '🌙'; }
        return { greeting, emoji };
    }

    function detectVPN() {
        return new Promise((resolve) => {
            const check = () => {
                const conn = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
                if (conn && conn.rtt && conn.rtt > 300) {
                    resolve(true);
                    return;
                }
                const start = performance.now();
                fetch('https://cloudflare.com/cdn-cgi/trace', { mode: 'no-cors', cache: 'no-store' })
                    .catch(() => {})
                    .finally(() => {
                        const elapsed = performance.now() - start;
                        if (elapsed > 800) resolve(true);
                        else resolve(false);
                    });
                setTimeout(() => resolve(false), 3000);
            };
            if (!navigator.connection) {
                setTimeout(check, 500);
            } else {
                check();
            }
        });
    }

    function smoothScroll() {
        let isScrolling = false;
        let target = window.scrollY;
        let current = window.scrollY;
        const duration = 750;

        document.addEventListener('wheel', function (e) {
            if (!e.ctrlKey && !e.metaKey) {
                e.preventDefault();
                const delta = e.deltaY > 0 ? window.innerHeight * 0.7 : -window.innerHeight * 0.7;
                target = Math.max(0, Math.min(document.documentElement.scrollHeight - window.innerHeight, target + delta));
                if (!isScrolling) {
                    isScrolling = true;
                    current = window.scrollY;
                    const startTime = performance.now();

                    function step(time) {
                        const progress = Math.min(1, (time - startTime) / duration);
                        const ease = 1 - Math.pow(1 - progress, 3);
                        window.scrollTo(0, current + (target - current) * ease);
                        if (progress < 1) {
                            requestAnimationFrame(step);
                        } else {
                            window.scrollTo(0, target);
                            isScrolling = false;
                        }
                    }
                    requestAnimationFrame(step);
                }
            }
        }, { passive: false });

        window.addEventListener('scroll', function () {
            const btn = document.querySelector('.scroll-top-btn');
            if (btn) {
                if (window.scrollY > 350) btn.classList.add('show');
                else btn.classList.remove('show');
            }
        }, { passive: true });

        const scrollBtn = document.createElement('button');
        scrollBtn.className = 'scroll-top-btn';
        scrollBtn.setAttribute('aria-label', 'Kembali ke atas');
        scrollBtn.innerHTML = `
            <svg viewBox="0 0 24 24">
                <line x1="12" y1="19" x2="12" y2="5"></line>
                <polyline points="5 12 12 5 19 12"></polyline>
            </svg>
        `;
        document.body.appendChild(scrollBtn);

        scrollBtn.addEventListener('click', function () {
            target = 0;
            if (!isScrolling) {
                isScrolling = true;
                current = window.scrollY;
                const startTime = performance.now();

                function step(time) {
                    const progress = Math.min(1, (time - startTime) / duration);
                    const ease = 1 - Math.pow(1 - progress, 3);
                    window.scrollTo(0, current + (0 - current) * ease);
                    if (progress < 1) {
                        requestAnimationFrame(step);
                    } else {
                        window.scrollTo(0, 0);
                        isScrolling = false;
                    }
                }
                requestAnimationFrame(step);
            }
        });
    }

    function init() {
        const loader = createCyberLoader();

        const minDisplayTime = new Promise(resolve => setTimeout(resolve, 2000));
        const pageLoad = new Promise(resolve => {
            if (document.readyState === 'complete') resolve();
            else window.addEventListener('load', resolve, { once: true });
        });

        Promise.all([minDisplayTime, pageLoad]).then(() => {
            loader.dismiss();
        });

        const { greeting, emoji } = getGreeting();
        const dateStr = new Date().toLocaleDateString('id-ID', {
            weekday: 'long',
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        });

        setTimeout(() => {
            showPopup(emoji, greeting, dateStr, 'greeting-popup', 4000);
        }, 1500);

        detectVPN().then((isVPN) => {
            if (isVPN) {
                setTimeout(() => {
                    showPopup(
                        '🛡️',
                        'VPN Terdeteksi',
                        'Koneksi VPN terdeteksi aktif. Beberapa fitur mungkin memerlukan koneksi langsung.',
                        'vpn-popup',
                        6500
                    );
                }, 2600);
            }
        });

        smoothScroll();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
