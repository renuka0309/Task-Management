"use client";
import Image from "next/image";
import { useState } from "react";
import { SmilePlus, Ellipsis, SendHorizontal, Paperclip } from "lucide-react";
import { userAgent } from "next/server";

export default function Comments() {
  const [isCommenting, setIsCommenting] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [replyText, setReplyText] = useState("");
  const [replyingTo, setReplyingTo] = useState<number | null>(null);
  const [comments, setComments] = useState<Comment[]>([
    {
      id: 1,
      user: "Ankit Dutta",
      text: "dsds",
      time: "just now",
      replies: [],
    }
  ]);

  const handleAddComment = () => {
    if (!commentText.trim()) return;

    const newComment = {
      id: Date.now(),
      user: "Renuka",
      text: commentText,
      time: "just now",
      replies: [],
    };
    setComments((prev) => [...prev, newComment]);
    setCommentText("");
    setIsCommenting(false);

  };

  type Reply = {
    id: number;
    user: string,
    text: string;
    time: string;
  };

  type Comment = {
    id: number,
    user: string;
    text: string;
    time: string;
    replies: Reply[];
  }

  const handleAddReply = () => {
    if (!replyText.trim() || replyingTo === null) return;
    const newReply = {
      id: Date.now(),
      user: "Renuka",
      text: replyText,
      time: "just now",
    };

    setComments((prev) =>
      prev.map((comment) =>
        comment.id === replyingTo
          ? {
            ...comment,
            replies: [...comment.replies, newReply],
          }
          : comment
      )
    );

    setReplyText("");
    setReplyingTo(null);
  };
  return (
    <div className="w-full flex flex-col gap-5 mt-2">

      <span className="text-sm text-[#171717]">Subtasks</span>

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
                <span className="text-sm text-[#171717]">{comment.user}</span>
                <span className="text-sm text-[#737373]">{comment.time}</span>
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
                  <div>
                    <textarea
                      autoFocus
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                      placeholder="leave a reply"
                      className="h-6 pt-1 text-sm placeholder:text-gray-400 outline-none resize-none" />
                  </div>
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

                <SendHorizontal onClick={handleAddReply} size={14} strokeWidth={1.5} className="text-[#171717] cursor-pointer" />

              </div>
            </div>
            {comment.replies.length > 0 && (
              <div className="flex max-h-[120px] flex-col gap-2 overflow-y-auto pl-6">
                {comment.replies.map((reply) => (
                  <div
                    key={reply.id}
                    className="flex items-center gap-2"
                  >
                    <Image
                      src="/icons/avatar.jpg"
                      alt="Avatar"
                      width={20}
                      height={20}
                      className="h-5 w-5 rounded-full object-cover"
                    />

                    <span className="text-sm text-[#171717]">
                      {reply.user}
                    </span>

                    <span className="text-sm text-[#171717]">
                      {reply.text}
                    </span>

                    <span className="text-xs text-[#737373]">
                      {reply.time}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>


      <div className="w-full flex items-center justify-between border border-[#E5E5E5] rounded-md px-4 py-2.5">
        <span className="text-sm text-[#737373]">

          {isCommenting ? (
            <div className="mt-2 flex items-center gap-2">
              <textarea
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                autoFocus
                placeholder="write a comment..."
                className="flex-1 rounded-md border p-2 text-sm"
              />

            </div>

          ) : (
            <button
              onClick={() => setIsCommenting(true)}
              className="text-sm text-gray-400"
            >
              Add a comment...
            </button>
          )
          }

        </span>
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