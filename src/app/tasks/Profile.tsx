"use client";

import { ArrowLeft, Search, UserRound, Sun, Square } from "lucide-react";

export default function Profile() {
  return (
    <div className="flex min-h-screen bg-white text-sm text-[#202020]">

      {/* Left Sidebar */}
      <aside className="w-[235px] border-r border-gray-200 px-2 py-4">

        {/* Back to app */}
        <button className="mb-5 flex items-center gap-2 px-2 text-sm">
          <ArrowLeft size={16} />
          <span>Back to app</span>
        </button>

        {/* Search */}
        <div className="mb-2 flex h-[30px] items-center gap-2 rounded-md border border-gray-200 px-2 text-gray-400">
          <Search size={15} />
          <span>Search</span>
        </div>

        {/* Navigation */}
        <ul className="space-y-1">

          <li>
            <button className="flex w-full items-center gap-2 rounded-md bg-gray-100 px-2 py-2 text-left">
              <UserRound size={15} />
              <span>Profile</span>
            </button>
          </li>

          <li>
            <button className="flex w-full items-center gap-2 px-2 py-2 text-left">
              <Sun size={16} />
              <span>Theme</span>
            </button>
          </li>

          <li>
            <button className="flex w-full items-center gap-2 px-2 py-2 text-left">
              <Square size={15} fill="black" />
              <span>Color</span>
            </button>
          </li>

        </ul>
      </aside>

      {/* Main Content */}
      <main className="flex-1">

        <div className="mx-auto w-[585px] pt-[115px]">

          {/* Profile heading */}
          <h1 className="mb-8 text-[23px] font-medium">
            Profile
          </h1>

          {/* Profile card */}
          <div className="overflow-hidden rounded-xl border border-gray-200">

            {/* Profile picture */}
            <div className="flex h-[61px] items-center justify-between border-b border-gray-200 px-5">
              <span className="text-xs">Profile picture</span>

              <div className="h-[30px] w-[30px] overflow-hidden rounded-full">
                <img
                  src="https://i.pravatar.cc/100?img=12"
                  alt="Profile"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>

            {/* Email */}
            <div className="flex h-[69px] items-center justify-between border-b border-gray-200 px-5">
              <span className="text-xs">Email</span>

              <div className="flex items-center gap-3">
                <span className="text-xs">dexter@gmail.com</span>

                <button className="text-gray-500">
                  ✎
                </button>
              </div>
            </div>

            {/* Full name */}
            <div className="flex h-[59px] items-center justify-between border-b border-gray-200 px-5">
              <span className="text-xs">Full name</span>

              <div className="w-[165px] rounded-lg bg-gray-100 px-3 py-2 text-xs text-gray-500">
                Dexter
              </div>
            </div>

            {/* Title */}
            <div className="flex h-[78px] items-center justify-between border-b border-gray-200 px-5">
              <div>
                <p className="text-xs">Title</p>
                <p className="mt-1 text-xs text-gray-500">
                  Your job title or role
                </p>
              </div>

              <div className="w-[165px] rounded-lg bg-gray-100 px-3 py-2 text-xs text-gray-500">
                Designer
              </div>
            </div>

            {/* Username */}
            <div className="flex h-[94px] items-center justify-between px-5">
              <div>
                <p className="text-xs">Username</p>
                <p className="mt-1 text-xs text-gray-500">
                  One word, like a nickname or first name
                </p>
              </div>

              <div className="w-[165px] rounded-lg bg-gray-100 px-3 py-2 text-xs text-gray-500">
                Dexuser
              </div>
            </div>

          </div>

          {/* Workspace access */}
          <h2 className="mb-6 mt-[45px] text-[16px] font-medium">
            Workspace access
          </h2>

          <div className="flex h-[76px] items-center justify-between rounded-xl border border-gray-200 px-5">

            <span className="text-xs text-gray-400">
              Remove yourself from the workspace
            </span>

            <button className="rounded-lg bg-red-50 px-3 py-2 text-xs text-red-500">
              Leave Workspace
            </button>

          </div>

        </div>

      </main>
    </div>
  );
}