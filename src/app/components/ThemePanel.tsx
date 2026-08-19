
import ThemeOptions from "./ThemeOptions";

export default function ThemePanel() {
  return (
    <div>
      <h1 className="mb-8 text-[23px] font-medium">Theme</h1>
      <div className="rounded-xl border border-gray-200 p-2 w-[300px]">
        <ThemeOptions />
      </div>
    </div>
  );
}