"use client";
import { Pyramid } from "lucide-react"
import { useRouter } from "next/navigation";

export default function Home(){
 const router=useRouter();

  return (
    <main className="flex flex-col items-center text-center">
      <div className="flex items-center gap-2 mt-[30vh]">
        <Pyramid size={18} className="bg-black text-white rounded-[4px] p-1"/>
       <p className="text-sm">pyramid</p>
      </div>

      <div className="w-[320px] mt-5 border border-gray-300 rounded-[25px] px-4 py-2">
        <p className="text-lg font-semibold">Lets get back on track</p>
        <p className="text-gray-500 text-xs flex justify-center mt-1">Enter your email below to login to your account</p>
        <button onClick={()=>router.push("/api-documentation")} className="w-full h-9 rounded-full bg-black text-white mt-5 font-medium hover:bg-gray-800">
           Continue as Guest
        </button>
        <button className="w-full h-9 rounded-full border border-gray-200 mt-2 flex items-center justify-center gap-2 hover:bg-gray-50 font-medium mb-2">
          <span className="font-semibold text-base"> 
             G   
          </span>
          Login with Google
        </button>
      </div>

     <div className="w-[180px] mt-5 text-center ">
  <p className="text-xs text-gray-500">
    By clicking continue, you agree to our{" "}<span className="underline">Terms of Service</span> and{" "}<span className="underline">Privacy Policy</span> 
  </p>
</div>
    </main>
  );
}