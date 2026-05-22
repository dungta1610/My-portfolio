import React, { useState } from "react";
import { BLOG_POSTS } from "../../data/blog-posts";
import { DashboardCard } from "../ui/DashboardCard";
import { DashboardBadge } from "../ui/DashboardBadge";
import { DashboardButton } from "../ui/DashboardButton";
import { ChevronLeft, ArrowRight, Terminal, Calendar, Clock } from "lucide-react";
import { BlogPost } from "../../types/portfolio";

const DashboardBlogPostCard: React.FC<{ post: BlogPost; onClick: () => void }> = ({ post, onClick }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
      className="group cursor-pointer"
    >
      <DashboardCard 
        variant="slate" 
        glowing={isHovered}
        className={`p-6 relative transition-all duration-300 ${
          isHovered ? "-translate-y-1.5" : ""
        }`}
      >
        <div className="flex flex-col gap-2.5">
          <div className="flex justify-between items-start gap-2 border-b border-zinc-800/80 pb-2.5 mb-2">
            <div className="flex flex-col gap-1">
              <span className="font-mono text-[9px] text-zinc-500 uppercase tracking-widest flex items-center gap-1.5">
                <Terminal className="w-3 h-3 text-cyan-400" /> SYS_LOG // ENTRY_{post.id}
              </span>
              <h3 className="font-mono text-sm font-bold text-cyan-400 group-hover:text-cyan-300 transition-colors tracking-wide leading-relaxed">
                {post.title}
              </h3>
            </div>
            <DashboardBadge variant="cyan">{post.readingTime}</DashboardBadge>
          </div>

          <p className="text-xs text-zinc-400 leading-relaxed mb-3 font-sans">
            {post.summary}
          </p>

          <div className="flex justify-between items-center pt-2.5 border-t border-zinc-800/80">
            <span className="font-mono text-[9px] text-zinc-500 flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5" /> {post.publishedDate}
            </span>
            <span className="font-mono text-[10px] text-cyan-400 flex items-center gap-1 group-hover:translate-x-1 transition-transform select-none">
              READ_LOG <ArrowRight className="w-3 h-3" />
            </span>
          </div>
        </div>
      </DashboardCard>
    </div>
  );
};

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

  // Custom Markdown renderer for terminal-themed log output
  const renderMarkdown = (md: string) => {
    const lines = md.split("\n");
    let isCodeBlock = false;
    let codeContent: string[] = [];

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
              className="bg-zinc-950 border border-zinc-800/80 p-4 my-4 rounded-lg font-mono text-xs overflow-x-auto text-emerald-400/90 select-all"
            >
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

      // Headers
      if (trimmed.startsWith("### ")) {
        return (
          <h4 key={idx} className="font-mono text-xs font-bold text-cyan-400 mt-6 mb-2 tracking-wide uppercase">
            &gt; {trimmed.replace("### ", "")}
          </h4>
        );
      }
      if (trimmed.startsWith("## ")) {
        return (
          <h3 key={idx} className="font-mono text-sm font-bold text-violet-400 mt-8 mb-3 tracking-wide uppercase border-b border-zinc-800 pb-1.5">
            &gt;&gt; {trimmed.replace("## ", "")}
          </h3>
        );
      }

      // Bullets
      if (trimmed.startsWith("* ") || trimmed.startsWith("- ")) {
        return (
          <li key={idx} className="list-disc ml-5 my-1.5 text-xs text-zinc-300 leading-relaxed font-sans">
            {trimmed.substring(2)}
          </li>
        );
      }

      // Empty Lines
      if (trimmed === "") {
        return <div key={idx} className="h-3.5" />;
      }

      // Default paragraph
      return (
        <p key={idx} className="text-xs text-zinc-300 leading-relaxed my-2 font-sans">
          {line.split("**").map((part, pIdx) => {
            if (pIdx % 2 === 1) {
              return <strong key={pIdx} className="text-cyan-400/95 font-semibold">{part}</strong>;
            }
            return part.split("`").map((subPart, sIdx) => {
              if (sIdx % 2 === 1) {
                return <code key={sIdx} className="bg-zinc-950 border border-zinc-800 px-1.5 py-0.5 rounded text-[11px] text-violet-400 font-mono">{subPart}</code>;
              }
              return subPart;
            });
          })}
        </p>
      );
    });
  };

  // Recruiter layout parser
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

  // Dashboard List View
  const renderDashboardList = () => {
    return (
      <div className="space-y-6">
        {filteredPosts.map((post) => (
          <DashboardBlogPostCard 
            key={post.id} 
            post={post} 
            onClick={() => setSelectedPost(post)}
          />
        ))}
      </div>
    );
  };

  // Dashboard Single Reader View
  const renderDashboardReader = () => {
    if (!selectedPost) return null;
    return (
      <DashboardCard variant="slate" glowing={true} className="p-6 md:p-8">
        <DashboardButton 
          onClick={() => setSelectedPost(null)}
          className="mb-6 cursor-pointer font-mono"
          variant="slate"
        >
          <span className="flex items-center gap-1.5">
            <ChevronLeft className="w-4 h-4" /> RETURN_TO_LOGS
          </span>
        </DashboardButton>

        <div className="border-b border-zinc-800 pb-4 mb-6">
          <div className="flex flex-wrap items-center gap-3 text-xs text-zinc-500 mb-2">
            <DashboardBadge variant="cyan">{selectedPost.category}</DashboardBadge>
            <span className="font-mono text-[10px] flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-zinc-500" /> {selectedPost.publishedDate}
            </span>
            <span className="font-mono text-[10px] flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-zinc-500" /> {selectedPost.readingTime}
            </span>
          </div>
          <h2 className="font-mono text-lg md:text-xl font-bold text-zinc-100 tracking-wide uppercase leading-relaxed">
            {selectedPost.title}
          </h2>
        </div>

        {/* Formatted Content */}
        <div className="space-y-4">
          {renderMarkdown(selectedPost.contentMarkdown)}
        </div>

        <div className="mt-8 pt-4 border-t border-zinc-800">
          <DashboardButton 
            onClick={() => setSelectedPost(null)}
            className="cursor-pointer font-mono"
            variant="slate"
          >
            RETURN_TO_LOGS
          </DashboardButton>
        </div>
      </DashboardCard>
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
    <section id="blog" className="py-16 px-4 max-w-4xl mx-auto scroll-mt-20">
      
      {/* Title */}
      <div className="text-center mb-10">
        {recruiterMode ? (
          <>
            <span className="text-amber-500 text-xs font-semibold uppercase tracking-widest block mb-1">
              Engineering Journals
            </span>
            <h2 className="text-2xl font-bold text-zinc-100">Technical Notes</h2>
          </>
        ) : (
          <>
            <span className="text-cyan-400 font-mono text-xs uppercase tracking-widest block mb-2">
              [SYS_JOURNAL] MONOSPACE LOGS
            </span>
            <h2 className="text-3xl font-extrabold text-zinc-100 tracking-tight">
              System Logs & Journals
            </h2>
            <p className="text-sm text-zinc-400 mt-2 max-w-xl mx-auto font-mono">
              In-depth technical papers covering race condition mitigation, client-side caching, and reliability engineering.
            </p>
          </>
        )}
      </div>

      {/* Category selector (only show if not reading a post) */}
      {!selectedPost && (
        <div className="flex flex-wrap justify-center gap-2.5 mb-10">
          {categories.map((cat) => {
            const active = selectedCategory === cat;
            return (
              <DashboardButton
                key={cat}
                variant={active ? "cyan" : "slate"}
                recruiterMode={recruiterMode}
                onClick={() => setSelectedCategory(cat)}
                className="font-mono text-[10px] cursor-pointer"
              >
                {cat}
              </DashboardButton>
            );
          })}
        </div>
      )}

      {/* Main Content Area */}
      {selectedPost ? (
        recruiterMode ? renderRecruiterReader() : renderDashboardReader()
      ) : (
        recruiterMode ? renderRecruiterList() : renderDashboardList()
      )}

    </section>
  );
};
