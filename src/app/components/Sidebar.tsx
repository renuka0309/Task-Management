import { ChevronsUpDown,LayoutDashboard,GalleryVerticalEnd } from "lucide-react";
import Image from "next/image";
export default function Sidebar(){
    return (
        <aside className="w-[240px] min-h-screen border-r bg-gray-50">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
             <span className="text-sm">
                <Image
                                src="/icons/avatar.jpg"
                                alt="Avatar"
                                width={20}
                                height={20}
                                className="w-5 h-5 rounded-full object-cover"
                              />
            </span>
            <span className="text-sm font-medium">Dexter</span>
            </div>
            
            <span className="text-gray-400 text-sm">
              <ChevronsUpDown size={16} className="text-gray400" />
            </span>
          </div>

          <div className="mt-8">
            <p className="text-xs text-gray-400 mb-3">Workspace</p>

            <div className="flex flex-col gap-3 text-sm">
            <div className="flex items-center gap-2">
                <LayoutDashboard size={16}/>
                <p>Tasks</p>
            </div>

            <div className="flex items-center gap-2">
                <GalleryVerticalEnd size={16} />
                <p>Projects</p>
            </div>
            </div>
          </div>
        </aside>
    );
}
