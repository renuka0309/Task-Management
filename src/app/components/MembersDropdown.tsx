"use client";
import { useState } from "react";
import { UserRound, Check } from "lucide-react";

export default function MembersDropdown() {
    const [member, setMember] = useState<string[]>([]);
    const [isOpen, setIsOpen] = useState(false);

    const members = ["Renuka", "Jhon", "Sarah"];

    return (
        <div className="relative">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="mt-1 flex items-center gap-2 text-xs"
            >

                <UserRound size={16} />
                <span>
                    {member.length === 0
                        ? "Add members"
                        : `${member.length} member${member.length > 1 ? "s" : ""}`}
                </span>
            </button>

            {isOpen && (
                <div className="absolute left-0 top-full pl-2 z-10 mt-2 w-[220px] rounded-lg bg-white shadow-sm">
                    <p className="px-2 py-1 text-xs text-gray-400">
                        Members
                    </p>

                    {members.map((item) => (
                        <button
                            key={item}
                            onClick={() => {
                                setMember((prev) =>
                                    prev.includes(item)
                                        ? prev.filter((mem) => mem !== item)
                                        : [...prev, item]
                                );

                            }}
                            className="flex w-full items-center justify-between rounded-md text-sm hover:bg-gray-50"
                        >
                            <span>{item}</span>
                            {member.includes(item) && (
                                <Check size={16} />
                            )}
                        </button>
                    ))}
                </div>
            )}
        </div>
    )
}