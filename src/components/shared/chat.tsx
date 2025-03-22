import AvatarComponent from "./avatar-component";

export default function Chat() {
  return (
    <button className="hover:bg-zinc-800 cursor-pointer py-3 px-4 flex items-center gap-4 w-full">
      <AvatarComponent className="w-11 h-11" />
      <div className="flex flex-col items-start gap-1 w-full">
        <h2 className="text-sm font-medium">John Doe</h2>
        <p className="text-xs text-zinc-400">Lorem ipsum dolor.</p>
      </div>
    </button>
  );
}
