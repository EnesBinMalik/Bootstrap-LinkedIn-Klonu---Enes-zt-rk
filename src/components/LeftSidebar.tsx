import React, { useState } from 'react';
import { currentUser } from '../data/mockData';
import { 
  Bookmark, 
  Users, 
  Hash, 
  Calendar, 
  ChevronDown, 
  ChevronUp, 
  Building2, 
  Plus,
  Award
} from 'lucide-react';

interface LeftSidebarProps {
  onTagClick?: (tag: string) => void;
}

export const LeftSidebar: React.FC<LeftSidebarProps> = ({ onTagClick }) => {
  const [showRecentExpanded, setShowRecentExpanded] = useState(true);

  const recentTags = ['react', 'kodluyoruz', 'bootstrap', 'frontend', 'javascript', 'webdevelopment'];
  const groups = ['Kodluyoruz Alumni Network', 'Frontend Istanbul', 'React Developers Turkey'];

  return (
    <div className="left-sidebar-container">
      {/* 1. Profile Summary Card */}
      <div className="linkedin-card text-center position-relative">
        {/* Cover Photo */}
        <div 
          style={{
            height: '60px',
            background: 'linear-gradient(135deg, #a0b4b7 0%, #dbe2e3 100%)',
            borderTopLeftRadius: '7px',
            borderTopRightRadius: '7px',
            position: 'relative'
          }}
        >
          <div className="position-absolute top-0 end-0 p-1">
            <span className="badge bg-dark bg-opacity-50 text-white" style={{ fontSize: '10px' }}>
              Kodluyoruz
            </span>
          </div>
        </div>

        {/* 11. Profile Avatar: centered, rounded, with 2 units white border */}
        <div className="d-flex justify-content-center">
          <img
            src={currentUser.avatar}
            alt={currentUser.name}
            className="profile-card-avatar rounded-circle border border-2 border-white mx-auto d-block"
          />
        </div>

        {/* 12. Restored clean typography */}
        <div className="card-body px-3 pt-2 pb-3">
          <h6 className="card-title fw-bold mb-1 text-dark fs-6">
            {currentUser.name}
          </h6>
          <p className="card-text text-muted mb-2 text-start text-center" style={{ fontSize: '12px', lineHeight: '1.4' }}>
            {currentUser.title}
          </p>

          <div className="d-flex align-items-center justify-content-center gap-1 mb-2">
            <Award size={13} className="text-primary" />
            <span className="text-primary fw-semibold" style={{ fontSize: '11px' }}>
              Bootcamp Öğrencisi
            </span>
          </div>

          <hr className="my-2 border-secondary-subtle" />

          {/* Stats: Profile views & Impressions */}
          <div className="text-start">
            <div className="d-flex justify-content-between align-items-center py-1 px-1 hover-bg-subtle rounded cursor-pointer">
              <span className="text-muted" style={{ fontSize: '11.5px' }}>
                Profilinizi kimler görüntüledi
              </span>
              <span className="text-primary fw-bold" style={{ fontSize: '12px' }}>
                {currentUser.profileViewsCount}
              </span>
            </div>

            <div className="d-flex justify-content-between align-items-center py-1 px-1 hover-bg-subtle rounded cursor-pointer">
              <span className="text-muted" style={{ fontSize: '11.5px' }}>
                Yayınınız için görüntülemeler
              </span>
              <span className="text-primary fw-bold" style={{ fontSize: '12px' }}>
                {currentUser.postImpressionsCount}
              </span>
            </div>
          </div>

          <hr className="my-2 border-secondary-subtle" />

          {/* 13. Sayfalarım & 14. Notification count aligned to the right (ms-auto) */}
          <div className="text-start mb-2">
            <small className="text-muted fw-bold d-block mb-1" style={{ fontSize: '11px' }}>
              SAYFALARIM
            </small>
            <div className="d-flex align-items-center justify-content-between py-1 px-1 rounded hover-bg-subtle cursor-pointer">
              <div className="d-flex align-items-center gap-1 text-truncate">
                <Building2 size={13} className="text-muted shrink-0" />
                <span className="text-dark fw-medium text-truncate" style={{ fontSize: '12px' }}>
                  Kodluyoruz Topluluk
                </span>
              </div>
              {/* 14. Sayfa bildirimi sayısını sağa alınız */}
              <span className="badge rounded-pill bg-danger ms-auto" style={{ fontSize: '10px' }}>
                3
              </span>
            </div>
          </div>

          <hr className="my-2 border-secondary-subtle" />

          {/* Saved Items */}
          <div className="text-start">
            <a 
              href="#saved-items" 
              className="text-decoration-none text-dark d-flex align-items-center gap-2 py-1 px-1 rounded hover-bg-subtle"
              style={{ fontSize: '12px' }}
            >
              <Bookmark size={14} className="text-secondary" />
              <span className="fw-semibold">Ögelerim</span>
            </a>
          </div>
        </div>
      </div>

      {/* 15. "En Yeni" (Recent) Card with sticky, top: 4rem, overflow: visible */}
      <div className="linkedin-card sticky-en-yeni p-3">
        <div className="d-flex justify-content-between align-items-center mb-2">
          <span className="fw-semibold text-muted" style={{ fontSize: '12px' }}>
            En Yeni
          </span>
          <button 
            onClick={() => setShowRecentExpanded(!showRecentExpanded)}
            className="btn btn-sm btn-link text-muted p-0"
            aria-label="En Yeni Aç/Kapat"
          >
            {showRecentExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </button>
        </div>

        {showRecentExpanded && (
          <div>
            {/* Recent Hashtags */}
            <ul className="list-unstyled mb-3">
              {recentTags.map((tag) => (
                <li key={tag} className="mb-1">
                  <button
                    onClick={() => onTagClick && onTagClick(tag)}
                    className="btn btn-link text-decoration-none text-muted p-0 d-flex align-items-center gap-2 w-100 text-start text-truncate"
                    style={{ fontSize: '12px' }}
                  >
                    <Hash size={13} className="text-secondary shrink-0" />
                    <span className="text-truncate hover-underline">{tag}</span>
                  </button>
                </li>
              ))}
            </ul>

            {/* Groups */}
            <div className="mb-3">
              <span className="fw-semibold text-primary d-block mb-1 cursor-pointer hover-underline" style={{ fontSize: '12px' }}>
                Gruplar
              </span>
              <ul className="list-unstyled mb-0">
                {groups.map((grp) => (
                  <li key={grp} className="mb-1">
                    <a
                      href="#group"
                      className="text-decoration-none text-muted d-flex align-items-center gap-2 text-truncate"
                      style={{ fontSize: '11.5px' }}
                    >
                      <Users size={12} className="text-secondary shrink-0" />
                      <span className="text-truncate hover-underline">{grp}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Events */}
            <div className="d-flex justify-content-between align-items-center mb-2">
              <span className="fw-semibold text-primary cursor-pointer hover-underline" style={{ fontSize: '12px' }}>
                Etkinlikler
              </span>
              <Plus size={14} className="text-secondary cursor-pointer" />
            </div>

            {/* Followed Hashtags */}
            <div className="mb-2">
              <span className="fw-semibold text-primary d-block mb-1 cursor-pointer hover-underline" style={{ fontSize: '12px' }}>
                Takip Edilen Hashtag'ler
              </span>
              <div className="d-flex flex-wrap gap-1">
                <span className="badge bg-light text-secondary border fw-normal" style={{ fontSize: '11px' }}>#frontend</span>
                <span className="badge bg-light text-secondary border fw-normal" style={{ fontSize: '11px' }}>#bootstrap</span>
                <span className="badge bg-light text-secondary border fw-normal" style={{ fontSize: '11px' }}>#react</span>
              </div>
            </div>

            <hr className="my-2 border-secondary-subtle" />

            {/* Discover More Link */}
            <div className="text-center pt-1">
              <a 
                href="#discover" 
                className="text-decoration-none text-muted fw-semibold d-block hover-text-primary"
                style={{ fontSize: '12px' }}
              >
                Daha Fazlasını Keşfet
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
