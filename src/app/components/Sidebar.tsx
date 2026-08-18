import { ChevronsUpDown, LayoutDashboard, GalleryVerticalEnd } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
export default function Sidebar() {
  return (
    <aside className="w-[240px] min-h-screen border-r bg-gray-50">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-sm">
            <Image
              src="/icons/avatar.jpg"
              alt="Avatar"
              width={35}
              height={35}
              className="w-5 h-5 ml-[8] mt-[5] rounded-full object-cover"
            />
          </span>
          <span className="text-sm mt-2 font-medium">Dexter</span>
        </div>

        <span className="text-gray-400 text-sm">
          <ChevronsUpDown size={16} className="text-gray400" />
        </span>
      </div>

      <div className="mt-8">
        <p className="text-sm ml-3 text-gray-400 mb-3">Workspace</p>

        <div className="flex flex-col gap-3 text-sm">
          <div className="flex items-center gap-2">
            <LayoutDashboard size={16}
              className="ml-[8]"
            />
            <Link href="/tasks" className="flex items-center gap-2 px-2 py-1.5 rounded-md">
              <span className="text-sm text-[#171717]">Tasks</span>
            </Link>
          </div>

          <div className="flex items-center gap-2">
            <GalleryVerticalEnd size={16}
              className="ml-[8]"
            />
            <Link href="/Projects" className="flex items-center px-2 py-1.5 rounded-md">
              <span className="text-sm text-[#171717]">Projects</span>
            </Link>
          </div>
        </div>
      </div>
    </aside>
  );
}
