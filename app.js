// Ders Koçu - Premium AI Eğitim Platformu (Core Module)

// --- 1. BASE DATA ---
const QUIZ_BANK = {
    'Matematik': [
        { q: '6 + 8 x 2 işleminin sonucu nedir?', a: ['22', '28', '20', '16'], c: 0 },
        { q: 'Hangi sayı asaldır?', a: ['9', '15', '21', '13'], c: 3 },
        { q: 'Karenin kaç kenarı vardır?', a: ['3', '4', '5', '6'], c: 1 },
        { q: '10\'un karesi nedir?', a: ['20', '50', '100', '1000'], c: 2 },
        { q: 'Yarım ile çeyreğin toplamı kaçtır (kesir)?', a: ['1/2', '3/4', '1/4', '1'], c: 1 }
    ],
    'Türkçe': [
        { q: 'Hangisi bir isim tamlamasıdır?', a: ['Mavi ev', 'Kapı kolu', 'Güzel çocuk', 'Hızlı araba'], c: 1 },
        { q: 'Nokta hangi cümlenin sonuna konmaz?', a: ['Soru sorarken', 'Bittiğinde', 'Kısaltmalarda', 'Tarih yazımında'], c: 0 },
        { q: 'Eş anlamı "Hediye" olan kelime?', a: ['Armağan', 'Ödül', 'Mükafat', 'İkram'], c: 0 },
        { q: 'Zıt anlamlısı "Cimri" olan kelime?', a: ['Fakir', 'Zengin', 'Cömert', 'Tutumlu'], c: 2 },
        { q: 'Hangisi ünlü (sesli) harftir?', a: ['T', 'S', 'E', 'M'], c: 2 }
    ],
    'İngilizce': [
        { q: '"Book" kelimesinin Türkçesi nedir?', a: ['Defter', 'Kalem', 'Kitap', 'Silgi'], c: 2 },
        { q: '"Hello" ne demektir?', a: ['Güle güle', 'Merhaba', 'Nasılsın', 'Hoşçakal'], c: 1 },
        { q: 'Renk: "Blue" nedir?', a: ['Kırmızı', 'Mavi', 'Sarı', 'Yeşil'], c: 1 },
        { q: 'Hayvan: "Cat"?', a: ['Köpek', 'Kedi', 'Fare', 'Kuş'], c: 1 },
        { q: '"Good morning!" hangi vakit söylenir?', a: ['Akşam', 'Gece', 'Öğle', 'Sabah'], c: 3 }
    ],
    'Fen Bilimleri': [
        { q: 'Hücrenin enerji merkezi neresidir?', a: ['Çekirdek', 'Mitokondri', 'Koful', 'Ribozom'], c: 1 },
        { q: 'Dünya Güneş etrafında dolanırken ne oluşur?', a: ['Gece', 'Mevsimler', 'Gündüz', 'Aylar'], c: 1 },
        { q: 'Suyun kaynama noktası kaçtır (C)?', a: ['0', '50', '100', '150'], c: 2 },
        { q: 'Hangisi bir gezegen değildir?', a: ['Mars', 'Plüton', 'Uranüs', 'Venüs'], c: 1 },
        { q: 'Besinleri parçalayan sistem?', a: ['Dolaşım', 'Boşaltım', 'Sindirim', 'Solunum'], c: 2 }
    ],
    'Sosyal Bilgiler': [
        { q: 'Türkiye\'nin başkenti neresidir?', a: ['İstanbul', 'Ankara', 'İzmir', 'Bursa'], c: 1 },
        { q: 'Pusulanın renkli ucu nereyi gösterir?', a: ['Güney', 'Doğu', 'Batı', 'Kuzey'], c: 3 },
        { q: 'Cumhuriyet ne zaman ilan edildi?', a: ['1920', '1923', '1919', '1915'], c: 1 },
        { q: 'TBMM hangi şehirdedir?', a: ['Samsun', 'Erzurum', 'Sivas', 'Ankara'], c: 3 },
        { q: 'En büyük gölümüz hangisidir?', a: ['Tuz Gölü', 'Van Gölü', 'Eğirdir Gölü', 'Beyşehir Gölü'], c: 1 }
    ],
    'Din Kültürü': [
        { q: 'İslamın şartı kaçtır?', a: ['3', '4', '5', '6'], c: 2 },
        { q: 'Kur\'an-ı Kerim kime indirilmiştir?', a: ['Hz. İsa', 'Hz. Musa', 'Hz. Muhammed', 'Hz. Adem'], c: 2 },
        { q: 'İmanın şartlarından biri?', a: ['Hacca gitmek', 'Namaz Kılmak', 'Meleklere İnanmak', 'Oruç tutmak'], c: 2 },
        { q: 'Ramazan ayında farz olan ibadet?', a: ['Hac', 'Oruç', 'Zekat', 'Kurban'], c: 1 },
        { q: 'Hangi melek vahiy getirir?', a: ['Mikail', 'İsrafil', 'Azrail', 'Cebrail'], c: 3 }
    ]
};

const LECTURES = {
    'Matematik': { 
        title: 'Tam Sayılar ve Kesirler', 
        video: 'https://www.youtube.com/embed/8mve0UoSxTo',
        desc: 'Sayıları birbirine bölerek kesirli ifadeler inşa edebiliriz. Tam sayıların birleşimi her zaman eğlencelidir!' 
    },
    'Türkçe': { 
        title: 'Paragrafta Anlam', 
        video: 'https://www.youtube.com/embed/5D34CAn9s2g',
        desc: 'Okuduğunu anlamak tüm derslerin temelidir. Ana düşünceyi bulmak için giriş ve sonuç cümlelerine dikkat edin.' 
    },
    'İngilizce': { 
        title: 'Daily Routine', 
        video: 'https://www.youtube.com/embed/juKd26qkNAw',
        desc: 'Günlük yaşantımızda kullandığımız eylemleri (I wake up, I go to school) öğreniyoruz. Pratiksiz dil olmaz!' 
    },
    'Fen Bilimleri': { 
        title: 'Hücre Bölünmesi', 
        video: 'https://www.youtube.com/embed/w77zPAtVTuI', 
        desc: 'Canlıların en temel yapı taşı olan hücre, mitoz ve mayoz bölünme ile nasıl çoğalır? Birlikte öğrenelim.' 
    },
    'Sosyal Bilgiler': { 
        title: 'İklim ve İnsan', 
        video: 'https://www.youtube.com/embed/QbgE0uI6zG4',
        desc: 'Yaşadığımız coğrafya hayatımızı nasıl etkiler? İklimin evlerimize, yiyeceklerimize ve kıyafetlerimize etkilerini inceliyoruz.' 
    },
    'Din Kültürü': { 
        title: 'Değerler Eğitimi', 
        video: 'https://www.youtube.com/embed/3y88bM6xKbc',
        desc: 'Paylaşmak, dürüstlük ve yardımseverlik gibi erdemlerin toplumsal yaşamdaki yeri ve önemini kavrıyoruz.' 
    }
};

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
            'Matematik': 15,
            'Türkçe': 40,
            'İngilizce': 60,
            'Fen Bilimleri': 5,
            'Sosyal Bilgiler': 10,
            'Din Kültürü': 0
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
    
    if(route === 'ai' && params.context && chatLog.length === 1) {
        chatLog.push({ sender: 'ai', text: `Merhaba! Harika, bugün birlikte ${params.context} çalışıyoruz. Sana ilk sorumu sorayım mı yoksa sen mi bir konuyu merak ediyorsun?`});
    }
    
    renderApp();
}

// --- 4. SHARED COMPONENTS ---
const Header = (title="🧠 DersKoçu", showBack=false) => `
    <header class="app-header">
        <div style="display:flex; align-items:center; gap:10px;">
            ${showBack ? `<ion-icon name="arrow-back" style="font-size:1.8rem; cursor:pointer;" onclick="navigate('home')"></ion-icon>` : ''}
            <div style="font-size: 1.5rem; font-weight: 900; color: var(--secondary);">${title}</div>
        </div>
        ${State.user && State.user.role === 'student' ? `
            <div style="display: flex; gap: 15px;">
                <div class="streak-badge"><ion-icon name="flame"></ion-icon> ${State.progress.streak}</div>
                <div class="gem-badge"><ion-icon name="diamond"></ion-icon> ${State.progress.gems}</div>
            </div>
        ` : ''}
    </header>
`;

const BottomNav = () => `
    <nav class="bottom-nav">
        <button class="nav-item ${currentRoute === 'home' ? 'active' : ''}" onclick="navigate('home')">
            <ion-icon name="${State.user.role === 'parent' ? 'pie-chart' : 'home'}"></ion-icon>
            Ana Ekran
        </button>
        ${State.user.role === 'student' ? `
        <button class="nav-item ${currentRoute === 'practice' ? 'active' : ''}" onclick="navigate('practice')">
            <ion-icon name="barbell"></ion-icon>
            Pratik
        </button>
        <button class="nav-item ${currentRoute === 'ai' ? 'active' : ''}" onclick="navigate('ai')">
            <ion-icon name="planet"></ion-icon>
            AI Koç
        </button>
        ` : ''}
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
            <div class="role-card" onclick="loginParent()" style="background:var(--bg-main);">
                <div style="font-size: 3rem;">👨‍👩‍👧</div>
                <h3>Veliyim</h3>
                <p style="color:var(--text-muted); margin-top:5px;">Çocuğumun gelişimini takip etmek istiyorum</p>
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

window.loginParent = () => {
    const name = prompt("Veli isminiz nedir?") || "Veli";
    State.user = { name, role: 'parent' };
    State.save();
    navigate('home');
};

const ParentDashboardView = () => {
    const s = State.progress.subjects;
    let sum = 0;
    Object.values(s).forEach(v => sum += v);
    const avg = Math.round(sum / Object.keys(s).length);

    return `
        <div class="screen">
            ${Header("Öğrenci Takibi")}
            <div style="margin-top:20px;">
                <h2 style="font-size: 1.8rem; font-weight: 900;">Merhabalar, ${State.user.name} 👋</h2>
                <p style="color:var(--text-muted); margin-top:5px;">Öğrencinizin genel durumu ve haftalık ilerlemesi aşağdır.</p>
            </div>
            
            <div style="background:var(--secondary); color:white; padding:20px; border-radius:var(--radius-lg); margin-top:20px; box-shadow:var(--shadow-btn);">
                <h2 style="font-size:3rem; font-weight:900; margin-bottom:10px;">%${avg}</h2>
                <p style="font-weight:600; opacity:0.9;">Genel Müfredat Başarısı</p>
            </div>

            <h3 style="margin-top:30px; margin-bottom:15px;">Akıllı Yapay Zeka Raporu</h3>
            <div style="border:2px solid var(--border-color); border-radius:var(--radius-md); padding:15px; background:var(--bg-secondary);">
                <div style="display:flex; align-items:center; gap:10px; margin-bottom:10px; color:var(--primary);">
                    <ion-icon name="checkmark-circle" style="font-size:1.5rem;"></ion-icon>
                    <strong>İngilizce ve Türkçe harika!</strong>
                </div>
                <div style="display:flex; align-items:center; gap:10px; color:var(--accent-red);">
                    <ion-icon name="warning" style="font-size:1.5rem;"></ion-icon>
                    <strong>Fen Bilimleri pratiğini artırmalısınız.</strong>
                </div>
            </div>

            <button class="btn btn-outline" style="width:100%; margin-top:30px; color:var(--text-muted);" onclick="localStorage.clear(); location.reload();">Oturumu Kapat (Sıfırla)</button>
            ${BottomNav()}
        </div>
    `;
};

const StudentHomeView = () => {
    const s = State.progress.subjects;
    const modules = [
        { id: 'Matematik', bg: 'var(--primary)', icon: '🔢', val: s['Matematik'] },
        { id: 'Türkçe', bg: 'var(--accent-red)', icon: '📚', val: s['Türkçe'] },
        { id: 'İngilizce', bg: 'var(--accent-purple)', icon: '🇬🇧', val: s['İngilizce'] },
        { id: 'Fen Bilimleri', bg: 'var(--secondary)', icon: '🧪', val: s['Fen Bilimleri'] },
        { id: 'Sosyal Bilgiler', bg: 'var(--accent-gold)', icon: '🌍', val: s['Sosyal Bilgiler'] },
        { id: 'Din Kültürü', bg: '#795548', icon: '🌙', val: s['Din Kültürü'] }
    ];

    return `
        <div class="screen">
            ${Header()}
            <div style="margin-top:20px;">
                <h2 style="font-size: 1.8rem; font-weight: 900;">Merhaba, ${State.user.name}! 🚀</h2>
                <p style="color:var(--text-muted); margin-top:5px;">${State.user.grade}. Sınıf Görevlerin Bekliyor</p>
            </div>

            <div class="ai-tutor-banner" style="margin-top: 25px;" onclick="navigate('ai', {context: 'Fen Bilimleri'})">
                <div style="font-size: 3rem;">🤖</div>
                <div class="ai-bubble">Bugün birlikte Fen Bilimleri çalışalım mı? Sana harika taktiklerim var.</div>
            </div>

            <h3 style="margin-bottom: 15px; margin-top:30px;">Derslerin</h3>
            ${modules.map(m => `
                <div class="module-card" onclick="navigate('course', {subject: '${m.id}'})">
                    <div class="module-icon" style="color:${m.bg};">${m.icon}</div>
                    <div class="module-content" style="flex:1;">
                        <h4>${m.id}</h4>
                        <div class="module-progress">
                            <div class="module-progress-fill" style="width: ${m.val}%; background:${m.bg};"></div>
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
                <p style="color:var(--text-muted); margin: 15px 0 30px 0;">Animasyonlu konu anlatımları ve yeni nesil testlere başla.</p>
                
                <div style="display:flex; flex-direction:column; gap:15px;">
                    <button class="btn btn-primary" style="padding:20px; font-size:1.2rem;" onclick="navigate('lecture', {subject: '${subject}'})">
                        <ion-icon name="play-circle"></ion-icon> Konu Anlatımı
                    </button>
                    <button class="btn btn-secondary" style="padding:20px; font-size:1.2rem;" onclick="navigate('practice', {subject: '${subject}'})">
                        <ion-icon name="create"></ion-icon> Branş Denemesi
                    </button>
                </div>
            </div>
            ${BottomNav()}
        </div>
    `;
};

window.playVideo = function(videoUrl) {
    const container = document.getElementById('video-container');
    if(!container) return;
    
    const iframe = document.createElement('iframe');
    iframe.setAttribute('width', '100%');
    iframe.setAttribute('height', '210');
    iframe.setAttribute('src', videoUrl + '?autoplay=1&rel=0&modestbranding=1');
    iframe.setAttribute('frameborder', '0');
    iframe.setAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture');
    iframe.setAttribute('allowfullscreen', 'true');
    iframe.style.cssText = 'display:block; width:100%; aspect-ratio:16/9; border:none;';
    
    container.innerHTML = '';
    container.appendChild(iframe);
}

const LectureView = () => {
    const subject = routeParams.subject;
    const lec = LECTURES[subject] || {
        title: 'Genel Tekrar',
        video: 'https://www.youtube.com/embed/8mve0UoSxTo',
        desc: 'Seçili ders için henüz özel bir eğitim modülü yüklenmedi. Ancak bu temel videoyu izleyerek giriş yapabilirsin.'
    };

    return `
        <div class="screen">
            ${Header(subject, true)}
            <div style="margin-top:20px;">
                <h2 style="font-size:1.8rem; font-weight:900; margin-bottom:15px;">${lec.title}</h2>
                <div id="video-container" style="border-radius:var(--radius-lg); overflow:hidden; border:2px solid var(--border-color); margin-bottom:20px; background: linear-gradient(135deg, var(--secondary), var(--accent-purple)); text-align: center; color: white;">
                    <div style="padding: 40px 20px; cursor:pointer;" onclick="playVideo('${lec.video}')">
                        <div style="font-size:4rem; margin-bottom:10px;">
                            <ion-icon name="play-circle"></ion-icon>
                        </div>
                        <h3 style="font-weight:800; font-size:1.2rem;">${lec.title} Eğitimi</h3>
                        <p style="font-size:0.9rem; opacity:0.8;">İzlemek için dokun</p>
                    </div>
                </div>
                <p style="font-size:1.1rem; line-height:1.6; color:var(--text-main);">${lec.desc}</p>
                
                <button class="btn btn-primary" style="width:100%; margin-top:30px;" onclick="navigate('practice', {subject: '${subject}'})">Şimdi Test Çöz</button>
            </div>
            ${BottomNav()}
        </div>
    `;
}

// --- PRACTICE SYSTEM ---
let practiceQIndex = 0;

const PracticeView = () => {
    const subjectFilter = routeParams.subject;
    // Gelen konu parametresine göre soruları seç, eğer "Genel Pratik" (parametresiz) gelindiyse matematik getir
    const targetSubject = subjectFilter && QUIZ_BANK[subjectFilter] ? subjectFilter : 'Matematik';
    const questions = QUIZ_BANK[targetSubject];

    if(practiceQIndex >= questions.length) {
        return `
            <div class="screen">
                ${Header()}
                <div style="text-align:center; padding:50px 20px;">
                    <div style="font-size:5rem;">🏆</div>
                    <h2 style="font-weight:900; margin:20px 0;">Harika İş Çıkardın!</h2>
                    <p style="color:var(--text-muted); margin-bottom:20px;">${targetSubject} dersindeki görevleri tamamladın!</p>
                    <div style="color:var(--primary); font-size:1.5rem; font-weight:900; margin-bottom:30px;">+50 XP Kazandın</div>
                    <button class="btn btn-primary" onclick="practiceQIndex=0; navigate('home')">Ana Ekrana Dön</button>
                </div>
                ${BottomNav()}
            </div>
        `;
    }

    const q = questions[practiceQIndex];
    return `
        <div class="screen">
            ${Header(`🎯 ${targetSubject} Pratiği`, true)}
            <div style="margin-top:20px;">
                <div style="background:var(--border-color); height:10px; border-radius:10px; overflow:hidden;">
                    <div style="background:var(--primary); height:100%; width:${(practiceQIndex/questions.length)*100}%; transition: width 0.3s;"></div>
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
        practiceQIndex++;
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
            <p style="color:var(--text-muted);">${State.user.role === 'student' ? State.user.grade + '. Sınıf Öğrencisi' : 'Veli'} | Seviye ${State.progress.level}</p>
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

        <h3 style="margin-bottom:15px;">Ayarlar</h3>
        
        <div style="background:var(--bg-secondary); padding:15px; border-radius:var(--radius-lg); margin-bottom:15px; border:2px solid var(--border-color); text-align:left;">
            <h4 style="margin-bottom:5px; font-size:1rem;">Gemini API Ayarları</h4>
            <p style="font-size:0.8rem; color:var(--text-muted); margin-bottom:10px;">AI Koçunun sağlıklı çalışması için kendi Google AI Studio API anahtarınızı girin.</p>
            <input type="password" id="api-key-input" class="input-glass" style="margin-bottom:10px; padding:10px; width:100%;" placeholder="AIzaSy..." value="${State.progress.apiKey || ''}">
            <button class="btn btn-primary" style="width:100%; font-size:0.9rem; padding:10px;" onclick="saveApiKey()">Anahtarı Kaydet</button>
        </div>

        <button class="btn btn-outline" style="width:100%; justify-content:space-between; margin-bottom:15px;" onclick="State.toggleDarkMode()">
            <span><ion-icon name="moon"></ion-icon> Karanlık Mod</span>
            <span style="font-weight:900; color:var(--primary);">${State.progress.dark_mode ? 'AÇIK' : 'KAPALI'}</span>
        </button>

        <button class="btn btn-outline" style="width:100%; justify-content:center; color:var(--accent-red);" onclick="localStorage.clear(); location.reload();">
            Oturumu Kapat ve Sıfırla
        </button>

        ${BottomNav()}
    </div>
`;

window.saveApiKey = () => {
    const inp = document.getElementById('api-key-input');
    if(!inp) return;
    State.progress.apiKey = inp.value.trim();
    State.save();
    alert('API Anahtarı başarıyla kaydedildi!');
}

// --- GEMINI AI CHAT SYSTEM ---
let chatLog = [
    { sender: 'ai', text: 'Merhaba! Ben Ders Koçu Yapay Zekasıyım. API üzerinden bana her dersi sorabilirsin!' }
];

const AIView = () => `
    <div class="screen" style="display:flex; flex-direction:column; padding:0;">
        ${Header("🤖 Konu Koçu")}
        
        <div id="chat-container" style="flex:1; overflow-y:auto; padding:20px; display:flex; flex-direction:column; gap:15px; margin-bottom:80px;">
            ${chatLog.map(msg => `
                <div ${msg.id ? `id="msg-${msg.id}"` : ''} style="display:flex; justify-content: ${msg.sender==='ai' ? 'flex-start' : 'flex-end'}; width:100%;">
                    <div style="max-width:85%; background:${msg.sender==='ai' ? 'var(--bg-secondary)' : 'var(--primary)'}; color:${msg.sender==='ai' ? 'var(--text-main)' : 'white'}; padding:15px; border-radius:var(--radius-lg); ${msg.sender==='ai' ? 'border:2px solid var(--border-color);' : ''}">
                        ${msg.id === 'typing' ? '<div class="typing-indicator"><span></span><span></span><span></span></div>' : msg.text}
                    </div>
                </div>
            `).join('')}
        </div>
        
        <div style="position:fixed; bottom:70px; left:0; width:100%; padding:10px 20px; background:var(--bg-main); border-top:1px solid var(--border-color); display:flex; gap:10px;">
            <input type="text" id="ai-input" class="input-glass" style="margin:0;" placeholder="Yapay zekaya bir şey sor..." onkeypress="if(event.key==='Enter') sendAIGeminiMessage()">
            <button class="btn btn-secondary" onclick="sendAIGeminiMessage()"><ion-icon name="send"></ion-icon></button>
        </div>
        ${BottomNav()}
    </div>
`;

window.sendAIGeminiMessage = async () => {
    const inp = document.getElementById('ai-input');
    if(!inp) return;
    const text = inp.value.trim();
    if(!text) return;
    
    // User message
    const userMsg = { sender: 'user', text };
    chatLog.push(userMsg);
    inp.value = '';
    renderSingleMessage(userMsg);

    // Check Key - Allow user provided key or fallback to a default one (which might be expired)
    let apiKey = State.progress.apiKey;
    if (!apiKey) {
        apiKey = "AIzaSyBo-bnojM9qgb8MKRDmpiOy0wuk0MWEjFc"; 
    }

    // Typing indication
    const typingMsg = { sender: 'ai', id: 'typing' };
    chatLog.push(typingMsg);
    renderSingleMessage(typingMsg);

    // Fetch Gemini
    const fullPrompt = "Sen 'Ders Koçu' adlı uygulamada görevli, 5-8. sınıf öğrencilerine ilham veren sevecen ve bilge bir AI öğretmensin. Mesajın kısa, net ve çocukların anlayacağı dilde olmalı. Gerekirse emoji kullan. Öğrencinin sorusu: " + text;
    
    let finalReply = "";
    try {
        const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ contents: [{parts: [{text: fullPrompt}]}] })
        });
        const data = await res.json();
        
        if (data.error) {
            console.warn("API Error:", data.error);
            finalReply = `<em>(Google API Hatası)</em><br/><strong>Hata Kodu:</strong> ${data.error.code}<br/><strong>Mesaj:</strong> ${data.error.message}<br/><br/>Lütfen Profil sayfasından geçerli bir API anahtarı girdiğinizden emin olun.`;
        } else if (data?.candidates?.[0]?.content?.parts?.[0]?.text) {
            finalReply = data.candidates[0].content.parts[0].text.replace(/\n/g, '<br/>');
        } else {
            console.warn("API Error or block:", data);
            finalReply = generateFallbackAI(text);
        }

    } catch(err) {
        console.error("Fetch Error:", err);
        finalReply = generateFallbackAI(text);
    }

    chatLog = chatLog.filter(m => m.id !== 'typing');
    const typingNode = document.getElementById('msg-typing');
    if (typingNode) typingNode.remove();

    const aiMsg = { sender: 'ai', text: finalReply };
    chatLog.push(aiMsg);
    renderSingleMessage(aiMsg);
}

function renderSingleMessage(msg) {
    const container = document.getElementById('chat-container');
    if (!container) return;
    const div = document.createElement('div');
    if (msg.id) div.id = 'msg-' + msg.id;
    div.style.cssText = `display:flex; justify-content: ${msg.sender==='ai' ? 'flex-start' : 'flex-end'}; width:100%;`;
    
    let textHTML = msg.text;
    if (msg.id === 'typing') {
         textHTML = `<div class="typing-indicator"><span></span><span></span><span></span></div>`;
    }

    div.innerHTML = `
        <div style="max-width:85%; background:${msg.sender==='ai' ? 'var(--bg-secondary)' : 'var(--primary)'}; color:${msg.sender==='ai' ? 'var(--text-main)' : 'white'}; padding:15px; border-radius:var(--radius-lg); ${msg.sender==='ai' ? 'border:2px solid var(--border-color);' : ''}">
            ${textHTML}
        </div>
    `;
    container.appendChild(div);
    scrollToBottom();
}

// Fallback Offline Local Intelligence Engine
function generateFallbackAI(text) {
    const q = text.toLowerCase();
    const prefix = "<em>(Çevrimdışı AI Modu)</em><br/>";
    
    if (q.includes("matematik") || q.includes("+") || q.includes("-") || q.includes("kaç") || q.includes("sayı")) {
        return prefix + "Matematikte bu tür sorulara aşama aşama yaklaşmalısın! İşlem önceliğini hatırlıyor musun?";
    } else if (q.includes("fen") || q.includes("hücre") || q.includes("nedir") || q.includes("nasıl")) {
        return prefix + "Harika bir bilimsel soru! Bunun cevabı doğanın sisteminde gizli. Unutma, fen bilimleri araştırarak öğrenilir.";
    } else if (q.includes("türkçe") || q.includes("anlam") || q.includes("zıt") || q.includes("eş")) {
        return prefix + "Türkçemizin yapısı çok zengindir! Bol bol kitap okuyarak kelime dağarcığını geliştirebilirsin.";
    } else if (q.includes("ingilizce") || q.includes("english") || q.includes("demek")) {
        return prefix + "İngilizce kelimeleri ezberlemek yerine onları küçük cümleler içinde kullanarak bol bol pratik yapmalısın!";
    } else if (q.includes("sosyal") || q.includes("tarih") || q.includes("başkent")) {
        return prefix + "Geçmişini bilmeyen geleceğine yön veremez! Coğrafya ve tarih konularında harita çalışması da çok işine yarayacaktır.";
    } else if (q.includes("din") || q.includes("şart") || q.includes("melek")) {
        return prefix + "Ahlaki değerlerimiz ve temel bilgilerimiz ruhumuzu besler. Güzel bir soru sordun!";
    } else {
        return prefix + "Şu an API sunucularına ulaşamıyorum ama kesinlikle katılıyorum! Bu konuyu biraz daha düşünürsek mükemmel çıkarımlara varabiliriz. Sence bu mantığın ardında ne yatıyor?";
    }
}

function scrollToBottom() {
    setTimeout(() => {
        const box = document.getElementById('chat-container');
        if(box) box.scrollTop = box.scrollHeight;
    }, 50);
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
        case 'home': html = State.user && State.user.role === 'parent' ? ParentDashboardView() : StudentHomeView(); break;
        case 'ai': html = AIView(); break;
        case 'course': html = CourseView(); break;
        case 'lecture': html = LectureView(); break;
        case 'practice': html = PracticeView(); break;
        case 'profile': html = ProfileView(); break;
        default: html = `<div class="screen">${Header()}<h2>Hata Oluştu</h2>${BottomNav()}</div>`;
    }

    root.innerHTML = html;
}

window.addEventListener('DOMContentLoaded', () => {
    applyDarkMode();
    if (State.user) currentRoute = 'home';
    renderApp();
});
