import { PanelLeft } from "lucide-react"
export default function Topbar(){
    return(
        <div className="flex items-center gap-2 px-4 py-3 border-b border-[#E5E5E5]">
          <PanelLeft size={16} className="text-[#737373]" />
        </div>
    )
}