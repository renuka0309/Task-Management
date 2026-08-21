"use client"
import { useState, useEffect } from "react";
import Image from "next/image";
import { SmilePlus, Ellipsis, SendHorizontal, Paperclip } from "lucide-react";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

type BackendComment = {
  id: number;
  author: string;
  text: string;
  timestamp: string;
  parentCommentId: number | null;
  replies: BackendComment[];
};

export default function Comments({ taskId }: { taskId: number }) {
  const [comments, setComments] = useState<BackendComment[]>([]);
  const [isCommenting, setIsCommenting] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [replyText, setReplyText] = useState("");
  const [replyingTo, setReplyingTo] = useState<number | null>(null);

  const fetchComments = async () => {
    try {
      const res = await fetch(`${API_URL}/tasks/${taskId}/comments`);
      const data: BackendComment[] = await res.json();
      setComments(data);
    } catch (err) {
      console.error("Error fetching comments:", err);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [taskId]);

  const handleAddComment = async () => {
    if (!commentText.trim()) return;
    try {
      const res = await fetch(`${API_URL}/tasks/${taskId}/comments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: commentText, author: "You" }),
      });
      if (!res.ok) throw new Error("Failed to add comment");
      await fetchComments();
      setCommentText("");
      setIsCommenting(false);
    } catch (err) {
      console.error("Error adding comment:", err);
    }
  };

  const handleAddReply = async () => {
    if (!replyText.trim() || replyingTo === null) return;
    try {
      const res = await fetch(`${API_URL}/tasks/${taskId}/comments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text: replyText,
          author: "You",
          parentCommentId: replyingTo,
        }),
      });
      if (!res.ok) throw new Error("Failed to add reply");
      await fetchComments();
      setReplyText("");
      setReplyingTo(null);
    } catch (err) {
      console.error("Error adding reply:", err);
    }
  };

  return (
    <div className="w-full flex flex-col gap-5 mt-2">
      <span className="text-sm text-[#171717]">Comments</span>
      <div className="w-full border border-[#E5E5E5] rounded-md">
        {comments.map((comment) => (
          <div key={comment.id} className="flex flex-col gap-2 p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="relative w-5 h-5 rounded-full bg-[#F5F5F5]">
                  <Image
                    src="/icons/avatar.jpg"
                    alt="Avatar"
                    width={20}
                    height={20}
                    className="rounded-full object-cover"
                  />
                  <span className="absolute bottom-0 right-0 h-2 w-2 rounded-full border-2 border-white bg-[#22C55E]" />
                </div>
                <span className="text-sm text-[#171717]">{comment.author}</span>
                <span className="text-sm text-[#737373]">{comment.timestamp}</span>
              </div>
              <div className="flex items-center gap-2">
                <SmilePlus size={14} className="text-[#737373] cursor-pointer" />
                <Ellipsis size={14} className="text-[#737373] cursor-pointer" />
              </div>
            </div>

            <p className="text-[#171717] text-sm">{comment.text}</p>

            <div className="w-full border-t border-[#E5E5E5]" />

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Image
                  src="/icons/avatar.jpg"
                  alt="Avatar"
                  width={20}
                  height={20}
                  className="w-5 h-5 rounded-full object-cover"
                />
                {replyingTo === comment.id ? (
                  <textarea
                    autoFocus
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    placeholder="leave a reply"
                    className="h-6 pt-1 text-sm placeholder:text-gray-400 outline-none resize-none"
                  />
                ) : (
                  <button
                    onClick={() => setReplyingTo(comment.id)}
                    className="text-sm text-[#737373]"
                  >
                    Leave a reply...
                  </button>
                )}
              </div>
              <div className="flex items-center gap-2">
                <Paperclip size={14} strokeWidth={1.5} className="text-[#171717] cursor-pointer" />
                <SendHorizontal
                  onClick={handleAddReply}
                  size={14}
                  strokeWidth={1.5}
                  className="text-[#171717] cursor-pointer"
                />
              </div>
            </div>

            {comment.replies && comment.replies.length > 0 && (
              <div className="flex max-h-[120px] flex-col gap-2 overflow-y-auto pl-6">
                {comment.replies.map((reply) => (
                  <div key={reply.id} className="flex items-center gap-2">
                    <Image
                      src="/icons/avatar.jpg"
                      alt="Avatar"
                      width={20}
                      height={20}
                      className="h-5 w-5 rounded-full object-cover"
                    />
                    <span className="text-sm text-[#171717]">{reply.author}</span>
                    <span className="text-sm text-[#171717]">{reply.text}</span>
                    <span className="text-xs text-[#737373]">{reply.timestamp}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="w-full flex items-center justify-between border border-[#E5E5E5] rounded-md px-4 py-2.5">
        {isCommenting ? (
          <textarea
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            autoFocus
            placeholder="write a comment..."
            className="flex-1 rounded-md border p-2 text-sm outline-none"
          />
        ) : (
          <button onClick={() => setIsCommenting(true)} className="text-sm text-gray-400">
            Add a comment...
          </button>
        )}
        <div className="flex items-center gap-2">
          <Paperclip size={14} strokeWidth={1.5} className="text-[#171717] cursor-pointer" />
          <button onClick={handleAddComment}>
            <SendHorizontal size={14} strokeWidth={1.5} className="text-[#171717] cursor-pointer" />
          </button>
        </div>
      </div>
    </div>
  );
}