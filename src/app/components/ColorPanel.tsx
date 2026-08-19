
import ColorOptions from "./ColorOptions";

export default function ColorPanel() {
  return (
    <div>
      <h1 className="mb-8 text-[23px] font-medium">Color</h1>
      <div className="rounded-xl border border-gray-200 p-2 w-[300px]">
        <ColorOptions />
      </div>
    </div>
  );
}