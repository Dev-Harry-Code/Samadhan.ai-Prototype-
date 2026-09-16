"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import {
  AlertTriangle,
  ArrowBigUp,
  ArrowLeft,
  CheckCircle2,
  Clock,
  MapPin,
  MessageSquare,
  Send,
  Share2,
  ThumbsUp,
  Users,
} from "lucide-react";

import type { DiscussionComment, Issue, ScreenId } from "@/lib/akshat-types";
import { api } from "@/lib/api/client";
import type { ApiComment, ApiIssueDetail } from "@/lib/api/models";
import { apiCommentToAkshat } from "@/lib/akshat-mapper";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { SafeIssueImage } from "@/components/akshat/safe-issue-image";
import { useAkshat } from "@/components/akshat/akshat-context";
import {
  categoryText,
  commentField,
  issueField,
} from "@/components/akshat/localize-helpers";
import { PlatformStatsWidget } from "@/components/akshat/widgets/platform-stats-widget";

interface IssueDetailsScreenProps {
  setScreen: (screen: ScreenId) => void;
  selectedIssue: Issue;
}

const CURRENT_USER_AVATAR =
  "https://images.pexels.com/photos/13111211/pexels-photo-13111211.jpeg?auto=compress&cs=tinysrgb&w=120";

export const IssueDetailsScreen = ({ setScreen, selectedIssue }: IssueDetailsScreenProps) => {
  const { t } = useAkshat();
  const [comments, setComments] = useState<DiscussionComment[]>([]);
  const [newComment, setNewComment] = useState("");
  const [hasUpvoted, setHasUpvoted] = useState(false);
  const [upvoteCount, setUpvoteCount] = useState(selectedIssue.upvotes);

  useEffect(() => {
    let cancelled = false;
    const id = selectedIssue.id;
    if (!id) return;
    api
      .get<ApiIssueDetail>(`/api/issues/${encodeURIComponent(id)}`)
      .then(detail => {
        if (cancelled || !detail) return;
        if (detail.comments) setComments(detail.comments.map(apiCommentToAkshat));
        setUpvoteCount(detail.issue?.upvotes ?? selectedIssue.upvotes);
        if (typeof detail.upvotedByUser === "boolean") setHasUpvoted(detail.upvotedByUser);
      })
      .catch(() => {});
    return () => { cancelled = true; };
  }, [selectedIssue.id, selectedIssue.upvotes]);

  const handleToggleUpvote = () => {
    if (hasUpvoted) {
      setUpvoteCount(prev => prev - 1);
      setHasUpvoted(false);
    } else {
      setUpvoteCount(prev => prev + 1);
      setHasUpvoted(true);
    }
    void api.post(`/api/issues/${encodeURIComponent(selectedIssue.id)}/upvote`).catch(() => {});
  };

  const handlePostComment = () => {
    if (!newComment.trim()) return;
    const localComment: DiscussionComment = {
      id: `c-${Date.now()}`,
      authorName: t("userName", "Aarav Mehta"),
      authorRole: t("verifiedCitizen", "Verified Citizen"),
      avatarUrl: CURRENT_USER_AVATAR,
      daysAgo: t("justNow", "Just now"),
      text: newComment,
      upvotes: 0,
      repliesCount: 0,
    };
    setComments([localComment, ...comments]);
    const text = newComment;
    setNewComment("");
    void api
      .post<{ comment: ApiComment }>(`/api/issues/${encodeURIComponent(selectedIssue.id)}/comments`, { text })
      .then(res => {
        if (res?.comment) {
          const mapped = apiCommentToAkshat(res.comment);
          setComments(prev => [mapped, ...prev.filter(c => c.id !== localComment.id)]);
        }
      })
      .catch(() => {});
  };

  return (
    <div className="relative z-10 mx-auto max-w-4xl bg-transparent p-3.5 pb-24 sm:p-6">
      <div className="mb-4">
        <PlatformStatsWidget compact={true} />
      </div>

      <div className="relative mb-6 h-72 w-full overflow-hidden rounded-3xl bg-slate-100 shadow-md sm:h-96">
        <SafeIssueImage
          src={selectedIssue.imageUrl}
          alt={issueField(t, selectedIssue, "title", selectedIssue.title)}
          sizes="(max-width: 896px) 100vw, 896px"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent"></div>

        <button
          onClick={() => setScreen("issues_feed")}
          className="absolute left-4 top-4 flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white/90 text-slate-800 shadow-md backdrop-blur-xl transition-colors hover:bg-white"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>

        <div className="absolute bottom-5 left-5 right-5 text-white">
          <div className="mb-2.5 flex flex-wrap gap-2">
            <span className="rounded-full bg-teal-600/90 px-3 py-1 text-xs font-bold text-white shadow-xs backdrop-blur-md">
              {categoryText(t, selectedIssue.category)}
            </span>
            <span className="flex items-center gap-1 rounded-full bg-orange-500/90 px-3 py-1 text-xs font-bold text-white shadow-xs backdrop-blur-md">
              <AlertTriangle className="h-3.5 w-3.5" />
              {t("urgencyHigh", "High Urgency")}
            </span>
            <span className="flex items-center gap-1 rounded-full border border-white/30 bg-white/20 px-3 py-1 text-xs font-medium text-white backdrop-blur-md">
              <MapPin className="h-3 w-3" />
              {selectedIssue.distance || `2.4 ${t("kmAway", "km away")}`}
            </span>
          </div>
          <h1 className="text-xl font-black leading-tight drop-shadow-md sm:text-3xl">
            {issueField(t, selectedIssue, "title", selectedIssue.title)}
          </h1>
        </div>
      </div>

      <div className="space-y-6 px-2">
        <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-white p-4 text-xs text-slate-700 shadow-sm">
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-teal-600" />
            <span className="font-medium text-slate-800">{issueField(t, selectedIssue, "location", selectedIssue.location)}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-slate-700" />
            <span>
              {t("reportedDaysBy", "Reported")} {selectedIssue.reportedDaysAgo} {t("daysAgoFull", "days ago")}{" "}
              {t("byWord", "by")}{" "}
              <strong className="text-slate-900">{selectedIssue.reportedBy}</strong>
            </span>
          </div>
          <div className="flex items-center gap-1.5 rounded-full border border-orange-200 bg-orange-50 px-2.5 py-1 font-bold text-orange-700">
            <Users className="h-3.5 w-3.5 text-orange-600" />
            <span>{t("affectsCitizens", "Affects")} ~{selectedIssue.peopleAffected} {t("citizens", "citizens")}</span>
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="mb-2 flex items-center gap-2 text-base font-bold text-slate-900">
            <CheckCircle2 className="h-4 w-4 text-teal-600" />
            {t("detailedProblem", "Detailed Problem Statement")}
          </h2>
          <p className="text-sm leading-relaxed text-slate-700">
            {issueField(t, selectedIssue, "description", selectedIssue.description)}
          </p>

          <div className="mt-6 flex items-center gap-3 border-t border-slate-100 pt-5">
            <button
              onClick={handleToggleUpvote}
              className={cn(
                "flex flex-1 items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-bold transition-all duration-200",
                hasUpvoted
                  ? "bg-teal-700 text-white shadow-md"
                  : "bg-teal-600 text-white shadow-sm hover:bg-teal-700",
              )}
            >
              <ThumbsUp className={cn("h-4 w-4", hasUpvoted && "fill-current")} />
              <span>{hasUpvoted ? t("upvoted", "Upvoted") : t("upvoteIssue", "Upvote Issue")} ({upvoteCount})</span>
            </button>

            <button className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-bold text-slate-700 shadow-xs transition-all hover:bg-slate-50">
              <Share2 className="h-4 w-4" />
              <span>{t("share", "Share")}</span>
            </button>
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-5 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5 text-teal-600" />
              <h3 className="text-base font-bold text-slate-900 sm:text-lg">{t("communityDiscussion", "Community Discussion")}</h3>
              <span className="rounded-full border border-teal-200 bg-teal-50 px-2.5 py-0.5 text-xs font-semibold text-teal-700">
                {comments.length}
              </span>
            </div>
            <span className="text-xs text-slate-700">{t("discussionSubtitle", "Verifiable Solutions & Updates")}</span>
          </div>

          <div className="mb-6 flex gap-3">
            <div className="h-10 w-10 flex-shrink-0 overflow-hidden rounded-xl border border-slate-200 shadow-xs">
              <Image
                src={CURRENT_USER_AVATAR}
                alt={t("profileAlt", "Profile")}
                width={40}
                height={40}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="flex flex-1 gap-2">
              <input
                type="text"
                value={newComment}
                onChange={e => setNewComment(e.target.value)}
                placeholder={t("commentPlaceholder", "Share a local update, photo or proposal...")}
                className="flex-1 rounded-2xl border border-slate-300 bg-slate-50 px-4 text-sm text-slate-900 transition-all placeholder-slate-500 focus:border-teal-600 focus:bg-white focus:ring-2 focus:ring-teal-600/20 focus:outline-none"
                onKeyDown={e => e.key === "Enter" && handlePostComment()}
              />
              <button
                onClick={handlePostComment}
                className="flex items-center justify-center rounded-2xl bg-teal-600 px-4 text-white shadow-sm transition-all hover:bg-teal-700"
              >
                <Send className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div className="space-y-4">
            {comments.map(comment => (
              <div
                key={comment.id}
                className="flex gap-3.5 rounded-2xl border border-slate-200 bg-slate-50 p-4"
              >
                <Avatar className="h-9 w-9 flex-shrink-0 rounded-xl border border-slate-200">
                  {comment.avatarUrl && (
                    <AvatarImage src={comment.avatarUrl} alt={comment.authorName} className="rounded-xl" />
                  )}
                  <AvatarFallback className="rounded-xl bg-teal-100 text-teal-700">
                    {comment.authorName
                      .split(" ")
                      .map(n => n[0])
                      .slice(0, 2)
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="mb-1 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-slate-900">{comment.authorName}</span>
                      <span className="rounded border border-teal-100 bg-teal-50 px-2 py-0.5 text-[11px] font-semibold text-teal-700">
                        {commentField(t, comment.id, "authorRole", comment.authorRole ?? "")}
                      </span>
                    </div>
                    <span className="text-[10px] text-slate-700">{commentField(t, comment.id, "daysAgo", comment.daysAgo)}</span>
                  </div>
                  <p className="text-xs leading-relaxed text-slate-700">{commentField(t, comment.id, "text", comment.text)}</p>
                  {comment.imageUrl && (
                    <div className="relative mt-2.5 max-h-48 w-full overflow-hidden rounded-xl border border-slate-200">
                      <Image
                        src={comment.imageUrl}
                        alt="attachment"
                        width={640}
                        height={320}
                        className="max-h-48 w-full object-cover"
                      />
                    </div>
                  )}
                  <div className="mt-2.5 flex items-center gap-4 text-xs font-semibold text-slate-700">
                    <button className="flex items-center gap-1 transition-colors hover:text-teal-700">
                      <ArrowBigUp className="h-4 w-4 text-teal-600" />
                      <span>{t("commentUpvote", "Upvote")} ({comment.upvotes})</span>
                    </button>
                    <button className="transition-colors hover:text-slate-900">
                      {t("reply", "Reply")}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};