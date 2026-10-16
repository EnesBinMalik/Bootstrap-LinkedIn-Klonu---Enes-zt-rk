import React from 'react';
import { assignmentChecklist } from '../data/mockData';
import { CheckCircle2, X, Award, ExternalLink, Code } from 'lucide-react';

interface AssignmentChecklistModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AssignmentChecklistModal: React.FC<AssignmentChecklistModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div 
      className="modal show d-block" 
      tabIndex={-1} 
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.65)', zIndex: 1070 }}
    >
      <div className="modal-dialog modal-dialog-centered modal-lg modal-dialog-scrollable">
        <div className="modal-content rounded-4 border-0 shadow-lg">
          
          {/* Header */}
          <div className="modal-header border-bottom py-3 px-4 bg-light">
            <div className="d-flex align-items-center gap-2">
              <div className="p-2 bg-primary text-white rounded-3">
                <Award size={22} />
              </div>
              <div>
                <h5 className="modal-title fw-bold fs-6 mb-0 text-dark">
                  Bootstrap LinkedIn Klonu - Ödev Değerlendirme & Kontrol Paneli
                </h5>
                <small className="text-muted">
                  Hazırlayan: <strong>Enes Öztürk</strong> • Kodluyoruz Front-End Web Development Bootcamp
                </small>
              </div>
            </div>
            <button 
              type="button" 
              className="btn-close" 
              onClick={onClose}
              aria-label="Kapat"
            ></button>
          </div>

          {/* Modal Body with All Assignment Items */}
          <div className="modal-body p-4">
            
            {/* Student Intro Banner */}
            <div className="p-3 mb-4 rounded-3 border bg-primary-subtle text-primary-emphasis d-flex align-items-center justify-content-between">
              <div>
                <h6 className="fw-bold mb-1">🎯 Tüm Ödev Kriterleri Tamamlandı (%100)</h6>
                <p className="mb-0 small">
                  Gariban LinkedIn temel dosyası üzerindeki tüm bozukluklar Bootstrap 5, responsive grid (2-6-3), ve özel LinkedIn stilleriyle giderilmiştir.
                </p>
              </div>
              <span className="badge bg-success fs-6 px-3 py-2">
                27 / 27 Tamamlandı
              </span>
            </div>

            {/* Checklist items list */}
            <div className="d-flex flex-column gap-2">
              {assignmentChecklist.map((item) => (
                <div 
                  key={item.id} 
                  className="p-3 rounded border bg-white d-flex align-items-start gap-3 hover-bg-subtle transition-colors"
                >
                  <div className="pt-0.5">
                    <CheckCircle2 size={20} className="text-success shrink-0" />
                  </div>
                  <div className="flex-grow-1">
                    <div className="d-flex justify-content-between align-items-center mb-1">
                      <strong className="text-dark" style={{ fontSize: '13.5px' }}>
                        {item.id}. {item.title}
                      </strong>
                      <span className="badge bg-success-subtle text-success border border-success-subtle" style={{ fontSize: '11px' }}>
                        Başarılı
                      </span>
                    </div>
                    <p className="text-muted mb-0" style={{ fontSize: '12.5px', lineHeight: '1.4' }}>
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

          </div>

          {/* Footer */}
          <div className="modal-footer border-top py-2 px-4 d-flex justify-content-between bg-light">
            <span className="text-muted small">
              İmza: <strong>Enes Öztürk</strong> (Kodluyoruz Bootcamp)
            </span>
            <button 
              type="button" 
              className="btn btn-primary rounded-pill px-4 text-white fw-semibold"
              onClick={onClose}
            >
              Kapat ve Arayüze Dön
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};
