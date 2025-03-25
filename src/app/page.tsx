import LeftSide from "@/components/layouts/left-side";
import MainLayoutChat from "@/components/layouts/main-layout-chat";

export default function Home() {
  return (
    <main className="h-screen w-full flex">
      <LeftSide />
      <div className="flex-1">
        <MainLayoutChat />
      </div>
    </main>
  );
}
