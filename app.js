// Ders Koçu - Premium AI Eğitim Platformu (Core Module)

// --- 1. STATE MANAGEMENT ---
const State = {
    user: JSON.parse(localStorage.getItem('dk_user')) || null, // { name, role: 'student'|'parent', grade }
    progress: JSON.parse(localStorage.getItem('dk_progress')) || {
        xp: 0,
        gems: 0,
        streak: 1,
        level: 1,
        subjects: {
            matematik: 15,
            turkce: 40,
            fen: 5,
            sosyal: 0,
            ingilizce: 60
        }
    },
    save() {
        localStorage.setItem('dk_user', JSON.stringify(this.user));
        localStorage.setItem('dk_progress', JSON.stringify(this.progress));
        this.notify();
    },
    listeners: [],
    subscribe(fn) { this.listeners.push(fn); },
    notify() { this.listeners.forEach(fn => fn()); }
};

// --- 2. ROUTER ---
let currentRoute = 'auth';

function navigate(route, params = {}) {
    currentRoute = route;
    renderApp(params);
}

// --- 3. UI COMPONENTS ---

const Header = () => `
    <header class="app-header">
        <div style="font-size: 1.5rem; font-weight: 900; color: var(--secondary);">🧠 DersKoçu</div>
        <div style="display: flex; gap: 15px;">
            <div class="streak-badge"><ion-icon name="flame"></ion-icon> ${State.progress.streak}</div>
            <div class="gem-badge"><ion-icon name="diamond"></ion-icon> ${State.progress.gems}</div>
        </div>
    </header>
`;

const BottomNav = () => `
    <nav class="bottom-nav">
        <button class="nav-item ${currentRoute === 'home' ? 'active' : ''}" onclick="navigate('home')">
            <ion-icon name="home"></ion-icon>
            Ana Ekran
        </button>
        <button class="nav-item ${currentRoute === 'practice' ? 'active' : ''}" onclick="navigate('practice')">
            <ion-icon name="barbell"></ion-icon>
            Pratik
        </button>
        <button class="nav-item ${currentRoute === 'ai' ? 'active' : ''}" onclick="navigate('ai')">
            <ion-icon name="planet"></ion-icon>
            AI Koç
        </button>
        <button class="nav-item ${currentRoute === 'profile' ? 'active' : ''}" onclick="navigate('profile')">
            <ion-icon name="person"></ion-icon>
            Profil
        </button>
    </nav>
`;

// --- VIEWS ---

const AuthView = () => {
    return `
        <div class="screen" style="display:flex; padding:0;">
            <div class="auth-container" style="flex:1;">
                <div style="font-size: 5rem; margin-bottom: 20px;">🎒</div>
                <h1 style="font-size: 2.2rem; font-weight: 900; margin-bottom: 10px; color:var(--text-main);">DersKoçu'na<br>Hoş Geldin!</h1>
                <p style="color:var(--text-muted); margin-bottom: 30px;">Hemen öğrenmeye başla, tamamen ücretsiz.</p>
                
                <div class="role-card" onclick="loginStudent()">
                    <div style="font-size: 3rem;">👦</div>
                    <h3>Öğrenciyim</h3>
                    <p style="color:var(--text-muted); margin-top:5px;">Sınıfımı seçip ders çalışmak istiyorum</p>
                </div>
                
                <div class="role-card" onclick="alert('Veli Paneli Çok Yakında!')" style="background:var(--bg-main);">
                    <div style="font-size: 3rem;">👨‍👩‍👧</div>
                    <h3>Veliyim</h3>
                    <p style="color:var(--text-muted); margin-top:5px;">Çocuğumun gelişimini takip etmek istiyorum</p>
                </div>
            </div>
        </div>
    `;
};

window.loginStudent = () => {
    const name = prompt("Kahraman adın nedir?") || "Öğrenci";
    let grade = prompt("Kaçıncı sınıfsın? (5, 6, 7, 8)") || "5";
    State.user = { name, role: 'student', grade };
    State.save();
    navigate('home');
};

const HomeView = () => {
    const s = State.progress.subjects;
    return `
        <div class="screen">
            ${Header()}
            
            <div style="margin-top:20px;">
                <h2 style="font-size: 1.8rem; font-weight: 900;">Merhaba, ${State.user.name}! 🚀</h2>
                <p style="color:var(--text-muted); margin-top:5px;">${State.user.grade}. Sınıf Görevlerin Seni Bekliyor</p>
            </div>

            <div class="ai-tutor-banner" style="margin-top: 25px;" onclick="navigate('ai')">
                <div style="font-size: 3rem;">🤖</div>
                <div class="ai-bubble">
                    Görünüşe göre Matematik Kesirler konusunda biraz eksiğin var. Bugün birlikte 10 soru çözelim mi?
                </div>
            </div>

            <h3 style="margin-bottom: 15px; margin-top:30px;">Derslerin</h3>
            
            <div class="module-card" onclick="navigate('course', {subject: 'Matematik'})">
                <div class="module-icon" style="color:var(--secondary);">🔢</div>
                <div class="module-content" style="flex:1;">
                    <h4>Matematik</h4>
                    <p>Bölüm 2: Kesirler</p>
                    <div class="module-progress">
                        <div class="module-progress-fill" style="width: ${s.matematik}%;"></div>
                    </div>
                </div>
            </div>

            <div class="module-card">
                <div class="module-icon" style="color:#ff4b4b;">📚</div>
                <div class="module-content" style="flex:1;">
                    <h4>Türkçe</h4>
                    <p>Bölüm 4: Paragraf</p>
                    <div class="module-progress">
                        <div class="module-progress-fill" style="width: ${s.turkce}%; background:#ff4b4b;"></div>
                    </div>
                </div>
            </div>
            
            <div class="module-card">
                <div class="module-icon" style="color:#ce82ff;">🇬🇧</div>
                <div class="module-content" style="flex:1;">
                    <h4>İngilizce</h4>
                    <p>Bölüm 5: Daily Routine</p>
                    <div class="module-progress">
                        <div class="module-progress-fill" style="width: ${s.ingilizce}%; background:#ce82ff;"></div>
                    </div>
                </div>
            </div>

            ${BottomNav()}
        </div>
    `;
};

const AIView = () => {
    return `
        <div class="screen">
            ${Header()}
            <div style="text-align:center; padding: 30px 0;">
                <div style="font-size: 5rem; animation: popIn 0.5s infinite alternate ease-in-out;">🤖</div>
                <h2 style="margin-top:15px; font-weight:900;">Konu Koçu AI</h2>
                <p style="color:var(--text-muted); margin-top:10px;">Sorularını anında cevaplayan 7/24 öğretmenin.</p>
            </div>
            
            <div style="background:var(--bg-secondary); padding:20px; border-radius:var(--radius-lg); border:2px solid var(--border-color); height:300px; display:flex; flex-direction:column; justify-content:flex-end;">
                <div style="margin-bottom:15px; background:var(--bg-main); padding:15px; border-radius:var(--radius-md); box-shadow:var(--shadow-soft);">
                    <strong>Aİ Koçu:</strong> Hangi konuda yardıma ihtiyacın var? Anlamadığın bir sorunun fotoğrafını çek veya bana yaz!
                </div>
                <div style="display:flex; gap:10px;">
                    <input type="text" class="input-glass" style="margin:0;" placeholder="Bana bir şey sor...">
                    <button class="btn btn-secondary" onclick="alert('AI Yanıtı Mockup: Harika bir soru! Adım adım birlikte çözelim...')"><ion-icon name="send"></ion-icon></button>
                </div>
            </div>
            ${BottomNav()}
        </div>
    `;
};

// --- APP ENGINE ---
function renderApp(params = {}) {
    const root = document.getElementById('app-root');
    if (!root) return;

    if (!State.user && currentRoute !== 'auth') {
        currentRoute = 'auth';
    }

    let html = '';
    switch(currentRoute) {
        case 'auth': html = AuthView(); break;
        case 'home': html = HomeView(); break;
        case 'ai': html = AIView(); break;
        default: html = `<div class="screen">${Header()}<h2>Yapım Aşamasında</h2>${BottomNav()}</div>`;
    }

    root.innerHTML = html;
}

// Init
window.addEventListener('DOMContentLoaded', () => {
    if (State.user) currentRoute = 'home';
    renderApp();
});
