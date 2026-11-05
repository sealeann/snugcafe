import React, { useState } from 'react';
import { Instagram, Heart, MessageCircle, Share2 } from 'lucide-react';
import { SOCIAL_POSTS } from '../data/cafeData';
import { SocialPost } from '../types';

export const SocialMediaHub: React.FC = () => {
  const [likedPosts, setLikedPosts] = useState<Record<string, boolean>>({});
  const [likeCounts, setLikeCounts] = useState<Record<string, number>>(() => {
    const initial: Record<string, number> = {};
    SOCIAL_POSTS.forEach((post) => {
      // parse approximate number e.g. "42.8K" -> 42800
      const num = parseFloat(post.likes.replace('K', '')) * 1000;
      initial[post.id] = isNaN(num) ? 1200 : num;
    });
    return initial;
  });

  const toggleLike = (id: string) => {
    setLikedPosts((prev) => {
      const isLiked = !prev[id];
      setLikeCounts((c) => ({
        ...c,
        [id]: isLiked ? (c[id] || 0) + 1 : (c[id] || 1) - 1,
      }));
      return { ...prev, [id]: isLiked };
    });
  };

  const formatLikes = (count: number) => {
    if (count >= 1000) {
      return (count / 1000).toFixed(1) + 'K';
    }
    return count.toString();
  };

  return (
    <section id="socials" className="py-16 sm:py-24 bg-[#FAF6EB] border-b border-[#DDD2B1]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Interactive #SipSnuggleRepeat Community UGC Feed */}
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold text-[#D07A7E] uppercase tracking-wider">
                <span>Community UGC Feed</span>
              </div>
              <h3 className="text-2xl font-display font-bold text-[#3D231E] mt-1">
                #SipSnuggleRepeat Moments
              </h3>
            </div>
            <p className="text-xs text-[#7A574E] max-w-sm sm:text-right">
              Tag <span className="font-semibold text-[#3D231E]">@snugcafe</span> and use hashtag <span className="font-semibold text-[#3D231E]">#SipSnuggleRepeat</span> on Instagram or TikTok to be featured!
            </p>
          </div>

          {/* Feed Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {SOCIAL_POSTS.map((post: SocialPost) => {
              const isLiked = likedPosts[post.id];
              const count = likeCounts[post.id] || 0;

              return (
                <div
                  key={post.id}
                  className="bg-white rounded-3xl p-5 border border-[#DDD2B1] shadow-2xs hover:shadow-md transition-all duration-300 flex flex-col justify-between group"
                >
                  <div className="space-y-4">
                    {/* Post Header */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-full bg-[#FAF6EB] border border-[#DDD2B1] flex items-center justify-center text-xs font-bold text-[#3D231E]">
                          {post.author.charAt(0)}
                        </div>
                        <div>
                          <span className="text-xs font-bold text-[#3D231E] block leading-tight">
                            {post.author}
                          </span>
                          <span className="text-[11px] text-[#7A574E]">
                            {post.handle}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-1.5">
                        {post.platform === 'instagram' ? (
                          <div className="p-1.5 rounded-full bg-[#E8A2A5]/20 text-[#D07A7E]">
                            <Instagram className="w-3.5 h-3.5" />
                          </div>
                        ) : (
                          <div className="p-1.5 rounded-full bg-[#3D231E]/10 text-[#3D231E]">
                            <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                              <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 3 15.65 6.34 6.34 0 0 0 9.35 22a6.33 6.33 0 0 0 6.33-6.33V9.08a8.2 8.2 0 0 0 4.6 1.4v-3.4a4.85 4.85 0 0 1-.69-.39z" />
                            </svg>
                          </div>
                        )}
                        <span className="text-[11px] text-[#7A574E]">{post.timeAgo}</span>
                      </div>
                    </div>

                    {/* Image Thumbnail */}
                    <div className="relative h-56 rounded-2xl bg-[#FAF6EB]/80 border border-[#DDD2B1]/50 flex items-center justify-center p-4 overflow-hidden">
                      <img
                        src={post.imageOrPlushie}
                        alt={post.caption}
                        className="max-h-full max-w-full object-contain transition-transform duration-300 group-hover:scale-105"
                        loading="lazy"
                      />
                      <div className="absolute bottom-2.5 left-2.5">
                        <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-white/90 text-[#3D231E] border border-[#DDD2B1] shadow-2xs">
                          {post.tag}
                        </span>
                      </div>
                    </div>

                    {/* Caption */}
                    <p className="text-xs text-[#52312A] leading-relaxed line-clamp-3">
                      {post.caption}
                    </p>
                  </div>

                  {/* Interactive Action Bar */}
                  <div className="pt-4 border-t border-[#FAF6EB] flex items-center justify-between text-xs">
                    <button
                      onClick={() => toggleLike(post.id)}
                      className={`flex items-center gap-1.5 transition-colors cursor-pointer px-2 py-1 rounded-full ${
                        isLiked ? 'text-[#D07A7E] bg-[#E8A2A5]/20 font-bold' : 'text-[#7A574E] hover:text-[#D07A7E]'
                      }`}
                    >
                      <Heart className={`w-4 h-4 ${isLiked ? 'fill-[#D07A7E]' : ''}`} />
                      <span>{formatLikes(count)}</span>
                    </button>

                    <div className="flex items-center gap-3 text-[#7A574E]">
                      <span className="flex items-center gap-1 text-[11px]">
                        <MessageCircle className="w-3.5 h-3.5" />
                        <span>Chat</span>
                      </span>
                      <span className="flex items-center gap-1 text-[11px]">
                        <Share2 className="w-3.5 h-3.5" />
                        <span>Share</span>
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
