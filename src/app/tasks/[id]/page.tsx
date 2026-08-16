import MainContent from "@/app/components/MainContent";
import Sidebar from "@/app/components/Sidebar";

export default async function TaskDetail({
    params,
}:{
    params: Promise<{ id: string }>;
}){
    const {id} = await params;
    console.log("Task id:", id);
    return (
        <div className="flex">
          <Sidebar />
          <MainContent />
        </div>
    );
}