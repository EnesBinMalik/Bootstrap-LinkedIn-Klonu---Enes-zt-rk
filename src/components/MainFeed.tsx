import React, { useState } from 'react';
import { FeedPost, UserProfile } from '../types';
import { 
  ThumbsUp, 
  MessageSquare, 
  Repeat, 
  Send, 
  MoreHorizontal, 
  Globe, 
  Smile, 
  X,
  Share2,
  Bookmark,
  Check
} from 'lucide-react';

interface MainFeedProps {
  currentUser: UserProfile;
  posts: FeedPost[];
  onAddPost: (content: string, imageUrl?: string) => void;
  onReactPost: (postId: string, reactionType: 'like' | 'celebrate' | 'love') => void;
  onAddComment: (postId: string, commentText: string) => void;
  isCreateModalOpen: boolean;
  setIsCreateModalOpen: (open: boolean) => void;
}

export const MainFeed: React.FC<MainFeedProps> = ({
  currentUser,
  posts,
  onAddPost,
  onReactPost,
  onAddComment,
  isCreateModalOpen,
  setIsCreateModalOpen,
}) => {
  const [newPostText, setNewPostText] = useState('');
  const [newPostImage, setNewPostImage] = useState('');
  const [showImageInput, setShowImageInput] = useState(false);
  const [activeCommentPostId, setActiveCommentPostId] = useState<string | null>(null);
  const [commentInputs, setCommentInputs] = useState<Record<string, string>>({});
  const [copiedPostId, setCopiedPostId] = useState<string | null>(null);

  const handlePostSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPostText.trim()) return;
    onAddPost(newPostText, newPostImage.trim() || undefined);
    setNewPostText('');
    setNewPostImage('');
    setShowImageInput(false);
    setIsCreateModalOpen(false);
  };

  const handleCommentSubmit = (postId: string, e: React.FormEvent) => {
    e.preventDefault();
    const commentText = commentInputs[postId]?.trim();
    if (!commentText) return;
    onAddComment(postId, commentText);
    setCommentInputs(prev => ({ ...prev, [postId]: '' }));
  };

  const handleCopyLink = (postId: string) => {
    setCopiedPostId(postId);
    setTimeout(() => setCopiedPostId(null), 2000);
  };

  return (
    <div className="main-feed-container">
      {/* 16. Share Box (Gönderi Başlatın Alanı) */}
      <div className="linkedin-card p-3 mb-3">
        <div className="d-flex align-items-center gap-2 mb-3">
          <img
            src={currentUser.avatar}
            alt={currentUser.name}
            className="rounded-circle border border-1 border-white"
            style={{ width: '48px', height: '48px', objectFit: 'cover' }}
          />
          {/* Gönderi başlat button / placeholder */}
          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="btn btn-light border text-start text-muted rounded-pill flex-grow-1 px-3 py-2 fw-medium hover-bg-subtle"
            style={{ fontSize: '14px', backgroundColor: '#ffffff' }}
          >
            Bir gönderi başlat
          </button>
        </div>

        {/* 18. Fotoğraf, Video, Etkinlik, Yazı Yaz with exact fill colors */}
        <div className="d-flex align-items-center justify-content-between pt-1 px-1">
          
          {/* Fotoğraf: #70B5F9 */}
          <button 
            onClick={() => { setShowImageInput(true); setIsCreateModalOpen(true); }}
            className="btn btn-light bg-transparent border-0 d-flex align-items-center gap-2 py-2 px-2 rounded hover-bg-subtle"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="#70B5F9">
              <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14zm-5.04-6.71l-2.75 3.54-1.96-2.36L6.5 17h11l-3.54-4.71z"/>
            </svg>
            <span className="fw-semibold text-secondary d-none d-sm-inline" style={{ fontSize: '13px' }}>
              Fotoğraf
            </span>
          </button>

          {/* Video: #7FC15E */}
          <button 
            onClick={() => setIsCreateModalOpen(true)}
            className="btn btn-light bg-transparent border-0 d-flex align-items-center gap-2 py-2 px-2 rounded hover-bg-subtle"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="#7FC15E">
              <path d="M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4zM15 16H5V8h10v8z"/>
            </svg>
            <span className="fw-semibold text-secondary d-none d-sm-inline" style={{ fontSize: '13px' }}>
              Video
            </span>
          </button>

          {/* Etkinlik: #E7A33E */}
          <button 
            onClick={() => setIsCreateModalOpen(true)}
            className="btn btn-light bg-transparent border-0 d-flex align-items-center gap-2 py-2 px-2 rounded hover-bg-subtle"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="#E7A33E">
              <path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V9h14v11zM7 11h5v5H7z"/>
            </svg>
            <span className="fw-semibold text-secondary d-none d-sm-inline" style={{ fontSize: '13px' }}>
              Etkinlik
            </span>
          </button>

          {/* Yazı Yaz: #F5987E */}
          <button 
            onClick={() => setIsCreateModalOpen(true)}
            className="btn btn-light bg-transparent border-0 d-flex align-items-center gap-2 py-2 px-2 rounded hover-bg-subtle"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="#F5987E">
              <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-2 10H7v-2h10v2zm0-4H7V7h10v2zm-4 8H7v-2h6v2z"/>
            </svg>
            <span className="fw-semibold text-secondary d-none d-sm-inline" style={{ fontSize: '13px' }}>
              Yazı Yaz
            </span>
          </button>

        </div>
      </div>

      {/* Feed Divider with Sort */}
      <div className="d-flex align-items-center my-2 px-1">
        <hr className="flex-grow-1 border-secondary-subtle my-0" />
        <span className="text-muted px-2 small" style={{ fontSize: '12px' }}>
          Sıralama ölçütü: <strong className="text-dark cursor-pointer">En önemli ▾</strong>
        </span>
      </div>

      {/* Posts List */}
      {posts.map((post) => {
        const isAuthorMe = post.authorName === currentUser.name;
        const totalReactions = post.likesCount + post.celebratesCount + post.lovesCount;

        return (
          <article key={post.id} className="linkedin-card p-3 mb-3">
            
            {/* 19. Post Header: Align username top, profession middle, timestamp bottom */}
            <div className="d-flex justify-content-between align-items-start mb-2">
              <div className="d-flex align-items-start">
                <img
                  src={post.authorAvatar}
                  alt={post.authorName}
                  className="rounded-circle border border-1 border-white me-2 mt-1"
                  style={{ width: '48px', height: '48px', objectFit: 'cover' }}
                />
                
                {/* 19. Posttaki kullanıcı adını üste, meslek title'sını ortaya, post paylaşım süresini aşağı sabitleyiniz */}
                <div className="d-flex flex-column align-items-start justify-content-center">
                  {/* Üst: Kullanıcı Adı */}
                  <div className="d-flex align-items-center gap-1">
                    <span className="fw-bold text-dark hover-underline cursor-pointer" style={{ fontSize: '14px' }}>
                      {post.authorName}
                    </span>
                    {isAuthorMe && (
                      <span className="badge bg-primary-subtle text-primary border border-primary-subtle" style={{ fontSize: '10px' }}>
                        Yazar
                      </span>
                    )}
                  </div>

                  {/* Orta: Meslek Title */}
                  <span className="text-muted text-start" style={{ fontSize: '12px', lineHeight: '1.3' }}>
                    {post.authorTitle}
                  </span>

                  {/* Aşağı: Paylaşım Süresi ve Görünürlük İkonu */}
                  <div className="d-flex align-items-center gap-1 text-muted mt-0.5" style={{ fontSize: '11.5px' }}>
                    <span>{post.timeAgo}</span>
                    <span>•</span>
                    <span title="Herkesle Paylaşıldı" className="d-inline-flex align-items-center">
                      <Globe size={11} />
                    </span>
                  </div>
                </div>
              </div>

              {/* More Actions Dropdown */}
              <div className="dropdown">
                <button 
                  className="btn btn-sm btn-light bg-transparent border-0 text-muted p-1"
                  title="Seçenekler"
                >
                  <MoreHorizontal size={18} />
                </button>
              </div>
            </div>

            {/* Post Content */}
            <div className="post-content-body my-2">
              <p 
                className="card-text mb-2 text-dark" 
                style={{ fontSize: '14px', whiteSpace: 'pre-line', lineHeight: '1.5' }}
              >
                {post.content}
              </p>

              {/* Optional Post Media */}
              {post.imageUrl && (
                <div className="rounded overflow-hidden my-2 border border-secondary-subtle">
                  <img
                    src={post.imageUrl}
                    alt="Gönderi görseli"
                    className="w-100"
                    style={{ maxHeight: '420px', objectFit: 'cover' }}
                  />
                </div>
              )}
            </div>

            {/* 21. Reactions Bar with Margins on Icons */}
            <div className="d-flex align-items-center justify-content-between pt-2 pb-1 border-bottom">
              <div className="d-flex align-items-center">
                {/* 21. Beğenme, kalp ve alkışa margin veriniz */}
                <div className="d-flex align-items-center me-2">
                  {/* Beğenme (Like) */}
                  <span 
                    className="reaction-badge bg-primary text-white me-1" 
                    title="Beğen"
                    style={{ width: '18px', height: '18px', fontSize: '10px' }}
                  >
                    👍
                  </span>
                  {/* Alkış (Celebrate) */}
                  <span 
                    className="reaction-badge bg-success text-white me-1" 
                    title="Kutla"
                    style={{ width: '18px', height: '18px', fontSize: '10px' }}
                  >
                    👏
                  </span>
                  {/* Kalp (Love) */}
                  <span 
                    className="reaction-badge bg-danger text-white me-1" 
                    title="Sevgi"
                    style={{ width: '18px', height: '18px', fontSize: '10px' }}
                  >
                    ❤️
                  </span>
                </div>

                <span className="text-muted hover-underline cursor-pointer" style={{ fontSize: '12px' }}>
                  {totalReactions} tepki
                </span>
              </div>

              {/* Comments & Shares count */}
              <div className="d-flex align-items-center gap-2 text-muted" style={{ fontSize: '12px' }}>
                <span 
                  onClick={() => setActiveCommentPostId(activeCommentPostId === post.id ? null : post.id)} 
                  className="hover-underline cursor-pointer"
                >
                  {post.comments.length} yorum
                </span>
                <span>•</span>
                <span>{post.sharesCount} paylaşım</span>
              </div>
            </div>

            {/* 22. Butonlara Bootstrap Düzenlemesi Yapınız (Beğen, Yorum Yap, Paylaş, Gönder) */}
            <div className="d-flex align-items-center justify-content-between pt-1">
              
              {/* Beğen Butonu */}
              <button
                onClick={() => onReactPost(post.id, 'like')}
                className={`post-action-btn flex-fill ${post.userReaction ? 'text-primary active' : ''}`}
              >
                <ThumbsUp size={16} className={post.userReaction ? 'text-primary fill-current' : ''} />
                <span>Beğen</span>
              </button>

              {/* Yorum Yap Butonu */}
              <button
                onClick={() => setActiveCommentPostId(activeCommentPostId === post.id ? null : post.id)}
                className="post-action-btn flex-fill"
              >
                <MessageSquare size={16} />
                <span>Yorum Yap</span>
              </button>

              {/* Paylaş Butonu */}
              <button
                onClick={() => handleCopyLink(post.id)}
                className="post-action-btn flex-fill"
              >
                {copiedPostId === post.id ? (
                  <>
                    <Check size={16} className="text-success" />
                    <span className="text-success">Kopyalandı!</span>
                  </>
                ) : (
                  <>
                    <Repeat size={16} />
                    <span>Paylaş</span>
                  </>
                )}
              </button>

              {/* Gönder Butonu */}
              <button
                onClick={() => handleCopyLink(post.id)}
                className="post-action-btn flex-fill"
              >
                <Send size={16} />
                <span>Gönder</span>
              </button>

            </div>

            {/* Comments Section (Expanded when clicked) */}
            {activeCommentPostId === post.id && (
              <div className="comments-section mt-3 pt-2 border-top">
                
                {/* Comment Input */}
                <form onSubmit={(e) => handleCommentSubmit(post.id, e)} className="d-flex align-items-center gap-2 mb-3">
                  <img
                    src={currentUser.avatar}
                    alt={currentUser.name}
                    className="rounded-circle"
                    style={{ width: '36px', height: '36px', objectFit: 'cover' }}
                  />
                  <div className="input-group">
                    <input
                      type="text"
                      className="form-control rounded-pill px-3"
                      placeholder="Bir yorum ekleyin..."
                      value={commentInputs[post.id] || ''}
                      onChange={(e) => setCommentInputs({ ...commentInputs, [post.id]: e.target.value })}
                      style={{ fontSize: '13px' }}
                    />
                    <button 
                      type="submit" 
                      className="btn btn-primary rounded-pill ms-2 px-3 text-white fw-semibold"
                      disabled={!commentInputs[post.id]?.trim()}
                      style={{ fontSize: '13px' }}
                    >
                      Yayınla
                    </button>
                  </div>
                </form>

                {/* Comments List */}
                <div className="comments-list d-flex flex-column gap-2">
                  {post.comments.map((comment) => (
                    <div key={comment.id} className="d-flex align-items-start gap-2">
                      <img
                        src={comment.authorAvatar}
                        alt={comment.authorName}
                        className="rounded-circle mt-1"
                        style={{ width: '32px', height: '32px', objectFit: 'cover' }}
                      />
                      <div className="p-2 rounded bg-light border flex-grow-1" style={{ fontSize: '13px' }}>
                        <div className="d-flex justify-content-between align-items-center">
                          <strong className="text-dark">{comment.authorName}</strong>
                          <small className="text-muted" style={{ fontSize: '11px' }}>{comment.timeAgo}</small>
                        </div>
                        <small className="text-muted d-block mb-1" style={{ fontSize: '11px' }}>{comment.authorTitle}</small>
                        <p className="mb-0 text-dark">{comment.content}</p>
                      </div>
                    </div>
                  ))}
                </div>

              </div>
            )}

          </article>
        );
      })}

      {/* Modal: Gönderi Başlat */}
      {isCreateModalOpen && (
        <div 
          className="modal show d-block" 
          tabIndex={-1} 
          style={{ backgroundColor: 'rgba(0,0,0,0.6)', zIndex: 1060 }}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content rounded-4 border-0 shadow">
              <div className="modal-header border-bottom py-2 px-3">
                <h5 className="modal-title fw-bold fs-6">Bir gönderi başlat</h5>
                <button 
                  type="button" 
                  className="btn-close" 
                  onClick={() => setIsCreateModalOpen(false)}
                ></button>
              </div>

              <form onSubmit={handlePostSubmit}>
                <div className="modal-body p-3">
                  <div className="d-flex align-items-center gap-2 mb-3">
                    <img
                      src={currentUser.avatar}
                      alt={currentUser.name}
                      className="rounded-circle"
                      style={{ width: '44px', height: '44px', objectFit: 'cover' }}
                    />
                    <div>
                      <h6 className="mb-0 fw-bold">{currentUser.name}</h6>
                      <span className="badge bg-light text-secondary border rounded-pill fw-normal" style={{ fontSize: '11px' }}>
                        🌐 Herkes
                      </span>
                    </div>
                  </div>

                  <textarea
                    className="form-control border-0 shadow-none p-0"
                    rows={4}
                    placeholder="Ne hakkında konuşmak istiyorsunuz?"
                    value={newPostText}
                    onChange={(e) => setNewPostText(e.target.value)}
                    style={{ fontSize: '15px', resize: 'none' }}
                    autoFocus
                  ></textarea>

                  {/* Image URL input if active */}
                  {showImageInput && (
                    <div className="mt-3 pt-2 border-top">
                      <label className="form-label small text-muted mb-1">Görsel URL'si ekleyin (Opsiyonel):</label>
                      <input
                        type="url"
                        className="form-control form-control-sm"
                        placeholder="https://images.unsplash.com/..."
                        value={newPostImage}
                        onChange={(e) => setNewPostImage(e.target.value)}
                      />
                    </div>
                  )}

                  {/* Quick Color Badges to demonstrate requirements */}
                  <div className="d-flex align-items-center gap-2 mt-3 pt-2 border-top">
                    <button
                      type="button"
                      onClick={() => setShowImageInput(!showImageInput)}
                      className="btn btn-sm btn-light d-flex align-items-center gap-1"
                    >
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="#70B5F9">
                        <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14zm-5.04-6.71l-2.75 3.54-1.96-2.36L6.5 17h11l-3.54-4.71z"/>
                      </svg>
                      <span style={{ fontSize: '12px' }}>Fotoğraf Ekle</span>
                    </button>
                    <span className="small text-muted ms-auto" style={{ fontSize: '11px' }}>
                      Enes Öztürk Klonu
                    </span>
                  </div>
                </div>

                <div className="modal-footer border-top py-2 px-3 d-flex justify-content-between">
                  <span className="text-muted small">Kodluyoruz Ödevi</span>
                  <div className="d-flex gap-2">
                    <button 
                      type="button" 
                      className="btn btn-light rounded-pill px-3"
                      onClick={() => setIsCreateModalOpen(false)}
                    >
                      İptal
                    </button>
                    <button 
                      type="submit" 
                      className="btn btn-primary rounded-pill px-4 fw-semibold text-white"
                      disabled={!newPostText.trim()}
                    >
                      Yayınla
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
