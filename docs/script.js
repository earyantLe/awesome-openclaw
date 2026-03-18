// Awesome OpenClaw - Language Switcher

const langSwitcher = {
    currentLang: 'zh',
    
    init() {
        const savedLang = localStorage.getItem('awesome-openclaw-lang') || 'zh';
        this.setLanguage(savedLang);
        
        document.querySelectorAll('.lang-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const lang = e.target.dataset.lang;
                this.setLanguage(lang);
            });
        });
    },
    
    setLanguage(lang) {
        this.currentLang = lang;
        localStorage.setItem('awesome-openclaw-lang', lang);
        
        document.querySelectorAll('.lang-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.lang === lang);
        });
        
        document.querySelectorAll('[data-zh][data-en]').forEach(el => {
            const text = el.dataset[lang];
            if (text) el.innerHTML = text;
        });
        
        document.documentElement.lang = lang === 'zh' ? 'zh-CN' : 'en';
    }
};

document.addEventListener('DOMContentLoaded', () => langSwitcher.init());
