import React, { useState, useEffect } from 'react';
import { MessageSquare, Heart, Share2, Plus, Search, Users, Trophy, Medal, Star, Send, X, Camera } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Modal from '../components/Modal';
import { communityService } from '../services/communityService';

const Community = () => {
  const [isNewPostModalOpen, setIsNewPostModalOpen] = useState(false);
  const [newPostContent, setNewPostContent] = useState('');
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      const data = await communityService.getPosts();
      setPosts(data);
      setLoading(false);
    };
    fetchPosts();
  }, []);

  const [expandedComments, setExpandedComments] = useState({});

  const leaderboard = [
    { name: 'Alice Green', points: 2450, rank: 1, badge: 'Gold', avatar: 'A' },
    { name: 'Joe Gardener', points: 1820, rank: 2, badge: 'Silver', avatar: 'J' },
    { name: 'Sarah Bloom', points: 1560, rank: 3, badge: 'Bronze', avatar: 'S' },
    { name: 'Mike Roots', points: 1200, rank: 4, badge: 'Star', avatar: 'M' },
  ];

  const handleLike = async (postId) => {
    try {
      await communityService.likePost(postId);
      setPosts(posts.map(post => {
        if (post.id === postId) {
          return {
            ...post,
            liked: !post.liked,
            likes: post.liked ? post.likes - 1 : post.likes + 1
          };
        }
        return post;
      }));
    } catch (error) {
      console.error('Failed to like post:', error);
    }
  };

  const toggleComments = (postId) => {
    setExpandedComments(prev => ({
      ...prev,
      [postId]: !prev[postId]
    }));
  };

  const handleCreatePost = async (e) => {
    e.preventDefault();
    if (!newPostContent.trim()) return;

    try {
      const newPost = await communityService.createPost({
        user: 'Demo Gardener',
        content: newPostContent,
      });

      setPosts([newPost, ...posts]);
      setNewPostContent('');
      setIsNewPostModalOpen(false);
    } catch (error) {
      console.error('Failed to create post:', error);
    }
  };

  return (
    <div className="max-w-7xl mx-auto py-8">
      <div className="flex flex-col lg:flex-row gap-12">
        {/* Main Feed */}
        <div className="flex-1 space-y-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-4xl font-black text-emerald-900 dark:text-white tracking-tight mb-2">Community</h1>
              <p className="text-emerald-700/60 dark:text-slate-500 text-lg font-medium">Connect with fellow gardeners worldwide.</p>
            </div>
            <button 
              onClick={() => setIsNewPostModalOpen(true)}
              className="bg-emerald-600 text-white px-6 py-3 rounded-2xl font-black hover:bg-emerald-700 transition-all flex items-center space-x-2 shadow-xl shadow-emerald-500/20"
            >
              <Plus className="h-5 w-5" />
              <span>New Post</span>
            </button>
          </div>

          {/* Create Post Input (Inline) */}
          <div className="glass-card p-6 rounded-[32px] flex items-center space-x-4">
            <div className="h-12 w-12 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center flex-shrink-0">
              <Users className="h-6 w-6 text-emerald-600" />
            </div>
            <input
              type="text"
              readOnly
              onClick={() => setIsNewPostModalOpen(true)}
              placeholder="Share something with the community..."
              className="flex-1 bg-emerald-50/50 dark:bg-slate-900 border border-emerald-100 dark:border-white/5 rounded-2xl px-6 py-4 outline-none cursor-pointer hover:bg-emerald-100/50 transition-all font-medium dark:text-white"
            />
          </div>

          {/* New Post Modal */}
          <Modal
            isOpen={isNewPostModalOpen}
            onClose={() => setIsNewPostModalOpen(false)}
            title="Create Post"
          >
            <form onSubmit={handleCreatePost} className="space-y-6">
              <textarea
                autoFocus
                value={newPostContent}
                onChange={(e) => setNewPostContent(e.target.value)}
                placeholder="What's on your mind, gardener?"
                className="w-full p-4 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-white/10 rounded-2xl outline-none focus:border-emerald-600 transition-all resize-none min-h-[150px] font-medium"
              />
              <div className="flex items-center justify-between">
                <button type="button" className="flex items-center space-x-2 text-slate-500 hover:text-emerald-600 transition-colors">
                  <Camera className="h-5 w-5" />
                  <span className="text-xs font-black uppercase tracking-widest">Add Photo</span>
                </button>
                <button
                  type="submit"
                  disabled={!newPostContent.trim()}
                  className="bg-emerald-600 text-white px-8 py-3 rounded-xl font-black shadow-lg shadow-emerald-500/20 hover:bg-emerald-700 transition-all disabled:opacity-50"
                >
                  Post
                </button>
              </div>
            </form>
          </Modal>

          {/* Posts List */}
          <AnimatePresence initial={false}>
            {posts.map(post => (
              <motion.div 
                key={post.id} 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass-card rounded-[40px] overflow-hidden hover:shadow-2xl transition-all duration-500"
              >
                <div className="p-8">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-4">
                      <div className="h-12 w-12 bg-emerald-50 dark:bg-emerald-900/20 rounded-2xl flex items-center justify-center font-black text-emerald-600">
                        {post.user[0]}
                      </div>
                      <div>
                        <h4 className="font-black text-slate-900 dark:text-white tracking-tight">{post.user}</h4>
                        <p className="text-xs text-slate-500 font-bold uppercase tracking-widest">{post.time}</p>
                      </div>
                    </div>
                    <button className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors">
                      <Share2 className="h-5 w-5" />
                    </button>
                  </div>
                  
                  <p className="text-slate-700 dark:text-slate-300 text-lg leading-relaxed mb-6 font-medium">{post.content}</p>
                  
                  {post.image && (
                    <img
                      src={post.image}
                      alt="Post content"
                      className="rounded-[32px] w-full h-[400px] object-cover mb-6 shadow-lg"
                      referrerPolicy="no-referrer"
                    />
                  )}

                  <div className="flex items-center space-x-8 pt-6 border-t border-slate-50 dark:border-white/5">
                    <button 
                      onClick={() => handleLike(post.id)}
                      className={`flex items-center space-x-2 transition-colors group ${post.liked ? 'text-pink-600' : 'text-slate-500 hover:text-pink-600'}`}
                    >
                      <Heart className={`h-5 w-5 ${post.liked ? 'fill-pink-600' : 'group-hover:fill-pink-600'}`} />
                      <span className="font-black">{post.likes}</span>
                    </button>
                    <button 
                      onClick={() => toggleComments(post.id)}
                      className="flex items-center space-x-2 text-slate-500 hover:text-emerald-600 transition-colors group"
                    >
                      <MessageSquare className="h-5 w-5 group-hover:fill-emerald-600" />
                      <span className="font-black">{post.comments.length}</span>
                    </button>
                  </div>

                  {/* Comments Section */}
                  <AnimatePresence>
                    {expandedComments[post.id] && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="mt-6 pt-6 border-t border-slate-50 dark:border-white/5 space-y-4 overflow-hidden"
                      >
                        {post.comments.map(comment => (
                          <div key={comment.id} className="flex items-start space-x-3">
                            <div className="h-8 w-8 bg-slate-100 dark:bg-slate-800 rounded-lg flex items-center justify-center text-[10px] font-black text-slate-500">
                              {comment.user[0]}
                            </div>
                            <div className="flex-1 bg-slate-50 dark:bg-slate-900 p-3 rounded-2xl rounded-tl-none">
                              <p className="text-xs font-black text-slate-900 dark:text-white mb-1">{comment.user}</p>
                              <p className="text-sm text-slate-600 dark:text-slate-400 font-medium">{comment.text}</p>
                            </div>
                          </div>
                        ))}
                        <div className="flex items-center space-x-3 pt-2">
                          <div className="h-8 w-8 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg flex items-center justify-center text-[10px] font-black text-emerald-600">
                            D
                          </div>
                          <div className="flex-1 relative">
                            <input
                              type="text"
                              placeholder="Write a comment..."
                              className="w-full bg-slate-100 dark:bg-slate-800 border-none rounded-xl px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all font-medium dark:text-white"
                            />
                            <button className="absolute right-2 top-1/2 -translate-y-1/2 text-emerald-600 hover:text-emerald-700">
                              <Send className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Sidebar - Challenges & Leaderboard */}
        <div className="lg:w-96 space-y-8">
          {/* Leaderboard */}
          <div className="glass-card p-8 rounded-[40px] relative overflow-hidden">
            <div className="flex items-center justify-between mb-8 relative z-10">
              <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">Leaderboard</h2>
              <Trophy className="h-6 w-6 text-amber-500" />
            </div>
            <div className="space-y-4 relative z-10">
              {leaderboard.map((user, idx) => (
                <motion.div 
                  key={idx} 
                  whileHover={{ scale: 1.02 }}
                  className="flex items-center justify-between p-4 rounded-2xl bg-white dark:bg-slate-900/50 border border-slate-100 dark:border-white/5 shadow-sm"
                >
                  <div className="flex items-center space-x-4">
                    <div className={`h-10 w-10 rounded-xl flex items-center justify-center font-black relative ${
                      user.badge === 'Gold' ? 'bg-amber-100 text-amber-600' :
                      user.badge === 'Silver' ? 'bg-slate-200 text-slate-600' :
                      user.badge === 'Bronze' ? 'bg-orange-100 text-orange-600' :
                      'bg-blue-100 text-blue-600'
                    }`}>
                      {user.avatar}
                      {user.rank <= 3 && (
                        <div className="absolute -top-1 -right-1">
                          <Medal className={`h-4 w-4 ${
                            user.rank === 1 ? 'text-amber-500' :
                            user.rank === 2 ? 'text-slate-400' :
                            'text-orange-500'
                          }`} />
                        </div>
                      )}
                    </div>
                    <div>
                      <p className="font-black text-slate-900 dark:text-white text-sm">{user.name}</p>
                      <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{user.badge} Badge</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-black text-emerald-600 text-sm">{user.points}</p>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Points</p>
                  </div>
                </motion.div>
              ))}
            </div>
            <button className="w-full mt-8 py-4 bg-slate-100 dark:bg-slate-900 text-slate-900 dark:text-white rounded-2xl font-black text-sm hover:bg-slate-200 transition-all relative z-10">
              View All Rankings
            </button>
            <div className="absolute -bottom-12 -left-12 h-48 w-48 bg-amber-500/5 rounded-full blur-3xl -z-0" />
          </div>

          {/* Active Challenges */}
          <div className="glass-card p-8 rounded-[40px] bg-emerald-600 text-white relative overflow-hidden">
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-black tracking-tight">Active Challenge</h2>
                <Star className="h-6 w-6 text-emerald-300 animate-pulse" />
              </div>
              <div className="space-y-6">
                <div className="p-4 bg-white/10 rounded-2xl backdrop-blur-md border border-white/10">
                  <h3 className="font-black mb-1">The Great Tomato Race</h3>
                  <p className="text-xs text-emerald-100 font-medium">Grow the largest tomato by weight. 15 days left!</p>
                </div>
                <div className="flex items-center justify-between text-sm font-black">
                  <span>Your Progress</span>
                  <span>45%</span>
                </div>
                <div className="h-2 w-full bg-white/20 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: '45%' }}
                    className="h-full bg-white rounded-full" 
                  />
                </div>
                <button className="w-full py-4 bg-white text-emerald-600 rounded-2xl font-black text-sm hover:bg-emerald-50 transition-all shadow-xl shadow-black/10">
                  Join Challenge
                </button>
              </div>
            </div>
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Community;
