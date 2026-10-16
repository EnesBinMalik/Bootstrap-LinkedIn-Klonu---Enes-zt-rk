import React, { useState } from 'react';
import { currentUser } from '../data/mockData';
import { 
  Home, 
  Users, 
  Briefcase, 
  MessageSquare, 
  Bell, 
  Search, 
  Grid, 
  ChevronDown, 
  CheckCircle2,
  SlidersHorizontal
} from 'lucide-react';

interface NavbarProps {
  onOpenChecklist: () => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onTogglePostModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenChecklist,
  searchQuery,
  onSearchChange,
  onTogglePostModal,
}) => {
  const [activeTab, setActiveTab] = useState<'home' | 'network' | 'jobs' | 'messages' | 'notifications'>('home');
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  return (
    <nav className="linkedin-navbar d-flex align-items-center">
      <div className="linkedin-container w-100 d-flex align-items-center justify-content-between">
        
        {/* Left Section: Logo & Search Box */}
        <div className="d-flex align-items-center flex-grow-1 flex-md-grow-0 me-3">
          {/* Logo with left spacing (ms-2 / ps-1) */}
          <a href="#" className="d-flex align-items-center text-decoration-none me-2 ms-1" title="LinkedIn Ana Sayfa">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 24 24" 
              width="36" 
              height="36" 
              fill="#0a66c2"
              className="rounded"
            >
              <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1-2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
            </svg>
          </a>

          {/* Search Input with right margin and proper placeholder */}
          <div className="linkedin-search-box d-flex align-items-center me-3" style={{ minWidth: '220px', maxWidth: '300px' }}>
            <Search size={16} className="text-muted me-2 shrink-0" />
            <input
              type="text"
              placeholder="Arama yap"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              aria-label="Arama yap"
            />
          </div>
        </div>

        {/* Center / Right Navigation Items */}
        <div className="d-flex align-items-center">
          
          {/* Ana Sayfa */}
          <button
            onClick={() => setActiveTab('home')}
            className={`nav-icon-link border-0 bg-transparent ${activeTab === 'home' ? 'active' : ''}`}
            title="Ana Sayfa"
          >
            <Home size={20} />
            <span className="mt-1">Ana Sayfa</span>
          </button>

          {/* Ağım */}
          <button
            onClick={() => setActiveTab('network')}
            className={`nav-icon-link border-0 bg-transparent ${activeTab === 'network' ? 'active' : ''}`}
            title="Ağım"
          >
            <Users size={20} />
            <span className="mt-1">Ağım</span>
          </button>

          {/* İş İlanları */}
          <button
            onClick={() => setActiveTab('jobs')}
            className={`nav-icon-link border-0 bg-transparent d-none d-sm-flex ${activeTab === 'jobs' ? 'active' : ''}`}
            title="İş İlanları"
          >
            <Briefcase size={20} />
            <span className="mt-1">İş İlanları</span>
          </button>

          {/* Mesajlaşma */}
          <button
            onClick={() => setActiveTab('messages')}
            className={`nav-icon-link border-0 bg-transparent ${activeTab === 'messages' ? 'active' : ''}`}
            title="Mesajlaşma"
          >
            <div className="position-relative">
              <MessageSquare size={20} />
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" style={{ fontSize: '9px', padding: '2px 4px' }}>
                2
              </span>
            </div>
            <span className="mt-1">Mesajlaşma</span>
          </button>

          {/* Bildirimler */}
          <button
            onClick={() => setActiveTab('notifications')}
            className={`nav-icon-link border-0 bg-transparent ${activeTab === 'notifications' ? 'active' : ''}`}
            title="Bildirimler"
          >
            <div className="position-relative">
              <Bell size={20} />
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" style={{ fontSize: '9px', padding: '2px 4px' }}>
                5
              </span>
            </div>
            <span className="mt-1">Bildirimler</span>
          </button>

          {/* "Ben" (Me) Category with Circular Avatar & Caret */}
          <div className="position-relative">
            <button
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className="nav-icon-link border-0 bg-transparent"
              title="Ben - Profil ve Ayarlar"
            >
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                className="rounded-circle border border-1 border-white"
                style={{ width: '22px', height: '22px', objectFit: 'cover' }}
              />
              <span className="mt-1 d-flex align-items-center">
                Ben <ChevronDown size={11} className="ms-0.5" />
              </span>
            </button>

            {/* Profile Dropdown */}
            {showProfileMenu && (
              <div 
                className="position-absolute end-0 mt-1 bg-white border rounded shadow-lg p-3" 
                style={{ width: '260px', zIndex: 1050 }}
              >
                <div className="d-flex align-items-center gap-2 pb-2 border-bottom">
                  <img
                    src={currentUser.avatar}
                    alt={currentUser.name}
                    className="rounded-circle"
                    style={{ width: '48px', height: '48px', objectFit: 'cover' }}
                  />
                  <div>
                    <h6 className="mb-0 fw-bold fs-6">{currentUser.name}</h6>
                    <small className="text-muted text-truncate d-block" style={{ maxWidth: '170px' }}>
                      {currentUser.title}
                    </small>
                  </div>
                </div>
                <div className="py-2 border-bottom">
                  <button 
                    onClick={() => { setShowProfileMenu(false); onOpenChecklist(); }}
                    className="btn btn-outline-primary btn-sm w-100 rounded-pill py-1 mb-2 fw-semibold"
                  >
                    Ödev Kontrol Listesi
                  </button>
                  <button 
                    onClick={() => { setShowProfileMenu(false); onTogglePostModal(); }}
                    className="btn btn-primary btn-sm w-100 rounded-pill py-1 fw-semibold text-white"
                  >
                    Yeni Gönderi Paylaş
                  </button>
                </div>
                <div className="pt-2">
                  <small className="text-muted d-block fw-semibold mb-1">Hesap & Ayarlar</small>
                  <a href="#settings" className="text-decoration-none text-dark small d-block py-1">Ayarlar ve Gizlilik</a>
                  <a href="#help" className="text-decoration-none text-dark small d-block py-1">Yardım & Destek</a>
                  <a href="#logout" className="text-danger small d-block py-1">Oturumu Kapat</a>
                </div>
              </div>
            )}
          </div>

          {/* Divider */}
          <div className="border-end d-none d-md-block h-100 mx-2" style={{ height: '32px' }}></div>

          {/* İş için (Work) */}
          <div className="d-none d-md-flex flex-column align-items-center">
            <button className="nav-icon-link border-0 bg-transparent text-muted" title="İş Çözümleri">
              <Grid size={20} />
              <span className="mt-1 d-flex align-items-center">
                İş İçin <ChevronDown size={11} className="ms-0.5" />
              </span>
            </button>
          </div>

          {/* Assignment Checklist Button - Enes Öztürk Özel Rozet */}
          <button
            onClick={onOpenChecklist}
            className="btn btn-sm btn-outline-primary d-none d-lg-flex align-items-center gap-1 ms-2 rounded-pill px-3 py-1 font-monospace"
            style={{ fontSize: '12px' }}
            title="Kodluyoruz Ödev Kriterleri Kontrol Listesi"
          >
            <CheckCircle2 size={14} className="text-success" />
            <span>Ödev Kriterleri (Enes Öztürk)</span>
          </button>

        </div>
      </div>
    </nav>
  );
};
