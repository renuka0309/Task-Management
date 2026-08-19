"use client"
import { useState, useEffect } from "react";
import { useUser } from "@/contexts/UserContect";
import { useRouter } from "next/navigation";

export default function ProfilePanel() {
  const router = useRouter();
  const { user, updateUser } = useUser();
  const [isEditingEmail, setIsEditingEmail] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleLeaveWorkspace = () => {
    const confirmed = window.confirm("Are you sure you want to leave this workspace? You'll be signed out.");
    if (confirmed) {
      localStorage.removeItem("user");
      localStorage.removeItem("theme");
      localStorage.removeItem("color");
      router.push("/");
    }
  };

  return (
    <div>
      <h1 className="mb-8 text-[23px] font-medium">Profile</h1>

      <div className="overflow-hidden rounded-xl border border-gray-200">
        <div className="flex h-[61px] items-center justify-between border-b border-gray-200 px-5">
          <span className="text-xs">Profile picture</span>
          <div className="h-[30px] w-[30px] overflow-hidden rounded-full">
            <img src="https://i.pravatar.cc/100?img=12" alt="Profile" className="h-full w-full object-cover" />
          </div>
        </div>

        <div className="flex h-[69px] items-center justify-between border-b border-gray-200 px-5">
          <span className="text-xs">Email</span>
          <div className="flex items-center gap-3">
            {isEditingEmail ? (
              <input
                autoFocus
                value={user.email}
                onChange={(e) => updateUser({ email: e.target.value })}
                onBlur={() => setIsEditingEmail(false)}
                onKeyDown={(e) => e.key === "Enter" && setIsEditingEmail(false)}
                className="text-xs border border-gray-200 rounded px-2 py-1 outline-none"
              />
            ) : (
              <span className="text-xs">{mounted ? user.email : "dexter@gmail.com"}</span>
            )}
            <button onClick={() => setIsEditingEmail(true)} className="text-gray-500">
              ✎
            </button>
          </div>
        </div>

        <div className="flex h-[59px] items-center justify-between border-b border-gray-200 px-5">
          <span className="text-xs">Full name</span>
          <input
            value={mounted ? user.fullName : "Dexter"}
            onChange={(e) => updateUser({ fullName: e.target.value })}
            className="w-[165px] rounded-lg bg-gray-100 px-3 py-2 text-xs text-gray-700 outline-none"
          />
        </div>

        <div className="flex h-[78px] items-center justify-between border-b border-gray-200 px-5">
          <div>
            <p className="text-xs">Title</p>
            <p className="mt-1 text-xs text-gray-500">Your job title or role</p>
          </div>
          <input
            value={mounted ? user.title : "Designer"}
            onChange={(e) => updateUser({ title: e.target.value })}
            className="w-[165px] rounded-lg bg-gray-100 px-3 py-2 text-xs text-gray-700 outline-none"
          />
        </div>

        <div className="flex h-[94px] items-center justify-between px-5">
          <div>
            <p className="text-xs">Username</p>
            <p className="mt-1 text-xs text-gray-500">One word, like a nickname or first name</p>
          </div>
          <input
            value={mounted ? user.username : "Dexuser"}
            onChange={(e) => updateUser({ username: e.target.value })}
            className="w-[165px] rounded-lg bg-gray-100 px-3 py-2 text-xs text-gray-700 outline-none"
          />
        </div>
      </div>

      <h2 className="mb-6 mt-[45px] text-[16px] font-medium">Workspace access</h2>
      <div className="flex h-[76px] items-center justify-between rounded-xl border border-gray-200 px-5">
        <span className="text-xs text-gray-400">Remove yourself from the workspace</span>
        <button
          onClick={handleLeaveWorkspace}
          className="rounded-lg bg-red-50 px-3 py-2 text-xs text-red-500"
        >
          Leave Workspace
        </button>
      </div>
    </div>
  );
}