"use client";

import Image from "next/image";
import { useState } from "react";
import { Heart, MessageCircle, Share2, Share, Star } from "lucide-react";

import { PortalPageHeader } from "@/components/portal/kpi-card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { UNIVERSITY_CASE_STUDIES, UNIVERSITY_REPORTS } from "@/lib/data/university-mock";

const MISSION_STATUS: Record<string, { label: string; cls: string }> = {
  "In Progress": { label: "FIELD WORK", cls: "bg-amber-500 text-white" },
  Assigned: { label: "ASSIGNED", cls: "bg-blue-500 text-white" },
  Resolved: { label: "COMPLETED", cls: "bg-emerald-500 text-white" },
};

export function UniversityCommunityPage() {
  const [likes, setLikes] = useState<Record<string, number>>(
    Object.fromEntries(UNIVERSITY_CASE_STUDIES.map((c) => [c.id, c.likes])),
  );
  const [likedSet, setLikedSet] = useState<Set<string>>(new Set());
  const [comments, setComments] = useState<Record<string, string[]>>({});
  const [openComment, setOpenComment] = useState<string | null>(null);
  const [draft, setDraft] = useState("");
  const [viewAll, setViewAll] = useState(false);

  const toggleLike = (id: string) => {
    setLikes((prev) => ({
      ...prev,
      [id]: prev[id] + (likedSet.has(id) ? -1 : 1),
    }));
    setLikedSet((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const addComment = (csId: string) => {
    if (!draft.trim()) return;
    setComments((prev) => ({ ...prev, [csId]: [draft.trim(), ...(prev[csId] ?? [])] }));
    setDraft("");
  };

  const visibleStories = viewAll ? UNIVERSITY_CASE_STUDIES : UNIVERSITY_CASE_STUDIES.slice(0, 3);

  return (
    <div className="mx-auto max-w-5xl space-y-5 pb-6">
      <PortalPageHeader
        icon={<Share size={20} />}
        iconBg="bg-gradient-to-br from-fuchsia-500 to-orange-500 text-white shadow-md shadow-fuchsia-500/20"
        title="Community"
        subtitle="Live missions, stories &amp; impact from volunteer teams"
        action={
          <span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-bold text-amber-600 ring-1 ring-amber-600/20">
            12 live missions
          </span>
        }
      />

      <div className="scrollbar-none flex gap-3 overflow-x-auto pb-1">
        {UNIVERSITY_REPORTS.map((r) => (
          <div
            key={r.id}
            className="relative min-w-[240px] shrink-0 overflow-hidden rounded-2xl shadow-lg shadow-slate-900/5 ring-1 ring-white/60"
          >
            <Image src={r.thumbnail} alt={r.title} width={256} height={160} className="h-28 w-full object-cover" loading="lazy" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/85 via-slate-900/20 to-transparent" />
            <div className="absolute bottom-2 left-3 right-3">
              <span
                className={cn(
                  "rounded-full px-2 py-0.5 text-[9px] font-bold",
                  MISSION_STATUS[r.status]?.cls ?? "bg-slate-500 text-white",
                )}
              >
                {MISSION_STATUS[r.status]?.label ?? r.status.toUpperCase()}
              </span>
              <p className="mt-1 line-clamp-1 text-xs font-bold text-white">{r.title}</p>
              <p className="text-[10px] font-medium text-emerald-100/80">
                {r.assignedTo} · {r.updatedAgo}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div>
        <h2 className="mb-1 flex items-center gap-1.5 text-sm font-bold text-slate-900">
          <Star size={15} className="text-amber-500" /> Community success stories
        </h2>
        <p className="mb-3 text-xs text-slate-600">Collaborative fixes by universities, residents and the Corporation</p>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {visibleStories.map((cs) => {
            const isLiked = likedSet.has(cs.id);
            return (
              <div key={cs.id} className="glass flex flex-col overflow-hidden rounded-2xl shadow-lg shadow-slate-900/5 ring-1 ring-white/60">
                <div className="relative h-36 overflow-hidden bg-slate-100">
                  <Image src={cs.image} alt={cs.title} width={320} height={200} className="h-full w-full object-cover transition duration-300 hover:scale-105" loading="lazy" />
                  <span className="absolute left-2 top-2 rounded-full bg-white/85 px-2 py-0.5 text-[9px] font-bold text-slate-700 backdrop-blur">
                    {cs.university}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-4">
                  <h3 className="text-sm font-extrabold tracking-tight text-slate-900">{cs.title}</h3>
                  <p className="mt-1 line-clamp-3 flex-1 text-xs leading-relaxed text-slate-500">{cs.subtitle}</p>

                  <div className="mt-3 flex items-center gap-1">
                    <button
                      onClick={() => toggleLike(cs.id)}
                      className={cn(
                        "flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-bold transition",
                        isLiked ? "bg-primary-500 text-white shadow-sm" : "bg-slate-100 text-slate-600 hover:bg-slate-200",
                      )}
                    >
                      <Heart size={12} fill={isLiked ? "currentColor" : "none"} /> {likes[cs.id]}
                    </button>
                    <button
                      onClick={() => setOpenComment(openComment === cs.id ? null : cs.id)}
                      className="flex items-center gap-1 rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-bold text-slate-600 transition hover:bg-slate-200"
                    >
                      <MessageCircle size={12} /> {cs.comments + (comments[cs.id]?.length ?? 0)}
                    </button>
                    <button className="ml-auto rounded-full bg-slate-100 p-1.5 text-slate-500 transition hover:bg-slate-200">
                      <Share2 size={12} />
                    </button>
                  </div>

                  {openComment === cs.id && (
                    <div className="mt-3 space-y-2">
                      <div className="flex gap-2">
                        <input
                          value={draft}
                          onChange={(e) => setDraft(e.target.value)}
                          onKeyDown={(e) => e.key === "Enter" && addComment(cs.id)}
                          placeholder="Share an encouraging note…"
                          className="flex-1 rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs outline-none focus:border-primary-500"
                        />
                        <Button size="sm" onClick={() => addComment(cs.id)} disabled={!draft.trim()}>
                          Post
                        </Button>
                      </div>
                      {comments[cs.id]?.map((c, i) => (
                        <p key={i} className="flex items-center gap-1.5 rounded-xl bg-slate-50 px-3 py-1.5 text-xs font-medium text-slate-600 ring-1 ring-slate-900/5">
                          <MessageCircle size={12} className="shrink-0 text-slate-600" /> {c}
                        </p>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
        {!viewAll && (
          <button
            onClick={() => setViewAll(true)}
            className="mt-4 w-full rounded-2xl bg-white/80 py-3 text-sm font-bold text-primary-600 shadow-sm ring-1 ring-slate-900/5 backdrop-blur transition hover:ring-primary-300"
          >
            Show all success stories →
          </button>
        )}
      </div>
    </div>
  );
}