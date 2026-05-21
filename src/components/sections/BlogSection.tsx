import React, { useState } from "react";
import { BLOG_POSTS } from "../../data/blog-posts";
import { PixelCard } from "../ui/PixelCard";
import { PixelBadge } from "../ui/PixelBadge";
import { PixelButton } from "../ui/PixelButton";
import { BookOpen, Calendar, Clock, ChevronLeft, ArrowRight, CornerDownRight } from "lucide-react";
import { BlogPost } from "../../types/portfolio";

interface BlogSectionProps {
  recruiterMode: boolean;
}

export const BlogSection: React.FC<BlogSectionProps> = ({ recruiterMode }) => {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const categories = [
    "All",
    "Backend Engineering",
    "AI / LLM",
    "Frontend",
    "Algorithms"
  ];

  const filteredPosts = selectedCategory === "All"
    ? BLOG_POSTS
    : BLOG_POSTS.filter(post => post.category.includes(selectedCategory) || selectedCategory.includes(post.category));

  // Simple, robust inline custom markdown formatter
  const renderMarkdown = (md: string) => {
    const lines = md.split("\n");
    let isCodeBlock = false;
    let codeContent: string[] = [];
    let codeLang = "";

    return lines.map((line, idx) => {
      // Code Block Toggles
      if (line.trim().startsWith("```")) {
        if (isCodeBlock) {
          isCodeBlock = false;
          const displayCode = codeContent.join("\n");
          codeContent = [];
          return (
            <pre 
              key={idx} 
              className="bg-[#0b0c10] border-2 border-[#2e3440] p-4 my-4 font-mono text-sm overflow-x-auto text-emerald-400 select-all"
            >
              <code>{displayCode}</code>
            </pre>
          );
        } else {
          isCodeBlock = true;
          codeLang = line.replace("```", "").trim();
          return null;
        }
      }

      if (isCodeBlock) {
        codeContent.push(line);
        return null;
      }

      const trimmed = line.trim();

      // Headers
      if (trimmed.startsWith("### ")) {
        return (
          <h4 key={idx} className="font-press text-[10px] text-[#d4af37] mt-6 mb-3 uppercase tracking-wide">
            {trimmed.replace("### ", "")}
          </h4>
        );
      }
      if (trimmed.startsWith("## ")) {
        return (
          <h3 key={idx} className="font-press text-xs text-[#ff4757] mt-8 mb-4 uppercase tracking-wider">
            {trimmed.replace("## ", "")}
          </h3>
        );
      }

      // Bullets
      if (trimmed.startsWith("* ") || trimmed.startsWith("- ")) {
        return (
          <li key={idx} className="list-disc ml-6 my-2 font-vt text-lg text-zinc-300">
            {trimmed.substring(2)}
          </li>
        );
      }

      // Empty Lines
      if (trimmed === "") {
        return <div key={idx} className="h-3" />;
      }

      // Default paragraph
      return (
        <p key={idx} className="font-vt text-lg text-zinc-300 leading-relaxed my-2">
          {/* Bold parsing highlight */}
          {line.split("**").map((part, pIdx) => {
            if (pIdx % 2 === 1) {
              return <strong key={pIdx} className="text-[#d4af37] font-semibold">{part}</strong>;
            }
            // Code block inside sentence parsing
            return part.split("`").map((subPart, sIdx) => {
              if (sIdx % 2 === 1) {
                return <code key={sIdx} className="bg-[#0b0c10] border border-[#2e3440] px-1 py-0.5 rounded text-sm text-[#00a8ff] font-mono">{subPart}</code>;
              }
              return subPart;
            });
          })}
        </p>
      );
    });
  };

  // Recruiter layout parser (renders using clean sans fonts)
  const renderRecruiterMarkdown = (md: string) => {
    const lines = md.split("\n");
    let isCodeBlock = false;
    let codeContent: string[] = [];

    return lines.map((line, idx) => {
      if (line.trim().startsWith("```")) {
        if (isCodeBlock) {
          isCodeBlock = false;
          const displayCode = codeContent.join("\n");
          codeContent = [];
          return (
            <pre key={idx} className="bg-zinc-950 border border-zinc-800 p-4 my-3 rounded-lg font-mono text-xs overflow-x-auto text-amber-500">
              <code>{displayCode}</code>
            </pre>
          );
        } else {
          isCodeBlock = true;
          return null;
        }
      }

      if (isCodeBlock) {
        codeContent.push(line);
        return null;
      }

      const trimmed = line.trim();

      if (trimmed.startsWith("### ")) {
        return <h4 key={idx} className="text-sm font-bold text-zinc-200 mt-5 mb-2">{trimmed.replace("### ", "")}</h4>;
      }
      if (trimmed.startsWith("## ")) {
        return <h3 key={idx} className="text-base font-bold text-zinc-100 mt-6 mb-3 border-b border-zinc-800 pb-1">{trimmed.replace("## ", "")}</h3>;
      }
      if (trimmed.startsWith("* ") || trimmed.startsWith("- ")) {
        return <li key={idx} className="list-disc ml-5 my-1 text-sm text-zinc-400">{trimmed.substring(2)}</li>;
      }
      if (trimmed === "") return <div key={idx} className="h-2.5" />;

      return (
        <p key={idx} className="text-sm text-zinc-400 leading-relaxed my-2">
          {line.split("**").map((part, pIdx) => {
            if (pIdx % 2 === 1) return <strong key={pIdx} className="text-zinc-200 font-semibold">{part}</strong>;
            return part.split("`").map((subPart, sIdx) => {
              if (sIdx % 2 === 1) return <code key={sIdx} className="bg-zinc-950 border border-zinc-850 px-1 py-0.5 rounded text-xs text-amber-500 font-mono">{subPart}</code>;
              return subPart;
            });
          })}
        </p>
      );
    });
  };

  // RPG List View
  const renderRPGList = () => {
    return (
      <div className="space-y-6">
        {filteredPosts.map((post) => (
          <PixelCard 
            key={post.id} 
            variant="slate" 
            onClick={() => setSelectedPost(post)}
            className="group cursor-pointer hover:bg-[#1e2230]"
          >
            <div className="flex justify-between items-start gap-2 border-b border-[#2e3440] pb-2 mb-3">
              <div className="flex flex-col gap-1">
                <span className="font-press text-[7px] text-[#4c566a] select-none">
                  LOG ENTRY // {post.publishedDate}
                </span>
                <h3 className="font-press text-[9px] text-[#d4af37] group-hover:text-[#f3e5ab] transition-colors leading-relaxed uppercase">
                  {post.title}
                </h3>
              </div>
              <PixelBadge variant="slate">{post.readingTime}</PixelBadge>
            </div>

            <p className="font-vt text-lg text-zinc-400 leading-relaxed mb-4">
              {post.summary}
            </p>

            <div className="flex justify-between items-center pt-2 border-t border-[#2e3440]">
              <span className="font-vt text-base text-[#4c566a]">Category: <span className="text-[#00a8ff]">{post.category}</span></span>
              <span className="font-press text-[7px] text-[#d4af37] flex items-center gap-1 group-hover:translate-x-0.5 transition-transform select-none">
                READ LOG <ArrowRight className="w-3 h-3" />
              </span>
            </div>
          </PixelCard>
        ))}
      </div>
    );
  };

  // RPG Single Reader View
  const renderRPGReader = () => {
    if (!selectedPost) return null;
    return (
      <PixelCard variant="gold" className="relative">
        <button 
          onClick={() => setSelectedPost(null)}
          className="mb-6 border-2 border-[#4c566a] bg-[#2e3440] hover:border-[#ff4757] px-3 py-1 font-press text-[8px] text-white hover:text-[#ff4757] flex items-center gap-1 cursor-pointer
            shadow-[0_-2px_0_-1px_#0b0c10,0_2px_0_-1px_#0b0c10,-2px_0_0_-1px_#0b0c10,2px_0_0_-1px_#0b0c10]"
        >
          <ChevronLeft className="w-3.5 h-3.5" /> Return to Logs
        </button>

        <div className="border-b-4 border-[#2e3440] pb-4 mb-6">
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <PixelBadge variant="gold">{selectedPost.category}</PixelBadge>
            <span className="font-press text-[7px] text-[#4c566a]">{selectedPost.publishedDate}</span>
            <span className="font-vt text-base text-[#4c566a]">• {selectedPost.readingTime}</span>
          </div>
          <h2 className="font-press text-xs md:text-sm text-[#d4af37] leading-relaxed uppercase">
            {selectedPost.title}
          </h2>
        </div>

        {/* Formatted Content */}
        <div className="space-y-4">
          {renderMarkdown(selectedPost.contentMarkdown)}
        </div>

        <div className="mt-8 pt-4 border-t-4 border-[#2e3440]">
          <PixelButton variant="gold" onClick={() => setSelectedPost(null)}>
            Back to Journal
          </PixelButton>
        </div>
      </PixelCard>
    );
  };

  // Recruiter List View
  const renderRecruiterList = () => {
    return (
      <div className="space-y-4">
        {filteredPosts.map((post) => (
          <div 
            key={post.id}
            onClick={() => setSelectedPost(post)}
            className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 hover:border-zinc-700 transition-colors cursor-pointer flex flex-col md:flex-row justify-between items-start md:items-center gap-4 group"
          >
            <div className="flex-1">
              <div className="flex flex-wrap gap-2 items-center text-xs text-zinc-500 mb-1">
                <span>{post.publishedDate}</span>
                <span>•</span>
                <span>{post.category}</span>
              </div>
              <h3 className="text-zinc-200 font-bold text-base group-hover:text-amber-500 transition-colors">
                {post.title}
              </h3>
              <p className="text-zinc-400 text-xs mt-1">{post.summary}</p>
            </div>
            
            <span className="text-xs font-semibold text-amber-500 hover:text-amber-400 flex items-center gap-1 whitespace-nowrap self-end md:self-auto cursor-pointer">
              Read Article <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </span>
          </div>
        ))}
      </div>
    );
  };

  // Recruiter Reader View
  const renderRecruiterReader = () => {
    if (!selectedPost) return null;
    return (
      <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 md:p-8 font-sans">
        <button 
          onClick={() => setSelectedPost(null)}
          className="flex items-center gap-1 px-3 py-1.5 rounded-md text-xs font-semibold bg-zinc-850 hover:bg-zinc-800 text-zinc-300 border border-zinc-800 transition-colors mb-6 cursor-pointer"
        >
          <ChevronLeft className="w-4 h-4" /> Back to Notes List
        </button>

        <div className="border-b border-zinc-800 pb-4 mb-6">
          <div className="flex items-center gap-3 text-xs text-zinc-500 mb-2">
            <span className="px-2 py-0.5 rounded bg-zinc-950 border border-zinc-850 text-amber-500 font-medium">
              {selectedPost.category}
            </span>
            <span>{selectedPost.publishedDate}</span>
            <span>•</span>
            <span>{selectedPost.readingTime}</span>
          </div>
          <h2 className="text-2xl font-bold text-zinc-100">{selectedPost.title}</h2>
        </div>

        {/* Content */}
        <div className="space-y-4 text-zinc-300">
          {renderRecruiterMarkdown(selectedPost.contentMarkdown)}
        </div>
      </div>
    );
  };

  return (
    <section id="blog" className="py-12 px-4 max-w-4xl mx-auto scroll-mt-20">
      
      {/* Title */}
      <div className="text-center mb-8">
        {recruiterMode ? (
          <>
            <span className="text-amber-500 text-xs font-semibold uppercase tracking-widest block mb-1">
              Engineering Journals
            </span>
            <h2 className="text-2xl font-bold text-zinc-100">Technical Notes</h2>
          </>
        ) : (
          <>
            <h2 className="font-press text-sm text-[#d4af37] uppercase tracking-widest select-none">
              📜 QUEST LOG (BLOG NOTES) 📜
            </h2>
            <p className="font-vt text-lg text-[#4c566a] mt-2 select-none">
              Read detailed notes regarding technical challenges and resolutions
            </p>
          </>
        )}
      </div>

      {/* Category selector (only show if not reading a post) */}
      {!selectedPost && (
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {categories.map((cat) => {
            const active = selectedCategory === cat;
            if (recruiterMode) {
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-lg border transition-all cursor-pointer
                    ${active 
                      ? "bg-amber-500 text-zinc-950 border-amber-500" 
                      : "bg-zinc-900 text-zinc-400 border-zinc-800 hover:text-zinc-200"
                    }`}
                >
                  {cat}
                </button>
              );
            } else {
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-2.5 py-1 border-2 text-[8px] font-press uppercase select-none cursor-pointer
                    ${active 
                      ? "bg-[#d4af37] text-black border-[#d4af37]" 
                      : "bg-[#151821] text-[#ededed] border-[#4c566a] hover:bg-[#1e2230]"
                    }
                    shadow-[0_-2px_0_-1px_#0b0c10,0_2px_0_-1px_#0b0c10,-2px_0_0_-1px_#0b0c10,2px_0_0_-1px_#0b0c10]
                  `}
                >
                  {cat}
                </button>
              );
            }
          })}
        </div>
      )}

      {/* Main Content Area */}
      {selectedPost ? (
        recruiterMode ? renderRecruiterReader() : renderRPGReader()
      ) : (
        recruiterMode ? renderRecruiterList() : renderRPGList()
      )}

    </section>
  );
};
