import { House, Settings, Plus } from "lucide-react";

const SideBar = () => {
  return (
    <div className="h-full border-r content-start border-gray-300 w-fit grid grid-cols-1 gap-2 px-2 py-4">
      <div className="rounded p-2 w-fit h-fit hover:bg-gray-100">
        <House size={24} />
      </div>
      <div className="rounded p-2 w-fit h-fit hover:bg-gray-100">
        <Settings size={24} />
      </div>
      <div className="rounded p-2 w-fit h-fit hover:bg-gray-100">
        <Plus size={24} />
      </div>
    </div>
  );
};

export default SideBar;
