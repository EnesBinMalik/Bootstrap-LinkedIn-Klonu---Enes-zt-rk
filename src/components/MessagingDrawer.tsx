import React, { useState } from 'react';
import { currentUser, messagesData } from '../data/mockData';
import { 
  ChevronUp, 
  ChevronDown, 
  MoreHorizontal, 
  Edit, 
  Search, 
  Send,
  X,
  Circle
} from 'lucide-react';
import { MessageItem } from '../types';

export const MessagingDrawer: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<MessageItem[]>(messagesData);
  const [selectedChat, setSelectedChat] = useState<MessageItem | null>(null);
  const [replyText, setReplyText] = useState('');
  const [searchFilter, setSearchFilter] = useState('');

  const filteredMessages = messages.filter(m => 
    m.senderName.toLowerCase().includes(searchFilter.toLowerCase()) ||
    m.lastMessage.toLowerCase().includes(searchFilter.toLowerCase())
  );

  const handleSendReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyText.trim() || !selectedChat) return;

    setMessages(prev => prev.map(m => {
      if (m.id === selectedChat.id) {
        return {
          ...m,
          lastMessage: `Sen: ${replyText}`,
          time: 'Şimdi'
        };
      }
      return m;
    }));

    setReplyText('');
  };

  return (
    /* 27. Mesajlaşmanın genişliği olmalı, arkaplanı beyaz olmalı: 300px */
    <div 
      className="linkedin-messaging-drawer"
      style={{
        width: '300px',
        backgroundColor: '#ffffff',
        borderTopLeftRadius: '8px',
        borderTopRightRadius: '8px',
      }}
    >
      {/* Messaging Header */}
      <div 
        onClick={() => setIsOpen(!isOpen)}
        className="d-flex align-items-center justify-content-between px-3 py-2 border-bottom cursor-pointer select-none"
        style={{ height: '48px', backgroundColor: '#ffffff', borderTopLeftRadius: '8px', borderTopRightRadius: '8px' }}
      >
        <div className="d-flex align-items-center gap-2">
          <div className="position-relative">
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              className="rounded-circle"
              style={{ width: '28px', height: '28px', objectFit: 'cover' }}
            />
            <span 
              className="position-absolute bottom-0 end-0 bg-success border border-white rounded-circle"
              style={{ width: '8px', height: '8px' }}
            ></span>
          </div>
          <span className="fw-bold text-dark" style={{ fontSize: '13.5px' }}>
            Mesajlaşma
          </span>
        </div>

        <div className="d-flex align-items-center gap-1 text-muted">
          <button 
            type="button" 
            className="btn btn-sm btn-light bg-transparent border-0 p-1 text-muted" 
            onClick={(e) => { e.stopPropagation(); }}
            title="Daha fazla seçenek"
          >
            <MoreHorizontal size={16} />
          </button>
          <button 
            type="button" 
            className="btn btn-sm btn-light bg-transparent border-0 p-1 text-muted" 
            onClick={(e) => { e.stopPropagation(); }}
            title="Yeni mesaj oluştur"
          >
            <Edit size={16} />
          </button>
          <button 
            type="button" 
            className="btn btn-sm btn-light bg-transparent border-0 p-1 text-muted" 
            aria-label={isOpen ? "Mesajlaşmayı daralt" : "Mesajlaşmayı genişlet"}
          >
            {isOpen ? <ChevronDown size={18} /> : <ChevronUp size={18} />}
          </button>
        </div>
      </div>

      {/* Expanded Content */}
      {isOpen && (
        <div style={{ height: '380px', display: 'flex', flexDirection: 'column' }}>
          
          {selectedChat ? (
            /* Active Chat View */
            <div className="d-flex flex-column h-100">
              {/* Chat Sub-header */}
              <div className="d-flex align-items-center justify-content-between p-2 border-bottom bg-light">
                <div className="d-flex align-items-center gap-2 text-truncate">
                  <img
                    src={selectedChat.senderAvatar}
                    alt={selectedChat.senderName}
                    className="rounded-circle"
                    style={{ width: '26px', height: '26px', objectFit: 'cover' }}
                  />
                  <span className="fw-semibold text-truncate" style={{ fontSize: '12px' }}>
                    {selectedChat.senderName}
                  </span>
                </div>
                <button 
                  onClick={() => setSelectedChat(null)}
                  className="btn btn-sm btn-light p-1 border-0"
                >
                  <X size={14} />
                </button>
              </div>

              {/* Chat Messages Body */}
              <div className="flex-grow-1 p-3 overflow-y-auto" style={{ fontSize: '12.5px' }}>
                <div className="d-flex gap-2 mb-2">
                  <img
                    src={selectedChat.senderAvatar}
                    alt={selectedChat.senderName}
                    className="rounded-circle"
                    style={{ width: '28px', height: '28px', objectFit: 'cover' }}
                  />
                  <div className="bg-light p-2 rounded border">
                    <p className="mb-0">{selectedChat.lastMessage.replace('Sen: ', '')}</p>
                    <small className="text-muted" style={{ fontSize: '10px' }}>{selectedChat.time}</small>
                  </div>
                </div>

                <div className="text-center my-2">
                  <span className="badge bg-secondary-subtle text-secondary fw-normal" style={{ fontSize: '10px' }}>
                    Kodluyoruz Bootstrap Ağı
                  </span>
                </div>
              </div>

              {/* Reply Form */}
              <form onSubmit={handleSendReply} className="p-2 border-top d-flex gap-1">
                <input
                  type="text"
                  placeholder="Mesaj yazın..."
                  className="form-control form-control-sm rounded-pill"
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  style={{ fontSize: '12px' }}
                  autoFocus
                />
                <button 
                  type="submit" 
                  className="btn btn-primary btn-sm rounded-circle p-1.5 text-white"
                  disabled={!replyText.trim()}
                >
                  <Send size={13} />
                </button>
              </form>
            </div>
          ) : (
            /* Conversations List */
            <>
              {/* Search Bar */}
              <div className="p-2 border-bottom">
                <div className="linkedin-search-box" style={{ height: '30px' }}>
                  <Search size={14} className="text-muted me-1.5 shrink-0" />
                  <input
                    type="text"
                    placeholder="Mesajlarda ara"
                    value={searchFilter}
                    onChange={(e) => setSearchFilter(e.target.value)}
                    style={{ fontSize: '12.5px' }}
                  />
                </div>
              </div>

              {/* Messages List */}
              <div className="overflow-y-auto flex-grow-1">
                {filteredMessages.map((msg) => (
                  <div
                    key={msg.id}
                    onClick={() => setSelectedChat(msg)}
                    className="d-flex align-items-center gap-2 p-2 border-bottom cursor-pointer hover-bg-subtle transition-colors"
                  >
                    <div className="position-relative shrink-0">
                      <img
                        src={msg.senderAvatar}
                        alt={msg.senderName}
                        className="rounded-circle"
                        style={{ width: '40px', height: '40px', objectFit: 'cover' }}
                      />
                      {msg.online && (
                        <span 
                          className="position-absolute bottom-0 end-0 bg-success border border-white rounded-circle"
                          style={{ width: '10px', height: '10px' }}
                        ></span>
                      )}
                    </div>

                    <div className="flex-grow-1 text-truncate" style={{ fontSize: '12px' }}>
                      <div className="d-flex justify-content-between align-items-center">
                        <strong className="text-dark text-truncate" style={{ maxWidth: '140px' }}>
                          {msg.senderName}
                        </strong>
                        <small className="text-muted" style={{ fontSize: '11px' }}>{msg.time}</small>
                      </div>
                      <span className="text-muted text-truncate d-block" style={{ fontSize: '11.5px' }}>
                        {msg.lastMessage}
                      </span>
                    </div>

                    {msg.unreadCount && (
                      <span className="badge rounded-pill bg-primary ms-1" style={{ fontSize: '10px' }}>
                        {msg.unreadCount}
                      </span>
                    )}
                  </div>
                ))}
              </div>

              {/* Bottom Info Footer */}
              <div className="p-2 bg-light border-top text-center">
                <small className="text-muted" style={{ fontSize: '11px' }}>
                  Genişlik: 300px • Arkaplan: Beyaz (#fff)
                </small>
              </div>
            </>
          )}

        </div>
      )}
    </div>
  );
};
