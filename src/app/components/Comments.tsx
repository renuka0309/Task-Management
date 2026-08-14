import Image from "next/image";
import { SmilePlus, Ellipsis, SendHorizontal, Paperclip } from "lucide-react";

export default function Comments() {
  return (
    <div className="w-full flex flex-col gap-5 mt-2">
      
      <span className="text-sm text-[#171717]">Subtasks</span>

      <div className="w-full border border-[#E5E5E5] rounded-md">
        <div className="flex flex-col gap-2 p-4">

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
              <span className="text-sm text-[#171717]">Ankit Dutta</span>
              <span className="text-sm text-[#737373]">just now</span>
            </div>

            <div className="flex items-center gap-2">
              <SmilePlus size={14} className="text-[#737373] cursor-pointer" />
              <Ellipsis size={14} className="text-[#737373] cursor-pointer" />
            </div>
          </div>

          <p className="text-[#171717] text-sm">dsds</p>

          <div className="w-full border-t border-[#E5E5E5]" />

          {/* Leave a reply row */}
          <div className="flex items-center justify-between pt-2">
            <div className="flex items-center gap-2">
              <Image
                src="/icons/avatar.jpg"
                alt="Avatar"
                width={20}
                height={20}
                className="w-5 h-5 rounded-full object-cover"
              />
              <span className="text-sm text-[#737373]">Leave a reply...</span>
            </div>

            <div className="flex items-center gap-2">
              <Paperclip size={14} strokeWidth={1.5} className="text-[#171717] cursor-pointer" />
              <SendHorizontal size={14} strokeWidth={1.5} className="text-[#171717] cursor-pointer" />
            </div>
          </div>

        </div>
      </div>

      
      <div className="w-full flex items-center justify-between border border-[#E5E5E5] rounded-md px-4 py-2.5">
        <span className="text-sm text-[#737373]">Add a comment...</span>
        <div className="flex items-center gap-2">
          <Paperclip size={14} strokeWidth={1.5} className="text-[#171717] cursor-pointer" />
          <SendHorizontal size={14} strokeWidth={1.5} className="text-[#171717] cursor-pointer" />
        </div>
      </div>
    </div>
  );
}