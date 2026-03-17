const translations: Record<string, Record<string, string>> = {
  en: {
    // Sidebar
    'nav.dashboard': 'Dashboard', 'nav.apis': 'APIs', 'nav.monitor': 'Monitor',
    'nav.tools': 'Tools', 'nav.environments': 'Environments', 'nav.history': 'History',
    'nav.settings': 'Settings', 'nav.search': 'Search...', 'nav.logout': 'Log out',
    'nav.synced': 'Synced', 'nav.main': 'Main', 'nav.system': 'System',
    'nav.overview': 'Dashboard',

    // Dashboard
    'dash.title': 'Dashboard', 'dash.subtitle': 'Overview of your API activity and performance',
    'dash.totalCalls': 'Total Calls', 'dash.avgResponse': 'Avg Response',
    'dash.successRate': 'Success Rate', 'dash.today': 'Today',
    'dash.allTime': 'all time', 'dash.average': 'average', 'dash.requestsToday': 'requests today',
    'dash.quickActions': 'Quick Actions', 'dash.systemStatus': 'System Status',
    'dash.recentActivity': 'Recent Activity', 'dash.viewAll': 'View all →',
    'dash.noCallsYet': 'No API calls yet',
    'dash.sendFirst': 'Send your first request to see activity here',
    'dash.quickSend': 'Quick Send', 'dash.newCollection': 'New Collection',
    'dash.environments': 'Environments', 'dash.viewHistory': 'View History',
    'dash.sendRequest': 'Send a request', 'dash.organizeApis': 'Organize APIs',
    'dash.manageVars': 'Manage variables', 'dash.pastRequests': 'Past requests',
    'dash.up': 'Up', 'dash.down': 'Down', 'dash.collections': 'Collections',
    'dash.endpoints': 'Endpoints', 'dash.justNow': 'just now',

    // APIs
    'apis.title': 'APIs', 'apis.subtitle': 'Send requests and manage collections',
    'apis.import': 'Import', 'apis.newCollection': 'New Collection',
    'apis.requestBuilder': 'Request Builder', 'apis.headers': 'Headers',
    'apis.body': 'Body', 'apis.auth': 'Auth', 'apis.query': 'Query',
    'apis.send': 'Send', 'apis.sending': 'Sending...', 'apis.response': 'Response',
    'apis.noCollections': 'No collections yet',
    'apis.createFirst': 'Create your first collection to organize API requests',
    'apis.createCollection': 'Create Collection',
    'apis.addHeader': '+ Add header', 'apis.addParam': '+ Add parameter',

    // Monitor
    'mon.title': 'Monitor', 'mon.subtitle': 'Health checks and uptime monitoring',
    'mon.checkAll': 'Check All', 'mon.healthy': 'Healthy', 'mon.down': 'Down',
    'mon.pending': 'Pending', 'mon.autoCheck': 'Auto Health Check',
    'mon.autoDesc': 'Periodically ping your endpoints',
    'mon.noChecks': 'No health checks',
    'mon.addEndpoints': 'Add endpoints to monitor their uptime and response times automatically.',

    // Tools
    'tools.title': 'Tools', 'tools.subtitle': '78+ professional developer tools',
    'tools.online': 'Online', 'tools.requestTools': 'Request Tools',
    'tools.analysis': 'Analysis', 'tools.configuration': 'Configuration',
    'tools.testing': 'Testing', 'tools.networkSync': 'Network & Sync',

    // Settings
    'set.title': 'Settings', 'set.account': 'Account', 'set.appearance': 'Appearance',
    'set.language': 'Language', 'set.accentColor': 'Accent Color',
    'set.apiKeys': 'API Keys', 'set.data': 'Data',
    'set.noKeys': 'No API keys stored', 'set.addKey': 'Add API Key',
    'set.clearLogs': 'Clear Call Logs', 'set.about': 'About', 'set.version': 'Version',
    'set.system': 'System', 'set.systemDesc': 'Match OS preference',
    'set.dark': 'Dark', 'set.darkDesc': 'Always dark mode',
    'set.light': 'Light', 'set.lightDesc': 'Always light mode',
    'set.freePlan': 'Free Plan', 'set.proPlan': 'Pro Plan', 'set.teamPlan': 'Team Plan',
    'set.upgradePro': 'Upgrade to Pro', 'set.upgradeDesc': 'Unlock 78+ tools, unlimited requests, and cloud sync',

    // Environments
    'env.title': 'Environments', 'env.subtitle': 'Manage variables across different stages',
    'env.new': 'New Environment', 'env.empty': 'No environments',
    'env.emptyDesc': 'Create environments to manage variables like API URLs, tokens, and keys across production, staging, and development.',
    'env.create': 'Create Environment',

    // History
    'hist.title': 'Request History', 'hist.subtitle': 'All your past API requests',
    'hist.clear': 'Clear History', 'hist.empty': 'No history yet',
    'hist.emptyDesc': 'Your API request history will appear here after you start sending requests.',
    'hist.clearConfirm': 'Clear all request history?',

    // Pro
    'pro.title': 'Upgrade to', 'pro.pro': 'Pro',
    'pro.desc': 'This feature requires a Pro subscription. Unlock all 78+ tools, AI analysis, unlimited requests, and encrypted cloud sync.',
    'pro.unlimited': 'Unlimited Requests', 'pro.unlimitedDesc': 'No daily limits on API calls',
    'pro.tools': '78+ Pro Tools', 'pro.toolsDesc': 'WebSocket, GraphQL, AI, and more',
    'pro.sync': 'Encrypted Sync', 'pro.syncDesc': 'E2E encrypted cloud backup',
    'pro.upgrade': 'Upgrade to Pro — $9.99/mo', 'pro.back': 'Go back',
    'pro.trial': '7-day free trial included. Cancel anytime.',
  },
  tr: {
    // Sidebar
    'nav.dashboard': 'Ana Sayfa', 'nav.apis': 'API\'ler', 'nav.monitor': 'İzleme',
    'nav.tools': 'Araçlar', 'nav.environments': 'Ortamlar', 'nav.history': 'Geçmiş',
    'nav.settings': 'Ayarlar', 'nav.search': 'Ara...', 'nav.logout': 'Çıkış Yap',
    'nav.synced': 'Senkronize', 'nav.main': 'Ana Menü', 'nav.system': 'Sistem',
    'nav.overview': 'Ana Sayfa',

    // Dashboard
    'dash.title': 'Ana Sayfa', 'dash.subtitle': 'API aktivitenizin ve performansınızın özeti',
    'dash.totalCalls': 'Toplam Çağrı', 'dash.avgResponse': 'Ort. Yanıt',
    'dash.successRate': 'Başarı Oranı', 'dash.today': 'Bugün',
    'dash.allTime': 'toplam', 'dash.average': 'ortalama', 'dash.requestsToday': 'bugünkü istek',
    'dash.quickActions': 'Hızlı İşlemler', 'dash.systemStatus': 'Sistem Durumu',
    'dash.recentActivity': 'Son Aktivite', 'dash.viewAll': 'Tümünü gör →',
    'dash.noCallsYet': 'Henüz API çağrısı yok',
    'dash.sendFirst': 'Aktiviteyi görmek için ilk isteğinizi gönderin',
    'dash.quickSend': 'Hızlı Gönder', 'dash.newCollection': 'Yeni Koleksiyon',
    'dash.environments': 'Ortamlar', 'dash.viewHistory': 'Geçmişi Gör',
    'dash.sendRequest': 'İstek gönder', 'dash.organizeApis': 'API\'leri düzenle',
    'dash.manageVars': 'Değişkenleri yönet', 'dash.pastRequests': 'Geçmiş istekler',
    'dash.up': 'Aktif', 'dash.down': 'Çökmüş', 'dash.collections': 'Koleksiyonlar',
    'dash.endpoints': 'Endpoint\'ler', 'dash.justNow': 'şimdi',

    // APIs
    'apis.title': 'API\'ler', 'apis.subtitle': 'İstek gönder ve koleksiyonları yönet',
    'apis.import': 'İçe Aktar', 'apis.newCollection': 'Yeni Koleksiyon',
    'apis.requestBuilder': 'İstek Oluşturucu', 'apis.headers': 'Başlıklar',
    'apis.body': 'Gövde', 'apis.auth': 'Kimlik', 'apis.query': 'Sorgu',
    'apis.send': 'Gönder', 'apis.sending': 'Gönderiliyor...', 'apis.response': 'Yanıt',
    'apis.noCollections': 'Henüz koleksiyon yok',
    'apis.createFirst': 'API isteklerini düzenlemek için ilk koleksiyonunuzu oluşturun',
    'apis.createCollection': 'Koleksiyon Oluştur',
    'apis.addHeader': '+ Başlık ekle', 'apis.addParam': '+ Parametre ekle',

    // Monitor
    'mon.title': 'İzleme', 'mon.subtitle': 'Sağlık kontrolleri ve çalışma süresi izleme',
    'mon.checkAll': 'Tümünü Kontrol Et', 'mon.healthy': 'Sağlıklı', 'mon.down': 'Çökmüş',
    'mon.pending': 'Beklemede', 'mon.autoCheck': 'Otomatik Sağlık Kontrolü',
    'mon.autoDesc': 'Endpoint\'lerinizi periyodik olarak kontrol edin',
    'mon.noChecks': 'Sağlık kontrolü yok',
    'mon.addEndpoints': 'Çalışma süresini ve yanıt sürelerini otomatik olarak izlemek için endpoint ekleyin.',

    // Tools
    'tools.title': 'Araçlar', 'tools.subtitle': '78+ profesyonel geliştirici aracı',
    'tools.online': 'Çevrimiçi', 'tools.requestTools': 'İstek Araçları',
    'tools.analysis': 'Analiz', 'tools.configuration': 'Yapılandırma',
    'tools.testing': 'Test', 'tools.networkSync': 'Ağ ve Senkronizasyon',

    // Settings
    'set.title': 'Ayarlar', 'set.account': 'Hesap', 'set.appearance': 'Görünüm',
    'set.language': 'Dil', 'set.accentColor': 'Vurgu Rengi',
    'set.apiKeys': 'API Anahtarları', 'set.data': 'Veri',
    'set.noKeys': 'Kayıtlı API anahtarı yok', 'set.addKey': 'API Anahtarı Ekle',
    'set.clearLogs': 'Çağrı Kayıtlarını Temizle', 'set.about': 'Hakkında', 'set.version': 'Sürüm',
    'set.system': 'Sistem', 'set.systemDesc': 'İşletim sistemi tercihine uy',
    'set.dark': 'Karanlık', 'set.darkDesc': 'Her zaman karanlık mod',
    'set.light': 'Aydınlık', 'set.lightDesc': 'Her zaman aydınlık mod',
    'set.freePlan': 'Ücretsiz Plan', 'set.proPlan': 'Pro Plan', 'set.teamPlan': 'Takım Planı',
    'set.upgradePro': 'Pro\'ya Yükselt', 'set.upgradeDesc': '78+ araç, sınırsız istek ve bulut senkronizasyonun kilidini açın',

    // Environments
    'env.title': 'Ortamlar', 'env.subtitle': 'Farklı aşamalarda değişkenleri yönetin',
    'env.new': 'Yeni Ortam', 'env.empty': 'Ortam yok',
    'env.emptyDesc': 'Üretim, hazırlık ve geliştirme ortamlarında API URL\'leri, tokenlar ve anahtarlar gibi değişkenleri yönetmek için ortam oluşturun.',
    'env.create': 'Ortam Oluştur',

    // History
    'hist.title': 'İstek Geçmişi', 'hist.subtitle': 'Tüm geçmiş API istekleriniz',
    'hist.clear': 'Geçmişi Temizle', 'hist.empty': 'Henüz geçmiş yok',
    'hist.emptyDesc': 'İstek göndermeye başladığınızda API istek geçmişiniz burada görünecek.',
    'hist.clearConfirm': 'Tüm istek geçmişi silinsin mi?',

    // Pro
    'pro.title': 'Yükselt:', 'pro.pro': 'Pro',
    'pro.desc': 'Bu özellik Pro abonelik gerektirir. 78+ araç, AI analizi, sınırsız istek ve şifreli bulut senkronizasyonun kilidini açın.',
    'pro.unlimited': 'Sınırsız İstek', 'pro.unlimitedDesc': 'Günlük API çağrı limiti yok',
    'pro.tools': '78+ Pro Araç', 'pro.toolsDesc': 'WebSocket, GraphQL, AI ve daha fazlası',
    'pro.sync': 'Şifreli Senkronizasyon', 'pro.syncDesc': 'Uçtan uca şifreli bulut yedekleme',
    'pro.upgrade': 'Pro\'ya Yükselt — ₺299/ay', 'pro.back': 'Geri dön',
    'pro.trial': '7 günlük ücretsiz deneme dahil. İstediğiniz zaman iptal edin.',
  },
};

export function getLang(): string {
  try {
    const settings = JSON.parse(localStorage.getItem('fl_settings') || '{}');
    return settings.language || 'en';
  } catch {
    return 'en';
  }
}

export function t(key: string): string {
  const lang = getLang();
  return translations[lang]?.[key] || translations['en']?.[key] || key;
}

export function applyTranslations() {
  // 1. Apply data-i18n attributes
  document.querySelectorAll('[data-i18n]').forEach((el) => {
    const key = (el as HTMLElement).dataset.i18n!;
    const translated = t(key);
    if (el.hasAttribute('placeholder')) {
      (el as HTMLInputElement).placeholder = translated;
    } else {
      el.textContent = translated;
    }
  });

  // 2. Apply data-i18n-placeholder attributes
  document.querySelectorAll('[data-i18n-placeholder]').forEach((el) => {
    const key = (el as HTMLElement).dataset.i18nPlaceholder!;
    (el as HTMLInputElement).placeholder = t(key);
  });
}
