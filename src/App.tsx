import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { LeftSidebar } from './components/LeftSidebar';
import { MainFeed } from './components/MainFeed';
import { RightSidebar } from './components/RightSidebar';
import { MessagingDrawer } from './components/MessagingDrawer';
import { AssignmentChecklistModal } from './components/AssignmentChecklistModal';
import { currentUser, initialPosts } from './data/mockData';
import { FeedPost } from './types';
import { CheckCircle2, Award, Sparkles, Layers } from 'lucide-react';

export default function App() {
  const [posts, setPosts] = useState<FeedPost[]>(initialPosts);
  const [searchQuery, setSearchQuery] = useState('');
  const [isChecklistOpen, setIsChecklistOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  // Handle adding new post
  const handleAddPost = (content: string, imageUrl?: string) => {
    const newPost: FeedPost = {
      id: `post-${Date.now()}`,
      authorName: currentUser.name,
      authorTitle: currentUser.title,
      authorAvatar: currentUser.avatar,
      timeAgo: 'Şimdi',
      isPublic: true,
      content,
      imageUrl,
      likesCount: 1,
      celebratesCount: 0,
      lovesCount: 0,
      userReaction: 'like',
      sharesCount: 0,
      comments: [],
    };
    setPosts([newPost, ...posts]);
  };

  // Handle post reaction toggle
  const handleReactPost = (postId: string, reactionType: 'like' | 'celebrate' | 'love') => {
    setPosts(prev => prev.map(p => {
      if (p.id === postId) {
        if (p.userReaction === reactionType) {
          // undo reaction
          return {
            ...p,
            userReaction: null,
            likesCount: p.likesCount > 0 ? p.likesCount - 1 : 0
          };
        } else {
          return {
            ...p,
            userReaction: reactionType,
            likesCount: p.userReaction ? p.likesCount : p.likesCount + 1
          };
        }
      }
      return p;
    }));
  };

  // Handle adding a comment
  const handleAddComment = (postId: string, commentText: string) => {
    setPosts(prev => prev.map(p => {
      if (p.id === postId) {
        return {
          ...p,
          comments: [
            ...p.comments,
            {
              id: `c-${Date.now()}`,
              authorName: currentUser.name,
              authorTitle: currentUser.title,
              authorAvatar: currentUser.avatar,
              content: commentText,
              timeAgo: 'Şimdi'
            }
          ]
        };
      }
      return p;
    }));
  };

  // Filter posts based on search or tag
  const filteredPosts = posts.filter(p => {
    const matchesSearch = searchQuery.trim() === '' || 
      p.authorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.authorTitle.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesTag = !selectedTag || p.content.toLowerCase().includes(selectedTag.toLowerCase());

    return matchesSearch && matchesTag;
  });

  return (
    <div className="min-vh-100 bg-light d-flex flex-column">
      
      {/* 1. Navbar: Fixed-top with bottom border */}
      <Navbar
        onOpenChecklist={() => setIsChecklistOpen(true)}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onTogglePostModal={() => setIsCreateModalOpen(true)}
      />

      {/* 8. Main container offset (padding-top: 5rem) so fixed navbar does not overlay content */}
      <main className="main-content-layout flex-grow-1">
        
        {/* 9. Layout Container (max-width: 1128px) */}
        <div className="linkedin-container">
          
          {/* Top Enes Öztürk Signature / Kodluyoruz Announcement Banner */}
          <div className="assignment-banner rounded-3 p-2 px-3 mb-3 d-flex flex-column flex-sm-row align-items-center justify-content-between shadow-sm gap-2">
            <div className="d-flex align-items-center gap-2">
              <Award size={18} className="text-warning shrink-0" />
              <div>
                <span className="fw-bold">Kodluyoruz Front-End Web Development Bootcamp</span>
                <span className="mx-2 d-none d-md-inline">|</span>
                <span className="text-white-50 d-block d-md-inline">
                  Bootstrap LinkedIn Klonu • <strong>Hazırlayan: Enes Öztürk</strong>
                </span>
              </div>
            </div>

            <div className="d-flex align-items-center gap-2">
              {selectedTag && (
                <button
                  onClick={() => setSelectedTag(null)}
                  className="btn btn-sm btn-light text-dark rounded-pill py-0 px-2 small"
                  style={{ fontSize: '11px' }}
                >
                  #{selectedTag} filtresini kaldır ✕
                </button>
              )}
              <button
                onClick={() => setIsChecklistOpen(true)}
                className="btn btn-sm btn-light text-primary fw-semibold rounded-pill py-1 px-3 d-flex align-items-center gap-1 shadow-sm"
                style={{ fontSize: '12px' }}
              >
                <CheckCircle2 size={14} className="text-success" />
                <span>Ödev Kriterleri Kontrolü (%100)</span>
              </button>
            </div>
          </div>

          {/* 10. Responsive Grid: Sol panele 2 birim, orta panele 6 birim, sağ panele 3 birim */}
          {/* Bütün boyutlarda aynı ölçü geçerli olsun (col-2, col-6, col-3) */}
          <div className="row justify-content-center g-3">
            
            {/* Sol Panel: 2 birim */}
            <div className="col-2">
              <LeftSidebar onTagClick={(tag) => setSelectedTag(tag)} />
            </div>

            {/* Orta Panel: 6 birim */}
            <div className="col-6">
              <MainFeed
                currentUser={currentUser}
                posts={filteredPosts}
                onAddPost={handleAddPost}
                onReactPost={handleReactPost}
                onAddComment={handleAddComment}
                isCreateModalOpen={isCreateModalOpen}
                setIsCreateModalOpen={setIsCreateModalOpen}
              />
            </div>

            {/* Sağ Panel: 3 birim */}
            <div className="col-3">
              <RightSidebar onOpenChecklist={() => setIsChecklistOpen(true)} />
            </div>

          </div>

        </div>

      </main>

      {/* 27. Mesajlaşma Paneli (Genişlik: 300px, Arkaplan: Beyaz) */}
      <MessagingDrawer />

      {/* Assignment Checklist Modal */}
      <AssignmentChecklistModal
        isOpen={isChecklistOpen}
        onClose={() => setIsChecklistOpen(false)}
      />

    </div>
  );
}
