import { ChevronDown, Signal } from "lucide-react";
import Image from "next/image";
import { Update } from "../types/Task";

export default function Updates({ updates }: { updates: Update[] }) {
  return (
    <div
      className="w-[323px] rounded-lg border border-[#E5E5E5] p-3"
      style={{
        boxShadow: "0px 1px 1px 0px #0000000A, 0px 3px 6px -2px #00000005",
      }}
    >
      <div>
        <div className="flex h-[20px] w-[77px] items-center gap-1">
          <ChevronDown size={16} strokeWidth={2} className="text-[#171717]" />
          <span className="h-[20px] w-[57px] text-sm text-[#171717]">Updates</span>
        </div>

        <div className="mt-2 flex w-[297px] flex-col gap-2">
          {updates.map((update) => (
            <div key={update.id} className="flex w-[297px] min-w-[85px] gap-2 py-3">
              <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#FEF2F2]">
                <Signal size={14} className="text-red-500" />
              </div>
              <div className="flex w-[265px] min-w-0 flex-col">
                <span className="h-[20px] text-sm text-[#171717]">You</span>
                <span className="h-[20px] text-sm font-normal text-[#737373]">
                  {update.text} · {update.timestamp}
                </span>
              </div>
            </div>
          ))}

          <div className="flex w-[297px] min-w-[85px] gap-2 py-3">
            <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#F5F5F5] overflow-hidden">
              <Image
                src="/icons/avatar.jpg"
                alt="You"
                width={24}
                height={24}
                className="h-6 w-6 rounded-full object-cover"
              />
            </div>
            <div className="flex w-[265px] min-w-0 flex-col">
              <span className="h-[20px] text-sm text-[#171717]">You</span>
              <span className="h-[20px] text-sm font-normal text-[#737373]">
                posted an update · Aug 2026
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}