import React, { useState } from 'react';
import { newsData, coursesData } from '../data/mockData';
import { 
  Info, 
  ChevronDown, 
  ChevronUp, 
  ArrowRight, 
  PlayCircle,
  ExternalLink,
  Sparkles
} from 'lucide-react';

interface RightSidebarProps {
  onOpenChecklist: () => void;
}

export const RightSidebar: React.FC<RightSidebarProps> = ({ onOpenChecklist }) => {
  const [showAllNews, setShowAllNews] = useState(false);
  const [showAllCourses, setShowAllCourses] = useState(false);

  const displayedNews = showAllNews ? newsData : newsData.slice(0, 4);
  const displayedCourses = showAllCourses ? coursesData : coursesData.slice(0, 3);

  const footerLinks = [
    { text: 'Hakkında', href: '#about' },
    { text: 'Erişilebilirlik', href: '#accessibility' },
    { text: 'Yardım Merkezi', href: '#help' },
    { text: 'Gizlilik ve Koşullar', href: '#privacy' },
    { text: 'Reklam Tercihleri', href: '#ad-preferences' },
    { text: 'Reklam', href: '#advertising' },
    { text: 'Ticari Hizmetler', href: '#business' },
    { text: 'LinkedIn uygulamasını yükle', href: '#app' },
    { text: 'Daha Fazla', href: '#more' },
  ];

  return (
    <div className="right-sidebar-container">
      
      {/* 24. LinkedIn Haberler Card (Genişliği 100%) */}
      <div className="linkedin-card w-100 p-3 mb-3">
        <div className="d-flex justify-content-between align-items-center mb-2">
          <h6 className="fw-bold mb-0 text-dark fs-6">LinkedIn Haberler</h6>
          <span title="En önemli haberler" className="d-inline-flex align-items-center cursor-pointer">
            <Info size={14} className="text-muted" />
          </span>
        </div>

        {/* 23. Logoların / İkonların yanındaki yazılar: DİV YERİNE SPAN KULLANILDI */}
        <ul className="list-unstyled mb-2">
          {displayedNews.map((item) => (
            <li key={item.id} className="mb-2">
              <a 
                href="#news" 
                className="text-decoration-none text-dark d-block hover-text-primary"
              >
                {/* Div yerine d-flex veya span ile logonun/noktanın yanında tutuldu */}
                <div className="d-flex align-items-baseline">
                  <span className="text-secondary me-2" style={{ fontSize: '10px' }}>●</span>
                  <span className="fw-semibold text-truncate d-inline-block" style={{ fontSize: '12.5px', maxWidth: '210px' }}>
                    {item.title}
                  </span>
                </div>
                <div className="text-muted ms-3" style={{ fontSize: '11px' }}>
                  <span>{item.timeAgo}</span> • <span>{item.readersCount}</span>
                </div>
              </a>
            </li>
          ))}
        </ul>

        {/* Show More Button */}
        <button
          onClick={() => setShowAllNews(!showAllNews)}
          className="btn btn-sm btn-link text-muted p-0 d-flex align-items-center gap-1 hover-text-primary text-decoration-none fw-semibold"
          style={{ fontSize: '12px' }}
        >
          <span>{showAllNews ? 'Daha az göster' : 'Daha fazla göster'}</span>
          {showAllNews ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
        </button>
      </div>

      {/* 24. Bugünün En Çok İzlenen Eğitimleri (Üstteki gibi aynı genişlikte) */}
      <div className="linkedin-card w-100 p-3 mb-3">
        <div className="d-flex justify-content-between align-items-center mb-2">
          <h6 className="fw-bold mb-0 text-dark fs-6">Bugünün en çok izlenen eğitimleri</h6>
          <span title="Popüler eğitimler" className="d-inline-flex align-items-center cursor-pointer">
            <Info size={14} className="text-muted" />
          </span>
        </div>

        <ul className="list-unstyled mb-2">
          {displayedCourses.map((course) => (
            <li key={course.id} className="mb-2">
              <a 
                href="#course" 
                className="text-decoration-none text-dark d-block hover-text-primary"
              >
                {/* 23. Div yerine span ile logo/ikon yanı metin hizalaması */}
                <div className="d-flex align-items-baseline">
                  <PlayCircle size={13} className="text-primary me-1.5 shrink-0" style={{ transform: 'translateY(2px)' }} />
                  <span className="fw-semibold text-truncate d-inline-block" style={{ fontSize: '12.5px', maxWidth: '200px' }}>
                    {course.title}
                  </span>
                </div>
                <div className="text-muted ms-3" style={{ fontSize: '11px' }}>
                  <span>{course.author}</span> • <span>{course.viewersCount}</span>
                </div>
              </a>
            </li>
          ))}
        </ul>

        <button
          onClick={() => setShowAllCourses(!showAllCourses)}
          className="btn btn-sm btn-link text-muted p-0 d-flex align-items-center gap-1 hover-text-primary text-decoration-none fw-semibold"
          style={{ fontSize: '12px' }}
        >
          <span>{showAllCourses ? 'Daha az göster' : 'Daha fazla göster'}</span>
          {showAllCourses ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
        </button>
      </div>

      {/* 25. Sağ panelde en alttaki bölüme sticky pozisyon ve yukarıdan 4rem mesafe */}
      <div className="sticky-sag-panel">
        
        {/* Assignment & Promo Card */}
        <div className="linkedin-card p-3 mb-2 text-center" style={{ backgroundColor: '#ffffff' }}>
          <div className="d-flex align-items-center justify-content-center gap-1 mb-2">
            <Sparkles size={16} className="text-warning" />
            <span className="fw-bold text-dark" style={{ fontSize: '12px' }}>
              Kodluyoruz Front-End Ödevi
            </span>
          </div>

          <p className="text-muted mb-2" style={{ fontSize: '11.5px', lineHeight: '1.4' }}>
            Enes Öztürk tarafından hazırlanan Bootstrap LinkedIn Klonu tüm maddeleriyle yayında!
          </p>

          <button
            onClick={onOpenChecklist}
            className="btn btn-outline-primary btn-sm rounded-pill w-100 fw-semibold py-1 d-flex align-items-center justify-content-center gap-1"
            style={{ fontSize: '12px' }}
          >
            <span>Ödev Kriterlerini İncele</span>
            <ArrowRight size={13} />
          </button>
        </div>

        {/* 26. Bu bölümdeki linkler YAN YANA olmalı (Inline flex / inline-block) */}
        <div className="px-2 text-center">
          <div className="d-flex flex-wrap justify-content-center gap-x-2 gap-y-1 mb-2">
            {footerLinks.map((link) => (
              <a
                key={link.text}
                href={link.href}
                className="footer-link mb-1"
              >
                {link.text}
              </a>
            ))}
          </div>

          {/* LinkedIn & Enes Öztürk Signature */}
          <div className="d-flex align-items-center justify-content-center gap-1 text-muted" style={{ fontSize: '11.5px' }}>
            <span className="fw-bold text-primary">Linked</span>
            <span className="bg-primary text-white rounded px-1 fw-bold" style={{ fontSize: '10px' }}>in</span>
            <span className="ms-1">Enes Öztürk © 2026</span>
          </div>
          <small className="text-muted d-block mt-0.5" style={{ fontSize: '10.5px' }}>
            Kodluyoruz Bootcamp Ödev Projesi
          </small>
        </div>

      </div>
    </div>
  );
};
