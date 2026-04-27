// Ders Koçu - Premium AI Eğitim Platformu (Core Module)

// --- 1. MOCK DATABASE ---
const QUIZ_BANK = [
    { q: 'Hücrenin enerji merkezi neresidir?', a: ['Çekirdek', 'Mitokondri', 'Koful', 'Ribozom'], c: 1 },
    { q: 'Hangi sayı asaldır?', a: ['9', '15', '21', '13'], c: 3 },
    { q: '"Apple" kelimesinin Türkçesi nedir?', a: ['Armut', 'Elma', 'Üzüm', 'Muz'], c: 1 },
    { q: 'Türkiye\'nin başkenti neresidir?', a: ['İstanbul', 'Ankara', 'İzmir', 'Bursa'], c: 1 }
];

// --- 2. STATE MANAGEMENT ---
const State = {
    user: JSON.parse(localStorage.getItem('dk_user')) || null, 
    progress: JSON.parse(localStorage.getItem('dk_progress')) || {
        xp: 0,
        gems: 0,
        streak: 1,
        level: 1,
        dark_mode: false,
        subjects: {
            matematik: 15,
            turkce: 40,
            ingilizce: 60,
            fen: 5,
            sosyal: 10,
            din: 0
        }
    },
    save() {
        localStorage.setItem('dk_user', JSON.stringify(this.user));
        localStorage.setItem('dk_progress', JSON.stringify(this.progress));
        this.notify();
    },
    addXP(amount) {
        this.progress.xp += amount;
        if(this.progress.xp >= this.progress.level * 100) {
            this.progress.level++;
            alert(`Tebrikler! Seviye ${this.progress.level} oldun! 🎉`);
        }
        this.save();
    },
    toggleDarkMode() {
        this.progress.dark_mode = !this.progress.dark_mode;
        this.save();
        applyDarkMode();
    },
    listeners: [],
    subscribe(fn) { this.listeners.push(fn); },
    notify() { 
        this.listeners.forEach(fn => fn()); 
        applyDarkMode();
    }
};

function applyDarkMode() {
    if(State.progress.dark_mode) document.body.classList.add('dark-mode');
    else document.body.classList.remove('dark-mode');
}

// --- 3. ROUTER ---
let currentRoute = 'auth';
let routeParams = {};

window.navigate = function(route, params = {}) {
    currentRoute = route;
    routeParams = params;
    renderApp();
}

// --- 4. UI COMPONENTS ---

const Header = (title="🧠 DersKoçu", showBack=false) => `
    <header class="app-header">
        <div style="display:flex; align-items:center; gap:10px;">
            ${showBack ? `<ion-icon name="arrow-back" style="font-size:1.8rem; cursor:pointer;" onclick="navigate('home')"></ion-icon>` : ''}
            <div style="font-size: 1.5rem; font-weight: 900; color: var(--secondary);">${title}</div>
        </div>
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

// --- 5. VIEWS ---

const AuthView = () => `
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
        </div>
    </div>
`;

window.loginStudent = () => {
    const name = prompt("Kahraman adın nedir?") || "Öğrenci";
    let grade = prompt("Kaçıncı sınıfsın? (5, 6, 7, 8)") || "5";
    State.user = { name, role: 'student', grade };
    State.save();
    navigate('home');
};

const HomeView = () => {
    const s = State.progress.subjects;
    const modules = [
        { id: 'Matematik', bg: 'var(--primary)', icon: '🔢', val: s.matematik, color: 'var(--primary)' },
        { id: 'Türkçe', bg: 'var(--accent-red)', icon: '📚', val: s.turkce, color: 'var(--accent-red)' },
        { id: 'İngilizce', bg: 'var(--accent-purple)', icon: '🇬🇧', val: s.ingilizce, color: 'var(--accent-purple)' },
        { id: 'Fen Bilimleri', bg: 'var(--secondary)', icon: '🧪', val: s.fen, color: 'var(--secondary)' },
        { id: 'Sosyal Bilgiler', bg: 'var(--accent-gold)', icon: '🌍', val: s.sosyal, color: 'var(--accent-gold)' },
        { id: 'Din Kültürü', bg: '#795548', icon: '🌙', val: s.din, color: '#795548' }
    ];

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
                    Eksiklerini analiz ettim. Bugün birlikte biraz Fen Bilimleri çalışalım mı?
                </div>
            </div>

            <h3 style="margin-bottom: 15px; margin-top:30px;">Derslerin</h3>
            ${modules.map(m => `
                <div class="module-card" onclick="navigate('course', {subject: '${m.id}'})">
                    <div class="module-icon" style="color:${m.color};">${m.icon}</div>
                    <div class="module-content" style="flex:1;">
                        <h4>${m.id}</h4>
                        <div class="module-progress">
                            <div class="module-progress-fill" style="width: ${m.val}%; background:${m.color};"></div>
                        </div>
                    </div>
                </div>
            `).join('')}
            ${BottomNav()}
        </div>
    `;
};

const CourseView = () => {
    const subject = routeParams.subject || 'Ders';
    return `
        <div class="screen">
            ${Header(subject, true)}
            <div style="text-align:center; padding: 40px 20px;">
                <div style="font-size: 5rem; margin-bottom:20px;">📖</div>
                <h2 style="font-size:2rem; font-weight:900;">${subject} Yolculuğu</h2>
                <p style="color:var(--text-muted); margin: 15px 0 30px 0;">Animasyonlu konu anlatımları ve yeni nesil soru bankasına hoş geldin.</p>
                
                <div style="display:flex; flex-direction:column; gap:15px;">
                    <button class="btn btn-primary" style="padding:20px; font-size:1.2rem;" onclick="alert('Konu anlatım videoları hazırlanıyor...')">
                        <ion-icon name="play-circle"></ion-icon> Konu Anlatımı
                    </button>
                    <button class="btn btn-secondary" style="padding:20px; font-size:1.2rem;" onclick="navigate('practice')">
                        <ion-icon name="create"></ion-icon> Soru Çöz (+XP)
                    </button>
                </div>
            </div>
            ${BottomNav()}
        </div>
    `;
};

// --- PRACTICE SYSTEM ---
let currentQ = 0;

const PracticeView = () => {
    if(currentQ >= QUIZ_BANK.length) {
        return `
            <div class="screen">
                ${Header()}
                <div style="text-align:center; padding:50px 20px;">
                    <div style="font-size:5rem;">🏆</div>
                    <h2 style="font-weight:900; margin:20px 0;">Harika İş Çıkardın!</h2>
                    <p style="color:var(--text-muted); margin-bottom:20px;">Tüm günlük pratik sorularını tamamladın.</p>
                    <div style="color:var(--primary); font-size:1.5rem; font-weight:900; margin-bottom:30px;">+50 XP Kazandın</div>
                    <button class="btn btn-primary" onclick="currentQ=0; navigate('home')">Ana Ekrana Dön</button>
                </div>
                ${BottomNav()}
            </div>
        `;
    }

    const q = QUIZ_BANK[currentQ];
    return `
        <div class="screen">
            ${Header("🎯 Günlük Pratik")}
            <div style="margin-top:20px;">
                <div style="background:var(--border-color); height:10px; border-radius:10px; overflow:hidden;">
                    <div style="background:var(--primary); height:100%; width:${(currentQ/QUIZ_BANK.length)*100}%; transition: width 0.3s;"></div>
                </div>
                <h2 style="font-size:1.5rem; font-weight:800; margin:30px 0;">${q.q}</h2>
                <div style="display:flex; flex-direction:column; gap:15px;">
                    ${q.a.map((ans, idx) => `
                        <button class="btn btn-outline" style="justify-content:flex-start; text-transform:none; font-size:1.1rem; padding:20px;" onclick="checkAnswer(${idx}, ${q.c})">
                            ${ans}
                        </button>
                    `).join('')}
                </div>
            </div>
            ${BottomNav()}
        </div>
    `;
};

window.checkAnswer = (selected, correct) => {
    if(selected === correct) {
        State.addXP(10);
        State.progress.gems += 5;
        State.save();
        currentQ++;
        renderApp();
    } else {
        alert("Ops! Yanlış cevap, tekrar düşün! 🤔");
    }
}

// --- PROFILE VIEW ---
const ProfileView = () => `
    <div class="screen">
        ${Header()}
        <div style="text-align:center; padding:20px;">
            <div style="width:100px; height:100px; background:var(--bg-secondary); border:3px solid var(--border-color); border-radius:50%; font-size:3.5rem; display:flex; align-items:center; justify-content:center; margin: 0 auto 15px auto;">
                🧑‍🚀
            </div>
            <h2 style="font-weight:900; font-size:1.8rem;">${State.user.name}</h2>
            <p style="color:var(--text-muted);">${State.user.grade}. Sınıf Öğrencisi | Seviye ${State.progress.level}</p>
        </div>

        <div style="display:grid; grid-template-columns: 1fr 1fr; gap:10px; margin-bottom:25px;">
            <div style="background:var(--bg-secondary); padding:15px; border-radius:var(--radius-lg); text-align:center; border:2px solid var(--border-color);">
                <div style="color:var(--primary); font-weight:900; font-size:1.5rem;">${State.progress.xp}</div>
                <div style="font-size:0.8rem; color:var(--text-muted); text-transform:uppercase;">Toplam XP</div>
            </div>
            <div style="background:var(--bg-secondary); padding:15px; border-radius:var(--radius-lg); text-align:center; border:2px solid var(--border-color);">
                <div style="color:var(--accent-gold); font-weight:900; font-size:1.5rem;">${State.progress.gems}</div>
                <div style="font-size:0.8rem; color:var(--text-muted); text-transform:uppercase;">Elmas</div>
            </div>
        </div>

        <h3 style="margin-bottom:15px;">Haftalık Lig (Liderlik)</h3>
        <div style="background:var(--bg-secondary); border-radius:var(--radius-lg); border:2px solid var(--border-color); padding:15px; margin-bottom:25px;">
            <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid var(--border-color); padding-bottom:10px; margin-bottom:10px;">
                <span style="font-weight:800;">1. Ayşe T.</span> <span style="color:var(--primary); font-weight:800;">1200 XP</span>
            </div>
            <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid var(--border-color); padding-bottom:10px; margin-bottom:10px; background:rgba(88,204,2,0.1); padding:10px; border-radius:8px;">
                <span style="font-weight:800; color:var(--primary);">2. ${State.user.name}</span> <span style="color:var(--primary); font-weight:800;">${State.progress.xp} XP</span>
            </div>
            <div style="display:flex; justify-content:space-between; align-items:center;">
                <span style="font-weight:800; color:var(--text-muted);">3. Mehmet S.</span> <span style="color:var(--text-muted); font-weight:800;">900 XP</span>
            </div>
        </div>

        <h3 style="margin-bottom:15px;">Ayarlar</h3>
        <button class="btn btn-outline" style="width:100%; justify-content:space-between;" onclick="State.toggleDarkMode()">
            <span><ion-icon name="moon"></ion-icon> Karanlık Mod</span>
            <span style="font-weight:900; color:var(--primary);">${State.progress.dark_mode ? 'AÇIK' : 'KAPALI'}</span>
        </button>

        ${BottomNav()}
    </div>
`;

// --- AI CHAT SYSTEM ---
let chatLog = [
    { sender: 'ai', text: 'Merhaba! Ben senin kişisel yapay zeka eğitim koçunum. Hangi konuda yardıma ihtiyacın var? Anlamadığın bir soruyu sorabilirsin.' }
];

const AIView = () => `
    <div class="screen" style="display:flex; flex-direction:column;">
        ${Header("🤖 Konu Koçu")}
        
        <div id="chat-container" style="flex:1; overflow-y:auto; padding:15px 0; display:flex; flex-direction:column; gap:15px; margin-bottom:20px;">
            ${chatLog.map(msg => `
                <div style="display:flex; justify-content: ${msg.sender==='ai' ? 'flex-start' : 'flex-end'}">
                    <div style="max-width:80%; background:${msg.sender==='ai' ? 'var(--bg-secondary)' : 'var(--primary)'}; color:${msg.sender==='ai' ? 'var(--text-main)' : 'white'}; padding:15px; border-radius:var(--radius-lg); ${msg.sender==='ai' ? 'border:2px solid var(--border-color);' : ''}">
                        ${msg.text}
                    </div>
                </div>
            `).join('')}
        </div>
        
        <div style="display:flex; gap:10px; margin-bottom:60px;">
            <input type="text" id="ai-input" class="input-glass" style="margin:0;" placeholder="Bana bir şey sor..." onkeypress="if(event.key==='Enter') sendAIMessage()">
            <button class="btn btn-secondary" onclick="sendAIMessage()"><ion-icon name="send"></ion-icon></button>
        </div>
        ${BottomNav()}
    </div>
`;

window.sendAIMessage = () => {
    const inp = document.getElementById('ai-input');
    const text = inp.value.trim();
    if(!text) return;
    
    // User message
    chatLog.push({ sender: 'user', text });
    inp.value = '';
    renderApp();

    setTimeout(() => {
        const chatContainer = document.getElementById('chat-container');
        if(chatContainer) chatContainer.scrollTop = chatContainer.scrollHeight;
    }, 50);

    // Mock AI Response
    setTimeout(() => {
        const responses = [
            "Harika bir soru! Adım adım gidelim: İstersen önce formülü hatırlayalım.",
            "Bu konuyu biraz daha basitleştireyim. Şöyle düşün: Hayatımızdaki...",
            "Güzel! Peki bu soruda 'Anlamadım' dediğin tam olarak neresi? Sana özel bir örnek verebilirim.",
            "Bunu çözmek için harika bir taktiğim var. Önce ana fikre odaklanmalısın. Anlatmamı ister misin?"
        ];
        const reply = responses[Math.floor(Math.random() * responses.length)];
        chatLog.push({ sender: 'ai', text: reply });
        renderApp();
        setTimeout(() => {
            const chatContainer = document.getElementById('chat-container');
            if(chatContainer) chatContainer.scrollTop = chatContainer.scrollHeight;
        }, 50);
    }, 1200);
}

// --- APP INIT ---
function renderApp() {
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
        case 'course': html = CourseView(); break;
        case 'practice': html = PracticeView(); break;
        case 'profile': html = ProfileView(); break;
        default: html = `<div class="screen">${Header()}<h2>Yapım Aşamasında</h2>${BottomNav()}</div>`;
    }

    root.innerHTML = html;
}

window.addEventListener('DOMContentLoaded', () => {
    applyDarkMode();
    if (State.user) currentRoute = 'home';
    renderApp();
});
